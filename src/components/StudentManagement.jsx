import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import PaymentHistoryModal from './PaymentHistoryModal';
import './StudentManagement.css';

const StudentManagement = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [extendModal, setExtendModal] = useState({
    isOpen: false,
    enrollment: null,
    months: 1
  });
  const [paymentHistoryModal, setPaymentHistoryModal] = useState({
    isOpen: false,
    userId: null,
    userName: '',
    courseId: '',
    courseName: ''
  });
  const [changePlanModal, setChangePlanModal] = useState({
    isOpen: false,
    enrollment: null,
    newPlan: ''
  });
  const [pendingPayments, setPendingPayments] = useState([]);
  const [receiptModal, setReceiptModal] = useState({
    isOpen: false,
    url: '',
    payment: null
  });
  const [selectedCourseData, setSelectedCourseData] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchFullCourseData(selectedCourse);
      fetchEnrollments(selectedCourse);
      fetchPendingPayments(selectedCourse);
    }
  }, [selectedCourse]);

  const fetchFullCourseData = async (courseId) => {
    try {
      const courseDoc = await getDoc(doc(db, 'courses', courseId));
      if (courseDoc.exists()) {
        setSelectedCourseData({ id: courseDoc.id, ...courseDoc.data() });
      }
    } catch (error) {
      console.error('Error fetching full course data:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const coursesSnapshot = await getDocs(collection(db, 'courses'));
      const coursesData = coursesSnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title
      }));
      setCourses(coursesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setLoading(false);
    }
  };

  const fetchEnrollments = async (courseId) => {
    try {
      setLoading(true);

      // 1. Fetch enrollment plans for the course
      const enrollmentsQuery = query(
        collection(db, 'enrollmentPlans'),
        where('courseId', '==', courseId)
      );
      const enrollmentsSnapshot = await getDocs(enrollmentsQuery);

      if (enrollmentsSnapshot.empty) {
        setEnrollments([]);
        setLoading(false);
        return;
      }

      const rawEnrollments = enrollmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const userIds = [...new Set(rawEnrollments.map(e => e.userId).filter(Boolean))];

      // 2. Fetch users in batches of 10 (Firestore 'in' limit)
      const usersMap = {};
      const userFetchPromises = [];
      for (let i = 0; i < userIds.length; i += 10) {
        const batch = userIds.slice(i, i + 10);
        userFetchPromises.push(getDocs(query(collection(db, 'users'), where('uid', 'in', batch))));
      }

      const usersSnapshots = await Promise.all(userFetchPromises);
      usersSnapshots.forEach(snap => {
        snap.forEach(doc => {
          usersMap[doc.id] = doc.data();
        });
      });

      // 3. Fetch all payments for this course at once
      const paymentsQuery = query(
        collection(db, 'payments'),
        where('courseId', '==', courseId)
      );
      const paymentsSnapshot = await getDocs(paymentsQuery);
      const paymentsMap = {};
      paymentsSnapshot.forEach(doc => {
        const p = { id: doc.id, ...doc.data() };
        if (!paymentsMap[p.userId]) paymentsMap[p.userId] = [];
        paymentsMap[p.userId].push(p);
      });

      // 4. Map everything together in memory
      const enrollmentsData = rawEnrollments.map(enrollment => {
        const userId = enrollment.userId;
        const userData = usersMap[userId] || { fullName: 'Unknown', email: 'Unknown', whatsappNumber: 'Unknown' };
        const userPayments = paymentsMap[userId] || [];

        // Find specific payment info
        const mainPayment = userPayments.find(p => !p.isRenewal) || (userPayments.length > 0 ? userPayments[0] : null);
        const latestRenewalPayment = userPayments
          .filter(p => p.isRenewal)
          .sort((a, b) => {
            const dateA = a.submittedAt?.toDate() || new Date(0);
            const dateB = b.submittedAt?.toDate() || new Date(0);
            return dateB - dateA;
          })[0] || null;

        const enrollmentDate = enrollment.createdAt?.toDate() || new Date();
        const expiryDate = enrollment.expiryDate?.toDate() || new Date(enrollmentDate.getTime() + (30 * 24 * 60 * 60 * 1000));

        return {
          ...enrollment,
          user: userData,
          payment: mainPayment,
          enrollmentDate,
          expiryDate,
          dueDate: expiryDate,
          nextPaymentDate: new Date(expiryDate),
          blocked: enrollment.blocked || false,
          latestRenewalPayment
        };
      });

      // Deduplicate enrollments by userId
      const deduplicatedEnrollments = enrollmentsData.reduce((acc, enrollment) => {
        const existing = acc.find(e => e.userId === enrollment.userId);
        if (!existing) {
          acc.push(enrollment);
        } else {
          const existingIsPaid = existing.payment && (existing.payment.status === 'approved' || existing.paymentStatus === 'paid');
          const currentIsPaid = enrollment.payment && (enrollment.payment.status === 'approved' || enrollment.paymentStatus === 'paid');
          if (currentIsPaid && !existingIsPaid) {
            const index = acc.indexOf(existing);
            acc[index] = enrollment;
          } else if (!currentIsPaid && !existingIsPaid) {
            const existingDate = existing.createdAt?.toDate() || new Date(0);
            const currentDate = enrollment.createdAt?.toDate() || new Date(0);
            if (currentDate > existingDate) {
              const index = acc.indexOf(existing);
              acc[index] = enrollment;
            }
          }
        }
        return acc;
      }, []);

      setEnrollments(deduplicatedEnrollments);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingPayments = async (courseId) => {
    try {
      const pendingQuery = query(
        collection(db, 'payments'),
        where('courseId', '==', courseId),
        where('status', '==', 'pending')
      );
      const snapshot = await getDocs(pendingQuery);
      const payments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPendingPayments(payments);
    } catch (error) {
      console.error('Error fetching pending payments:', error);
    }
  };

  const approvePayment = async (payment) => {
    try {
      setLoading(true);
      // 1. Update payment status
      await updateDoc(doc(db, 'payments', payment.id), {
        status: 'approved',
        approvedAt: new Date()
      });

      // 2. Update enrollment - find the enrollment for this user/course
      const enrollmentQuery = query(
        collection(db, 'enrollmentPlans'),
        where('userId', '==', payment.userId),
        where('courseId', '==', payment.courseId)
      );
      const enrollmentSnap = await getDocs(enrollmentQuery);

      if (!enrollmentSnap.empty) {
        const enrollmentDoc = enrollmentSnap.docs[0];
        const enrollmentData = enrollmentDoc.data();

        // Calculate new expiry date based on planType
        const now = new Date();
        const baseDate = enrollmentData.expiryDate?.toDate() > now ? enrollmentData.expiryDate.toDate() : now;
        const newExpiry = new Date(baseDate);

        if (enrollmentData.planType === 'monthly') {
          newExpiry.setMonth(newExpiry.getMonth() + 1);
        } else if (enrollmentData.planType === 'yearly') {
          newExpiry.setFullYear(newExpiry.getFullYear() + 1);
        } else {
          // Onetime - maybe set a very far date or just keep current
          newExpiry.setFullYear(newExpiry.getFullYear() + 10);
        }

        await updateDoc(doc(db, 'enrollmentPlans', enrollmentDoc.id), {
          blocked: false,
          expiryDate: newExpiry,
          paymentStatus: 'paid'
        });

        // 3. Unblock user globally
        if (payment.userId) {
          await updateDoc(doc(db, 'users', payment.userId), {
            blocked: false
          });
        }
      }

      alert('Payment approved successfully!');
      fetchEnrollments(selectedCourse);
      fetchPendingPayments(selectedCourse);
      setReceiptModal({ isOpen: false, url: '', payment: null });
    } catch (error) {
      console.error('Error approving payment:', error);
      alert('Failed to approve payment.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date || !(date instanceof Date)) return 'N/A';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleBlockToggle = async (enrollmentId, userId, isBlocked) => {
    try {
      // 1. Update the specific enrollment plan
      await updateDoc(doc(db, 'enrollmentPlans', enrollmentId), {
        blocked: isBlocked
      });

      // 2. Also update the global user document for a more robust block
      if (userId) {
        await updateDoc(doc(db, 'users', userId), {
          blocked: isBlocked
        });
      }

      // 3. Update local state
      setEnrollments(prev => prev.map(enrollment =>
        enrollment.id === enrollmentId
          ? { ...enrollment, blocked: isBlocked }
          : enrollment
      ));
    } catch (error) {
      console.error('Error updating block status:', error);
      alert('Failed to update block status. Please try again.');
    }
  };

  const handleExtendSubscription = async () => {
    if (!extendModal.enrollment || extendModal.months < 1) return;

    try {
      const enrollment = extendModal.enrollment;
      const currentExpiryDate = enrollment.expiryDate?.toDate() || new Date();
      const newExpiryDate = new Date(currentExpiryDate);
      newExpiryDate.setMonth(newExpiryDate.getMonth() + extendModal.months);

      // Update the enrollment plan with new expiry date
      await updateDoc(doc(db, 'enrollmentPlans', enrollment.id), {
        expiryDate: newExpiryDate,
        lastExtendedDate: new Date(),
        extendedBy: 'admin',
        extensionMonths: extendModal.months,
        blocked: false // Unblock the user when extending
      });

      // Create a payment record for the extension
      await addDoc(collection(db, 'payments'), {
        userId: enrollment.userId,
        userEmail: enrollment.user.email,
        courseId: enrollment.courseId,
        amount: extendModal.months * 6500, // Assuming ₦6,500 per month
        status: 'approved', // Admin extensions are auto-approved
        submittedAt: new Date(),
        type: 'extension',
        isRenewal: false,
        extendedBy: 'admin',
        extensionMonths: extendModal.months
      });

      // Update local state
      setEnrollments(prev => prev.map(enrollmentItem =>
        enrollmentItem.id === enrollment.id
          ? {
            ...enrollmentItem,
            expiryDate: newExpiryDate,
            dueDate: newExpiryDate,
            nextPaymentDate: newExpiryDate,
            blocked: false // Update blocked status in local state
          }
          : enrollmentItem
      ));

      alert(`Subscription extended by ${extendModal.months} month(s) successfully!`);
      setExtendModal({ isOpen: false, enrollment: null, months: 1 });
    } catch (error) {
      console.error('Error extending subscription:', error);
      alert('Failed to extend subscription. Please try again.');
    }
  };

  const handleChangePlan = async () => {
    if (!changePlanModal.enrollment || !changePlanModal.newPlan) return;

    try {
      const enrollment = changePlanModal.enrollment;
      const newPlan = changePlanModal.newPlan;

      // Update the enrollment planType in Firestore
      await updateDoc(doc(db, 'enrollmentPlans', enrollment.id), {
        planType: newPlan,
        planChangedAt: new Date(),
        planChangedBy: 'admin'
      });

      // Update local state
      setEnrollments(prev => prev.map(enrollmentItem =>
        enrollmentItem.id === enrollment.id
          ? { ...enrollmentItem, planType: newPlan }
          : enrollmentItem
      ));

      alert('Student plan updated successfully!');
      setChangePlanModal({ isOpen: false, enrollment: null, newPlan: '' });
    } catch (error) {
      console.error('Error changing plan:', error);
      alert('Failed to change plan. Please try again.');
    }
  };

  const openChangePlanModal = (enrollment) => {
    setChangePlanModal({
      isOpen: true,
      enrollment,
      newPlan: enrollment.planType || 'monthly'
    });
  };

  const closeChangePlanModal = () => {
    setChangePlanModal({
      isOpen: false,
      enrollment: null,
      newPlan: ''
    });
  };

  const openPaymentHistory = (enrollment) => {
    const course = courses.find(c => c.id === selectedCourse);
    setPaymentHistoryModal({
      isOpen: true,
      userId: enrollment.userId, // Use the actual userId from enrollmentPlans
      userName: enrollment.user.fullName,
      courseId: selectedCourse,
      courseName: course?.title || 'Unknown Course'
    });
  };

  const closePaymentHistory = () => {
    setPaymentHistoryModal({
      isOpen: false,
      userId: null,
      userName: '',
      courseId: '',
      courseName: ''
    });
  };

  const openExtendModal = (enrollment) => {
    setExtendModal({
      isOpen: true,
      enrollment: enrollment,
      months: 1
    });
  };

  const closeExtendModal = () => {
    setExtendModal({
      isOpen: false,
      enrollment: null,
      months: 1
    });
  };

  if (loading) {
    return (
      <div className="student-management">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading student data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="student-management">
      <div className="header">
        <h2>Student Management</h2>
        <p>View and manage enrolled students</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label htmlFor="course-select">Select Course:</label>
          <select
            id="course-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Choose a course...</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedCourse && (
        <div className="enrollments-list">
          {/* Pending Approvals Section */}
          {pendingPayments.length > 0 && (
            <div className="pending-approvals-section mb-8">
              <div className="table-header-premium pending">
                <h3>Pending Payment Approvals ({pendingPayments.length})</h3>
                <div className="flex items-center gap-4">
                  {selectedCourseData?.pricing && (
                    <div className="bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 text-xs font-semibold text-blue-700">
                      Pricing: ₦{selectedCourseData.pricing.monthly?.toLocaleString()} (M) / ₦{selectedCourseData.pricing.yearly?.toLocaleString()} (Y)
                    </div>
                  )}
                  <span className="badge-pulse">Needs Action</span>
                </div>
              </div>
              <div className="pending-grid">
                {pendingPayments.map(payment => (
                  <div key={payment.id} className="pending-card">
                    <div className="pending-info">
                      <strong>{payment.userEmail}</strong>
                      <span>₦{payment.amount?.toLocaleString()} ({payment.type || 'subscription'}{payment.planType ? ` - ${payment.planType}` : ''})</span>
                      <small>{payment.submittedAt?.toDate().toLocaleString()}</small>
                    </div>
                    <div className="pending-actions">
                      <button
                        className="view-receipt-btn"
                        onClick={() => setReceiptModal({ isOpen: true, url: payment.receiptURL, payment })}
                      >
                        View Receipt
                      </button>
                      <button
                        className="approve-btn"
                        onClick={() => approvePayment(payment)}
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="table-header-premium">
            <h3>Enrolled Students ({enrollments.length})</h3>
          </div>

          {enrollments.length === 0 ? (
            <div className="no-enrollments-card">
              <span className="icon">📂</span>
              <p>No students enrolled in this course yet.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="table-container desktop-only">
                <table>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Contact</th>
                      <th>Plan Info</th>
                      <th>Dates</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.map(enrollment => {
                      const plan = enrollment.planType ? enrollment.planType.toUpperCase() : 'FREE';
                      return (
                        <tr key={enrollment.id}>
                          <td>
                            <div className="student-info">
                              <span className="name">{enrollment.user.fullName}</span>
                              <span className="email">{enrollment.user.email}</span>
                            </div>
                          </td>
                          <td>
                            <div className="whatsapp-badge">
                              {enrollment.user.whatsappNumber}
                            </div>
                          </td>
                          <td>
                            <span className={`plan-tag ${enrollment.planType}`}>
                              {plan}
                            </span>
                          </td>
                          <td>
                            <div className="date-stack">
                              <span className="date-item"><strong>In:</strong> {formatDate(enrollment.enrollmentDate)}</span>
                              <span className="date-item"><strong>Due:</strong> {formatDate(enrollment.dueDate)}</span>
                            </div>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button onClick={() => openPaymentHistory(enrollment)} title="History">🕒</button>
                              <button onClick={() => openExtendModal(enrollment)} title="Extend">➕</button>
                              <button onClick={() => openChangePlanModal(enrollment)} title="Change Plan">📁</button>
                              <div className="block-toggle">
                                <input
                                  type="checkbox"
                                  checked={enrollment.blocked}
                                  onChange={(e) => handleBlockToggle(enrollment.id, enrollment.userId, e.target.checked)}
                                />
                                <span>Block</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="mobile-only student-cards">
                {enrollments.map(enrollment => (
                  <div key={enrollment.id} className="student-mobile-card">
                    <div className="card-header">
                      <div className="student-primary">
                        <h4>{enrollment.user.fullName}</h4>
                        <p>{enrollment.user.email}</p>
                      </div>
                      <span className={`plan-tag ${enrollment.planType}`}>
                        {enrollment.planType?.toUpperCase()}
                      </span>
                    </div>
                    <div className="card-body">
                      <div className="info-row">
                        <span>WhatsApp:</span>
                        <strong>{enrollment.user.whatsappNumber}</strong>
                      </div>
                      <div className="info-row">
                        <span>Due Date:</span>
                        <strong>{formatDate(enrollment.dueDate)}</strong>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button onClick={() => openPaymentHistory(enrollment)}>History</button>
                      <button onClick={() => openExtendModal(enrollment)}>Extend</button>
                      <button onClick={() => openChangePlanModal(enrollment)}>Plan</button>
                      <div className="block-control">
                        <span>Block:</span>
                        <input
                          type="checkbox"
                          checked={enrollment.blocked}
                          onChange={(e) => handleBlockToggle(enrollment.id, enrollment.userId, e.target.checked)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {!selectedCourse && (
        <div className="no-selection">
          <p>Please select a course to view enrolled students.</p>
        </div>
      )}

      <PaymentHistoryModal
        isOpen={paymentHistoryModal.isOpen}
        onClose={closePaymentHistory}
        userId={paymentHistoryModal.userId}
        userName={paymentHistoryModal.userName}
        courseId={paymentHistoryModal.courseId}
        courseName={paymentHistoryModal.courseName}
      />

      {/* Extend Subscription Modal */}
      {extendModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Extend Subscription for {extendModal.enrollment?.user.fullName}
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of months to extend:
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={extendModal.months}
                onChange={(e) => setExtendModal(prev => ({ ...prev, months: parseInt(e.target.value) || 1 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mb-4 p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                <strong>Current expiry:</strong> {extendModal.enrollment?.dueDate ? formatDate(extendModal.enrollment.dueDate) : 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>New expiry:</strong> {extendModal.enrollment?.dueDate ? (() => {
                  const previewDate = new Date(extendModal.enrollment.dueDate);
                  previewDate.setMonth(previewDate.getMonth() + extendModal.months);
                  return formatDate(previewDate);
                })() : 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Amount:</strong> ₦{(extendModal.months * 6500).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeExtendModal}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleExtendSubscription}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Extend Subscription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Plan Modal */}
      {changePlanModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              Change Plan for {changePlanModal.enrollment?.user.fullName}
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select New Plan Type:
              </label>
              <div className="space-y-3">
                {['monthly', 'yearly', 'onetime'].map((plan) => (
                  <label
                    key={plan}
                    className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${changePlanModal.newPlan === plan
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <input
                      type="radio"
                      name="newPlan"
                      value={plan}
                      checked={changePlanModal.newPlan === plan}
                      onChange={(e) => setChangePlanModal(prev => ({ ...prev, newPlan: e.target.value }))}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3 font-semibold text-gray-700 capitalize">
                      {plan === 'onetime' ? 'One-Time' : plan}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeChangePlanModal}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePlan}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold transition-colors shadow-lg shadow-blue-500/30"
              >
                Update Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Viewer Modal */}
      {receiptModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold">Payment Receipt</h3>
              <button
                onClick={() => setReceiptModal({ isOpen: false, url: '', payment: null })}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-gray-100 flex items-center justify-center">
              <img
                src={receiptModal.url}
                alt="Receipt"
                className="max-w-full h-auto shadow-2xl rounded-lg"
              />
            </div>
            <div className="p-4 border-t bg-gray-50 flex gap-4">
              <button
                onClick={() => approvePayment(receiptModal.payment)}
                className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
              >
                Approve Payment
              </button>
              <button
                onClick={() => setReceiptModal({ isOpen: false, url: '', payment: null })}
                className="px-6 bg-white border border-gray-300 rounded-xl font-bold hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;