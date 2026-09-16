import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, Image, Alert, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, FONT_SIZE, RADIUS, SPACING, formatCurrency } from '../utils/theme';

const { width } = Dimensions.get('window');

export default function CourseDetailScreen({ route, navigation }) {
  const { courseId } = route.params;
  const { currentUser } = useAuth();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourse();
    if (currentUser) loadEnrollment();
  }, [courseId, currentUser]);

  async function loadCourse() {
    const snap = await getDoc(doc(db, 'courses', courseId));
    if (snap.exists()) setCourse({ id: snap.id, ...snap.data() });
    setLoading(false);
  }

  function loadEnrollment() {
    const q = query(
      collection(db, 'enrollmentPlans'),
      where('userId', '==', currentUser.uid)
    );
    return onSnapshot(q, (snap) => {
      const match = snap.docs.find((d) => d.data().courseId === courseId);
      if (match) setEnrollment({ id: match.id, ...match.data() });
    });
  }

  function getTotalLessons() {
    if (!course?.topics) return 0;
    return course.topics.reduce((a, t) => a + (t.lessons?.length || 0), 0);
  }

  function getPricingInfo() {
    if (!course) return null;
    if (course.pricingModel === 'free') return { label: 'Free', amount: 0, type: 'free' };
    const p = course.pricing || {};
    if (course.displayPricing === 'monthly' && p.monthly) return { label: `${formatCurrency(p.monthly)}/mo`, amount: p.monthly, type: 'monthly' };
    if (course.displayPricing === 'yearly' && p.yearly) return { label: `${formatCurrency(p.yearly)}/yr`, amount: p.yearly, type: 'yearly' };
    if (course.price) return { label: formatCurrency(course.price), amount: course.price, type: 'onetime' };
    if (p.monthly) return { label: `${formatCurrency(p.monthly)}/mo`, amount: p.monthly, type: 'monthly' };
    if (p.yearly) return { label: `${formatCurrency(p.yearly)}/yr`, amount: p.yearly, type: 'yearly' };
    return { label: 'Paid', amount: 0, type: 'paid' };
  }

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }
  if (!course) {
    return <View style={styles.center}><Text style={{ color: COLORS.textSecondary }}>Course not found</Text></View>;
  }

  const pricing = getPricingInfo();
  const hasAccess = enrollment && !enrollment.blocked &&
    (enrollment.paymentStatus === 'paid' || enrollment.paymentStatus === 'receipt_required' || enrollment.subscriptionStatus === 'active');

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Hero */}
        <View style={styles.heroWrap}>
          {course.featuredImage ? (
            <Image source={{ uri: course.featuredImage }} style={styles.hero} />
          ) : (
            <View style={[styles.hero, styles.heroFallback]}>
              <Ionicons name="film-outline" size={48} color={COLORS.textMuted} />
            </View>
          )}
          <LinearGradient colors={['transparent', '#0a0f1e']} style={styles.heroGrad} />
          <TouchableOpacity style={styles.heroBack} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          {/* Category + Pricing */}
          <View style={styles.topRow}>
            {course.category && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{course.category}</Text>
              </View>
            )}
            {pricing && pricing.type !== 'free' && (
              <View style={styles.priceBadge}>
                <Text style={styles.priceBadgeText}>{pricing.label}</Text>
              </View>
            )}
          </View>

          <Text style={styles.title}>{course.title}</Text>

          {/* Meta */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="videocam-outline" size={16} color={COLORS.textSecondary} />
              <Text style={styles.metaText}>{getTotalLessons()} lessons</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this course</Text>
            <Text style={styles.desc}>{course.description?.replace(/<[^>]+>/g, '') || 'No description available.'}</Text>
          </View>

          {/* What you'll learn */}
          {course.whatYouWillLearn?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What You'll Learn</Text>
              <View style={styles.learnGrid}>
                {course.whatYouWillLearn.map((item, i) => (
                  <View key={i} style={styles.learnItem}>
                    <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
                    <Text style={styles.learnText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Curriculum */}
          {course.topics?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Curriculum</Text>
              {course.topics.map((topic, ti) => (
                <View key={ti} style={styles.topicBlock}>
                  <View style={styles.topicHeader}>
                    <Ionicons name="folder-open-outline" size={18} color={COLORS.primary} />
                    <Text style={styles.topicTitle}>Topic {ti + 1}: {topic.title}</Text>
                    <Text style={styles.topicCount}>{topic.lessons?.length || 0} lessons</Text>
                  </View>
                  {topic.lessons?.map((lesson, li) => (
                    <View key={li} style={styles.lessonRow}>
                      <Ionicons name="play-circle-outline" size={16} color={COLORS.textMuted} />
                      <Text style={styles.lessonText}>{lesson.name}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Requirements */}
          {course.requirements?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Requirements</Text>
              {course.requirements.map((item, i) => (
                <View key={i} style={styles.learnItem}>
                  <Ionicons name="ellipse" size={6} color={COLORS.textMuted} />
                  <Text style={styles.learnText}>{item}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomLeft}>
          <Text style={styles.bottomPrice}>{pricing?.label || 'Free'}</Text>
          {course.courseDurationMonths && (
            <Text style={styles.bottomDuration}>{course.courseDurationMonths} months access</Text>
          )}
        </View>
        {hasAccess ? (
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => navigation.navigate('Learn', { courseId })}
            activeOpacity={0.85}
          >
            <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.ctaGrad}>
              <Ionicons name="play" size={20} color={COLORS.white} />
              <Text style={styles.ctaText}>Continue Learning</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => {
              if (!currentUser) {
                Alert.alert('Login Required', 'Please log in to enroll in this course', [
                  { text: 'Log In', onPress: () => navigation.navigate('Login') },
                  { text: 'Cancel', style: 'cancel' },
                ]);
                return;
              }
              navigation.navigate('Payment', { courseId, planType: pricing?.type, planAmount: pricing?.amount, courseName: course.title });
            }}
            activeOpacity={0.85}
          >
            <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.ctaGrad}>
              <Text style={styles.ctaText}>Enroll Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e' },
  center: { flex: 1, backgroundColor: '#0a0f1e', justifyContent: 'center', alignItems: 'center' },
  heroWrap: { position: 'relative' },
  hero: { width: width, height: 260, backgroundColor: COLORS.bgInput },
  heroFallback: { justifyContent: 'center', alignItems: 'center' },
  heroGrad: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80 },
  heroBack: {
    position: 'absolute', top: 50, left: 16,
    width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.overlay,
    justifyContent: 'center', alignItems: 'center',
  },
  body: { padding: SPACING.lg },
  topRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  badge: { backgroundColor: COLORS.primary + '20', borderRadius: RADIUS.sm, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { color: COLORS.primaryLight, fontSize: FONT_SIZE.xs, fontWeight: '700' },
  priceBadge: { backgroundColor: COLORS.success + '20', borderRadius: RADIUS.sm, paddingHorizontal: 10, paddingVertical: 4 },
  priceBadgeText: { color: COLORS.success, fontSize: FONT_SIZE.xs, fontWeight: '700' },
  title: { color: COLORS.text, fontSize: 24, fontWeight: '800', marginBottom: 12 },
  metaRow: { flexDirection: 'row', gap: 20, marginBottom: SPACING.lg },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm },
  section: { marginBottom: SPACING.lg },
  sectionTitle: { color: COLORS.text, fontSize: 18, fontWeight: '700', marginBottom: 10 },
  desc: { color: COLORS.textSecondary, fontSize: FONT_SIZE.md, lineHeight: 22 },
  learnGrid: { gap: 8 },
  learnItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  learnText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.md, flex: 1, lineHeight: 20 },
  topicBlock: { marginBottom: 12, backgroundColor: COLORS.bgCard, borderRadius: RADIUS.md, overflow: 'hidden' },
  topicHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12 },
  topicTitle: { flex: 1, color: COLORS.text, fontSize: FONT_SIZE.md, fontWeight: '600' },
  topicCount: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs },
  lessonRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6, paddingLeft: 36, paddingRight: 12 },
  lessonText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, flex: 1 },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: COLORS.bgCard, borderTopWidth: 1, borderTopColor: COLORS.border,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.lg, paddingVertical: 14, paddingBottom: 34,
  },
  bottomLeft: {},
  bottomPrice: { color: COLORS.success, fontSize: 22, fontWeight: '800' },
  bottomDuration: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs },
  ctaBtn: { borderRadius: RADIUS.lg, overflow: 'hidden' },
  ctaGrad: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 24, paddingVertical: 16 },
  ctaText: { color: COLORS.white, fontSize: 17, fontWeight: '700' },
});
