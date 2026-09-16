import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '../utils/theme';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    icon: 'school-outline',
    title: 'Learn From Experts',
    desc: 'Access world-class courses designed by industry professionals',
  },
  {
    icon: 'videocam-outline',
    title: 'Video Lessons',
    desc: 'Watch HD video lessons at your own pace, pause and replay anytime',
  },
  {
    icon: 'trending-up-outline',
    title: 'Track Progress',
    desc: 'Monitor your learning journey with built-in progress tracking',
  },
];

export default function WelcomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const dotAnims = useRef(SLIDES.map(() => new Animated.Value(0))).current;
  const [activeSlide, setActiveSlide] = React.useState(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(logoScale, { toValue: 1, tension: 40, friction: 6, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, delay: 400, useNativeDriver: true }),
    ]).start();

    // Animate feature dots
    dotAnims.forEach((anim, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 200),
          Animated.timing(anim, { toValue: 1, duration: 600, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    });

    // Auto-cycle slides
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <LinearGradient colors={['#0a0f1e', '#0f172a', '#0a1628']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topSection}>
        {/* Logo */}
        <Animated.View style={[styles.logoWrap, { transform: [{ scale: logoScale }] }]}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>Z</Text>
          </View>
          <View style={styles.logoRing} />
        </Animated.View>

        {/* Title */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], alignItems: 'center' }}>
          <Text style={styles.brand}>ZEDROTECH</Text>
          <Text style={styles.subtitle}>ACADEMY</Text>
        </Animated.View>
      </View>

      {/* Feature Cards */}
      <View style={styles.featuresSection}>
        {SLIDES.map((slide, i) => {
          const isActive = i === activeSlide;
          return (
            <Animated.View
              key={i}
              style={[
                styles.featureCard,
                {
                  opacity: fadeAnim,
                  transform: [{
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 40],
                      outputRange: [0, 40 + i * 15],
                    }),
                  }],
                  borderColor: isActive ? COLORS.primary + '60' : COLORS.border,
                  backgroundColor: isActive ? COLORS.primary + '10' : COLORS.bgCard,
                },
              ]}
            >
              <View style={[styles.featureIconWrap, isActive && styles.featureIconActive]}>
                <Ionicons name={slide.icon} size={28} color={isActive ? COLORS.primary : COLORS.textMuted} />
              </View>
              <View style={styles.featureTextWrap}>
                <Text style={[styles.featureTitle, isActive && { color: COLORS.text }]}>{slide.title}</Text>
                <Text style={styles.featureDesc}>{slide.desc}</Text>
              </View>
            </Animated.View>
          );
        })}

        {/* Dots */}
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, i === activeSlide && styles.dotActive]} />
          ))}
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            style={styles.loginBtnGrad}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.loginBtnText}>Log In</Text>
            <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Register at school.zedrotech.com, then log in here
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topSection: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 40 },
  logoWrap: { marginBottom: 30, position: 'relative' },
  logoCircle: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5, shadowRadius: 30, elevation: 15,
  },
  logoRing: {
    position: 'absolute', top: -8, left: -8, right: -8, bottom: -8,
    borderRadius: 53, borderWidth: 1.5, borderColor: COLORS.primary + '30',
  },
  logoText: { color: COLORS.white, fontSize: 42, fontWeight: '900' },
  brand: { color: COLORS.text, fontSize: 32, fontWeight: '900', letterSpacing: 4 },
  subtitle: { color: COLORS.primaryLight, fontSize: 14, fontWeight: '600', letterSpacing: 8, marginTop: 4 },
  featuresSection: { paddingHorizontal: SPACING.lg, gap: 10, paddingBottom: 10 },
  featureCard: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    borderRadius: RADIUS.lg, padding: SPACING.md,
    borderWidth: 1,
  },
  featureIconWrap: {
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: COLORS.bgInput, justifyContent: 'center', alignItems: 'center',
  },
  featureIconActive: { backgroundColor: COLORS.primary + '20' },
  featureTextWrap: { flex: 1 },
  featureTitle: { color: COLORS.textMuted, fontSize: FONT_SIZE.md, fontWeight: '700' },
  featureDesc: { color: COLORS.textMuted, fontSize: FONT_SIZE.sm, marginTop: 2 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 12 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.textMuted + '40' },
  dotActive: { width: 20, backgroundColor: COLORS.primary },
  buttons: { paddingHorizontal: SPACING.lg, paddingBottom: 50, gap: 12 },
  loginBtn: { borderRadius: RADIUS.lg, overflow: 'hidden' },
  loginBtnGrad: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8,
    paddingVertical: 18,
  },
  loginBtnText: { color: COLORS.white, fontSize: FONT_SIZE.xl, fontWeight: '700' },
  footerText: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, textAlign: 'center', marginTop: 8 },
});
