import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import './CoursePage.css';

// Helper function to convert URLs in text to clickable links
const linkifyText = (text) => {
  if (!text) return null;
  
  // Regular expression to detect URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  
  const parts = text.split(urlRegex);
  
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

  // Flutterwave Payment Configuration
  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: `COURSE-${courseId}-${Date.now()}`,
    amount: course?.price || 0,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: customerEmail,
      phone_number: customerPhone,
      name: customerName,
    },
    customizations: {
      title: course?.title || 'Course Enrollment',
      description: `Enrollment for ${course?.title}`,
      logo: 'https://your-logo-url.com/logo.png', // Add your logo URL
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleEnrollClick = () => {
    // Redirect to pricing page
    navigate(`/course/${courseId}/pricing`);
  };

  const initiatePayment = () => {
    if (!customerEmail || !customerName || !customerPhone) {
      alert('Please fill in all required fields');
      return;
    }

    handleFlutterPayment({
      callback: async (response) => {
        console.log('Payment response:', response);
        closePaymentModal();
        
        if (response.status === 'successful') {
          // Verify payment with Firebase Cloud Function
          try {
            const functionUrl = import.meta.env.VITE_FIREBASE_FUNCTIONS_URL || 
                               `https://us-central1-${import.meta.env.VITE_FIREBASE_PROJECT_ID}.cloudfunctions.net/verifyPayment`;
            
            const verificationResponse = await fetch(functionUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                transaction_id: response.transaction_id,
                expected_amount: course.price,
                courseId: courseId,
                courseName: course.title,
                customerEmail: customerEmail,
                customerName: customerName,
                customerPhone: customerPhone,
              }),
            });

            const verificationData = await verificationResponse.json();

            if (verificationData.success) {
              alert('🎉 Payment successful! You are now enrolled in the course.');
              setShowPaymentModal(false);
              // Redirect to course content
              // navigate(`/my-courses`);
            } else {
              alert('Payment verification failed. Please contact support with reference: ' + response.transaction_id);
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Payment was successful, but there was an error. Please contact support with reference: ' + response.transaction_id);
          }
        } else {
          alert('Payment was not successful. Please try again.');
        }
      },
      onClose: () => {
        console.log('Payment modal closed');
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-32">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-32">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50" style={{ paddingTop: '120px' }}>
      {/* Breadcrumb Navigation */}
      <div className="bg-gradient-to-r from-white to-gray-50 shadow-lg border-b-2 border-indigo-100 pb-8">
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

      {/* Professional Video Section */}
      {course.introVideoUrl && (
        <div className="relative pt-20 pb-32 bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-400"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white font-semibold">Course Preview</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                See What You'll Learn
              </h2>
              <p className="text-xl text-gray-300 w-full mx-auto text-center">
                Watch our comprehensive course preview to understand the learning journey ahead
              </p>
            </div>

            {/* Video Player Container - Centered */}
            <div className="flex justify-center w-full">
              <div className="relative w-full max-w-5xl">
                {/* Glow Effect */}
                <div className="absolute -inset-8 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-75"></div>

                {/* Main Video Card */}
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
                  {/* Video Aspect Ratio Container */}
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    {/* Embedded YouTube Player */}
                    <div className="absolute inset-0 bg-black rounded-t-3xl overflow-hidden shadow-2xl">
                      <iframe
                        className="absolute inset-0 w-full h-full rounded-t-3xl"
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(course.introVideoUrl)}?rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`}
                        title={`${course.title} - Course Preview`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>

                  {/* Video Info Bar */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-300">
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                          </svg>
                          <span className="font-medium">Video Preview</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {totalLessons} lessons • {course.topics?.length || 0} modules
                        </div>
                      </div>
                      <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <span className="text-sm font-medium">HD Preview</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="max-w-4xl mx-auto space-y-8">
            {/* Course Title and Stats */}
            <div className="bg-gradient-to-br from-white to-indigo-50 rounded-3xl shadow-2xl p-8 lg:p-10 border border-indigo-200">
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
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 lg:p-10 border border-indigo-200">
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
                                  {lesson.description && !lesson.description.includes('<p>htmlkjfjkf</p><p>rady.ng</p>') && (
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                      {linkifyText(lesson.description)}
                                    </p>
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
        </div>

          {/* Professional Enrollment Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Main Enrollment Card */}
              <div className="relative bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 rounded-3xl shadow-2xl border-2 border-indigo-200/50 hover:border-indigo-300/70 transition-all duration-500 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-6 right-6 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-6 left-6 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-xl"></div>
                </div>

                <div className="relative p-8 lg:p-10">
                  {/* Header Badge */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full border border-indigo-200/50 mb-6">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-indigo-700">Limited Time Offer</span>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="text-center mb-10">
                    {course.pricingModel === 'paid' ? (
                      <div className="relative">
                        {/* Price Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl transform scale-110"></div>
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-indigo-200/30 shadow-xl">
                          <div className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                            ₦6500
                          </div>
                          <div className="text-lg font-semibold text-indigo-700 mb-2">per month</div>
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            <span>One-time payment • Lifetime access</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-2xl transform scale-110"></div>
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-green-200/30 shadow-xl">
                          <div className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-4">
                            FREE
                          </div>
                          <div className="text-lg font-semibold text-green-700 mb-2">Start Learning Today</div>
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            <span>No credit card required</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button
                      onClick={handleEnrollClick}
                      className="group relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-indigo-500/25 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                    >
                      {/* Button Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative flex items-center justify-center gap-3">
                        <span className="text-lg">Enroll Now</span>
                        <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </button>

                    <button className="group w-full bg-white/80 hover:bg-white/90 backdrop-blur-sm text-gray-800 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 border-2 border-gray-200/50 hover:border-gray-300/70 shadow-lg hover:shadow-xl transform hover:scale-102 flex items-center justify-center gap-3">
                      <svg className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                      </svg>
                      <span>Add to Wishlist</span>
                    </button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="mt-8 pt-6 border-t border-gray-200/50">
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span>Secure Payment</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                        <span>Instant Access</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn">
            <button 
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Enrollment</h3>
              <p className="text-gray-600">Enter your details to proceed with payment</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6 border-2 border-indigo-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Amount to Pay:</span>
                <span className="text-2xl font-bold text-indigo-600">
                  ₦{course.price?.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={initiatePayment}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Proceed to Payment</span>
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              🔒 Secure payment powered by Flutterwave
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
