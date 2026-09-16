import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  ActivityIndicator, Image, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { COLORS, FONT_SIZE, RADIUS, SPACING, formatCurrency } from '../utils/theme';

export default function CoursesScreen({ navigation }) {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'courses'), where('visibility', '==', 'public'));
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setCourses(items);
      setFiltered(items);
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, []);

  function handleSearch(text) {
    setSearch(text);
    if (!text.trim()) setFiltered(courses);
    else {
      const lower = text.toLowerCase();
      setFiltered(courses.filter((c) => c.title?.toLowerCase().includes(lower) || c.category?.toLowerCase().includes(lower)));
    }
  }

  function getPriceLabel(course) {
    if (course.pricingModel === 'free') return 'Free';
    const p = course.pricing || {};
    if (course.displayPricing === 'monthly' && p.monthly) return formatCurrency(p.monthly) + '/mo';
    if (course.displayPricing === 'yearly' && p.yearly) return formatCurrency(p.yearly) + '/yr';
    if (course.price) return formatCurrency(course.price);
    if (p.monthly) return formatCurrency(p.monthly) + '/mo';
    if (p.yearly) return formatCurrency(p.yearly) + '/yr';
    return 'Paid';
  }

  function getLessonCount(course) {
    if (!course.topics) return 0;
    return course.topics.reduce((a, t) => a + (t.lessons?.length || 0), 0);
  }

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0f172a', '#162033']} style={styles.header}>
        <Text style={styles.title}>Courses</Text>
        <Text style={styles.subtitle}>{courses.length} courses available</Text>
        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={20} color={COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
            placeholderTextColor={COLORS.textMuted}
            value={search}
            onChangeText={handleSearch}
          />
          {search ? (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>
      </LinearGradient>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="book-outline" size={48} color={COLORS.textMuted} />
            <Text style={styles.emptyText}>No courses found</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CourseDetail', { courseId: item.id })}
            activeOpacity={0.85}
          >
            {item.featuredImage ? (
              <Image source={{ uri: item.featuredImage }} style={styles.cardImg} />
            ) : (
              <View style={[styles.cardImg, styles.cardImgFallback]}>
                <Ionicons name="film-outline" size={32} color={COLORS.textMuted} />
              </View>
            )}
            <View style={styles.cardBody}>
              <View style={styles.cardTop}>
                {item.category && (
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                )}
                <Text style={styles.cardPrice}>{getPriceLabel(item)}</Text>
              </View>
              <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>
                {item.description?.replace(/<[^>]+>/g, '') || 'No description'}
              </Text>
              <View style={styles.cardFooter}>
                <View style={styles.cardMeta}>
                  <Ionicons name="videocam-outline" size={14} color={COLORS.textMuted} />
                  <Text style={styles.cardMetaText}>{getLessonCount(item)} lessons</Text>
                </View>
                <View style={styles.learnMore}>
                  <Text style={styles.learnMoreText}>Learn More</Text>
                  <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e' },
  center: { flex: 1, backgroundColor: '#0a0f1e', justifyContent: 'center', alignItems: 'center' },
  header: { paddingHorizontal: SPACING.lg, paddingTop: 60, paddingBottom: SPACING.md },
  title: { color: COLORS.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: COLORS.textSecondary, fontSize: FONT_SIZE.md, marginTop: 4 },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg, marginTop: 14, paddingHorizontal: SPACING.md, gap: 10, height: 48,
  },
  searchInput: { flex: 1, color: COLORS.text, fontSize: FONT_SIZE.md },
  list: { paddingHorizontal: SPACING.lg, paddingTop: 10, paddingBottom: 40 },
  card: {
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.xl, marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  cardImg: { width: '100%', height: 180, backgroundColor: COLORS.bgInput },
  cardImgFallback: { justifyContent: 'center', alignItems: 'center' },
  cardBody: { padding: SPACING.md },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  categoryBadge: { backgroundColor: COLORS.primary + '20', borderRadius: RADIUS.sm, paddingHorizontal: 8, paddingVertical: 3 },
  categoryText: { color: COLORS.primaryLight, fontSize: FONT_SIZE.xs, fontWeight: '700' },
  cardPrice: { color: COLORS.success, fontSize: FONT_SIZE.md, fontWeight: '700' },
  cardTitle: { color: COLORS.text, fontSize: 18, fontWeight: '700', marginBottom: 4 },
  cardDesc: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 18, marginBottom: 10 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardMetaText: { color: COLORS.textMuted, fontSize: FONT_SIZE.sm },
  learnMore: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  learnMoreText: { color: COLORS.primary, fontSize: FONT_SIZE.sm, fontWeight: '600' },
  empty: { alignItems: 'center', paddingVertical: 60, gap: 10 },
  emptyText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.md },
});
