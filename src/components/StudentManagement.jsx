import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc, updateDoc, addDoc } from 'firebase/firestore';
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

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchEnrollments(selectedCourse);
    }
  }, [selectedCourse]);

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
      const enrollmentsQuery = query(
        collection(db, 'enrollmentPlans'),
        where('courseId', '==', courseId)
      );
      const enrollmentsSnapshot = await getDocs(enrollmentsQuery);
      const enrollmentsData = [];

      for (const enrollmentDoc of enrollmentsSnapshot.docs) {
        const enrollment = enrollmentDoc.data();
        console.log('Enrollment data:', enrollment); // Debug log

        // Fetch user data
        const userDoc = await getDoc(doc(db, 'users', enrollment.userId));
        const userData = userDoc.exists() ? userDoc.data() : { fullName: 'Unknown', email: 'Unknown', whatsappNumber: 'Unknown' };

        // Fetch payment data
        const paymentsQuery = query(
          collection(db, 'payments'),
          where('userId', '==', enrollment.userId),
          where('courseId', '==', courseId)
        );
        const paymentsSnapshot = await getDocs(paymentsQuery);
        const paymentData = paymentsSnapshot.docs.length > 0 ? paymentsSnapshot.docs[0].data() : null;

        // Check for renewal payments
        const renewalPaymentsQuery = query(
          collection(db, 'payments'),
          where('userId', '==', enrollment.userId),
          where('courseId', '==', courseId),
          where('isRenewal', '==', true)
        );
        const renewalPaymentsSnapshot = await getDocs(renewalPaymentsQuery);
        const latestRenewalPayment = renewalPaymentsSnapshot.docs.length > 0 
          ? renewalPaymentsSnapshot.docs
              .map(doc => ({ id: doc.id, ...doc.data() }))
              .sort((a, b) => b.submittedAt.toDate() - a.submittedAt.toDate())[0]
          : null;

        const enrollmentDate = enrollment.createdAt?.toDate() || new Date();
        const expiryDate = enrollment.expiryDate?.toDate() || new Date(enrollmentDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // Default to 30 days if no expiry
        const nextPaymentDate = new Date(expiryDate);

        enrollmentsData.push({
          id: enrollmentDoc.id,
          ...enrollment,
          user: userData,
          payment: paymentData,
          enrollmentDate,
          expiryDate,
          dueDate: expiryDate, // Use actual expiry date
          nextPaymentDate,
          blocked: enrollment.blocked || false,
          latestRenewalPayment: latestRenewalPayment
        });
      }

      setEnrollments(enrollmentsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleBlockToggle = async (enrollmentId, isBlocked) => {
    try {
      await updateDoc(doc(db, 'enrollmentPlans', enrollmentId), {
        blocked: isBlocked
      });
      
      // Update local state
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
        extensionMonths: extendModal.months
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
              nextPaymentDate: newExpiryDate
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

  const openPaymentHistory = (enrollment) => {
    const course = courses.find(c => c.id === selectedCourse);
    setPaymentHistoryModal({
      isOpen: true,
      userId: enrollment.user.email, // Pass email instead of userId
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
        <div className="enrollments-table">
          <h3>Enrolled Students ({enrollments.length})</h3>
          {enrollments.length === 0 ? (
            <p className="no-enrollments">No students enrolled in this course yet.</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>WhatsApp Number</th>
                    <th>Plan</th>
                    <th>Enrollment Date</th>
                    <th>Due Date</th>
                    <th>Next Payment</th>
                    <th>Payment History</th>
                    <th>Extend Subscription</th>
                    <th>Block Access</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map(enrollment => {
                    const plan = enrollment.planType ? enrollment.planType.charAt(0).toUpperCase() + enrollment.planType.slice(1) : 'Free';
                    return (
                      <tr key={enrollment.id}>
                        <td>{enrollment.user.fullName}</td>
                        <td>{enrollment.user.email}</td>
                        <td>{enrollment.user.whatsappNumber}</td>
                        <td>{plan}</td>
                        <td>{formatDate(enrollment.enrollmentDate)}</td>
                        <td>{formatDate(enrollment.dueDate)}</td>
                        <td>{formatDate(enrollment.nextPaymentDate)}</td>
                        <td>
                          <button
                            onClick={() => openPaymentHistory(enrollment)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                          >
                            View History
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => openExtendModal(enrollment)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                          >
                            Extend
                          </button>
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={enrollment.blocked}
                            onChange={(e) => handleBlockToggle(enrollment.id, e.target.checked)}
                            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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
                <strong>New expiry:</strong> {extendModal.enrollment?.dueDate ? formatDate(new Date(extendModal.enrollment.dueDate.getTime() + (extendModal.months * 30 * 24 * 60 * 60 * 1000))) : 'N/A'}
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
    </div>
  );
};

export default StudentManagement;