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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading amazing courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 animate-fade-in-up">
            🚀 Transform Your Career with Our Courses
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
            Master in-demand skills with expert-led courses designed to accelerate your success
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-white animate-fade-in-up animation-delay-400">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
              <span className="font-semibold">10,000+ Students</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="font-semibold">4.8/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="font-semibold">Certified Courses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
            <div className="text-6xl mb-6">📚</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Courses Available Yet</h2>
            <p className="text-lg text-gray-600">Check back soon for exciting new courses!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              const totalLessons = course.topics?.reduce((acc, topic) => acc + (topic.lessons?.length || 0), 0) || 0;
              
              return (
                <div key={course.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 hover:-translate-y-2">
                  {/* Course Image */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                    <div 
                      className="relative w-full h-full cursor-pointer group"
                      onClick={() => handleViewCourse(course.id)}
                    >
                      {course.featuredImage ? (
                        <img 
                          src={course.featuredImage} 
                          alt={course.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-7xl">📚</span>
                        </div>
                      )}
                      
                      {/* Price Badge */}
                      <div className="absolute top-4 right-4">
                        {course.pricingModel === 'paid' ? (
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg backdrop-blur-sm">
                            ₦{course.price}
                          </span>
                        ) : (
                          <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg backdrop-blur-sm">
                            FREE
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    {/* Course Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>

                    {/* Course Description */}
                    {course.description && (
                      <div 
                        className="text-gray-600 text-sm mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{ 
                          __html: course.description.replace(/<[^>]*>/g, '').substring(0, 120) + '...' 
                        }}
                      />
                    )}

                    {/* Course Stats */}
                    <div className="flex items-center gap-4 mb-5 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                        </svg>
                        <span className="font-medium">{course.topics?.length || 0} Topics</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-medium">{totalLessons} Lessons</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button 
                      onClick={() => handleViewCourse(course.id)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
                    >
                      View Full Details →
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
