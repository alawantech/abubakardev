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

      // User registration successful - enrollment plan will be created after payment
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Spacer for fixed header */}
        <div className="h-36"></div>
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Spacer for fixed header */}
      <div className="h-36"></div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-indigo-200/50 mb-8 shadow-lg">
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-indigo-700 font-semibold">🚀 Start Your Learning Journey</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Join the <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Course</span>
          </h1>

          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create your account and get instant access to <span className="font-bold text-indigo-600">{plan.courseName}</span> with lifetime learning opportunities
          </p>

          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-3xl font-bold text-lg shadow-2xl border-2 border-white/20">
            <span className="text-2xl">💎</span>
            <span>One-Time Investment: ₦49,000</span>
            <span className="text-sm opacity-90">(Lifetime Access)</span>
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/50 overflow-hidden">
          {/* Form Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50 rounded-3xl"></div>

          <div className="relative">
            {error && (
              <div className="mb-10 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 text-red-800 px-8 py-6 rounded-3xl font-semibold shadow-lg flex items-start gap-4 animate-fadeIn">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Oops! Something went wrong</h4>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                {/* Full Name Field */}
                <div className="group">
                  <label className="flex items-center gap-3 text-lg font-bold text-gray-800 mb-4 group-focus-within:text-indigo-600 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center group-focus-within:from-indigo-200 group-focus-within:to-purple-200 transition-all">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full pl-6 pr-6 py-5 border-2 border-gray-200 rounded-3xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-xl"
                      placeholder="Enter your full name"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-indigo-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity animate-pulse"></div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="flex items-center gap-3 text-lg font-bold text-gray-800 mb-4 group-focus-within:text-indigo-600 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-focus-within:from-blue-200 group-focus-within:to-indigo-200 transition-all">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-6 pr-6 py-5 border-2 border-gray-200 rounded-3xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-xl"
                      placeholder="your.email@example.com"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity animate-pulse"></div>
                  </div>
                </div>

                {/* WhatsApp Field */}
                <div className="group">
                  <label className="flex items-center gap-3 text-lg font-bold text-gray-800 mb-4 group-focus-within:text-indigo-600 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center group-focus-within:from-green-200 group-focus-within:to-emerald-200 transition-all">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    WhatsApp Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      required
                      className="w-full pl-6 pr-6 py-5 border-2 border-gray-200 rounded-3xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-xl"
                      placeholder="+234 800 000 0000"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity animate-pulse"></div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="group">
                  <label className="flex items-center gap-3 text-lg font-bold text-gray-800 mb-4 group-focus-within:text-indigo-600 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center group-focus-within:from-purple-200 group-focus-within:to-pink-200 transition-all">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
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
                      className="w-full pl-6 pr-14 py-5 border-2 border-gray-200 rounded-3xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-xl"
                      placeholder="Minimum 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors p-1"
                    >
                      {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity animate-pulse"></div>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="group">
                  <label className="flex items-center gap-3 text-lg font-bold text-gray-800 mb-4 group-focus-within:text-indigo-600 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center group-focus-within:from-pink-200 group-focus-within:to-rose-200 transition-all">
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full pl-6 pr-14 py-5 border-2 border-gray-200 rounded-3xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-xl"
                      placeholder="Re-enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors p-1"
                    >
                      {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-pink-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity animate-pulse"></div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="border-t-2 border-gray-200 pt-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-6 h-6 text-indigo-600 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 cursor-pointer opacity-0 absolute"
                      />
                      <div className={`w-6 h-6 border-2 border-gray-300 rounded-lg flex items-center justify-center transition-all ${agreedToTerms ? 'bg-indigo-600 border-indigo-600' : 'bg-white'}`}>
                        {agreedToTerms && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <label htmlFor="terms" className="text-base text-gray-700 cursor-pointer leading-relaxed">
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={() => setShowTerms(true)}
                        className="text-indigo-600 hover:text-indigo-700 font-bold underline decoration-2 underline-offset-2 transition-colors cursor-pointer"
                      >
                        Terms and Conditions
                      </button>
                      {' '}*
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !agreedToTerms}
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-6 px-8 rounded-3xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-4 text-xl shadow-xl border-2 border-white/20 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Your Account...</span>
                    </>
                  ) : (
                    <>
                      <span>🚀 Create Account & Start Learning</span>
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-8 pt-8 border-t-2 border-gray-200 text-center">
              <p className="text-gray-600 text-lg">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline decoration-2 underline-offset-2 transition-colors"
                >
                  Login Here
                </Link>
              </p>
            </div>
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
