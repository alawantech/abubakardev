import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FaRocket, FaClock, FaBookOpen, FaStar, FaArrowRight } from 'react-icons/fa';
import { db } from '../firebase';
import './Courses.css';

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const fetchCourses = async () => {
    try {
      const q = query(collection(db, 'courses'), where('visibility', '==', 'public'));
      const querySnapshot = await getDocs(q);
      const coursesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(coursesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setLoading(false);
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
    }
  };

  if (loading) {
    return (
      <div className="courses-wrapper">
        <div className="courses-loading-container">
          <div className="premium-spinner"></div>
          <p className="mt-8 text-xl text-slate-400 font-medium">Loading Excellence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-wrapper">
      <div className="courses-blob blob-1"></div>
      <div className="courses-blob blob-2"></div>

      <div className="courses-container">
        <motion.div
          className="courses-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="courses-badge">Premium Learning</span>
          <h1 className="courses-title">Level Up Your <span className="highlight">Digital Skills</span></h1>
          <p className="courses-subtitle">
            Expert-led courses designed to transform you from a beginner to a high-earning professional in weeks.
          </p>
        </motion.div>

        {courses.length === 0 ? (
          <motion.div
            className="courses-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="empty-icon">📂</span>
            <h2 className="text-3xl font-bold mb-4">No Active Courses</h2>
            <p className="text-slate-400 mb-8">We're currently preparing new batches. Stay tuned!</p>
            <button onClick={() => navigate('/')} className="enroll-button-premium" style={{ maxWidth: '200px', margin: '0 auto' }}>
              Back Home
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="courses-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {courses.map((course) => {
              const totalLessons = course.topics?.reduce((acc, topic) => acc + (topic.lessons?.length || 0), 0) || 0;

              return (
                <motion.div
                  key={course.id}
                  className="course-card-premium"
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                >
                  <div className="course-image-area">
                    {course.featuredImage ? (
                      <img src={course.featuredImage} alt={course.title} className="course-img-main" />
                    ) : (
                      <div className="bg-slate-800 w-full h-full flex items-center justify-center text-4xl">📚</div>
                    )}
                    {course.category && (
                      <div className="course-category-tag">{course.category}</div>
                    )}
                  </div>

                  <div className="course-body">
                    <h3 className="course-card-title">{course.title}</h3>

                    {course.description && (
                      <p className="course-excerpt">
                        {course.description.replace(/<[^>]*>/g, '').substring(0, 110)}...
                      </p>
                    )}

                    <div className="course-meta">
                      <div className="meta-item">
                        <FaBookOpen />
                        <span>50+ Topics</span>
                      </div>
                      <div className="meta-item">
                        <FaClock />
                        <span>100+ Lessons</span>
                      </div>
                    </div>

                    <div className="course-footer">
                      <button
                        className="enroll-button-premium"
                        onClick={() => handleViewCourse(course.id)}
                      >
                        Learn More <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Courses;

