import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './StudentManagement.css';

const StudentManagement = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(true);

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

        const enrollmentDate = enrollment.createdAt?.toDate() || new Date();
        const nextPaymentDate = new Date(enrollmentDate);
        nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1); // Assuming monthly payments

        enrollmentsData.push({
          id: enrollmentDoc.id,
          ...enrollment,
          user: userData,
          payment: paymentData,
          enrollmentDate,
          nextPaymentDate,
          dueDate: nextPaymentDate // Due date same as next payment for simplicity
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
                    <th>Payment Receipt</th>
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
                          {enrollment.payment?.receiptURL ? (
                            <a
                              href={enrollment.payment.receiptURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                            >
                              View Receipt
                            </a>
                          ) : enrollment.payment ? (
                            <span className="text-orange-600">
                              Receipt pending upload ({enrollment.payment.receiptFileName || 'No file'})
                            </span>
                          ) : (
                            <span className="text-gray-500">No receipt</span>
                          )}
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
    </div>
  );
};

export default StudentManagement;