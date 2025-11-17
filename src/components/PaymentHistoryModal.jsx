import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const PaymentHistoryModal = ({ isOpen, onClose, userId, userName, courseId, courseName }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    if (isOpen && userId && courseId) {
      fetchPaymentHistory();
    }
  }, [isOpen, userId, courseId]);

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

      const enrollmentPaymentsData = allEnrollmentDocs
        .filter(doc => {
          const data = doc.data();
          // Include enrollments that have payment info or enrollment date
          return (data.amount && data.enrolledAt) || data.enrolledAt;
        })
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            userId: actualUserId,
            userEmail: userId,
            amount: data.amount || 6500, // Default amount if not present
            status: data.paymentStatus || 'approved',
            submittedAt: data.enrolledAt?.toDate() || new Date(), // Use enrollment date
            type: 'enrollment',
            receiptURL: null, // Enrollments don't have receipt URLs in this format
            transactionId: data.transactionId,
            paymentReference: data.paymentReference,
            courseId: data.courseId,
            source: 'enrollments'
          };
        });

      // Combine all payments for this specific user and course
      const allPayments = [...paymentsData, ...enrollmentPaymentsData];

      // Generate monthly payment history
      const history = generateMonthlyHistory(allPayments);
      setPaymentHistory(history);
      setPayments(allPayments);
    } catch (error) {
      console.error('Error fetching payment history:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMonthlyHistory = (payments) => {
    const monthlyData = {};
    
    payments.forEach(payment => {
      if (!payment.submittedAt) return;
      
      let coveredMonths = [];
      
      if (payment.type === 'enrollment') {
        // For enrollment payments, find the enrollment and calculate covered months
        // Since we're in admin modal, we don't have enrollments array, so use payment date
        const enrolledDate = payment.submittedAt;
        const planType = 'monthly'; // Assume monthly for now
        
        if (planType === 'monthly') {
          // Monthly plan: covers current month + future months based on payment
          const paymentAmount = payment.amount || 0;
          const monthsCovered = Math.floor(paymentAmount / 6500); // Assuming ₦6,500 per month
          
          for (let i = 0; i < Math.max(monthsCovered, 1); i++) {
            const monthDate = new Date(enrolledDate);
            monthDate.setMonth(enrolledDate.getMonth() + i);
            coveredMonths.push(monthDate.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long' 
            }));
          }
        } else {
          // One-time payment covers the enrollment month
          coveredMonths.push(enrolledDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
          }));
        }
      } else if (payment.type === 'renewal' || payment.type === 'extension') {
        // For renewal/extension payments, calculate which months they cover
        const paymentAmount = payment.amount || 0;
        const monthsCovered = Math.floor(paymentAmount / 6500); // Assuming ₦6,500 per month
        
        // Start from the payment month
        const paymentDate = payment.submittedAt;
        const startMonth = new Date(paymentDate.getFullYear(), paymentDate.getMonth(), 1);
        
        for (let i = 0; i < Math.max(monthsCovered, 1); i++) {
          const monthDate = new Date(startMonth);
          monthDate.setMonth(startMonth.getMonth() + i);
          coveredMonths.push(monthDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
          }));
        }
      }
      
      // Group by covered months
      coveredMonths.forEach(month => {
        if (!monthlyData[month]) {
          monthlyData[month] = [];
        }
        monthlyData[month].push({
          ...payment,
          coveredMonth: month
        });
      });
    });
    
    return monthlyData;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'unpaid':
        return 'text-red-600 bg-red-100';
      case 'one-time':
        return 'text-blue-600 bg-blue-100';
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
                .sort((a, b) => new Date(a + ' 1') - new Date(b + ' 1'))
                .reverse() // Most recent first
                .map(month => (
                  <div key={month} className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm">📅</span>
                      </div>
                      {month}
                    </h3>
                    
                    <div className="space-y-3">
                      {paymentHistory[month].map((payment) => (
                        <div
                          key={payment.id}
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                  payment.status === 'approved' ? 'bg-green-100' :
                                  payment.status === 'pending' ? 'bg-yellow-100' :
                                  payment.status === 'rejected' ? 'bg-red-100' : 'bg-gray-100'
                                }`}>
                                  <span>
                                    {payment.type === 'renewal' ? '🔄' :
                                     payment.type === 'extension' ? '⏰' : '💰'}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 capitalize">
                                    {payment.type || 'Payment'} - ₦{payment.amount?.toLocaleString() || '0'}
                                  </h4>
                                  <p className="text-xs text-gray-600">
                                    Paid on {payment.submittedAt?.toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-xs">
                                <span className={`px-2 py-1 rounded-full font-medium ${
                                  payment.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  payment.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {payment.status || 'Unknown'}
                                </span>
                                
                                {payment.receiptURL && (
                                  <button
                                    onClick={() => window.open(payment.receiptURL, '_blank')}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors text-xs"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Receipt
                                  </button>
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