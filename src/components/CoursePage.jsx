import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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
        console.error('Course not found');
        navigate('/courses');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching course:', error);
      setLoading(false);
    }
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24">
        <div className="max-w-4xl mx-auto px-4 text-center py-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Course Not Found</h2>
          <button 
            onClick={() => navigate('/courses')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const totalLessons = course.topics?.reduce((acc, topic) => acc + (topic.lessons?.length || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <button 
              onClick={() => navigate('/courses')}
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              All Courses
            </button>
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-gray-900 font-semibold truncate max-w-md">{course.title}</span>
          </nav>
        </div>
      </div>

      {/* Intro Video Section - Clean & Professional */}
      {course.introVideoUrl && (
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Video Container */}
            <div className="relative">
              {/* Subtle Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl"></div>
              
              {/* Main Video Card */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-3 shadow-2xl">
                {/* Video Player */}
                <div className="relative w-full bg-black rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                  {!isVideoPlaying ? (
                    // Thumbnail View with Play Button
                    <div 
                      className="absolute inset-0 cursor-pointer group"
                      onClick={() => setIsVideoPlaying(true)}
                    >
                      {/* Thumbnail Image */}
                      <img 
                        src={`https://img.youtube.com/vi/${getYouTubeVideoId(course.introVideoUrl)}/maxresdefault.jpg`}
                        alt="Course Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${getYouTubeVideoId(course.introVideoUrl)}/hqdefault.jpg`;
                        }}
                      />
                      
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300"></div>
                      
                      {/* Play Button - Centered */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* Outer Pulse Ring */}
                        <div className="absolute w-32 h-32 bg-red-600/30 rounded-full animate-ping"></div>
                        
                        {/* Play Button */}
                        <button className="relative w-24 h-24 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                          <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                          </svg>
                        </button>
                      </div>
                      
                      {/* Info Badge - Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                        <div className="text-center">
                          <p className="text-white text-xl font-bold mb-2">Watch Course Preview</p>
                          <p className="text-gray-300 text-sm flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd"/>
                            </svg>
                            Click to play with sound
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // YouTube Player
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(course.introVideoUrl)}?autoplay=1&mute=0&rel=0&modestbranding=1&controls=1`}
                      title={course.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Title and Stats */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100">
              <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{course.title}</h1>
              
              {/* Stats Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-indigo-100 px-5 py-3 rounded-xl border border-indigo-200 shadow-sm">
                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                  </svg>
                  <span className="font-bold text-indigo-900">{course.topics?.length || 0}</span>
                  <span className="text-indigo-700">Topics</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-purple-100 px-5 py-3 rounded-xl border border-purple-200 shadow-sm">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-bold text-purple-900">{totalLessons}</span>
                  <span className="text-purple-700">Lessons</span>
                </div>
                {course.courseDurationMonths > 0 && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-100 px-5 py-3 rounded-xl border border-green-200 shadow-sm">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-bold text-green-900">{course.courseDurationMonths}</span>
                    <span className="text-green-700">{course.courseDurationMonths === 1 ? 'Month' : 'Months'}</span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>

              {/* Course Description */}
              {course.description && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                    <span className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></span>
                    About This Course
                  </h2>
                  <div 
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                </div>
              )}
            </div>

            {/* What You Will Learn */}
            {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
              <div className="bg-gradient-to-br from-white to-indigo-50 rounded-3xl shadow-xl p-8 lg:p-10 border border-indigo-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-2xl shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900">What You'll Learn</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.whatYouWillLearn.map((item, idx) => (
                    <div key={idx} className="group flex items-start gap-4 bg-white p-5 rounded-2xl border border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-300">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-gray-800 font-medium leading-relaxed flex-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Target Audience */}
            {course.targetAudience && course.targetAudience.length > 0 && (
              <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-xl p-8 lg:p-10 border border-purple-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-2xl shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900">Who This Course Is For</h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {course.targetAudience.map((item, idx) => (
                    <div key={idx} className="group flex items-start gap-4 bg-white p-5 rounded-2xl border border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-gray-800 font-medium leading-relaxed flex-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Materials and Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Materials Included */}
              {course.materialsIncluded && course.materialsIncluded.length > 0 && (
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl shadow-lg p-6 lg:p-8 border border-blue-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-2.5 rounded-xl shadow-md">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd"/>
                        <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Materials Included</h3>
                  </div>
                  <ul className="space-y-3">
                    {course.materialsIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {course.requirements && course.requirements.length > 0 && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-lg p-6 lg:p-8 border border-amber-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-2.5 rounded-xl shadow-md">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Requirements</h3>
                  </div>
                  <ul className="space-y-3">
                    {course.requirements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Course Curriculum */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-br from-indigo-600 to-blue-600 p-3 rounded-2xl shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                  </svg>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900">Course Curriculum</h2>
              </div>
              {course.topics && course.topics.length > 0 ? (
                <div className="space-y-5">
                  {course.topics.map((topic, topicIdx) => (
                    <div key={topicIdx} className="group border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
                      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                            {topicIdx + 1}
                          </div>
                          <h3 className="font-bold text-gray-900 text-xl flex-1">{topic.title}</h3>
                          <span className="text-sm font-semibold text-indigo-600 bg-white px-4 py-2 rounded-full border border-indigo-200 shadow-sm">
                            {topic.lessons?.length || 0} {(topic.lessons?.length || 0) === 1 ? 'lesson' : 'lessons'}
                          </span>
                        </div>
                      </div>
                      {topic.lessons && topic.lessons.length > 0 && (
                        <div className="bg-white p-6">
                          <ul className="space-y-3">
                            {topic.lessons.map((lesson, lessonIdx) => (
                              <li key={lessonIdx} className="group/lesson flex items-start gap-4 p-4 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all duration-300 border border-transparent hover:border-indigo-100">
                                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-sm group-hover/lesson:scale-110 transition-transform">
                                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                  </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-gray-900 mb-1">{lesson.name}</div>
                                  {lesson.description && (
                                    <p className="text-sm text-gray-600 leading-relaxed">{lesson.description}</p>
                                  )}
                                </div>
                                {lesson.videoUrl && (
                                  <div className="flex-shrink-0 flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
                                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                                    </svg>
                                    <span className="text-xs font-semibold text-red-700">Video</span>
                                  </div>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg font-medium italic">Curriculum coming soon...</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Enrollment Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl shadow-2xl p-8 border-2 border-indigo-100 hover:border-indigo-200 transition-all duration-300">
              {/* Price Section */}
              <div className="text-center mb-8 pb-8 border-b-2 border-gray-100">
                {course.pricingModel === 'paid' ? (
                  <div>
                    <div className="text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                      ₦{course.price}
                    </div>
                    <p className="text-gray-600 font-medium">One-time payment • Lifetime access</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-3">
                      FREE
                    </div>
                    <p className="text-gray-600 font-medium">Start learning today • No credit card</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-5 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-2 text-lg">
                  <span>Enroll Now</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>

                <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                  </svg>
                  <span>Add to Wishlist</span>
                </button>
              </div>

              {/* Money Back Guarantee Badge */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4 mb-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-bold text-green-800">30-Day Money-Back Guarantee</span>
                </div>
                <p className="text-sm text-green-700">Full refund if you're not satisfied</p>
              </div>

              {/* Course Includes */}
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 mb-5 text-lg">This course includes:</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                    <svg className="w-6 h-6 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">{totalLessons} video lessons</div>
                      <div className="text-sm text-gray-600">On-demand content</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
                    <svg className="w-6 h-6 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">Downloadable resources</div>
                      <div className="text-sm text-gray-600">Files & materials</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">Full lifetime access</div>
                      <div className="text-sm text-gray-600">Learn at your pace</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">Mobile & desktop</div>
                      <div className="text-sm text-gray-600">Access anywhere</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                    <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">Certificate of completion</div>
                      <div className="text-sm text-gray-600">Shareable credential</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
