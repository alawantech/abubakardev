import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CoursePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { plan, userId, customerName, customerEmail, customerPhone } = location.state || {};
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    } else {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

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

  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: `COURSE-${courseId}-${Date.now()}`,
    amount: plan?.amount || 0,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: customerEmail,
      phone_number: customerPhone,
      name: customerName,
    },
    customizations: {
      title: plan?.courseName || 'Course Enrollment',
      description: `${plan?.type === 'monthly' ? 'Monthly Payment' : 'One-Time Payment'} for ${plan?.courseName}`,
      logo: 'https://your-logo-url.com/logo.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayNow = () => {
    handleFlutterPayment({
      callback: async (response) => {
        console.log('=== FULL PAYMENT RESPONSE ===');
        console.log('Response object:', response);
        console.log('Response status:', response.status);
        console.log('Response transaction_id:', response.transaction_id);
        console.log('Response amount:', response.amount);
        console.log('============================');
        
        closePaymentModal();
        
        // Check if payment was successful (could be "successful", "success", or other variations)
        const isSuccessful = response.status === 'successful' || 
                            response.status === 'success' ||
                            response.status === 'completed';
        
        if (isSuccessful) {
          // Verify payment with Cloud Function
          try {
            const functionUrl = import.meta.env.VITE_FIREBASE_FUNCTIONS_URL || 
                               `https://us-central1-${import.meta.env.VITE_FIREBASE_PROJECT_ID}.cloudfunctions.net/verifyPayment`;
            
            console.log('Verifying payment with:', functionUrl);
            console.log('Payment data:', {
              transaction_id: response.transaction_id,
              expected_amount: plan.amount,
              courseId: courseId,
            });

            const verificationResponse = await fetch(functionUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                transaction_id: response.transaction_id,
                expected_amount: plan.amount,
                courseId: courseId,
                courseName: plan.courseName,
                customerEmail: customerEmail,
                customerName: customerName,
                customerPhone: customerPhone,
              }),
            });

            console.log('Verification response status:', verificationResponse.status);
            
            const verificationData = await verificationResponse.json();
            console.log('Verification data:', verificationData);

            if (verificationData.success) {
              // Payment verified successfully - redirect directly to dashboard
              navigate(`/course/${courseId}/dashboard`, {
                state: {
                  paymentSuccess: true,
                  message: 'Payment successful! You are now enrolled in the course.'
                }
              });
            } else {
              // Show error in UI instead of alert
              navigate(`/course/${courseId}/dashboard`, {
                state: {
                  paymentSuccess: false,
                  message: 'Payment verification failed: ' + (verificationData.message || 'Unknown error'),
                  reference: response.transaction_id
                }
              });
              console.error('Verification failed:', verificationData);
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            // Show error in dashboard instead of alert
            navigate(`/course/${courseId}/dashboard`, {
              state: {
                paymentSuccess: false,
                message: 'Payment successful on Flutterwave, but verification failed. Please contact support.',
                reference: response.transaction_id,
                error: error.message
              }
            });
          }
        } else {
          console.error('Payment not successful. Full response:', response);
          // Don't navigate if payment failed - user can retry
          console.log('Payment failed with status:', response.status);
        }
      },
      onClose: () => {
        console.log('Payment modal closed');
      },
    });
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24">
        <div className="max-w-4xl mx-auto px-4 text-center py-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">No Payment Plan Found</h2>
          <p className="text-gray-600 mb-6">Please start from the beginning</p>
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">You're one step away from starting your learning journey!</p>
        </div>

        {/* Payment Summary Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Summary</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Course:</span>
              <span className="font-semibold text-gray-900">{plan.courseName}</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Student Name:</span>
              <span className="font-semibold text-gray-900">{customerName}</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Email:</span>
              <span className="font-semibold text-gray-900">{customerEmail}</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Payment Plan:</span>
              <span className="font-semibold text-gray-900">
                {plan.type === 'monthly' ? 'Monthly Payment' : 'One-Time Payment'}
              </span>
            </div>

            {plan.type === 'monthly' && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> You will be charged ₦6,500 every month for 6 months. Total: ₦39,000
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4">
              <span className="text-xl font-bold text-gray-900">Amount to Pay Now:</span>
              <span className="text-4xl font-extrabold text-indigo-600">
                ₦{plan.amount.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={handlePayNow}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-3 text-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Pay Now - ₦{plan.amount.toLocaleString()}</span>
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            🔒 Secure payment powered by Flutterwave
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            What Happens Next?
          </h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span>Click "Pay Now" to proceed to secure payment gateway</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span>Complete payment using your preferred method (Card, Mobile Money, USSD)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <span>Once payment is verified, you'll be redirected to your course dashboard</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <span>Start learning immediately - You'll have 12 months total access!</span>
            </li>
          </ol>
        </div>

        {/* Warning */}
        <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-900 text-center font-semibold">
            ⚠️ All payments are non-refundable. Please ensure all details are correct before proceeding.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursePayment;
