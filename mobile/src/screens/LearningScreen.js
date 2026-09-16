import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
  ActivityIndicator, Dimensions, Animated, Modal, Platform, Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe';
import { LinearGradient } from 'expo-linear-gradient';
import { doc, getDoc, onSnapshot, updateDoc, arrayUnion, arrayRemove, collection, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, FONT_SIZE, RADIUS, SPACING, getYoutubeId } from '../utils/theme';

const { width, height } = Dimensions.get('window');

export default function LearningScreen({ route, navigation }) {
  const { courseId } = route.params;
  const { currentUser } = useAuth();
  const insets = useSafeAreaInsets();
  const [course, setCourse] = useState(null);
  const [plan, setPlan] = useState(null);       // from enrollmentPlans (access control)
  const [enrollment, setEnrollment] = useState(null); // from enrollments (completedLessons)
  const [enrollmentId, setEnrollmentId] = useState(null); // enrollmentPlans doc id
  const [enrollDocId, setEnrollDocId] = useState(null); // enrollments doc id
  const [activeTopic, setActiveTopic] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [expandedTopics, setExpandedTopics] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-width * 0.8)).current;

  const handleFullScreenChange = useCallback((isFullScreen) => {
    setIsFullscreen(isFullScreen);
    if (isFullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);

  useEffect(() => {
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  useEffect(() => {
    loadCourse();
    if (currentUser) loadEnrollment();
  }, [courseId, currentUser]);

  async function loadCourse() {
    const snap = await getDoc(doc(db, 'courses', courseId));
    if (snap.exists()) {
      const data = { id: snap.id, ...snap.data() };
      setCourse(data);
      const expanded = {};
      data.topics?.forEach((_, i) => { expanded[i] = true; });
      setExpandedTopics(expanded);
    }
    setLoading(false);
  }

  function loadEnrollment() {
    // enrollmentPlans = access control (blocked, paymentStatus, expiryDate)
    const planQ = query(collection(db, 'enrollmentPlans'), where('userId', '==', currentUser.uid));
    const unsubPlan = onSnapshot(planQ, (snap) => {
      const match = snap.docs.find((d) => d.data().courseId === courseId);
      if (match) {
        setPlan({ id: match.id, ...match.data() });
        setEnrollmentId(match.id);
      }
    });

    // enrollments = completedLessons (uses customerEmail, not userId)
    const enrollQ = query(collection(db, 'enrollments'), where('customerEmail', '==', currentUser.email));
    const unsubEnroll = onSnapshot(enrollQ, (snap) => {
      const match = snap.docs.find((d) => d.data().courseId === courseId);
      if (match) {
        setEnrollment({ id: match.id, ...match.data() });
        setEnrollDocId(match.id);
      }
    });

    return () => { unsubPlan(); unsubEnroll(); };
  }

  function getLessonId(ti, li) { return `${ti}-${li}`; }
  function isCompleted(ti, li) { return enrollment?.completedLessons?.includes(getLessonId(ti, li)); }

  async function toggleComplete(ti, li) {
    if (!enrollDocId) return;
    const lessonId = getLessonId(ti, li);
    if (isCompleted(ti, li)) {
      await updateDoc(doc(db, 'enrollments', enrollDocId), { completedLessons: arrayRemove(lessonId) });
    } else {
      await updateDoc(doc(db, 'enrollments', enrollDocId), { completedLessons: arrayUnion(lessonId) });
    }
  }

  function getLessonVideoUrl(lesson) {
    if (!lesson?.videoUrl) return null;
    const url = lesson.videoUrl;
    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch) return { type: 'youtube', id: ytMatch[1] };
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return { type: 'vimeo', id: vimeoMatch[1] };
    return { type: 'other', url };
  }

  function selectLesson(ti, li) {
    setActiveTopic(ti);
    setActiveLesson(li);
    setShowCurriculum(false);
  }

  function navigateLesson(dir) {
    if (!course?.topics) return;
    let ti = activeTopic, li = activeLesson;
    if (dir === 'next') {
      li++;
      if (li >= (course.topics[ti]?.lessons?.length || 0)) { li = 0; ti++; if (ti >= course.topics.length) return; }
    } else {
      li--;
      if (li < 0) { ti--; if (ti < 0) return; li = (course.topics[ti]?.lessons?.length || 1) - 1; }
    }
    setActiveTopic(ti);
    setActiveLesson(li);
  }

  const totalLessons = course?.topics?.reduce((a, t) => a + (t.lessons?.length || 0), 0) || 0;
  const completedCount = enrollment?.completedLessons?.length || 0;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }
  if (!course) {
    return <View style={styles.center}><Text style={{ color: COLORS.textSecondary }}>Course not found</Text></View>;
  }

  const currentLesson = course.topics?.[activeTopic]?.lessons?.[activeLesson];
  const videoUrl = getLessonVideoUrl(currentLesson);
  const currentTopicTitle = course.topics?.[activeTopic]?.title;

  return (
    <View style={styles.container}>
      {/* Header */}
      {!isFullscreen && (
      <LinearGradient colors={['#0f172a', '#162033']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>{course.title}</Text>
          <View style={styles.progressRow}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
            </View>
            <Text style={styles.progressText}>{progressPct}%</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setShowCurriculum(true)} style={styles.menuBtn}>
          <Ionicons name="list" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </LinearGradient>
      )}

      {/* Video Player */}
      {videoUrl ? (
        <View style={isFullscreen ? styles.videoFullscreen : styles.videoWrap}>
          {videoUrl.type === 'youtube' ? (
            <YoutubePlayer
              height={isFullscreen ? height : width * 9 / 16}
              width={isFullscreen ? height : width}
              videoId={videoUrl.id}
              play={false}
              onChangeState={() => {}}
              onFullScreenChange={handleFullScreenChange}
              allowsFullscreenVideo
              initialPlayerParams={{
                modestbranding: true,
                rel: false,
                playsinline: false,
                iv_load_policy: 3,
                fs: 1,
                autoplay: 0,
              }}
            />
          ) : videoUrl.type === 'vimeo' ? (
            <WebView
              source={{
                html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"><style>*{margin:0;padding:0}body{background:#000;display:flex;justify-content:center;align-items:center;height:100vh;overflow:hidden}.r{position:relative;width:100%;padding-bottom:56.25%}iframe{position:absolute;top:0;left:0;width:100%;height:100%;border:0}</style></head><body><div class="r"><iframe src="https://player.vimeo.com/video/${videoUrl.id}?playsinline=1" allow="autoplay;fullscreen;picture-in-picture" allowfullscreen></iframe></div></body></html>`,
              }}
              style={styles.video}
              allowsFullscreenVideo
              allowsInlineMediaPlayback
              javaScriptEnabled
              originWhitelist={['https://player.vimeo.com']}
            />
          ) : null}
        </View>
      ) : (
        <View style={[styles.videoWrap, styles.videoFallback]}>
          <Ionicons name="play-circle-outline" size={56} color={COLORS.textMuted} />
          <Text style={{ color: COLORS.textMuted, marginTop: 12 }}>No video for this lesson</Text>
        </View>
      )}

      {/* Lesson Info */}
      {!isFullscreen && (
      <>
      <View style={styles.lessonSection}>
        <View style={styles.lessonHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.topicLabel}>{currentTopicTitle}</Text>
            <Text style={styles.lessonTitle}>{currentLesson?.name || 'No lesson selected'}</Text>
          </View>
          <TouchableOpacity
            style={[styles.checkBtn, isCompleted(activeTopic, activeLesson) && styles.checkedBtn]}
            onPress={() => toggleComplete(activeTopic, activeLesson)}
          >
            <Ionicons
              name={isCompleted(activeTopic, activeLesson) ? 'checkmark-circle' : 'ellipse-outline'}
              size={20}
              color={isCompleted(activeTopic, activeLesson) ? COLORS.success : COLORS.textMuted}
            />
            <Text style={[styles.checkText, isCompleted(activeTopic, activeLesson) && styles.checkedText]}>
              {isCompleted(activeTopic, activeLesson) ? 'Completed' : 'Mark Complete'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        {currentLesson?.description ? (
          <ScrollView style={styles.descScroll} showsVerticalScrollIndicator={false}>
            <Text style={styles.descText}>{currentLesson.description.replace(/<[^>]+>/g, '')}</Text>
          </ScrollView>
        ) : null}
      </View>

      {/* Prev/Next Navigation */}
      <View style={[styles.navRow, { paddingBottom: insets.bottom + 8 }]}>
        <TouchableOpacity
          style={[styles.navBtn, activeTopic === 0 && activeLesson === 0 && styles.navBtnDisabled]}
          onPress={() => navigateLesson('prev')}
          disabled={activeTopic === 0 && activeLesson === 0}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={18} color={COLORS.text} />
          <Text style={styles.navText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navBtn, styles.navBtnNext]}
          onPress={() => navigateLesson('next')}
          disabled={activeTopic === (course.topics?.length || 1) - 1 && activeLesson === (course.topics?.[activeTopic]?.lessons?.length || 1) - 1}
          activeOpacity={0.7}
        >
          <Text style={[styles.navText, { color: COLORS.primary }]}>Next</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      </>
      )}

      {/* Curriculum Sidebar Modal */}
      <Modal visible={showCurriculum} animationType="slide" transparent>
        <View style={styles.sidebarOverlay}>
          <TouchableOpacity style={styles.sidebarBackdrop} onPress={() => setShowCurriculum(false)} />
          <View style={styles.sidebar}>
            <View style={styles.sidebarHeader}>
              <Text style={styles.sidebarTitle}>Curriculum</Text>
              <Text style={styles.sidebarMeta}>{completedCount}/{totalLessons} lessons</Text>
              <TouchableOpacity onPress={() => setShowCurriculum(false)} style={styles.sidebarClose}>
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.sidebarScroll} showsVerticalScrollIndicator={false}>
              {course.topics?.map((topic, ti) => {
                const topicDone = topic.lessons?.filter((_, li) => isCompleted(ti, li)).length || 0;
                const topicTotal = topic.lessons?.length || 0;
                return (
                  <View key={ti} style={styles.topicBlock}>
                    <TouchableOpacity
                      style={styles.topicHeader}
                      onPress={() => setExpandedTopics((p) => ({ ...p, [ti]: !p[ti] }))}
                    >
                      <Ionicons
                        name={expandedTopics[ti] ? 'chevron-down' : 'chevron-forward'}
                        size={18} color={COLORS.textMuted}
                      />
                      <Text style={styles.topicTitle}>Topic {ti + 1}: {topic.title}</Text>
                      <Text style={styles.topicCount}>{topicDone}/{topicTotal}</Text>
                    </TouchableOpacity>

                    {expandedTopics[ti] && topic.lessons?.map((lesson, li) => {
                      const isActive = ti === activeTopic && li === activeLesson;
                      const done = isCompleted(ti, li);
                      return (
                        <TouchableOpacity
                          key={li}
                          style={[styles.lessonRow, isActive && styles.lessonRowActive]}
                          onPress={() => selectLesson(ti, li)}
                        >
                          <Ionicons
                            name={done ? 'checkmark-circle' : isActive ? 'play-circle' : 'ellipse-outline'}
                            size={18}
                            color={done ? COLORS.success : isActive ? COLORS.primary : COLORS.textMuted}
                          />
                          <Text style={[styles.lessonText, isActive && { color: COLORS.text, fontWeight: '600' }]} numberOfLines={1}>
                            {lesson.name}
                          </Text>
                          {lesson.videoUrl && <Ionicons name="videocam" size={14} color={COLORS.textMuted} />}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e' },
  center: { flex: 1, backgroundColor: '#0a0f1e', justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingTop: 50, paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.sm, gap: SPACING.sm,
  },
  backBtn: { padding: 6 },
  headerCenter: { flex: 1 },
  headerTitle: { color: COLORS.text, fontSize: FONT_SIZE.md, fontWeight: '700' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  progressBar: { flex: 1, height: 4, backgroundColor: COLORS.bgInput, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 2 },
  progressText: { color: COLORS.primary, fontSize: FONT_SIZE.xs, fontWeight: '700' },
  menuBtn: { padding: 6 },
  videoWrap: { width: width, height: width * 9 / 16, backgroundColor: '#000' },
  videoFullscreen: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000', zIndex: 999 },
  video: { flex: 1 },
  videoFallback: { justifyContent: 'center', alignItems: 'center' },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  playText: { color: '#fff', fontSize: 14, fontWeight: '600', marginTop: 12 },
  lessonSection: { flex: 1, paddingHorizontal: SPACING.md },
  lessonHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingVertical: SPACING.sm,
  },
  topicLabel: { color: COLORS.primary, fontSize: FONT_SIZE.xs, fontWeight: '600', marginBottom: 2 },
  lessonTitle: { color: COLORS.text, fontSize: 17, fontWeight: '700' },
  checkBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6,
    paddingHorizontal: 10, borderRadius: RADIUS.sm, backgroundColor: COLORS.bgCard,
  },
  checkedBtn: { backgroundColor: COLORS.success + '20' },
  checkText: { color: COLORS.textMuted, fontSize: FONT_SIZE.sm },
  checkedText: { color: COLORS.success },
  descScroll: { maxHeight: 150 },
  descText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.md, lineHeight: 22 },
  navRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: SPACING.md,
    paddingTop: 10, borderTopWidth: 1, borderTopColor: COLORS.border,
    backgroundColor: COLORS.bg,
  },
  navBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.md, paddingVertical: 13, gap: 4,
    borderWidth: 1, borderColor: COLORS.border,
  },
  navBtnNext: { backgroundColor: COLORS.primary + '15', borderColor: COLORS.primary + '40', marginLeft: 10 },
  navBtnDisabled: { opacity: 0.3 },
  navText: { color: COLORS.text, fontSize: 14, fontWeight: '600' },
  // Sidebar
  sidebarOverlay: { flex: 1, flexDirection: 'row' },
  sidebarBackdrop: { flex: 1, backgroundColor: COLORS.overlay },
  sidebar: {
    width: width * 0.82, backgroundColor: COLORS.bg, paddingTop: 50, paddingBottom: 20,
    borderTopLeftRadius: 20, borderBottomLeftRadius: 20,
  },
  sidebarHeader: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border, gap: SPACING.sm,
  },
  sidebarTitle: { flex: 1, color: COLORS.text, fontSize: 18, fontWeight: '800' },
  sidebarMeta: { color: COLORS.textMuted, fontSize: FONT_SIZE.sm },
  sidebarClose: { padding: 4 },
  sidebarScroll: { flex: 1 },
  topicBlock: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  topicHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 8, padding: SPACING.md, gap: 8,
  },
  topicTitle: { flex: 1, color: COLORS.text, fontSize: FONT_SIZE.md, fontWeight: '600' },
  topicCount: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs },
  lessonRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 10, paddingHorizontal: SPACING.lg, paddingLeft: 44,
  },
  lessonRowActive: { backgroundColor: COLORS.primary + '15' },
  lessonText: { flex: 1, color: COLORS.textSecondary, fontSize: FONT_SIZE.sm },
});
