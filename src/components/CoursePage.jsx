import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { formatDescription } from '../utils/formatDescription';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaGraduationCap, FaClock, FaBook, FaCheckCircle, FaUsers, FaFolderOpen, FaExclamationTriangle, FaArrowLeft, FaAward, FaStar } from 'react-icons/fa';
import './CoursePage.css';

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const docRef = doc(db, 'courses', courseId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCourse({ id: docSnap.id, ...docSnap.data() });
      } else {
        navigate('/courses');
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleEnrollClick = () => {
    navigate(`/course/${courseId}/signup`, {
      state: {
        plan: {
          type: 'onetime',
          amount: 49000,
          courseId: courseId,
          courseName: course.title
        }
      }
    });
    setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 0);
  };

  if (loading) {
    return (
      <div className="course-page-wrapper flex items-center justify-center">
        <div className="premium-spinner"></div>
      </div>
    );
  }

  if (!course) return null;

  const totalLessons = course.topics?.reduce((acc, topic) => acc + (topic.lessons?.length || 0), 0) || 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="course-page-wrapper">
      <div className="course-page-blob course-blob-1"></div>
      <div className="course-page-blob course-blob-2"></div>

      <div className="course-breadcrumb">
        <div className="max-w-7xl mx-auto px-6">
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Courses</span>
          </button>
        </div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Header Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full background-rgba(59, 130, 246, 0.1) border border-blue-500/20 text-blue-400 font-semibold text-sm">
                <FaAward /> Featured Specialization
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight">
                {course.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-slate-400">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <span className="text-white font-bold">4.9</span> (2.4k reviews)
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-blue-500" />
                  <span className="text-white font-semibold">12,450+</span> Enrolled students
                </div>
              </div>
            </motion.div>

            {/* Video Section */}
            {course.introVideoUrl && (
              <motion.div variants={itemVariants} className="video-container-premium">
                <div className="relative aspect-video">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(course.introVideoUrl)}?rel=0&modestbranding=1`}
                    title="Course Preview"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="video-info-bar-premium flex items-center justify-between">
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="flex items-center gap-2">
                      <FaBook className="text-blue-500" />
                      <span>{course.topics?.length || 0} Modules</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-purple-500" />
                      <span>{totalLessons} Lessons</span>
                    </div>
                  </div>
                  <div className="hidden sm:block text-xs font-bold text-slate-500 border border-slate-700 rounded px-2 py-1">
                    4K ULTRA HD
                  </div>
                </div>
              </motion.div>
            )}

            {/* About Course */}
            <motion.div variants={itemVariants} className="course-content-card">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
                About this course
              </h2>
              <div
                className="prose prose-invert max-w-none text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatDescription(course.description) }}
              />
            </motion.div>

            {/* Curriculum */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-1.5 h-8 bg-purple-500 rounded-full"></div>
                Curriculum
              </h2>
              <div className="space-y-4">
                {course.topics?.map((topic, idx) => (
                  <div key={idx} className="topic-item-premium">
                    <div className="topic-header">
                      <h3 className="text-xl font-bold text-white">{topic.title}</h3>
                      <span className="text-slate-400 text-sm font-semibold">{topic.lessons?.length || 0} Lessons</span>
                    </div>
                    <div className="lesson-list">
                      {topic.lessons?.map((lesson, lIdx) => (
                        <div key={lIdx} className="lesson-item-premium">
                          <FaPlay className="text-blue-500 text-xs" />
                          <span>{lesson.title || `Lesson ${lIdx + 1}`}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              variants={itemVariants}
              className="sidebar-card-premium"
            >
              <div className="p-8 space-y-8">
                <div className="price-tag-premium">
                  <div className="text-slate-400 text-sm font-bold mb-2">FULL COURSE ACCESS</div>
                  <div className="price-value-premium">₦49,000</div>
                  <div className="text-slate-500 text-sm mt-2 line-through">₦75,000</div>
                </div>

                <div className="space-y-4">
                  <button onClick={handleEnrollClick} className="enroll-btn-premium">
                    Enroll Now
                  </button>
                  <p className="text-center text-slate-500 text-sm">
                    7-day money back guarantee
                  </p>
                </div>

                <div className="space-y-4 pt-8 border-t border-slate-700">
                  <div className="flex items-center gap-3 text-slate-300">
                    <FaCheckCircle className="text-emerald-500" />
                    <span>Full lifetime access</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <FaCheckCircle className="text-emerald-500" />
                    <span>Access on mobile and TV</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <FaCheckCircle className="text-emerald-500" />
                    <span>Certificate of completion</span>
                  </div>
                </div>

                {/* Requirements */}
                {course.requirements?.length > 0 && (
                  <div className="pt-8 border-t border-slate-700">
                    <h4 className="text-white font-bold mb-4">Requirements</h4>
                    <ul className="space-y-2">
                      {course.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-400 text-sm">
                          <div className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CoursePage;

