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
      // DEBUG: Query ALL payments and enrollments to see if any data exists
      const paymentsQuery = query(collection(db, 'payments'));
      const enrollmentsQuery = query(collection(db, 'enrollments'));

      const [paymentsSnapshot, enrollmentsSnapshot] = await Promise.all([
        getDocs(paymentsQuery),
        getDocs(enrollmentsQuery)
      ]);

      const paymentsData = paymentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        submittedAt: doc.data().submittedAt?.toDate(),
        source: 'all_payments'
      }));

      const allEnrollments = enrollmentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        submittedAt: doc.data().enrolledAt?.toDate(),
        source: 'all_enrollments'
      }));

      // Filter enrollments that have payment data
      const enrollmentPaymentsData = allEnrollments
        .filter(enrollment => enrollment.amount && enrollment.enrolledAt)
        .map(enrollment => ({
          id: enrollment.id,
          userId: enrollment.userId,
          userEmail: enrollment.customerEmail,
          amount: enrollment.amount,
          status: enrollment.paymentStatus || 'approved',
          submittedAt: enrollment.enrolledAt?.toDate(),
          type: 'enrollment',
          receiptURL: null,
          transactionId: enrollment.transactionId,
          paymentReference: enrollment.paymentReference,
          courseId: enrollment.courseId,
          source: 'enrollments'
        }));

      // Combine all payments
      const allPayments = [...paymentsData, ...enrollmentPaymentsData];

      console.log('DEBUG - All payments found:', allPayments);
      console.log('DEBUG - Payments count:', paymentsData.length);
      console.log('DEBUG - Enrollments with payments count:', enrollmentPaymentsData.length);

      // For now, show all payments (no filtering)
      const coursePayments = allPayments;

      // Generate monthly payment history
      const history = generateMonthlyHistory(coursePayments);
      setPaymentHistory(history);
      setPayments(coursePayments);
    } catch (error) {
      console.error('Error fetching payment history:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMonthlyHistory = (payments) => {
    const history = [];
    const now = new Date();

    // Find the earliest payment or enrollment date
    let startDate = now;
    if (payments.length > 0) {
      const earliestPayment = payments.reduce((earliest, payment) => {
        return payment.submittedAt < earliest.submittedAt ? payment : earliest;
      });
      startDate = earliestPayment.submittedAt;
    }

    // Generate months from start date to now + 3 months ahead
    const months = [];
    let currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

    while (currentDate <= new Date(now.getFullYear(), now.getMonth() + 3, 1)) {
      months.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    // For each month, check if there's a payment
    months.forEach(monthStart => {
      const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
      const monthName = monthStart.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

      // Find payments in this month
      const monthPayments = payments.filter(payment => {
        if (!payment.submittedAt) return false;
        return payment.submittedAt >= monthStart && payment.submittedAt <= monthEnd;
      });

      const hasPayment = monthPayments.length > 0;
      const receipt = monthPayments.find(p => p.receiptURL);
      const status = hasPayment ? 'paid' : 'unpaid';

      history.push({
        month: monthName,
        year: monthStart.getFullYear(),
        status,
        payments: monthPayments,
        receipt: receipt?.receiptURL,
        amount: monthPayments.reduce((sum, p) => sum + (p.amount || 0), 0)
      });
    });

    return history.reverse(); // Show oldest first
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'unpaid':
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
              {paymentHistory.map((month, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">{month.month} {month.year}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(month.status)}`}>
                        {month.status.charAt(0).toUpperCase() + month.status.slice(1)}
                      </span>
                    </div>
                    {month.amount > 0 && (
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(month.amount)}
                      </span>
                    )}
                  </div>

                  {month.payments.length > 0 && (
                    <div className="space-y-2">
                      {month.payments.map((payment, paymentIndex) => (
                        <div key={paymentIndex} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-gray-700">
                                  {payment.type === 'extension' ? 'Subscription Extension' :
                                   payment.isRenewal ? 'Renewal Payment' : 'Initial Payment'}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {payment.submittedAt?.toLocaleDateString()}
                                </span>
                              </div>
                              {payment.amount && (
                                <span className="text-sm text-green-600 font-medium">
                                  {formatCurrency(payment.amount)}
                                </span>
                              )}
                            </div>
                            {payment.receiptURL && (
                              <a
                                href={payment.receiptURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View Receipt
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {month.status === 'unpaid' && (
                    <div className="text-sm text-gray-600 italic">
                      No payment recorded for this month
                    </div>
                  )}
                </div>
              ))}

              {paymentHistory.length === 0 && (
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