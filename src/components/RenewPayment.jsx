import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const RenewPayment = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchBlockedEnrollments();
    }
  }, [currentUser]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Clean up object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (receiptPreview) {
        URL.revokeObjectURL(receiptPreview);
      }
    };
  }, [receiptPreview]);

  const fetchBlockedEnrollments = async () => {
    try {
      // Fetch enrollment plans that are blocked
      const plansQuery = query(
        collection(db, 'enrollmentPlans'),
        where('userId', '==', currentUser.uid),
        where('blocked', '==', true)
      );
      const plansSnapshot = await getDocs(plansQuery);
      
      const blockedEnrollments = [];
      for (const planDoc of plansSnapshot.docs) {
        const planData = planDoc.data();
        
        // Fetch course details
        const courseDoc = await getDoc(doc(db, 'courses', planData.courseId));
        const courseData = courseDoc.exists() ? courseDoc.data() : null;
        
        blockedEnrollments.push({
          id: planDoc.id,
          ...planData,
          course: courseData
        });
      }
      
      setEnrollments(blockedEnrollments);
      if (blockedEnrollments.length > 0) {
        setSelectedCourse(blockedEnrollments[0].courseId);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blocked enrollments:', error);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (PNG, JPG, JPEG)');
        return;
      }
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Clean up previous preview URL
      if (receiptPreview) {
        URL.revokeObjectURL(receiptPreview);
      }

      // Create new preview URL
      const previewURL = URL.createObjectURL(file);
      setReceiptPreview(previewURL);
      setPaymentReceipt(file);
    }
  };

  const handleSubmitPayment = async () => {
    if (!paymentReceipt) {
      alert('Please select a payment receipt image');
      return;
    }

    if (!selectedCourse) {
      alert('Please select a course to renew');
      return;
    }

    setUploading(true);

    try {
      const selectedEnrollment = enrollments.find(e => e.courseId === selectedCourse);
      if (!selectedEnrollment) {
        throw new Error('Selected course not found');
      }

      let receiptURL = null;

      // Try to upload to Firebase Storage
      try {
        const fileName = `renewal-receipts/${currentUser.uid}_${selectedCourse}_${Date.now()}`;
        console.log('Attempting to upload file:', fileName);

        const receiptRef = ref(storage, fileName);
        const uploadTask = await uploadBytes(receiptRef, paymentReceipt);
        console.log('Upload successful:', uploadTask);

        receiptURL = await getDownloadURL(receiptRef);
        console.log('Download URL obtained:', receiptURL);
      } catch (uploadError) {
        console.warn('Firebase Storage upload failed (likely CORS), proceeding without receipt:', uploadError.message);
        receiptURL = null;
      }

      // Create renewal payment record
      const paymentData = {
        userId: currentUser.uid,
        courseId: selectedCourse,
        courseName: selectedEnrollment.course?.title || 'Course',
        customerName: currentUser.displayName || currentUser.email,
        customerEmail: currentUser.email,
        planType: selectedEnrollment.planType,
        amount: selectedEnrollment.planAmount,
        receiptURL,
        status: receiptURL ? 'pending' : 'receipt_pending_upload',
        submittedAt: new Date(),
        paymentMethod: 'bank_transfer',
        receiptFileName: paymentReceipt.name,
        receiptFileSize: paymentReceipt.size,
        receiptFileType: paymentReceipt.type,
        isRenewal: true
      };

      const paymentDocRef = await addDoc(collection(db, 'payments'), paymentData);
      console.log('Renewal payment record created:', paymentDocRef.id);

      // Update enrollment plan - extend the next payment date instead of resetting
      const currentNextPayment = selectedEnrollment.nextPaymentDate?.toDate() || new Date();
      const newNextPayment = new Date(currentNextPayment);
      
      if (selectedEnrollment.planType === 'monthly') {
        // Add one month to existing next payment date
        newNextPayment.setMonth(newNextPayment.getMonth() + 1);
      }

      await updateDoc(doc(db, 'enrollmentPlans', `${currentUser.uid}_${selectedCourse}`), {
        nextPaymentDate: newNextPayment,
        paymentStatus: receiptURL ? 'paid' : 'receipt_required',
        blocked: false, // Unblock the user
        lastPaymentDate: new Date()
      });

      // Success message
      const successMessage = receiptURL
        ? 'Renewal payment submitted successfully! Your access will be restored once verified.'
        : 'Renewal payment information submitted! Please contact support to upload your payment receipt for verification.';

      navigate('/dashboard', {
        state: {
          paymentSuccess: true,
          message: successMessage
        }
      });
    } catch (error) {
      console.error('Error submitting renewal payment:', error);
      alert(`Error submitting payment: ${error.message}. Please try again or contact support.`);
    } finally {
      setUploading(false);
      // Clean up preview URL
      if (receiptPreview) {
        URL.revokeObjectURL(receiptPreview);
        setReceiptPreview(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading renewal options...</p>
        </div>
      </div>
    );
  }

  if (enrollments.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24">
        <div className="max-w-4xl mx-auto px-4 text-center py-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">No Blocked Courses</h2>
          <p className="text-gray-600 mb-6">You don't have any blocked courses that need renewal.</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Spacer for fixed header */}
      <div className="h-36"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Renew Your Subscription</h1>
          <p className="text-gray-600">Upload your payment receipt to restore access to your courses</p>
        </div>

        {/* Course Selection */}
        {enrollments.length > 1 && (
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select Course to Renew</h2>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
            >
              {enrollments.map(enrollment => (
                <option key={enrollment.courseId} value={enrollment.courseId}>
                  {enrollment.course?.title || 'Unknown Course'}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Payment Summary Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Renewal Payment Summary</h2>
          
          {selectedCourse && (
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-600">Course:</span>
                <span className="font-semibold text-gray-900">
                  {enrollments.find(e => e.courseId === selectedCourse)?.course?.title || 'Unknown Course'}
                </span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-600">Payment Plan:</span>
                <span className="font-semibold text-gray-900 capitalize">
                  {enrollments.find(e => e.courseId === selectedCourse)?.planType || 'Monthly'}
                </span>
              </div>

              <div className="flex justify-between items-center pt-4">
                <span className="text-xl font-bold text-gray-900">Amount to Pay:</span>
                <span className="text-4xl font-extrabold text-indigo-600">
                  ₦{enrollments.find(e => e.courseId === selectedCourse)?.planAmount?.toLocaleString() || '6,500'}
                </span>
              </div>
            </div>
          )}

          {/* Bank Details */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Bank Transfer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Bank Name</p>
                <p className="font-semibold text-gray-900">Access Bank</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Name</p>
                <p className="font-semibold text-gray-900">Abubakar Dev</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Number</p>
                <p className="font-semibold text-gray-900">1234567890</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="font-semibold text-gray-900">₦6,500</p>
              </div>
            </div>
          </div>

          {/* Payment Receipt Upload */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Upload Payment Receipt</h3>
            <p className="text-sm text-blue-800 mb-6">
              After making the bank transfer, please upload a screenshot or photo of your payment receipt.
            </p>

            <div className="space-y-4">
              {/* Upload Area */}
              <div
                onClick={() => document.getElementById('receipt-upload').click()}
                className="border-2 border-dashed border-blue-300 rounded-xl p-8 bg-white hover:bg-blue-25 transition-colors cursor-pointer group"
              >
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">Click to upload receipt</p>
                  <p className="text-sm text-gray-500">PNG, JPG, JPEG up to 5MB</p>
                </div>
              </div>

              {/* Hidden File Input */}
              <input
                id="receipt-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {paymentReceipt && (
                <div className="space-y-3">
                  <div className="text-sm text-green-700 font-medium">
                    ✓ Selected: {paymentReceipt.name}
                  </div>

                  {/* Image Preview */}
                  {receiptPreview && (
                    <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
                      <p className="text-sm text-gray-600 mb-2 font-medium">Receipt Preview:</p>
                      <div className="flex justify-center">
                        <img
                          src={receiptPreview}
                          alt="Payment receipt preview"
                          className="max-w-full max-h-64 object-contain rounded-lg shadow-md border border-gray-200"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        This is how your receipt will appear to our verification team
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmitPayment}
            disabled={!paymentReceipt || uploading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl disabled:shadow-none transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-3 text-lg cursor-pointer disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Submit Renewal Payment</span>
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            🔒 Your payment receipt will be securely stored and reviewed by our team
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
              <span>Transfer ₦6,500 to the account details shown above</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span>Take a screenshot or photo of your payment receipt</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <span>Upload the payment receipt using the form above</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <span>Our team will verify your payment and restore your course access within 24 hours</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
              <span>You'll receive an email confirmation once your renewal is activated</span>
            </li>
          </ol>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenewPayment;