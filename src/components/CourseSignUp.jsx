import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const CourseSignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    whatsappNumber: '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!agreedToTerms) {
      setError('You must agree to the terms and conditions');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.whatsappNumber.length < 10) {
      setError('Please enter a valid WhatsApp number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        whatsappNumber: formData.whatsappNumber,
        role: 'student',
        createdAt: serverTimestamp(),
        uid: user.uid,
      });

      // Save enrollment plan to Firestore
      await setDoc(doc(db, 'enrollmentPlans', user.uid), {
        userId: user.uid,
        courseId: plan.courseId,
        courseName: plan.courseName,
        planType: plan.type,
        planAmount: plan.amount,
        paymentStatus: 'pending',
        createdAt: serverTimestamp(),
      });

      console.log('User registered successfully');
      
      // Redirect to payment page with user and plan info
      navigate(`/course/${plan.courseId}/payment`, {
        state: {
          plan: plan,
          userId: user.uid,
          customerName: formData.fullName,
          customerEmail: formData.email,
          customerPhone: formData.whatsappNumber,
        },
      });
    } catch (error) {
      console.error('Error registering user:', error);
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please login instead.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Use at least 6 characters.');
          break;
        default:
          setError('Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-32">
        <div className="max-w-4xl mx-auto px-4 text-center py-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">No Plan Selected</h2>
          <p className="text-gray-600 mb-6">Please select a pricing plan first</p>
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-64 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-600 mb-4">Complete your enrollment for <span className="font-semibold text-indigo-600">{plan.courseName}</span></p>
          <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-semibold">
            {plan.type === 'monthly' ? 'Monthly Plan: ₦6,500/month' : 'One-Time Plan: ₦30,000'}
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="+234 800 000 0000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors pr-12"
                  placeholder="Minimum 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors pr-12"
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="border-t-2 border-gray-200 pt-6">
              <div className="flex items-start gap-3 mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 text-indigo-600 border-2 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold underline"
                  >
                    Terms and Conditions
                  </button>
                  {' '}*
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !agreedToTerms}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account & Proceed to Payment</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 pt-6 border-t-2 border-gray-200 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
              >
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowTerms(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowTerms(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h2>

            <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. Payment Terms</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Non-Refundable:</strong> All payments are 100% non-refundable. Once payment is completed, no refunds will be issued under any circumstances.</li>
                  <li><strong>Payment Plans:</strong> Choose between monthly payment (₦6,500/month for 6 months = ₦39,000 total) or one-time payment (₦30,000).</li>
                  <li><strong>Monthly Commitment:</strong> If selecting monthly plan, all 6 payments must be completed.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Course Access Duration</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Course Duration:</strong> Course is designed to be completed within 6 months.</li>
                  <li><strong>Grace Period:</strong> After completing payment, you get additional 6 months grace period (12 months total access).</li>
                  <li><strong>Access Expiration:</strong> After 12 months from enrollment date, access expires automatically regardless of completion status.</li>
                  <li><strong>No Extensions:</strong> Access period cannot be extended beyond 12 months.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Student Requirements</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Laptop Required:</strong> You MUST own a functional laptop/computer. Mobile devices alone are NOT sufficient for this programming course.</li>
                  <li><strong>English Comprehension:</strong> You must be able to READ, WRITE, and UNDERSTAND English language.</li>
                  <li><strong>Speaking Not Required:</strong> You don't need to speak English fluently, but you MUST understand written and spoken English.</li>
                  <li><strong>Why English?</strong> Programming requires English comprehension as all programming languages use English syntax and most documentation is in English.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">4. Course Language</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Instruction:</strong> Course videos and explanations are in Hausa language.</li>
                  <li><strong>Programming:</strong> Programming code and syntax are in English (international standard).</li>
                  <li><strong>Materials:</strong> Some course materials and documentation may be in English.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">5. Student Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintain functional laptop throughout course duration</li>
                  <li>Have stable internet connection for accessing lessons</li>
                  <li>Complete lessons and assignments within access period</li>
                  <li>Dedicate sufficient time for learning and practice</li>
                  <li>Complete all required projects and assessments</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">6. Certificate of Completion</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Certificate issued only upon successful completion of all requirements</li>
                  <li>Must complete course within 12-month access period</li>
                  <li>All assignments and projects must be submitted</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">7. Account Security</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your account is personal and cannot be shared with others</li>
                  <li>Keep login credentials secure and confidential</li>
                  <li>You are responsible for all activities on your account</li>
                  <li>Account sharing may result in immediate termination without refund</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">8. Acknowledgment</h3>
                <p className="text-gray-700 leading-relaxed">
                  By checking the "I agree" box and proceeding with registration and payment, you acknowledge that you have:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Read and understood all terms and conditions</li>
                  <li>Confirmed you own a laptop/computer</li>
                  <li>Confirmed you can read, write, and understand English</li>
                  <li>Understood that all payments are non-refundable</li>
                  <li>Accepted the 12-month access limitation</li>
                  <li>Agreed to complete the course within the given timeframe</li>
                </ul>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-gray-200 flex flex-col sm:flex-row justify-end gap-4">
              <button
                onClick={() => setShowTerms(false)}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setAgreedToTerms(true);
                  setShowTerms(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
              >
                I Agree to Terms
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSignUp;
