import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  RefreshControl, ActivityIndicator, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { collection, query, where, onSnapshot, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, FONT_SIZE, RADIUS, SPACING, formatCurrency } from '../utils/theme';

export default function DashboardScreen({ navigation }) {
  const { currentUser, userData, signOut } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [enrollmentPlans, setEnrollmentPlans] = useState([]);
  const [courses, setCourses] = useState({});
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    // enrollmentPlans has: blocked, paymentStatus, expiryDate, planType, planAmount
    const planQ = query(collection(db, 'enrollmentPlans'), where('userId', '==', currentUser.uid));
    const unsubPlans = onSnapshot(planQ, (snap) => {
      setEnrollmentPlans(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, () => setLoading(false));

    // enrollments uses customerEmail (not userId) — has: completedLessons
    const enrollQ = query(collection(db, 'enrollments'), where('customerEmail', '==', currentUser.email));
    const unsubEnroll = onSnapshot(enrollQ, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setEnrollments(items);
      items.forEach((e) => { if (!courses[e.courseId]) loadCourse(e.courseId); });
    });

    const pq = query(collection(db, 'payments'), where('userId', '==', currentUser.uid), limit(20));
    const unsubP = onSnapshot(pq, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      items.sort((a, b) => (b.submittedAt?.seconds || 0) - (a.submittedAt?.seconds || 0));
      setPayments(items.slice(0, 10));
    });
    return () => { unsubPlans(); unsubEnroll(); unsubP(); };
  }, [currentUser]);

  async function loadCourse(courseId) {
    try {
      const snap = await getDoc(doc(db, 'courses', courseId));
      if (snap.exists()) setCourses((prev) => ({ ...prev, [courseId]: { id: snap.id, ...snap.data() } }));
    } catch {}
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  // Merge enrollmentPlans (access control) with enrollments (completedLessons)
  const mergedEnrollments = enrollmentPlans.map((plan) => {
    const enroll = enrollments.find((e) => e.courseId === plan.courseId);
    return { ...plan, completedLessons: enroll?.completedLessons || [], enrollmentId: enroll?.id };
  });

  const activeEnrollments = mergedEnrollments.filter((e) => !isBlocked(e));
  const blockedEnrollments = mergedEnrollments.filter((e) => isBlocked(e));
  const inProgressCount = activeEnrollments.filter((e) => {
    const total = courses[e.courseId]?.topics?.reduce((a, t) => a + (t.lessons?.length || 0), 0) || 0;
    const done = e.completedLessons?.length || 0;
    return done > 0 && done < total;
  }).length;
  const totalLessons = Object.values(courses).reduce((acc, c) => acc + (c.topics?.reduce((a, t) => a + (t.lessons?.length || 0), 0) || 0), 0);
  const totalCompleted = mergedEnrollments.reduce((acc, e) => acc + (e.completedLessons?.length || 0), 0);

  function getDaysRemaining(enrollment) {
    if (!enrollment?.expiryDate) return null;
    const exp = enrollment.expiryDate?.seconds ? new Date(enrollment.expiryDate.seconds * 1000) : new Date(enrollment.expiryDate);
    return Math.max(0, Math.ceil((exp - new Date()) / (1000 * 60 * 60 * 24)));
  }

  function getMinDaysRemaining() {
    const days = activeEnrollments.map((e) => getDaysRemaining(e)).filter((d) => d !== null);
    return days.length > 0 ? Math.min(...days) : null;
  }

  function getStatus(enrollment) {
    if (enrollment.blocked) return { label: 'Blocked', color: COLORS.error, bg: COLORS.error + '20' };
    const ps = enrollment.paymentStatus;
    if (ps === 'rejected') return { label: 'Rejected', color: COLORS.error, bg: COLORS.error + '20' };
    if (ps === 'pending' || ps === 'receipt_required') return { label: 'Verification Pending', color: COLORS.warning, bg: COLORS.warning + '20' };
    const days = getDaysRemaining(enrollment);
    if (days !== null && days <= 0) return { label: 'Expired', color: COLORS.error, bg: COLORS.error + '20' };
    if (days !== null && days <= 3) return { label: `${days}d left`, color: COLORS.error, bg: COLORS.error + '20' };
    return { label: 'Active', color: COLORS.success, bg: COLORS.success + '20' };
  }

  function isBlocked(enrollment) {
    if (enrollment.blocked) return true;
    // Check if subscription has expired
    if (enrollment.expiryDate) {
      const exp = enrollment.expiryDate?.seconds ? new Date(enrollment.expiryDate.seconds * 1000) : new Date(enrollment.expiryDate);
      if (exp < new Date()) return true;
    }
    // Check payment status — only block if payment is explicitly rejected or never paid
    const ps = enrollment.paymentStatus;
    if (ps === 'rejected' || !ps) return true;
    return false;
  }

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }

  const minDays = getMinDaysRemaining();
  const showExpiryWarning = minDays !== null && minDays <= 7;
  const showExpiryDanger = minDays !== null && minDays <= 2;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      >
        {/* Header */}
        <LinearGradient colors={['#0f172a', '#162033']} style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.avatarSmall}>
              <Text style={styles.avatarText}>{userData?.fullName?.charAt(0)?.toUpperCase() || '?'}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.greeting}>Welcome back, {userData?.fullName?.split(' ')[0] || 'Student'}!</Text>
              <Text style={styles.email}>Track your progress and continue your learning journey.</Text>
            </View>
            <TouchableOpacity onPress={signOut} style={styles.logoutBtn}>
              <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
            </TouchableOpacity>
          </View>

          {/* Stats - 4 cards like web */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="school-outline" size={20} color={COLORS.primary} />
              <Text style={styles.statNum}>{activeEnrollments.length + blockedEnrollments.length}</Text>
              <Text style={styles.statLabel}>Total Courses</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.success} />
              <Text style={styles.statNum}>{totalCompleted}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="trending-up-outline" size={20} color={COLORS.warning} />
              <Text style={styles.statNum}>{inProgressCount}</Text>
              <Text style={styles.statLabel}>In Progress</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="time-outline" size={20} color={minDays !== null && minDays <= 3 ? COLORS.error : COLORS.primary} />
              <Text style={[styles.statNum, minDays !== null && minDays <= 3 && { color: COLORS.error }]}>
                {minDays !== null ? (minDays <= 0 ? 'Expired' : `${minDays}d`) : '---'}
              </Text>
              <Text style={styles.statLabel}>Access Left</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Expiry Warning Banner */}
        {showExpiryWarning && (
          <View style={[styles.warningBanner, showExpiryDanger && styles.warningDanger]}>
            <Ionicons name="warning" size={22} color={showExpiryDanger ? COLORS.error : COLORS.warning} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.warningTitle, showExpiryDanger && { color: COLORS.error }]}>
                {showExpiryDanger ? 'Access Expiring Very Soon!' : 'Access Expiring Soon'}
              </Text>
              <Text style={styles.warningText}>
                {showExpiryDanger
                  ? 'Your subscription will expire within 2 days. Renew now to avoid interruption.'
                  : `Your access expires in ${minDays} day${minDays !== 1 ? 's' : ''}. Renew to continue learning.`}
              </Text>
            </View>
          </View>
        )}

        {/* My Courses */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Courses</Text>
          <Text style={styles.sectionCount}>{activeEnrollments.length + blockedEnrollments.length}</Text>
        </View>

        {activeEnrollments.length === 0 && blockedEnrollments.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="book-outline" size={48} color={COLORS.textMuted} />
            <Text style={styles.emptyTitle}>No Courses Yet</Text>
            <Text style={styles.emptyDesc}>You haven't enrolled in any courses yet.</Text>
          </View>
        ) : (
          [...activeEnrollments, ...blockedEnrollments].map((enrollment) => {
            const course = courses[enrollment.courseId];
            if (!course) return null;
            const total = course.topics?.reduce((a, t) => a + (t.lessons?.length || 0), 0) || 0;
            const done = enrollment.completedLessons?.length || 0;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
            const status = getStatus(enrollment);
            const blocked = isBlocked(enrollment);

            return (
              <View key={enrollment.id} style={styles.courseCard}>
                {/* Course Image */}
                {course.featuredImage ? (
                  <Image source={{ uri: course.featuredImage }} style={styles.courseImg} />
                ) : (
                  <View style={[styles.courseImg, styles.courseImgFallback]}>
                    <Ionicons name="film-outline" size={28} color={COLORS.textMuted} />
                  </View>
                )}

                {/* Course Info */}
                <View style={styles.courseInfo}>
                  <Text style={styles.courseTitle} numberOfLines={1}>{course.title}</Text>
                  <View style={styles.courseMetaRow}>
                    <Text style={styles.coursePlan}>{enrollment.planType === 'monthly' ? 'Monthly' : enrollment.planType === 'yearly' ? 'Yearly' : 'One-Time'}</Text>
                    {enrollment.planAmount > 0 && (
                      <Text style={styles.courseAmount}>{formatCurrency(enrollment.planAmount)}</Text>
                    )}
                    <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
                      <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
                    </View>
                  </View>

                  {/* Progress */}
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${pct}%` }]} />
                  </View>
                  <Text style={styles.progressText}>{done}/{total} lessons completed</Text>

                  {/* Action Buttons */}
                  <View style={styles.actionsRow}>
                    {blocked ? (
                      <TouchableOpacity
                        style={styles.renewBtn}
                        onPress={() => navigation.navigate('Renew', {
                          courseId: enrollment.courseId,
                          courseName: course.title,
                          planType: enrollment.planType,
                          planAmount: enrollment.planAmount,
                        })}
                        activeOpacity={0.8}
                      >
                        <Ionicons name="refresh" size={16} color={COLORS.warning} />
                        <Text style={styles.renewBtnText}>Renew to Access</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.continueBtn}
                        onPress={() => navigation.navigate('Learn', { courseId: enrollment.courseId })}
                        activeOpacity={0.8}
                      >
                        <Ionicons name="play" size={16} color={COLORS.white} />
                        <Text style={styles.continueBtnText}>Continue Learning</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            );
          })
        )}

        {/* Payment History */}
        {payments.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Payment History</Text>
            </View>
            <View style={styles.paymentTable}>
              {payments.map((p) => (
                <View key={p.id} style={styles.paymentRow}>
                  <View style={styles.paymentIcon}>
                    <Ionicons
                      name={p.status === 'approved' ? 'checkmark-circle' : p.status === 'rejected' ? 'close-circle' : 'time-outline'}
                      size={18}
                      color={p.status === 'approved' ? COLORS.success : p.status === 'rejected' ? COLORS.error : COLORS.warning}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.paymentTitle}>{p.courseName || 'Payment'}</Text>
                    <Text style={styles.paymentMeta}>{formatCurrency(p.amount)} • {p.planType || p.type || 'payment'}</Text>
                  </View>
                  <View style={[styles.paymentBadge, {
                    backgroundColor: p.status === 'approved' ? COLORS.success + '20' : p.status === 'rejected' ? COLORS.error + '20' : COLORS.warning + '20',
                  }]}>
                    <Text style={[styles.paymentBadgeText, {
                      color: p.status === 'approved' ? COLORS.success : p.status === 'rejected' ? COLORS.error : COLORS.warning,
                    }]}>
                      {p.status === 'approved' ? 'Approved' : p.status === 'rejected' ? 'Rejected' : 'Pending'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e' },
  center: { flex: 1, backgroundColor: '#0a0f1e', justifyContent: 'center', alignItems: 'center' },
  scroll: { paddingBottom: 20 },
  header: { paddingHorizontal: SPACING.lg, paddingTop: 60, paddingBottom: SPACING.lg },
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.lg },
  avatarSmall: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  avatarText: { color: COLORS.white, fontSize: 22, fontWeight: '800' },
  greeting: { color: COLORS.text, fontSize: 20, fontWeight: '800' },
  email: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, marginTop: 2 },
  logoutBtn: { padding: 8 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  statCard: {
    width: '48%', flexGrow: 1, backgroundColor: COLORS.bgCard, borderRadius: RADIUS.md,
    padding: 14, alignItems: 'center', gap: 4,
  },
  statNum: { color: COLORS.text, fontSize: 22, fontWeight: '800' },
  statLabel: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs },
  warningBanner: {
    flexDirection: 'row', gap: 10, marginHorizontal: SPACING.lg, marginTop: SPACING.md,
    backgroundColor: COLORS.warning + '10', borderRadius: RADIUS.md, padding: SPACING.md,
    borderWidth: 1, borderColor: COLORS.warning + '30', alignItems: 'center',
  },
  warningDanger: { backgroundColor: COLORS.error + '10', borderColor: COLORS.error + '30' },
  warningTitle: { color: COLORS.warning, fontSize: FONT_SIZE.md, fontWeight: '700' },
  warningText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, marginTop: 2, lineHeight: 18 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.lg, marginTop: 20, marginBottom: 10,
  },
  sectionTitle: { color: COLORS.text, fontSize: 18, fontWeight: '700' },
  sectionCount: { color: COLORS.textMuted, fontSize: FONT_SIZE.sm, backgroundColor: COLORS.bgCard, borderRadius: RADIUS.sm, paddingHorizontal: 8, paddingVertical: 2 },
  emptyCard: {
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.xl, padding: SPACING.xl,
    alignItems: 'center', marginHorizontal: SPACING.lg, gap: 8,
  },
  emptyTitle: { color: COLORS.text, fontSize: 18, fontWeight: '700' },
  emptyDesc: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, textAlign: 'center' },
  courseCard: {
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.xl, marginHorizontal: SPACING.lg,
    marginBottom: 12, overflow: 'hidden',
  },
  courseImg: { width: '100%', height: 160, backgroundColor: COLORS.bgInput },
  courseImgFallback: { justifyContent: 'center', alignItems: 'center' },
  courseInfo: { padding: SPACING.md },
  courseTitle: { color: COLORS.text, fontSize: 17, fontWeight: '700', marginBottom: 6 },
  courseMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  coursePlan: { color: COLORS.textMuted, fontSize: FONT_SIZE.sm },
  courseAmount: { color: COLORS.success, fontSize: FONT_SIZE.sm, fontWeight: '700' },
  statusBadge: { borderRadius: RADIUS.sm, paddingHorizontal: 8, paddingVertical: 3 },
  statusText: { fontSize: FONT_SIZE.xs, fontWeight: '700' },
  progressBar: { height: 5, backgroundColor: COLORS.bgInput, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 3 },
  progressText: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, marginTop: 6, marginBottom: 10 },
  actionsRow: { flexDirection: 'row', gap: 10 },
  continueBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: COLORS.primary, borderRadius: RADIUS.md, paddingVertical: 12,
  },
  continueBtnText: { color: COLORS.white, fontSize: FONT_SIZE.md, fontWeight: '700' },
  renewBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderWidth: 1.5, borderColor: COLORS.warning, borderRadius: RADIUS.md, paddingVertical: 12,
  },
  renewBtnText: { color: COLORS.warning, fontSize: FONT_SIZE.md, fontWeight: '700' },
  paymentTable: { marginHorizontal: SPACING.lg, backgroundColor: COLORS.bgCard, borderRadius: RADIUS.lg, overflow: 'hidden' },
  paymentRow: {
    flexDirection: 'row', alignItems: 'center', padding: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.border, gap: 10,
  },
  paymentIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.bgInput, justifyContent: 'center', alignItems: 'center' },
  paymentTitle: { color: COLORS.text, fontSize: FONT_SIZE.sm, fontWeight: '600' },
  paymentMeta: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, marginTop: 2 },
  paymentBadge: { borderRadius: RADIUS.sm, paddingHorizontal: 8, paddingVertical: 3 },
  paymentBadgeText: { fontSize: FONT_SIZE.xs, fontWeight: '700' },
});
