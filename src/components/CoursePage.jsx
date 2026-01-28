import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { formatDescription } from "../utils/formatDescription";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaGraduationCap,
  FaClock,
  FaBook,
  FaCheckCircle,
  FaUsers,
  FaFolderOpen,
  FaExclamationTriangle,
  FaArrowLeft,
  FaAward,
  FaStar,
} from "react-icons/fa";
import "./CoursePage.css";

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const docRef = doc(db, "courses", courseId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCourse({ id: docSnap.id, ...docSnap.data() });
      } else {
        navigate("/courses");
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleEnrollClick = () => {
    navigate(`/course/${courseId}/signup`, {
      state: {
        plan: {
          courseId: courseId,
          courseName: course.title,
          pricing: course.pricing || { monthly: null, yearly: null },
        },
      },
    });
    setTimeout(
      () => window.scrollTo({ top: 0, left: 0, behavior: "instant" }),
      0,
    );
  };

  if (loading) {
    return (
      <div className="course-page-wrapper flex items-center justify-center">
        <div className="premium-spinner"></div>
      </div>
    );
  }

  if (!course) return null;

  const totalLessons =
    course.topics?.reduce(
      (acc, topic) => acc + (topic.lessons?.length || 0),
      0,
    ) || 0;

  // Choose display price according to admin settings (monthly/yearly/one-time)
  const getDisplayedPrice = () => {
    if (course.displayPricing === "monthly" && course.pricing?.monthly)
      return course.pricing.monthly;
    if (course.displayPricing === "yearly" && course.pricing?.yearly)
      return course.pricing.yearly;
    return course.price || 49000;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="course-page-wrapper">
      <div className="course-page-blob course-blob-1"></div>
      <div className="course-page-blob course-blob-2"></div>

      <div className="course-breadcrumb">
        <div className="max-w-7xl mx-auto px-6">
          <button
            onClick={() => navigate("/courses")}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Courses</span>
          </button>
        </div>
      </div>

      <motion.div
        className="course-page-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Single Column Layout */}
        <div className="course-single-column">
          {/* Header Section */}
          <motion.div variants={itemVariants} className="space-y-6 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold text-sm">
              <FaAward /> Featured Specialization
            </div>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight">
              {course.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                <span className="text-white font-bold">4.9</span> (2.4k reviews)
              </div>
              <div className="flex items-center gap-2">
                <FaUsers className="text-blue-500" />
                <span className="text-white font-semibold">12,450+</span>{" "}
                Enrolled students
              </div>
            </div>
          </motion.div>

          {/* Video Section */}
          {course.introVideoUrl &&
            (() => {
              const videoId = getYouTubeVideoId(course.introVideoUrl);
              if (!videoId) return null;

              const src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${videoId}`;

              return (
                <motion.div
                  variants={itemVariants}
                  className="video-container-premium mb-10"
                >
                  <div className="relative aspect-video">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={src}
                      title="Course Preview"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  <div className="video-info-bar-premium flex items-center justify-between">
                    <div className="flex items-center gap-4 text-slate-300">
                      <div className="flex items-center gap-2">
                        <FaBook className="text-blue-500" />
                        <span>{course.topics?.length || 0} Modules</span>
                      </div>
                    </div>
                    <div className="hidden sm:block text-xs font-bold text-slate-500 border border-slate-700 rounded px-2 py-1">
                      4K ULTRA HD
                    </div>
                  </div>
                </motion.div>
              );
            })()}

          {/* About Course */}
          <motion.div
            variants={itemVariants}
            className="course-content-card mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
              About this course
            </h2>
            <div
              className="prose prose-invert max-w-none text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: formatDescription(course.description),
              }}
            />
          </motion.div>

          {/* PRICING CARD - Below Video and Description */}
          <motion.div
            variants={itemVariants}
            className="pricing-card-section mb-12"
          >
            <div className="pricing-card-full">
              <div className="pricing-card-inner">
                <div className="pricing-card-left">
                  <div className="text-slate-400 text-sm font-bold mb-1">
                    FULL COURSE ACCESS
                  </div>
                  <div className="pricing-main-price">
                    ₦{getDisplayedPrice().toLocaleString()}
                    {course.displayPricing === "monthly" && (
                      <span className="pricing-per"> / month</span>
                    )}
                  </div>
                  <div className="text-slate-500 text-sm line-through">
                    ₦75,000
                  </div>
                </div>

                <div className="pricing-card-features">
                  <div className="flex items-center gap-2 text-slate-300">
                    <FaCheckCircle className="text-emerald-500" />
                    <span>Full course access</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <FaCheckCircle className="text-emerald-500" />
                    <span>Students get instant support</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <FaCheckCircle className="text-emerald-500" />
                    <span>Certificate of completion</span>
                  </div>
                </div>

                <button
                  onClick={handleEnrollClick}
                  className="pricing-enroll-btn"
                >
                  {course.displayPricing === "monthly"
                    ? "Enroll Now"
                    : "Enroll Now"}
                </button>
              </div>
            </div>
          </motion.div>

          {/* New Sections: What You Will Learn, Target Audience, etc. */}
          <div className="course-additional-info space-y-8 mb-12">
            {/* What Will Students Learn */}
            {course.whatYouWillLearn?.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="course-content-card"
              >
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                  What Will Students Learn?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.whatYouWillLearn.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-slate-300"
                    >
                      <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Target Audience */}
            {course.targetAudience?.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="course-content-card"
              >
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                  Target Audience
                </h2>
                <ul className="space-y-3">
                  {course.targetAudience.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-slate-300"
                    >
                      <div className="mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Materials Included */}
            {course.materialsIncluded?.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="course-content-card"
              >
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  Materials Included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {course.materialsIncluded.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-slate-300"
                    >
                      <FaFolderOpen className="text-purple-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Requirements/Instructions */}
            {course.requirements?.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="course-content-card"
              >
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                  Requirements/Instructions
                </h2>
                <ul className="space-y-3">
                  {course.requirements.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-slate-300"
                    >
                      <FaExclamationTriangle className="text-orange-500 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>

        {/* Universal Sticky Enroll Bar (Bottom) */}
        <div className="universal-enroll-bar">
          <div className="enroll-bar-container">
            <div className="enroll-bar-info">
              <div className="enroll-bar-price">
                <span className="price-now">
                  ₦{getDisplayedPrice().toLocaleString()}
                  {course.displayPricing === "monthly" ? " / month" : ""}
                </span>
                <span className="price-before">₦75,000</span>
              </div>
              <div className="enroll-bar-title hidden md:block">
                {course.title}
              </div>
            </div>
            <button onClick={handleEnrollClick} className="enroll-bar-btn">
              {course.displayPricing === "monthly"
                ? "Enroll Now"
                : "Enroll Now"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CoursePage;
