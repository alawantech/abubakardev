import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

const PaymentHistoryModal = ({ isOpen, onClose, userId, userName, courseId, courseName }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [uploadingReceipt, setUploadingReceipt] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);

  useEffect(() => {
    if (isOpen && userId && courseId) {
      fetchPaymentHistory();
    }
  }, [isOpen, userId, courseId]);

  // Clean up receipt preview URL when component unmounts or modal closes
  useEffect(() => {
    return () => {
      if (receiptPreview) {
        URL.revokeObjectURL(receiptPreview);
      }
    };
  }, [receiptPreview]);

  useEffect(() => {
    if (!isOpen) {
      // Clean up when modal closes
      if (receiptPreview) {
        URL.revokeObjectURL(receiptPreview);
      }
      setReceiptFile(null);
      setReceiptPreview(null);
      setUploadingReceipt(null);
    }
  }, [isOpen, receiptPreview]);

  const fetchPaymentHistory = async () => {
    setLoading(true);
    try {

      // Query payments by userId (if available) or userEmail
      const paymentsQueries = [];

      // Try to find userId from email if userId is actually an email
      let actualUserId = userId;
      if (userId.includes('@')) {
        // userId is actually an email, find the actual userId
        const usersQuery = query(collection(db, 'users'), where('email', '==', userId));
        const usersSnapshot = await getDocs(usersQuery);
        if (!usersSnapshot.empty) {
          actualUserId = usersSnapshot.docs[0].id;
        }
      }

      // Query payments by userId and courseId
      const paymentsByUserIdQuery = query(
        collection(db, 'payments'),
        where('userId', '==', actualUserId),
        where('courseId', '==', courseId)
      );

      // Also query payments by userEmail and courseId (for consistency)
      const paymentsByEmailQuery = query(
        collection(db, 'payments'),
        where('userEmail', '==', userId),
        where('courseId', '==', courseId)
      );

      const [paymentsByUserIdSnapshot, paymentsByEmailSnapshot] = await Promise.all([
        getDocs(paymentsByUserIdQuery),
        getDocs(paymentsByEmailQuery)
      ]);

      const paymentsData1 = paymentsByUserIdSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          submittedAt: data.submittedAt?.toDate(),
          type: data.type || 'renewal', // Preserve existing type or default to renewal
          source: 'payments_userId'
        };
      });

      const paymentsData2 = paymentsByEmailSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          submittedAt: data.submittedAt?.toDate(),
          type: data.type || 'renewal', // Preserve existing type or default to renewal
          source: 'payments_email'
        };
      });

      // Combine and deduplicate payments
      const paymentsData = [...paymentsData1, ...paymentsData2].filter(
        (payment, index, self) =>
          index === self.findIndex(p => p.id === payment.id)
      );

      // Query enrollments for this specific user and course to get enrollment payments
      // Try multiple queries to find enrollment records
      const enrollmentsQuery1 = query(
        collection(db, 'enrollments'),
        where('customerEmail', '==', userId),
        where('courseId', '==', courseId)
      );

      const enrollmentsQuery2 = query(
        collection(db, 'enrollments'),
        where('userId', '==', actualUserId),
        where('courseId', '==', courseId)
      );

      const [enrollmentsSnapshot1, enrollmentsSnapshot2] = await Promise.all([
        getDocs(enrollmentsQuery1),
        getDocs(enrollmentsQuery2)
      ]);

      // Combine enrollment snapshots
      const allEnrollmentDocs = [...enrollmentsSnapshot1.docs, ...enrollmentsSnapshot2.docs]
        .filter((doc, index, self) =>
          index === self.findIndex(d => d.id === doc.id)
        );

      const enrollmentPaymentsData = await Promise.all(
        allEnrollmentDocs
          .filter(doc => {
            const data = doc.data();
            // Include enrollments that have payment info or enrollment date
            return (data.amount && data.enrolledAt) || data.enrolledAt;
          })
          .map(async (doc) => {
            const data = doc.data();

            // Try to find the corresponding payment record for receipt URL
            let receiptURL = data.receiptURL || data.receiptUrl || data.receipt_link || data.receipt || data.paymentReceipt || null;

            if (!receiptURL && (data.transactionId || data.paymentReference)) {
              // Query payments collection to find matching payment record
              const paymentQuery = data.transactionId
                ? query(collection(db, 'payments'), where('transactionId', '==', data.transactionId))
                : query(collection(db, 'payments'), where('paymentReference', '==', data.paymentReference));

              try {
                const paymentSnapshot = await getDocs(paymentQuery);
                if (!paymentSnapshot.empty) {
                  const paymentData = paymentSnapshot.docs[0].data();
                  receiptURL = paymentData.receiptURL || paymentData.receiptUrl || paymentData.receipt_link || paymentData.receipt || null;
                }
              } catch (error) {
                console.error('Error fetching payment receipt:', error);
              }
            }

            return {
              id: doc.id,
              userId: actualUserId,
              userEmail: userId,
              amount: data.amount || 49000, // Default to one-time payment amount
              status: data.paymentStatus || 'approved',
              submittedAt: data.enrolledAt?.toDate() || new Date(), // Use enrollment date
              type: 'enrollment',
              receiptURL: receiptURL,
              transactionId: data.transactionId,
              paymentReference: data.paymentReference,
              courseId: data.courseId,
              source: 'enrollments'
            };
          })
      );

      // Combine all payments for this specific user and course
      const allPayments = [...paymentsData, ...enrollmentPaymentsData];

      // Generate payment history by date
      const history = generatePaymentHistory(allPayments);
      setPaymentHistory(history);
      setPayments(allPayments);
    } catch (error) {
      console.error('Error fetching payment history:', error);
    } finally {
      setLoading(false);
    }
  };

  const generatePaymentHistory = (payments) => {
    const paymentData = {};

    payments.forEach(payment => {
      if (!payment.submittedAt) return;

      const paymentDate = payment.submittedAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      if (!paymentData[paymentDate]) {
        paymentData[paymentDate] = [];
      }

      paymentData[paymentDate].push({
        ...payment,
        paymentDate: paymentDate
      });
    });

    return paymentData;
  }; const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
      case 'paid':
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'pending':
      case 'receipt_pending_upload':
        return 'text-yellow-600 bg-yellow-100';
      case 'rejected':
      case 'failed':
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const handleReceiptFileChange = (e, paymentId) => {
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
      setReceiptFile(file);
      setUploadingReceipt(paymentId);
    }
  };

  const handleUploadReceipt = async (paymentId) => {
    if (!receiptFile) {
      alert('Please select a receipt file first');
      return;
    }

    setUploadingReceipt(paymentId);

    try {
      // Upload to Firebase Storage
      const fileName = `admin-receipts/${userId}_${courseId}_${paymentId}_${Date.now()}`;
      console.log('Uploading receipt to:', fileName);

      const receiptRef = ref(storage, fileName);
      const uploadTask = await uploadBytes(receiptRef, receiptFile);
      console.log('Upload successful:', uploadTask);

      const receiptURL = await getDownloadURL(receiptRef);
      console.log('Download URL obtained:', receiptURL);

      // Update payment record with receipt URL and change status
      await updateDoc(doc(db, 'payments', paymentId), {
        receiptURL: receiptURL,
        status: 'approved',
        receiptUploadedBy: 'admin',
        receiptUploadedAt: new Date(),
        receiptFileName: receiptFile.name,
        receiptFileSize: receiptFile.size,
        receiptFileType: receiptFile.type
      });

      // Update local state
      setPayments(prev => prev.map(payment =>
        payment.id === paymentId
          ? {
            ...payment,
            receiptURL: receiptURL,
            status: 'approved',
            receiptUploadedBy: 'admin',
            receiptUploadedAt: new Date()
          }
          : payment
      ));

      // Refresh payment history
      await fetchPaymentHistory();

      alert('Receipt uploaded successfully! Payment status updated to approved.');

      // Clean up
      if (receiptPreview) {
        URL.revokeObjectURL(receiptPreview);
      }
      setReceiptFile(null);
      setReceiptPreview(null);
      setUploadingReceipt(null);

    } catch (error) {
      console.error('Error uploading receipt:', error);
      alert(`Error uploading receipt: ${error.message}. Please try again.`);
    } finally {
      setUploadingReceipt(null);
    }
  };

  const cancelReceiptUpload = () => {
    if (receiptPreview) {
      URL.revokeObjectURL(receiptPreview);
    }
    setReceiptFile(null);
    setReceiptPreview(null);
    setUploadingReceipt(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Payment History</h2>
              <p className="text-blue-100 mt-1">
                {userName} - {courseName}
              </p>
              <p className="text-blue-200 text-sm mt-1">
                One-Time Payment: ₦49,000 (Full Access)
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600">Loading payment history...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.keys(paymentHistory)
                .sort((a, b) => new Date(b) - new Date(a)) // Most recent first
                .map(date => (
                  <div key={date} className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm">💰</span>
                      </div>
                      Payment Date: {date}
                    </h3>

                    <div className="space-y-3">
                      {paymentHistory[date].map((payment) => (
                        <div
                          key={payment.id}
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${payment.type === 'enrollment' ? 'bg-green-100' :
                                    payment.type === 'renewal' ? 'bg-blue-100' :
                                      payment.type === 'extension' ? 'bg-purple-100' : 'bg-gray-100'
                                  }`}>
                                  <span>
                                    {payment.type === 'enrollment' ? '🎓' :
                                      payment.type === 'renewal' ? '🔄' :
                                        payment.type === 'extension' ? '⏰' : '💰'}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 text-lg">
                                    {payment.type === 'enrollment' ? 'Course Enrollment' :
                                      payment.type === 'renewal' ? 'Subscription Renewal' :
                                        payment.type === 'extension' ? 'Access Extension' : 'Payment'}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    Amount: {formatCurrency(payment.amount || 49000)}
                                  </p>
                                  {payment.transactionId && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      Transaction ID: {payment.transactionId}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-4 mt-3">
                                <span className={`px-3 py-1 rounded-full font-medium text-sm ${getStatusColor(payment.status)}`}>
                                  {payment.status === 'approved' ? '✓ Approved' :
                                    payment.status === 'paid' ? '✓ Paid' :
                                      payment.status === 'success' ? '✓ Success' :
                                        payment.status === 'pending' ? '⏳ Pending' :
                                          payment.status === 'receipt_pending_upload' && payment.isRenewal ? '📄 Receipt Pending' :
                                            payment.status === 'rejected' ? '✗ Rejected' :
                                              payment.status === 'failed' ? '✗ Failed' :
                                                payment.status === 'cancelled' ? '✗ Cancelled' : payment.status}
                                </span>

                                {payment.receiptURL && (
                                  <button
                                    onClick={() => window.open(payment.receiptURL, '_blank')}
                                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    View Receipt
                                  </button>
                                )}

                                {payment.status === 'receipt_pending_upload' && !payment.receiptURL && payment.isRenewal && (
                                  <div className="space-y-3">
                                    {uploadingReceipt === payment.id ? (
                                      <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                                        <div className="flex items-center gap-3 mb-3">
                                          <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                          <span className="text-orange-700 font-medium">Uploading receipt...</span>
                                        </div>

                                        {receiptPreview && (
                                          <div className="mb-3">
                                            <p className="text-sm text-orange-600 mb-2">Preview:</p>
                                            <img
                                              src={receiptPreview}
                                              alt="Receipt preview"
                                              className="max-w-full max-h-32 object-contain rounded border border-orange-200"
                                            />
                                          </div>
                                        )}

                                        <div className="flex gap-2">
                                          <button
                                            onClick={() => handleUploadReceipt(payment.id)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                                          >
                                            Confirm Upload
                                          </button>
                                          <button
                                            onClick={cancelReceiptUpload}
                                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                                        <div className="flex items-center gap-3 mb-3">
                                          <svg className="w-5 h-5 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                          </svg>
                                          <div>
                                            <p className="text-sm text-orange-700 font-medium">
                                              Student uploaded renewal receipt but save failed
                                            </p>
                                            {payment.receiptFileName && (
                                              <p className="text-xs text-orange-600 mt-1">
                                                Original file: {payment.receiptFileName}
                                              </p>
                                            )}
                                          </div>
                                        </div>

                                        <div className="space-y-3">
                                          <p className="text-sm text-orange-800">
                                            The student submitted a receipt ({payment.receiptFileName || 'unknown file'}), but it failed to save properly. Please upload the receipt again to complete verification.
                                          </p>

                                          <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleReceiptFileChange(e, payment.id)}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                                          />
                                          {receiptPreview && uploadingReceipt === payment.id && (
                                            <div>
                                              <p className="text-sm text-orange-600 mb-2">Selected file preview:</p>
                                              <img
                                                src={receiptPreview}
                                                alt="Receipt preview"
                                                className="max-w-full max-h-32 object-contain rounded border border-orange-200"
                                              />
                                            </div>
                                          )}
                                          <button
                                            onClick={() => handleUploadReceipt(payment.id)}
                                            disabled={!receiptFile || uploadingReceipt === payment.id}
                                            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-4 py-2 rounded text-sm font-medium transition-colors disabled:cursor-not-allowed"
                                          >
                                            Upload Receipt & Approve Payment
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

              {Object.keys(paymentHistory).length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment History</h3>
                  <p className="text-gray-600">No payments have been recorded for this student yet.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryModal;