import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { formatDescription } from '../utils/formatDescription';
import './CourseLearning.css';

const CourseLearning = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedTopics, setExpandedTopics] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);
  const playerWrapperRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      fetchCourseAndEnrollment();
    } else {
      navigate('/login');
    }
  }, [currentUser, courseId]);

  useEffect(() => {
    // Check for success message from payment
    if (location.state?.paymentSuccess) {
      setShowSuccessMessage(true);
      // Auto-hide after 5 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, [location.state]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const fetchCourseAndEnrollment = async () => {
    try {
      setLoading(true);

      // Execute queries in parallel for better performance
      const coursePromise = getDoc(doc(db, 'courses', courseId));

      const enrollmentQuery = query(
        collection(db, 'enrollments'),
        where('customerEmail', '==', currentUser.email),
        where('courseId', '==', courseId)
      );
      const enrollmentPromise = getDocs(enrollmentQuery);

      const planQuery = query(
        collection(db, 'enrollmentPlans'),
        where('userId', '==', currentUser.uid),
        where('courseId', '==', courseId)
      );
      const planPromise = getDocs(planQuery);

      // Await all promises simultaneously to avoid waterfalls
      const [courseDoc, enrollmentsSnapshot, planSnapshot] = await Promise.all([
        coursePromise,
        enrollmentPromise,
        planPromise
      ]);

      // Process Course Data
      if (courseDoc.exists()) {
        const courseData = { id: courseDoc.id, ...courseDoc.data() };
        setCourse(courseData);

        // Auto-expand first topic and select first lesson
        if (courseData.topics && courseData.topics.length > 0) {
          setExpandedTopics([0]);
          if (courseData.topics[0].lessons && courseData.topics[0].lessons.length > 0) {
            setSelectedLesson({ topicIndex: 0, lessonIndex: 0 });
          }
        }
      }

      // Process Enrollment Data
      if (!enrollmentsSnapshot.empty) {
        const enrollmentData = enrollmentsSnapshot.docs[0].data();
        setEnrollment({ id: enrollmentsSnapshot.docs[0].id, ...enrollmentData });
        setCompletedLessons(enrollmentData.completedLessons || []);
      }

      // Process Plan Data (check if blocked)
      if (!planSnapshot.empty) {
        const planData = planSnapshot.docs[0].data();
        if (planData.blocked) {
          navigate('/dashboard', {
            state: {
              message: 'Your access to this course has been blocked due to payment issues. Please renew your subscription.',
              paymentSuccess: false
            }
          });
          return;
        }
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching course:', error);
      setLoading(false);
    }
  };

  const toggleTopic = (topicIndex) => {
    setExpandedTopics(prev =>
      prev.includes(topicIndex)
        ? prev.filter(i => i !== topicIndex)
        : [...prev, topicIndex]
    );
  };

  const selectLesson = (topicIndex, lessonIndex) => {
    setSelectedLesson({ topicIndex, lessonIndex });
    setIsSidebarOpen(false); // Close sidebar on mobile after selecting lesson
  };

  const toggleLessonCompletion = async (topicIndex, lessonIndex) => {
    const lessonId = `${topicIndex}-${lessonIndex}`;
    const isCompleted = completedLessons.includes(lessonId);

    try {
      if (enrollment) {
        if (isCompleted) {
          // Remove from completed
          await updateDoc(doc(db, 'enrollments', enrollment.id), {
            completedLessons: arrayRemove(lessonId)
          });
          setCompletedLessons(prev => prev.filter(id => id !== lessonId));
        } else {
          // Add to completed
          await updateDoc(doc(db, 'enrollments', enrollment.id), {
            completedLessons: arrayUnion(lessonId)
          });
          setCompletedLessons(prev => [...prev, lessonId]);
        }
      }
    } catch (error) {
      console.error('Error updating lesson completion:', error);
    }
  };

  const goToNextLesson = () => {
    if (!selectedLesson || !course) return;

    const { topicIndex, lessonIndex } = selectedLesson;
    const currentTopic = course.topics[topicIndex];

    // Check if there's a next lesson in current topic
    if (lessonIndex + 1 < currentTopic.lessons.length) {
      setSelectedLesson({ topicIndex, lessonIndex: lessonIndex + 1 });
    }
    // Check if there's a next topic
    else if (topicIndex + 1 < course.topics.length) {
      const nextTopicIndex = topicIndex + 1;
      setExpandedTopics(prev => [...new Set([...prev, nextTopicIndex])]);
      setSelectedLesson({ topicIndex: nextTopicIndex, lessonIndex: 0 });
    }
  };

  const goToPreviousLesson = () => {
    if (!selectedLesson || !course) return;

    const { topicIndex, lessonIndex } = selectedLesson;

    // Check if there's a previous lesson in current topic
    if (lessonIndex > 0) {
      setSelectedLesson({ topicIndex, lessonIndex: lessonIndex - 1 });
    }
    // Check if there's a previous topic
    else if (topicIndex > 0) {
      const prevTopicIndex = topicIndex - 1;
      const prevTopicLessons = course.topics[prevTopicIndex].lessons.length;
      setExpandedTopics(prev => [...new Set([...prev, prevTopicIndex])]);
      setSelectedLesson({ topicIndex: prevTopicIndex, lessonIndex: prevTopicLessons - 1 });
    }
  };

  const calculateProgress = () => {
    if (!course || !course.topics) return 0;

    const totalLessons = course.topics.reduce((acc, topic) =>
      acc + (topic.lessons?.length || 0), 0
    );

    if (totalLessons === 0) return 0;

    return Math.round((completedLessons.length / totalLessons) * 100);
  };

  const isLessonCompleted = (topicIndex, lessonIndex) => {
    return completedLessons.includes(`${topicIndex}-${lessonIndex}`);
  };

  const convertToEmbedUrl = (url) => {
    if (!url) return null;

    // YouTube
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?vq=hd1080&hd=1&modestbranding=1&rel=0&fs=1`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?vq=hd1080&hd=1&modestbranding=1&rel=0&fs=1`;
    }

    // Vimeo
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}?quality=1080p`;
    }

    // Already an embed URL or other format
    return url;
  };

  // Alias for compatibility
  const getVideoUrl = (url) => convertToEmbedUrl(url);

  // Enter fullscreen on the player wrapper div using the Fullscreen API.
  // This gives us a real OS-level fullscreen that works on all devices.
  const handleFullscreen = useCallback(() => {
    const wrapper = playerWrapperRef.current;
    if (!wrapper) return;

    const isCurrentlyFullscreen =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    if (isCurrentlyFullscreen) {
      // Exit fullscreen
      const exit =
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.mozCancelFullScreen ||
        document.msExitFullscreen;
      if (exit) exit.call(document).catch(() => { });
    } else {
      // Enter fullscreen on our wrapper div (not the iframe)
      const enter =
        wrapper.requestFullscreen ||
        wrapper.webkitRequestFullscreen ||
        wrapper.mozRequestFullScreen ||
        wrapper.msRequestFullscreen;
      if (enter) {
        enter.call(wrapper).then(() => {
          // Lock to landscape on mobile
          if (screen.orientation?.lock) {
            screen.orientation.lock('landscape').catch(() => { });
          }
        }).catch(() => { });
      }
    }
  }, []);

  // Sync fullscreen state and unlock orientation on exit
  useEffect(() => {
    const onFSChange = () => {
      const inFS = !!(document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement);
      setIsVideoFullscreen(inFS);
      if (!inFS && screen.orientation?.unlock) {
        screen.orientation.unlock();
      }
    };
    document.addEventListener('fullscreenchange', onFSChange);
    document.addEventListener('webkitfullscreenchange', onFSChange);
    document.addEventListener('mozfullscreenchange', onFSChange);
    document.addEventListener('MSFullscreenChange', onFSChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFSChange);
      document.removeEventListener('webkitfullscreenchange', onFSChange);
      document.removeEventListener('mozfullscreenchange', onFSChange);
      document.removeEventListener('MSFullscreenChange', onFSChange);
    };
  }, []);

  // ESC key fallback
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsVideoFullscreen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const linkifyText = (text) => {
    if (!text) return null;

    // First, strip any HTML tags but preserve the text content
    const div = document.createElement('div');
    div.innerHTML = text;
    const cleanText = div.textContent || div.innerText || '';

    // Then linkify URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = cleanText.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-medium"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
          <button onClick={() => navigate('/dashboard')} className="text-indigo-600 hover:text-indigo-800">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentLesson = selectedLesson
    ? course.topics[selectedLesson.topicIndex]?.lessons[selectedLesson.lessonIndex]
    : null;

  // Debug video info
  if (currentLesson?.videoUrl) {
    console.log('[Video Debug] Original:', currentLesson.videoUrl);
    console.log('[Video Debug] Transformed:', getVideoUrl(currentLesson.videoUrl));
  }
  return (
    <div className="course-learning-container pt-48">
      {/* Success Message */}
      {showSuccessMessage && location.state?.message && (
        <div className="mb-6 animate-fade-in px-4">
          <div className={`rounded-2xl p-6 shadow-xl ${location.state.paymentSuccess
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300'
            : 'bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300'
            }`}>
            <div className="flex items-center gap-4">
              {location.state.paymentSuccess ? (
                <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">
                  {location.state.paymentSuccess ? '🎉 Payment Successful!' : '⚠️ Payment Issue'}
                </h3>
                <p className="text-gray-700">{location.state.message}</p>
                {location.state.reference && (
                  <p className="text-sm text-gray-600 mt-1">Reference: {location.state.reference}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <div className="learning-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={() => navigate('/dashboard')} className="back-button">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="back-text">Back to Dashboard</span>
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="curriculum-toggle-btn"
              aria-label="Toggle curriculum"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="toggle-text">Curriculum</span>
            </button>
          </div>

          <h1 className="course-title">{course.title}</h1>

          <div className="progress-info">
            <span className="progress-text">{calculateProgress()}% Complete</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${calculateProgress()}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="learning-content">
        {/* Sidebar - Curriculum */}
        <div className={`curriculum-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h2>Course Curriculum</h2>
            <button
              className="close-sidebar-btn"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close curriculum"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p className="text-sm text-gray-500">
              {completedLessons.length} / {course.topics?.reduce((acc, t) => acc + (t.lessons?.length || 0), 0)} lessons
            </p>
          </div>

          <div className="topics-list">
            {course.topics && course.topics.map((topic, topicIndex) => (
              <div key={topicIndex} className="topic-item">
                <div
                  className="topic-header"
                  onClick={() => toggleTopic(topicIndex)}
                >
                  <div className="topic-info">
                    <svg
                      className={`chevron ${expandedTopics.includes(topicIndex) ? 'expanded' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="topic-title">{topic.title}</span>
                  </div>
                  <span className="lesson-count">{topic.lessons?.length || 0} lessons</span>
                </div>

                {expandedTopics.includes(topicIndex) && topic.lessons && (
                  <div className="lessons-list">
                    {topic.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = isLessonCompleted(topicIndex, lessonIndex);
                      const isSelected = selectedLesson?.topicIndex === topicIndex &&
                        selectedLesson?.lessonIndex === lessonIndex;

                      return (
                        <div
                          key={lessonIndex}
                          className={`lesson-item ${isSelected ? 'selected' : ''} ${isCompleted ? 'completed' : ''}`}
                          onClick={() => selectLesson(topicIndex, lessonIndex)}
                        >
                          <div className="lesson-checkbox">
                            {isCompleted ? (
                              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <div className="checkbox-empty"></div>
                            )}
                          </div>
                          <div className="lesson-info">
                            <span className="lesson-name">{lesson.name}</span>
                            {lesson.videoUrl && (
                              <svg className="w-4 h-4 text-red-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                              </svg>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area - Lesson Display */}
        <div className="lesson-content">
          {currentLesson ? (
            <>
              <div className="lesson-header">
                <h2 className="lesson-title">{currentLesson.name}</h2>
                <button
                  onClick={() => toggleLessonCompletion(selectedLesson.topicIndex, selectedLesson.lessonIndex)}
                  className={`complete-button ${isLessonCompleted(selectedLesson.topicIndex, selectedLesson.lessonIndex) ? 'completed' : ''}`}
                >
                  {isLessonCompleted(selectedLesson.topicIndex, selectedLesson.lessonIndex) ? (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Mark as Complete</span>
                    </>
                  )}
                </button>
              </div>

              {/* Video Player */}
              {currentLesson.videoUrl && (
                <div
                  className={`video-wrapper ${isVideoFullscreen ? 'video-wrapper--fullscreen' : ''}`}
                  ref={playerWrapperRef}
                >
                  <iframe
                    src={convertToEmbedUrl(currentLesson.videoUrl)}
                    title={currentLesson.name}
                    loading="lazy"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    className="video-iframe"
                  ></iframe>

                  {/* Corner interceptor: only catches taps on the bottom-right corner 
                      (where the YouTube fullscreen button usually is) on mobile. */}
                  <div
                    className="video-corner-interceptor"
                    onClick={handleFullscreen}
                    aria-label="Expand video"
                  />

                  {/* Fullscreen toggle button — same icon on ALL devices */}
                  <button
                    className="video-fullscreen-btn"
                    onClick={handleFullscreen}
                    aria-label={isVideoFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    title={isVideoFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  >
                    {isVideoFullscreen ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                      </svg>
                    )}
                  </button>
                </div>
              )}

              {/* Debug: Show if no video URL */}
              {!currentLesson.videoUrl && (
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800 font-semibold">⚠️ No video URL found for this lesson</p>
                  <p className="text-sm text-yellow-700 mt-1">Please add a video URL in the admin dashboard</p>
                </div>
              )}

              {/* Lesson Description */}
              {currentLesson.description && (
                <div className="lesson-description">
                  <h3>Lesson Description</h3>
                  <div className="description-content" dangerouslySetInnerHTML={{ __html: formatDescription(currentLesson.description) }} />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="lesson-navigation">
                <button
                  onClick={goToPreviousLesson}
                  disabled={selectedLesson.topicIndex === 0 && selectedLesson.lessonIndex === 0}
                  className="nav-button prev"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous Lesson</span>
                </button>

                <button
                  onClick={goToNextLesson}
                  disabled={
                    selectedLesson.topicIndex === course.topics.length - 1 &&
                    selectedLesson.lessonIndex === course.topics[course.topics.length - 1].lessons.length - 1
                  }
                  className="nav-button next"
                >
                  <span>Next Lesson</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className="no-lesson-selected">
              <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-gray-500 text-lg">Select a lesson from the curriculum to start learning</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseLearning;
