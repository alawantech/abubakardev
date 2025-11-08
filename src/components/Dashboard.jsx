import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userData } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Check if redirected after successful payment
    if (location.state?.paymentSuccess) {
      setShowSuccessMessage(true);
      // Clear the state
      window.history.replaceState({}, document.title);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }

    if (currentUser) {
      fetchEnrollments();
    } else {
      navigate('/login', { state: { from: '/dashboard' } });
    }
  }, [currentUser, navigate, location.state]);

  const fetchEnrollments = async () => {
    try {
      // Fetch enrollments from Firestore
      const enrollmentsQuery = query(
        collection(db, 'enrollments'),
        where('customerEmail', '==', currentUser.email)
      );
      
      const enrollmentsSnapshot = await getDocs(enrollmentsQuery);
      
      const enrollmentsData = await Promise.all(
        enrollmentsSnapshot.docs.map(async (enrollmentDoc) => {
          const enrollmentData = enrollmentDoc.data();
          
          // Fetch course details
          const courseDoc = await getDoc(doc(db, 'courses', enrollmentData.courseId));
          const courseData = courseDoc.exists() ? courseDoc.data() : null;
          
          return {
            id: enrollmentDoc.id,
            ...enrollmentData,
            course: courseData,
          };
        })
      );
      
      setEnrollments(enrollmentsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      setLoading(false);
    }
  };

  const calculateDaysRemaining = (enrolledAt) => {
    if (!enrolledAt) return null;
    
    const enrollmentDate = enrolledAt.toDate();
    const expiryDate = new Date(enrollmentDate);
    expiryDate.setMonth(expiryDate.getMonth() + 12); // 12 months access
    
    const today = new Date();
    const daysRemaining = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    
    return {
      days: daysRemaining,
      expiryDate: expiryDate.toLocaleDateString(),
    };
  };

  if (!currentUser) {
    return null; // Will redirect in useEffect
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {showSuccessMessage && location.state?.message && (
          <div className="mb-8 animate-fade-in">
            <div className={`rounded-2xl p-6 shadow-xl ${
              location.state.paymentSuccess 
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

        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {userData?.fullName || currentUser.email}! 👋
          </h1>
          <p className="text-gray-600 text-lg">Track your progress and continue learning</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900">{enrollments.length}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">Active</p>
                <p className="text-3xl font-bold text-gray-900">
                  {enrollments.filter(e => {
                    const remaining = calculateDaysRemaining(e.enrolledAt);
                    return remaining && remaining.days > 0;
                  }).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">Certificates</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        {enrollments.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="inline-block p-6 bg-gray-100 rounded-full mb-6">
              <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No Courses Yet</h2>
            <p className="text-gray-600 mb-8 text-lg">Start your learning journey by enrolling in a course!</p>
            <button
              onClick={() => navigate('/courses')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Enrolled Courses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => {
                const remaining = calculateDaysRemaining(enrollment.enrolledAt);
                const isExpired = remaining && remaining.days <= 0;
                
                return (
                  <div
                    key={enrollment.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl"
                  >
                    {enrollment.course?.featuredImage && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={enrollment.course.featuredImage}
                          alt={enrollment.courseName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-2">
                        {enrollment.courseName}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                          </svg>
                          <span>Enrolled: {enrollment.enrolledAt?.toDate().toLocaleDateString()}</span>
                        </div>
                        
                        {remaining && (
                          <div className={`flex items-center gap-2 text-sm ${isExpired ? 'text-red-600' : 'text-green-600'}`}>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                            </svg>
                            <span>
                              {isExpired 
                                ? `Expired on ${remaining.expiryDate}` 
                                : `${remaining.days} days remaining`
                              }
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => navigate(`/course/${enrollment.courseId}`)}
                        disabled={isExpired}
                        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                          isExpired
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg'
                        }`}
                      >
                        {isExpired ? 'Access Expired' : 'Continue Learning →'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Browse More Courses */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center border-2 border-indigo-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Want to Learn More?</h3>
          <p className="text-gray-600 mb-6">Explore our catalog and enroll in more courses</p>
          <button
            onClick={() => navigate('/courses')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Browse All Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
