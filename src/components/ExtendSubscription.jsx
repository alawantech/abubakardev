import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const ExtendSubscription = () => {
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [bankDetails, setBankDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [extensionMonths, setExtensionMonths] = useState(1);

  useEffect(() => {
    if (currentUser) {
      fetchEnrollments();
      fetchBankDetails();
    } else {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const fetchEnrollments = async () => {
    try {
      const enrollmentsQuery = query(
        collection(db, 'enrollments'),
        where('customerEmail', '==', currentUser.email)
      );

      const enrollmentsSnapshot = await getDocs(enrollmentsQuery);

      const enrollmentsData = await Promise.all(
        enrollmentsSnapshot.docs.map(async (enrollmentDoc) => {
          const enrollmentData = enrollmentDoc.data();

          const courseDoc = await getDoc(doc(db, 'courses', enrollmentData.courseId));
          const courseData = courseDoc.exists() ? courseDoc.data() : null;

          const planQuery = query(
            collection(db, 'enrollmentPlans'),
            where('userId', '==', enrollmentData.userId || currentUser.uid),
            where('courseId', '==', enrollmentData.courseId)
          );
          const planSnapshot = await getDocs(planQuery);
          const planData = planSnapshot.docs.length > 0 ? planSnapshot.docs[0].data() : null;

          return {
            id: enrollmentDoc.id,
            ...enrollmentData,
            course: courseData,
            enrollmentPlan: planData,
            blocked: planData?.blocked || false
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

  const fetchBankDetails = async () => {
    try {
      const bankDoc = await getDoc(doc(db, 'admin', 'bankDetails'));
      if (bankDoc.exists()) {
        setBankDetails(bankDoc.data());
      }
    } catch (error) {
      console.error('Error fetching bank details:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setPaymentReceipt(file);
      const reader = new FileReader();
      reader.onload = (e) => setReceiptPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!paymentReceipt) return;

    setUploading(true);
    try {
      // Upload receipt to Firebase Storage
      const storageRef = ref(storage, `extension-payments/${currentUser.uid}_${Date.now()}_${paymentReceipt.name}`);
      await uploadBytes(storageRef, paymentReceipt);
      const receiptURL = await getDownloadURL(storageRef);

      // Create extension payment record
      const extensionData = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        receiptURL,
        amount: extensionMonths * 6500,
        monthsExtended: extensionMonths,
        status: 'pending',
        submittedAt: new Date(),
        type: 'extension'
      };

      await addDoc(collection(db, 'payments'), extensionData);

      // Update enrollment plans to extend expiry date
      const enrollmentPlansQuery = query(
        collection(db, 'enrollmentPlans'),
        where('userId', '==', currentUser.uid)
      );
      const plansSnapshot = await getDocs(enrollmentPlansQuery);

      const updatePromises = plansSnapshot.docs.map(async (planDoc) => {
        const planData = planDoc.data();
        const currentExpiryDate = planData.expiryDate?.toDate() || new Date();
        const newExpiryDate = new Date(currentExpiryDate);
        newExpiryDate.setMonth(newExpiryDate.getMonth() + extensionMonths);

        await updateDoc(doc(db, 'enrollmentPlans', planDoc.id), {
          expiryDate: newExpiryDate,
          lastExtensionDate: new Date(),
          totalExtensions: (planData.totalExtensions || 0) + extensionMonths
        });
      });

      await Promise.all(updatePromises);

      alert(`Subscription extended successfully by ${extensionMonths} month(s)! Your access will continue automatically.`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting extension:', error);
      alert('Failed to submit extension payment. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-24">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading extension options...</p>
        </div>
      </div>
    );
  }

  const monthlyPlan = enrollments.find(e => e.enrollmentPlan?.planType === 'monthly');

  if (!monthlyPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="inline-block p-6 bg-red-100 rounded-full mb-6">
              <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No Monthly Subscription Found</h1>
            <p className="text-gray-600 mb-8">You need a monthly subscription to extend your access.</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="h-36"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-6 bg-green-100 rounded-full mb-6">
            <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Extend Your Subscription</h1>
          <p className="text-xl text-gray-600">
            Pay ahead to ensure uninterrupted access to your courses
          </p>
        </div>

        {/* Extension Options */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Extension Period</h2>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map((months) => (
              <button
                key={months}
                onClick={() => setExtensionMonths(months)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  extensionMonths === months
                    ? 'border-green-500 bg-green-50 shadow-lg'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{months}</div>
                  <div className="text-sm text-gray-600 mb-3">
                    {months === 1 ? 'Month' : 'Months'}
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ₦{(months * 6500).toLocaleString()}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Current Subscription Info */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Current Subscription Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Course</p>
                <p className="font-semibold text-gray-900">{monthlyPlan.courseName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Expiry</p>
                <p className="font-semibold text-gray-900">
                  {monthlyPlan.enrollmentPlan?.expiryDate?.toDate().toLocaleDateString() || 'Not set'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Extension Period</p>
                <p className="font-semibold text-green-600">{extensionMonths} month(s)</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">New Expiry Date</p>
                <p className="font-semibold text-green-600">
                  {(() => {
                    const currentExpiry = monthlyPlan.enrollmentPlan?.expiryDate?.toDate() || new Date();
                    const newExpiry = new Date(currentExpiry);
                    newExpiry.setMonth(newExpiry.getMonth() + extensionMonths);
                    return newExpiry.toLocaleDateString();
                  })()}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Bank Name</p>
                <p className="font-semibold text-gray-900">{bankDetails?.bankName || 'Access Bank'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Name</p>
                <p className="font-semibold text-gray-900">{bankDetails?.accountName || 'Abubakar Dev'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Number</p>
                <p className="font-semibold text-gray-900">{bankDetails?.accountNumber || '1234567890'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount to Pay</p>
                <p className="font-semibold text-green-600 text-lg">₦{(extensionMonths * 6500).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Receipt Upload */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-900 mb-4">Upload Payment Receipt</h3>
            <p className="text-sm text-green-800 mb-6">
              After making the bank transfer, please upload a screenshot or photo of your payment receipt.
            </p>

            <div className="space-y-4">
              <div
                onClick={() => document.getElementById('extension-receipt-upload').click()}
                className="border-2 border-dashed border-green-300 rounded-xl p-8 bg-white hover:bg-green-25 transition-colors cursor-pointer group"
              >
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">Click to upload receipt</p>
                  <p className="text-sm text-gray-500">PNG, JPG, JPEG up to 5MB</p>
                </div>
              </div>

              <input
                id="extension-receipt-upload"
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
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!paymentReceipt || uploading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl disabled:shadow-none transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-3 text-lg cursor-pointer disabled:cursor-not-allowed mt-6"
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing Extension...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span>Extend Subscription ({extensionMonths} month{extensionMonths > 1 ? 's' : ''})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtendSubscription;