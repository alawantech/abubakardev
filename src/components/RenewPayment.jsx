import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowLeft,
  FaCreditCard,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaInfoCircle,
  FaRocket,
  FaCalendarAlt,
  FaCrown,
  FaHistory
} from 'react-icons/fa';
import './RenewPayment.css';

const RenewPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const fileInputRef = useRef(null);

  const [enrollments, setEnrollments] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(location.state?.courseId || '');
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bankDetails, setBankDetails] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    return () => {
      if (receiptPreview) {
        URL.revokeObjectURL(receiptPreview);
      }
    };
  }, [receiptPreview]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch all enrollment plans for this user and bank details in parallel
      const [plansSnapshot, bankDoc] = await Promise.all([
        getDocs(query(collection(db, 'enrollmentPlans'), where('userId', '==', currentUser.uid))),
        getDoc(doc(db, 'admin', 'bankDetails'))
      ]);

      if (bankDoc.exists()) {
        setBankDetails(bankDoc.data());
      } else {
        // Fallback bank details if doc doesn't exist
        setBankDetails({
          bankName: "Opay",
          accountName: "Abubakar Lawan",
          accountNumber: "8100681294"
        });
      }

      const allEnrollments = [];
      for (const planDoc of plansSnapshot.docs) {
        const planData = planDoc.data();
        const courseDoc = await getDoc(doc(db, 'courses', planData.courseId));
        const courseData = courseDoc.exists() ? courseDoc.data() : null;

        allEnrollments.push({
          id: planDoc.id,
          ...planData,
          course: courseData
        });
      }

      setEnrollments(allEnrollments);

      if (!selectedCourse && allEnrollments.length > 0) {
        setSelectedCourse(allEnrollments[0].courseId);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (PNG, JPG, JPEG)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      if (receiptPreview) URL.revokeObjectURL(receiptPreview);

      const previewURL = URL.createObjectURL(file);
      setReceiptPreview(previewURL);
      setPaymentReceipt(file);
    }
  };

  const handleSubmitPayment = async () => {
    if (!paymentReceipt || !selectedCourse) {
      alert('Please complete the form requirements');
      return;
    }

    setUploading(true);

    try {
      const selectedEnrollment = enrollments.find(e => e.courseId === selectedCourse);
      if (!selectedEnrollment) throw new Error('Enrollment not found');

      const fileName = `renewal-payments/${currentUser.uid}/${selectedCourse}_${Date.now()}`;
      const storageRef = ref(storage, fileName);
      await uploadBytes(storageRef, paymentReceipt);
      const receiptURL = await getDownloadURL(storageRef);

      const amountToPay = selectedEnrollment.planType === 'yearly'
        ? (selectedEnrollment.course?.pricing?.yearly || selectedEnrollment.planAmount)
        : (selectedEnrollment.course?.pricing?.monthly || selectedEnrollment.planAmount);

      const paymentData = {
        userId: currentUser.uid,
        customerEmail: currentUser.email,
        courseId: selectedCourse,
        courseName: selectedEnrollment.course?.title || 'Unknown Course',
        receiptURL,
        amount: Number(amountToPay) || 6500,
        status: 'pending',
        submittedAt: new Date(),
        type: 'renewal',
        planType: selectedEnrollment.planType || 'monthly'
      };

      await addDoc(collection(db, 'payments'), paymentData);

      navigate('/dashboard', {
        state: {
          paymentSuccess: true,
          message: 'Renewal receipt submitted! Access will be extended upon verification.'
        }
      });
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit receipt. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const selectedEnrollment = enrollments.find(e => e.courseId === selectedCourse);
  const currentPrice = selectedEnrollment?.planType === 'yearly'
    ? selectedEnrollment?.course?.pricing?.yearly
    : selectedEnrollment?.course?.pricing?.monthly || selectedEnrollment?.planAmount;

  if (loading) {
    return (
      <div className="premium-loading-overlay">
        <div className="custom-loader"></div>
        <p className="loader-text">Initializing Secure Payment Portal...</p>
      </div>
    );
  }

  return (
    <div className="renew-page-wrapper">
      <div className="renew-bg-blob blob-1"></div>
      <div className="renew-bg-blob blob-2"></div>

      <div className="header-spacer"></div>

      <div className="renew-content-container">
        <motion.div
          className="back-btn-container"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button onClick={() => navigate('/dashboard')} className="premium-back-btn">
            <FaArrowLeft /> Back to Dashboard
          </button>
        </motion.div>

        <motion.div
          className="renew-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1>{selectedEnrollment?.blocked ? "Renew Your Subscription" : "Extend Your Subscription"}</h1>
          <p>{selectedEnrollment?.blocked
            ? "Your subscription has ended. Pay below to restore your access."
            : "Pay early to keep your learning going without any interruptions."}
          </p>
        </motion.div>

        {enrollments.length === 0 ? (
          <motion.div
            className="premium-card text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FaInfoCircle className="text-5xl text-indigo-400 mb-4 mx-auto" />
            <h2 className="text-2xl font-bold mb-2">No Courses Found</h2>
            <p className="text-gray-500 mb-6">You don't have any active or expired courses to renew yet.</p>
            <button
              onClick={() => navigate('/courses')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all"
            >
              Browse Courses
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Left Column: Form (3/5) */}
            <motion.div
              className="lg:col-span-3 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="premium-card">
                <h2 className="card-title">
                  <FaCreditCard className="text-indigo-500" />
                  {selectedEnrollment?.blocked ? "Renewal Details" : "Extension Details"}
                </h2>

                {enrollments.length > 1 && (
                  <div className="course-selector-box">
                    <label className="renew-label">Choose Course</label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="premium-select"
                    >
                      {enrollments.map(e => (
                        <option key={e.courseId} value={e.courseId}>
                          {e.course?.title || 'Unknown Course'}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="item-label">Your Plan</span>
                    <span className="item-value capitalize">{selectedEnrollment?.planType || 'Monthly'}</span>
                  </div>
                  <div className="summary-item">
                    <span className="item-label">Course</span>
                    <span className="item-value">{selectedEnrollment?.course?.title || 'Unknown Course'}</span>
                  </div>
                </div>

                <div className="amount-display">
                  <span className="label">Amount to Pay</span>
                  <span className="amount-value">₦{Number(currentPrice || 6500).toLocaleString()}</span>
                  <p className="text-sm font-bold text-indigo-400 mt-2">
                    {selectedEnrollment?.planType === 'yearly' ? 'Adds 1 Year of Access' : 'Adds 30 Days of Access'}
                  </p>
                </div>

                <div className="details-box">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Transfer Details</h3>
                  <div className="details-grid">
                    <div className="detail-col">
                      <span className="label">Bank</span>
                      <span className="value">{bankDetails?.bankName || 'Opay'}</span>
                    </div>
                    <div className="detail-col">
                      <span className="label">Account Name</span>
                      <span className="value">{bankDetails?.accountName || 'Abubakar Lawan'}</span>
                    </div>
                    <div className="detail-col">
                      <span className="label">Account Number</span>
                      <div className="flex items-center gap-2">
                        <span className="value text-indigo-600 text-xl">{bankDetails?.accountNumber || '8100681294'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="premium-upload-area" onClick={() => fileInputRef.current?.click()}>
                  <div className="upload-icon-box">
                    {paymentReceipt ? <FaCheckCircle className="text-green-500" /> : <FaCloudUploadAlt />}
                  </div>
                  <p className="upload-text-main">
                    {paymentReceipt ? 'Photo Uploaded' : 'Upload Payment Receipt'}
                  </p>
                  <p className="upload-text-sub">
                    Click to upload a photo of your receipt (PNG or JPG)
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                <AnimatePresence>
                  {receiptPreview && (
                    <motion.div
                      className="receipt-preview-box"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p className="text-sm font-bold text-gray-500 mb-3">Receipt Preview:</p>
                      <img src={receiptPreview} alt="Receipt" className="preview-img mx-auto" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  disabled={!paymentReceipt || uploading}
                  onClick={handleSubmitPayment}
                  className="premium-submit-btn"
                >
                  {uploading ? (
                    <div className="spinner"></div>
                  ) : (
                    <>
                      <FaRocket /> {selectedEnrollment?.blocked ? "Submit Renewal" : "Submit Extension"}
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Right Column: Instructions (2/5) */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="instructions-card">
                <h3 className="inst-title"><FaInfoCircle /> How to Pay</h3>
                <ul className="inst-list">
                  <li className="inst-step">
                    <span className="step-num">1</span>
                    <p className="step-text">Transfer the exact amount to the bank details shown here.</p>
                  </li>
                  <li className="inst-step">
                    <span className="step-num">2</span>
                    <p className="step-text">Take a screenshot or photo of your payment receipt.</p>
                  </li>
                  <li className="inst-step">
                    <span className="step-num">3</span>
                    <p className="step-text">Upload your photo using the 'Upload' box above.</p>
                  </li>
                  <li className="inst-step">
                    <span className="step-num">4</span>
                    <p className="step-text">Our team will check your payment and extend your subscription.</p>
                  </li>
                  <li className="inst-step">
                    <span className="step-num">5</span>
                    <p className="step-text">You'll get a notification as soon as your access is confirmed.</p>
                  </li>
                </ul>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-4 text-indigo-300">
                    <FaCrown className="text-2xl" />
                    <span className="text-sm font-bold uppercase tracking-wider">Secure Learning Platform</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RenewPayment;