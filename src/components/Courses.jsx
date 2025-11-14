import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    // Scroll to top when component mounts
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Spacer for fixed header */}
        <div className="h-32"></div>
        <div className="flex flex-col items-center justify-center min-h-[60vh] pt-16">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin animation-delay-200"></div>
          </div>
          <p className="mt-8 text-xl text-gray-700 font-semibold animate-pulse">Discovering amazing courses...</p>
          <div className="mt-4 flex space-x-2">
            <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce animation-delay-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Spacer for fixed header */}
      <div className="h-32"></div>

      {/* Courses Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {courses.length === 0 ? (
          <div className="text-center py-24 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100">
            <div className="text-8xl mb-8 animate-bounce">📚</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">No Courses Found</h2>
            <p className="text-xl text-gray-600 mb-8">Try adjusting your search or browse all categories</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Refresh Page
            </button>
          </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => {
                const totalLessons = course.topics?.reduce((acc, topic) => acc + (topic.lessons?.length || 0), 0) || 0;

                return (
                  <div
                    key={course.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 hover:-translate-y-1 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Course Image */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
                      <div
                        className="relative w-full h-full cursor-pointer group/image"
                        onClick={() => handleViewCourse(course.id)}
                      >
                        {course.featuredImage ? (
                          <img
                            src={course.featuredImage}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-6xl group-hover:scale-110 transition-transform duration-300">📚</span>
                          </div>
                        )}

                        {/* Price Badge */}
                        <div className="absolute top-4 right-4">
                          {course.pricingModel === 'paid' ? (
                            <div className="relative">
                              {/* Price Background Glow */}
                              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-2xl blur-xl transform scale-110"></div>
                              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-2xl font-bold text-sm shadow-xl border-2 border-white/20">
                                <div className="text-center">
                                  <div className="text-lg leading-none">₦6,500</div>
                                  <div className="text-xs opacity-90 font-medium">per month</div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg">
                              FREE
                            </span>
                          )}
                        </div>

                        {/* Category Badge */}
                        {course.category && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-medium uppercase tracking-wide">
                              {course.category}
                            </span>
                          </div>
                        )}

                        {/* Subtle Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      {/* Course Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
                        {course.title}
                      </h3>

                      {/* Course Description */}
                      {course.description && (
                        <div
                          className="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: course.description.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
                          }}
                        />
                      )}

                      {/* Course Stats */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-lg">
                            <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                            </svg>
                            <span className="font-semibold text-indigo-700 text-sm">{course.topics?.length || 0} Topics</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-purple-50 px-3 py-1.5 rounded-lg">
                            <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                            </svg>
                            <span className="font-semibold text-purple-700 text-sm">{totalLessons} Lessons</span>
                          </div>
                        </div>
                      </div>

                      {/* Professional Action Button */}
                      <button
                        onClick={() => handleViewCourse(course.id)}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] hover:-translate-y-0.5 relative overflow-hidden group/button cursor-pointer"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span>View Course Details</span>
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-700"></div>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
    </div>
  );
};

export default Courses;
