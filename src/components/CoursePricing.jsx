import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CoursePricing = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const courseDoc = await getDoc(doc(db, 'courses', courseId));
      if (courseDoc.exists()) {
        setCourse({ id: courseDoc.id, ...courseDoc.data() });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching course:', error);
      setLoading(false);
    }
  };

  const handleSelectPlan = (planType, amount) => {
    navigate(`/course/${courseId}/signup`, {
      state: {
        plan: {
          type: planType,
          amount: amount,
          courseId: courseId,
          courseName: course?.title
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Spacer for fixed header */}
        <div className="h-36"></div>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading pricing...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Spacer for fixed header */}
        <div className="h-36"></div>
        <div className="max-w-5xl mx-auto px-4 text-center py-20">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Spacer for fixed header */}
      <div className="h-36"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Payment Plan
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            for <span className="text-indigo-600 font-semibold">{course.title}</span>
          </p>
          <p className="text-gray-500">Course Duration: 6 months + 6 months grace period (12 months total access)</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Monthly Plan */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-200 hover:border-indigo-400 transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Monthly Payment</h3>
              <p className="text-indigo-100">Pay as you learn - Flexible option</p>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-extrabold text-gray-900">₦6,500</span>
                  <span className="text-xl text-gray-500">/month</span>
                </div>
                <p className="text-gray-600 font-medium">For 6 months</p>
                <p className="text-sm text-gray-500 mt-1">Total: ₦39,000</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Flexible Monthly Payment</p>
                    <p className="text-sm text-gray-600">Pay ₦6,500 every month for 6 months</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">12 Months Total Access</p>
                    <p className="text-sm text-gray-600">6 months learning + 6 months grace period</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Complete Course Access</p>
                    <p className="text-sm text-gray-600">All lessons, videos & materials</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Certificate of Completion</p>
                    <p className="text-sm text-gray-600">Upon finishing the course</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleSelectPlan('monthly', 6500)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
              >
                Select Monthly Plan
              </button>

              <p className="text-xs text-red-600 text-center mt-4 font-semibold">⚠️ Payment is non-refundable</p>
            </div>
          </div>

          {/* One-time Plan */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-green-400 relative transform hover:scale-105 transition-all duration-300">
            {/* Best Value Badge */}
            <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10 animate-pulse">
              SAVE ₦9,000!
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">One-Time Payment</h3>
              <p className="text-green-100">Best value - Save money!</p>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-extrabold text-gray-900">₦30,000</span>
                </div>
                <p className="text-gray-600 font-medium">One-time payment only</p>
                <div className="mt-3 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold">
                  💰 Save ₦9,000 compared to monthly plan
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">💰 Best Value - Save ₦9,000</p>
                    <p className="text-sm text-gray-600">Pay once, no monthly worries</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">12 Months Total Access</p>
                    <p className="text-sm text-gray-600">6 months learning + 6 months grace period</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Complete Course Access</p>
                    <p className="text-sm text-gray-600">All lessons, videos & materials</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Certificate of Completion</p>
                    <p className="text-sm text-gray-600">Upon finishing the course</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Peace of Mind</p>
                    <p className="text-sm text-gray-600">No recurring payments to worry about</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleSelectPlan('onetime', 30000)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 cursor-pointer"
              >
                Select One-Time Plan
              </button>

              <p className="text-xs text-red-600 text-center mt-4 font-semibold">⚠️ Payment is non-refundable</p>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="max-w-4xl mx-auto bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            Important Information
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Total Access:</strong> After payment, you get 6 months to complete the course + 6 months grace period (12 months total)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Access Expiry:</strong> After 12 months from enrollment, access will expire automatically</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Non-Refundable:</strong> All payments are non-refundable under any circumstances</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Language:</strong> Course instruction is in Hausa language</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoursePricing;
