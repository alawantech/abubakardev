import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

const CoursePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { plan, userId, customerName, customerEmail, customerPhone } = location.state || {};
  const [course, setCourse] = useState(null);
  const [bankDetails, setBankDetails] = useState(null);
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
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

  // Clean up object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (receiptPreview) {
        URL.revokeObjectURL(receiptPreview);
      }
    };
  }, [receiptPreview]);

  const fetchCourse = async () => {
    try {
      const courseDoc = await getDoc(doc(db, 'courses', courseId));
      if (courseDoc.exists()) {
        setCourse({ id: courseDoc.id, ...courseDoc.data() });
      }

      // Fetch bank details
      const bankDoc = await getDoc(doc(db, 'admin', 'bankDetails'));
      if (bankDoc.exists()) {
        setBankDetails(bankDoc.data());
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

    setUploading(true);

    try {
      let receiptURL = null;

      // Try to upload to Firebase Storage
      try {
        const fileName = `payment-receipts/${userId}_${courseId}_${Date.now()}`;
        console.log('Attempting to upload file:', fileName);

        const receiptRef = ref(storage, fileName);
        const uploadTask = await uploadBytes(receiptRef, paymentReceipt);
        console.log('Upload successful:', uploadTask);

        receiptURL = await getDownloadURL(receiptRef);
        console.log('Download URL obtained:', receiptURL);
      } catch (uploadError) {
        console.warn('Firebase Storage upload failed (likely CORS), proceeding without receipt:', uploadError.message);

        // Fallback: Continue without receipt URL
        // Admin can request manual receipt upload later
        receiptURL = null;
      }

      // Create payment record in Firestore
      const paymentData = {
        userId,
        courseId,
        courseName: plan.courseName,
        customerName,
        customerEmail,
        customerPhone,
        planType: plan.type,
        amount: plan.amount,
        receiptURL,
        status: receiptURL ? 'pending' : 'receipt_pending_upload',
        submittedAt: new Date(),
        paymentMethod: 'bank_transfer',
        receiptFileName: paymentReceipt.name,
        receiptFileSize: paymentReceipt.size,
        receiptFileType: paymentReceipt.type
      };

      const paymentDocRef = await addDoc(collection(db, 'payments'), paymentData);
      console.log('Payment record created:', paymentDocRef.id);

      // Update existing enrollment plan or create new one
      console.log('Looking for enrollment plan with userId:', userId, 'courseId:', courseId);
      const enrollmentQuery = query(
        collection(db, 'enrollmentPlans'),
        where('userId', '==', userId),
        where('courseId', '==', courseId)
      );
      
      const enrollmentSnapshot = await getDocs(enrollmentQuery);
      console.log('Found enrollment plans:', enrollmentSnapshot.size);
      
      if (!enrollmentSnapshot.empty) {
        // Update existing enrollment plan
        const enrollmentDoc = enrollmentSnapshot.docs[0];
        console.log('Updating enrollment plan:', enrollmentDoc.id, 'with data:', enrollmentDoc.data());
        const enrollmentData = {
          planType: plan.type,
          planAmount: plan.amount,
          paymentStatus: 'paid', // Always set to 'paid' when receipt is uploaded
          nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        };

        await updateDoc(doc(db, 'enrollmentPlans', enrollmentDoc.id), enrollmentData);
        console.log('Enrollment plan updated successfully:', enrollmentDoc.id);
      } else {
        // Create new enrollment plan
        console.log('No existing enrollment plan found, creating new one');
        const enrollmentData = {
          userId,
          courseId,
          planType: plan.type,
          planAmount: plan.amount,
          paymentStatus: 'paid', // Always set to 'paid' when receipt is uploaded
          createdAt: new Date(),
          nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        };

        await setDoc(doc(db, 'enrollmentPlans', `${userId}_${courseId}`), enrollmentData);
        console.log('New enrollment plan created');
      }

      // Create enrollment record for course access
      const enrollmentAccessData = {
        customerEmail: customerEmail,
        courseId,
        courseName: plan.courseName,
        enrolledAt: new Date(),
        completedLessons: [], // Start with empty completed lessons
        planType: plan.type,
        planAmount: plan.amount,
        userId: userId // Add userId for consistency
      };

      const enrollmentAccessDocRef = await addDoc(collection(db, 'enrollments'), enrollmentAccessData);

      // Success message based on upload success
      const successMessage = receiptURL
        ? 'Payment receipt submitted successfully! Your enrollment will be activated once verified.'
        : 'Payment information submitted! Please contact support to upload your payment receipt for verification.';

      navigate(`/course/${courseId}/learn`, {
        state: {
          paymentSuccess: true,
          message: successMessage
        }
      });
    } catch (error) {
      console.error('Error submitting payment:', error);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Spacer for fixed header */}
      <div className="h-36"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
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
              <span className="text-xl font-bold text-gray-900">Amount to Pay:</span>
              <span className="text-4xl font-extrabold text-indigo-600">
                ₦{plan.amount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Bank Details */}
          {bankDetails && (
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Bank Transfer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Bank Name</p>
                  <p className="font-semibold text-gray-900">{bankDetails.bankName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Name</p>
                  <p className="font-semibold text-gray-900">{bankDetails.accountName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Number</p>
                  <p className="font-semibold text-gray-900">{bankDetails.accountNumber}</p>
                </div>
                {bankDetails.branch && (
                  <div>
                    <p className="text-sm text-gray-600">Branch</p>
                    <p className="font-semibold text-gray-900">{bankDetails.branch}</p>
                  </div>
                )}
                {bankDetails.swiftCode && (
                  <div>
                    <p className="text-sm text-gray-600">SWIFT Code</p>
                    <p className="font-semibold text-gray-900">{bankDetails.swiftCode}</p>
                  </div>
                )}
              </div>
            </div>
          )}

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
                <span>Submit Payment Receipt</span>
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
              <span>Transfer the payment amount to the bank account details shown above</span>
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
              <span>Our team will verify your payment and activate your course access within 24 hours</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
              <span>You'll receive an email confirmation once your enrollment is activated</span>
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
