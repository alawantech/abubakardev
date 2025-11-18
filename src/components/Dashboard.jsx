import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc, orderBy, deleteDoc } from 'firebase/firestore';
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userData, loading } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    whatsappNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [bankDetails, setBankDetails] = useState(null);
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [uploadingRenewal, setUploadingRenewal] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [updating, setUpdating] = useState(false);
  const [paymentCountdown, setPaymentCountdown] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    subscriptionDetails: true,
    extendSubscription: true,
    statsCards: true,
    enrolledCourses: true,
    browseMore: true,
    paymentHistory: true,
  });
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(false);

  const calculateDaysRemaining = (enrollment) => {
    if (!enrollment?.createdAt) return null;
    
    const enrolledAt = enrollment.createdAt;
    const planType = enrollment.planType;
    const months = planType === 'monthly' ? 1 : 12;
    
    const enrollmentDate = enrolledAt.toDate();
    const expiryDate = new Date(enrollmentDate);
    expiryDate.setMonth(expiryDate.getMonth() + months); // 1 month for monthly, 12 for others
    
    const today = new Date();
    const daysRemaining = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    
    return {
      days: daysRemaining,
      expiryDate: expiryDate.toLocaleDateString(),
    };
  };

  const calculateNextPayment = (enrolledAt, planType) => {
    if (planType !== 'monthly' || !enrolledAt) return null;
    
    const enrollmentDate = enrolledAt.toDate();
    const nextPaymentDate = new Date(enrollmentDate);
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
    
    const today = new Date();
    const daysUntilPayment = Math.ceil((nextPaymentDate - today) / (1000 * 60 * 60 * 24));
    
    return {
      date: nextPaymentDate.toLocaleDateString(),
      daysRemaining: daysUntilPayment > 0 ? daysUntilPayment : 0,
    };
  };

  useEffect(() => {
    // Check if redirected after successful payment
    if (location.state?.paymentSuccess) {
      setShowSuccessMessage(true);
      // Clear the state
      window.history.replaceState({}, document.title);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }

    if (!loading) {
      if (currentUser) {
        fetchEnrollments();
        fetchPaymentHistory();
        loadProfileData();
        fetchBankDetails();
      } else {
        navigate('/login', { state: { from: '/dashboard' } });
      }
    }
  }, [currentUser, loading, navigate, location.state]);

  // Refetch data when navigating back to dashboard
  useEffect(() => {
    if (!loading && currentUser) {
      fetchEnrollments();
      fetchPaymentHistory();
    }
  }, [location.pathname]); // Trigger when route changes

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Countdown timer for next payment
  useEffect(() => {
    // Only count paid enrollments for countdown
    const paidEnrollments = enrollments.filter(enrollment => {
      const hasPayment = enrollment.payment;
      const paymentStatus = enrollment.paymentStatus;
      const paymentApproved = enrollment.payment?.status === 'approved';
      return hasPayment && (paymentApproved || paymentStatus === 'paid');
    });

    if (paidEnrollments.length > 0 && paidEnrollments[0].planType === 'monthly') {
      const updateCountdown = () => {
        const nextPayment = calculateNextPayment(paidEnrollments[0].createdAt, 'monthly');
        if (nextPayment) {
          setPaymentCountdown(nextPayment.daysRemaining);
        }
      };

      // Update immediately
      updateCountdown();

      // Update every second
      const interval = setInterval(updateCountdown, 1000);

      return () => clearInterval(interval);
    }
  }, [enrollments]);

  const loadProfileData = async () => {
    if (userData) {
      setProfileData({
        fullName: userData.fullName || '',
        whatsappNumber: userData.whatsappNumber || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
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

  const handleRenewalFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }
      setPaymentReceipt(file);
      const reader = new FileReader();
      reader.onload = (e) => setReceiptPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRenewalSubmit = async () => {
    if (!paymentReceipt) return;

    setUploadingRenewal(true);
    try {
      // Upload receipt to Firebase Storage
      const storageRef = ref(storage, `renewal-payments/${currentUser.uid}/${Date.now()}_${paymentReceipt.name}`);
      await uploadBytes(storageRef, paymentReceipt);
      const receiptURL = await getDownloadURL(storageRef);

      // Create renewal payment record
      const renewalData = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        courseId: enrollments[0].courseId,
        receiptURL,
        amount: 6500,
        status: 'pending',
        submittedAt: new Date(),
        type: 'renewal'
      };

      await addDoc(collection(db, 'payments'), renewalData);

      // Update enrollment plans to unblock user
      const enrollmentPlansQuery = query(
        collection(db, 'enrollmentPlans'),
        where('userId', '==', currentUser.uid)
      );
      const plansSnapshot = await getDocs(enrollmentPlansQuery);
      
      const updatePromises = plansSnapshot.docs.map(async (planDoc) => {
        const planData = planDoc.data();
        const newExpiryDate = new Date(planData.expiryDate?.toDate() || new Date());
        newExpiryDate.setMonth(newExpiryDate.getMonth() + 1); // Extend by 1 month
        
        await updateDoc(doc(db, 'enrollmentPlans', planDoc.id), {
          blocked: false,
          expiryDate: newExpiryDate,
          lastRenewalDate: new Date()
        });
      });

      await Promise.all(updatePromises);

      alert('Renewal payment submitted successfully! Your access will be restored once payment is verified.');
      setPaymentReceipt(null);
      setReceiptPreview(null);
      // Refresh enrollments
      fetchEnrollments();
    } catch (error) {
      console.error('Error submitting renewal:', error);
      alert('Failed to submit renewal payment. Please try again.');
    } finally {
      setUploadingRenewal(false);
    }
  };

  const fetchEnrollments = async () => {
    try {
      // Fetch enrollments from enrollmentPlans collection
      const enrollmentsQuery = query(
        collection(db, 'enrollmentPlans'),
        where('userId', '==', currentUser.uid)
      );
      
      const enrollmentsSnapshot = await getDocs(enrollmentsQuery);
      console.log('Dashboard: Found enrollment plans:', enrollmentsSnapshot.size);
      
      const enrollmentsData = await Promise.all(
        enrollmentsSnapshot.docs.map(async (enrollmentDoc) => {
          const enrollmentData = enrollmentDoc.data();
          console.log('Dashboard: Enrollment data:', enrollmentDoc.id, enrollmentData);
          
          // Fetch course details
          const courseDoc = await getDoc(doc(db, 'courses', enrollmentData.courseId));
          const courseData = courseDoc.exists() ? courseDoc.data() : null;
          
          // Fetch payment data
          const paymentsQuery = query(
            collection(db, 'payments'),
            where('userId', '==', currentUser.uid),
            where('courseId', '==', enrollmentData.courseId)
          );
          const paymentsSnapshot = await getDocs(paymentsQuery);
          const paymentData = paymentsSnapshot.docs.length > 0 ? paymentsSnapshot.docs[0].data() : null;
          
          return {
            id: enrollmentDoc.id,
            ...enrollmentData,
            course: courseData,
            payment: paymentData,
            enrolledAt: enrollmentData.createdAt,
            courseName: courseData?.title || 'Unknown Course',
            customerEmail: currentUser.email,
            blocked: enrollmentData.blocked || false
          };
        })
      );
      
      // Deduplicate enrollments by courseId, prioritizing paid enrollments
      const deduplicatedEnrollments = enrollmentsData.reduce((acc, enrollment) => {
        const existing = acc.find(e => e.courseId === enrollment.courseId);
        
        if (!existing) {
          // No existing enrollment for this course, add it
          acc.push(enrollment);
        } else {
          // Existing enrollment found, decide which one to keep
          const existingIsPaid = existing.payment && (existing.payment.status === 'approved' || existing.paymentStatus === 'paid');
          const currentIsPaid = enrollment.payment && (enrollment.payment.status === 'approved' || enrollment.paymentStatus === 'paid');
          
          if (currentIsPaid && !existingIsPaid) {
            // Current is paid, existing is not - replace with current
            const index = acc.indexOf(existing);
            acc[index] = enrollment;
          } else if (!currentIsPaid && !existingIsPaid) {
            // Both are unpaid, keep the more recent one
            const existingDate = existing.createdAt?.toDate() || new Date(0);
            const currentDate = enrollment.createdAt?.toDate() || new Date(0);
            if (currentDate > existingDate) {
              const index = acc.indexOf(existing);
              acc[index] = enrollment;
            }
          }
          // If existing is paid, keep it (don't replace with unpaid)
        }
        
        return acc;
      }, []);
      
      // Clean up duplicate enrollment plans (run in background)
      const cleanupDuplicates = async () => {
        try {
          const keptIds = new Set(deduplicatedEnrollments.map(e => e.id));
          const duplicates = enrollmentsData.filter(e => !keptIds.has(e.id));
          
          if (duplicates.length > 0) {
            console.log('Dashboard: Cleaning up duplicate enrollment plans:', duplicates.map(d => d.id));
            
            const deletePromises = duplicates.map(async (duplicate) => {
              try {
                await deleteDoc(doc(db, 'enrollmentPlans', duplicate.id));
                console.log('Dashboard: Deleted duplicate enrollment plan:', duplicate.id);
              } catch (error) {
                console.error('Dashboard: Failed to delete duplicate enrollment plan:', duplicate.id, error);
              }
            });
            
            await Promise.all(deletePromises);
          }
        } catch (error) {
          console.error('Dashboard: Error during duplicate cleanup:', error);
        }
      };
      
      // Run cleanup in background (don't await)
      cleanupDuplicates();
      
      console.log('Dashboard: Final enrollments data:', deduplicatedEnrollments);
      setEnrollments(deduplicatedEnrollments);
      setDashboardLoading(false);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      setDashboardLoading(false);
    }
  };

  const fetchPaymentHistory = async () => {
    if (!currentUser) return;

    setLoadingPayments(true);
    try {
      // Fetch payments from 'payments' collection (renewals, extensions)
      // Query by both userId (for existing payments) and userEmail (for consistency)
      const paymentsQuery1 = query(
        collection(db, 'payments'),
        where('userId', '==', currentUser.uid)
      );

      const paymentsQuery2 = query(
        collection(db, 'payments'),
        where('userEmail', '==', currentUser.email)
      );

      const [paymentsSnapshot1, paymentsSnapshot2] = await Promise.all([
        getDocs(paymentsQuery1),
        getDocs(paymentsQuery2)
      ]);

      const paymentsData1 = paymentsSnapshot1.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        submittedAt: doc.data().submittedAt?.toDate(),
        source: 'payments_uid'
      }));

      const paymentsData2 = paymentsSnapshot2.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        submittedAt: doc.data().submittedAt?.toDate(),
        source: 'payments_email'
      }));

      // Combine and deduplicate payments
      const paymentsData = [...paymentsData1, ...paymentsData2].filter(
        (payment, index, self) => 
          index === self.findIndex(p => p.id === payment.id)
      );

      // Fetch enrollment payments from 'enrollments' collection (initial payments)
      const enrollmentsQuery = query(
        collection(db, 'enrollments'),
        where('customerEmail', '==', currentUser.email)
      );

      const enrollmentsSnapshot = await getDocs(enrollmentsQuery);
      const enrollmentPaymentsData = enrollmentsSnapshot.docs
        .filter(doc => doc.data().amount && doc.data().enrolledAt) // Only include paid enrollments
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            userId: currentUser.uid,
            userEmail: currentUser.email,
            amount: data.amount,
            status: data.paymentStatus || 'approved',
            submittedAt: data.enrolledAt?.toDate(),
            type: 'enrollment',
            receiptURL: null, // Enrollments don't have receipt URLs in this format
            source: 'enrollments', // Mark source for debugging
            transactionId: data.transactionId,
            paymentReference: data.paymentReference,
            courseId: data.courseId
          };
        });

      // Combine and sort all payments by date (newest first)
      const allPayments = [...paymentsData, ...enrollmentPaymentsData]
        .sort((a, b) => {
          if (!a.submittedAt && !b.submittedAt) return 0;
          if (!a.submittedAt) return 1;
          if (!b.submittedAt) return -1;
          return b.submittedAt - a.submittedAt;
        });

      setPaymentHistory(allPayments);
    } catch (error) {
      console.error('Error fetching payment history:', error);
    } finally {
      setLoadingPayments(false);
    }
  };

  const isUserBlocked = (() => {
    // Only consider paid enrollments for blocking logic
    const paidEnrollments = enrollments.filter(enrollment => {
      const hasPayment = enrollment.payment;
      const paymentStatus = enrollment.paymentStatus;
      const paymentApproved = enrollment.payment?.status === 'approved';
      return hasPayment && (paymentApproved || paymentStatus === 'paid');
    });
    return paidEnrollments.some(enrollment => enrollment.blocked);
  })();

  // Show renewal screen if user is blocked
  if (isUserBlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
        {/* Spacer for fixed header */}
        <div className="h-36"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Blocked Message */}
          <div className="text-center mb-8">
            <div className="inline-block p-6 bg-red-100 rounded-full mb-6">
              <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Subscription Expired</h1>
            <p className="text-xl text-gray-600 mb-8">
              Your subscription has expired. Please renew your payment to continue accessing your courses.
            </p>
          </div>

          {/* Renewal Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Renew Your Subscription</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Bank Transfer Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="font-semibold text-gray-900">₦6,500</p>
                  </div>
                  {bankDetails?.branch && (
                    <div>
                      <p className="text-sm text-gray-600">Branch</p>
                      <p className="font-semibold text-gray-900">{bankDetails.branch}</p>
                    </div>
                  )}
                  {bankDetails?.swiftCode && (
                    <div>
                      <p className="text-sm text-gray-600">SWIFT Code</p>
                      <p className="font-semibold text-gray-900">{bankDetails.swiftCode}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Payment Instructions</h3>
                <ol className="space-y-2 text-blue-800">
                  <li>1. Transfer ₦6,500 to the account details above</li>
                  <li>2. Take a screenshot of your payment receipt</li>
                  <li>3. Upload your receipt below for verification</li>
                  <li>4. Your access will be restored once payment is verified</li>
                </ol>
              </div>

              {/* Payment Receipt Upload */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-900 mb-4">Upload Payment Receipt</h3>
                <p className="text-sm text-green-800 mb-6">
                  After making the bank transfer, please upload a screenshot or photo of your payment receipt.
                </p>

                <div className="space-y-4">
                  {/* Upload Area */}
                  <div
                    onClick={() => document.getElementById('renewal-receipt-upload').click()}
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

                  {/* Hidden File Input */}
                  <input
                    id="renewal-receipt-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleRenewalFileChange}
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
                onClick={handleRenewalSubmit}
                disabled={!paymentReceipt || uploadingRenewal}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl disabled:shadow-none transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-3 text-lg cursor-pointer disabled:cursor-not-allowed"
              >
                {uploadingRenewal ? (
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

              <p className="text-xs text-gray-500 text-center">
                🔒 Your payment receipt will be securely stored and reviewed by our team
              </p>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-bold text-indigo-900 mb-2">Need Help?</h3>
            <p className="text-indigo-700 mb-4">
              Contact our support team if you have any questions about your payment.
            </p>
            <p className="text-sm text-indigo-600">
              Email: support@abubakardev.com | WhatsApp: +234 123 456 7890
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdateError('');
    setUpdateMessage('');
    setUpdating(true);

    try {
      // Update name and WhatsApp in Firestore
      await updateDoc(doc(db, 'users', currentUser.uid), {
        fullName: profileData.fullName,
        whatsappNumber: profileData.whatsappNumber,
      });

      // Update Firebase Auth display name
      await updateProfile(currentUser, {
        displayName: profileData.fullName,
      });

      // Update password if provided
      if (profileData.newPassword) {
        if (!profileData.currentPassword) {
          setUpdateError('Current password is required to change password');
          setUpdating(false);
          return;
        }

        if (profileData.newPassword !== profileData.confirmPassword) {
          setUpdateError('New passwords do not match');
          setUpdating(false);
          return;
        }

        if (profileData.newPassword.length < 6) {
          setUpdateError('Password must be at least 6 characters');
          setUpdating(false);
          return;
        }

        // Re-authenticate before changing password
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          profileData.currentPassword
        );
        
        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, profileData.newPassword);
        
        // Clear password fields
        setProfileData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
      }

      setUpdateMessage('Profile updated successfully!');
      setTimeout(() => {
        setShowProfileEdit(false);
        setUpdateMessage('');
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.code === 'auth/wrong-password') {
        setUpdateError('Current password is incorrect');
      } else if (error.code === 'auth/requires-recent-login') {
        setUpdateError('Please log out and log in again before changing password');
      } else {
        setUpdateError('Failed to update profile: ' + error.message);
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Spacer for fixed header */}
      <div className="h-36"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Success Message */}
        {showSuccessMessage && location.state?.message && (
          <div className="mb-8 animate-fade-in">
            <div className={`rounded-2xl p-6 shadow-xl border-2 ${
              location.state.paymentSuccess 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' 
                : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-300'
            } transform transition-all duration-500 hover:shadow-2xl`}>
              <div className="flex items-center gap-4">
                {location.state.paymentSuccess ? (
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">
                    {location.state.paymentSuccess ? '🎉 Payment Successful!' : '⚠️ Payment Issue'}
                  </h3>
                  <p className="text-gray-700">{location.state.message}</p>
                  {location.state.reference && (
                    <p className="text-sm text-gray-600 mt-1">Reference: {location.state.reference}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Header */}
        <div className="mb-8 flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {userData?.fullName || currentUser.email}! 👋
            </h1>
            <p className="text-gray-600 text-lg">Track your progress and continue learning</p>
          </div>
          
          {/* Desktop Edit Profile Button */}
          <div className="hidden md:block">
            <button
              onClick={() => setShowProfileEdit(!showProfileEdit)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {showProfileEdit ? 'Close Profile' : 'Edit Profile'}
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden relative mobile-menu-container">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-indigo-300 transition-all duration-300"
              aria-label="Toggle dashboard menu"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="absolute right-0 top-14 w-80 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 z-50 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Dashboard Menu</h3>
                  
                  {/* Profile Section */}
                  <div className="mb-6 pb-4 border-b border-gray-200">
                    <button
                      onClick={() => {
                        setShowProfileEdit(!showProfileEdit);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 border border-indigo-200"
                    >
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-semibold text-gray-900">
                        {showProfileEdit ? 'Close Profile' : 'Edit Profile'}
                      </span>
                    </button>
                  </div>

                  {/* Section Visibility Toggles */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Show/Hide Sections</h4>
                    
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="font-medium text-gray-900">Subscription Details</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibleSections.subscriptionDetails}
                        onChange={(e) => setVisibleSections(prev => ({...prev, subscriptionDetails: e.target.checked}))}
                        className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                      />
                    </label>

                    {enrollments.length > 0 && enrollments[0].enrollmentPlan?.planType === 'monthly' && !isUserBlocked && (
                      <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span className="font-medium text-gray-900">Extend Subscription</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={visibleSections.extendSubscription}
                          onChange={(e) => setVisibleSections(prev => ({...prev, extendSubscription: e.target.checked}))}
                          className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                        />
                      </label>
                    )}

                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="font-medium text-gray-900">Statistics</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibleSections.statsCards}
                        onChange={(e) => setVisibleSections(prev => ({...prev, statsCards: e.target.checked}))}
                        className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="font-medium text-gray-900">My Courses</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibleSections.enrolledCourses}
                        onChange={(e) => setVisibleSections(prev => ({...prev, enrolledCourses: e.target.checked}))}
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="font-medium text-gray-900">Browse More</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibleSections.browseMore}
                        onChange={(e) => setVisibleSections(prev => ({...prev, browseMore: e.target.checked}))}
                        className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-6 0l6 6m2-10h-1a2 2 0 00-2 2v10a2 2 0 002 2h1m-6-4h4" />
                        </svg>
                        <span className="font-medium text-gray-900">Payment History</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={visibleSections.paymentHistory}
                        onChange={(e) => setVisibleSections(prev => ({...prev, paymentHistory: e.target.checked}))}
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                    </label>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          navigate('/courses');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 font-semibold"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Browse Courses
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Edit Section */}
        {showProfileEdit && (
          <div className="mb-8 bg-white rounded-3xl shadow-xl p-8 border-2 border-indigo-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
            
            {/* Profile Info Display */}
            <div className="grid md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Full Name</label>
                <p className="text-lg text-gray-900">{userData?.fullName || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Email (Cannot be changed)</label>
                <p className="text-lg text-gray-900">{currentUser.email}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">WhatsApp Number</label>
                <p className="text-lg text-gray-900">{userData?.whatsappNumber || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Account Created</label>
                <p className="text-lg text-gray-900">
                  {userData?.createdAt?.toDate().toLocaleDateString() || 'N/A'}
                </p>
              </div>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    value={profileData.whatsappNumber}
                    onChange={(e) => setProfileData({...profileData, whatsappNumber: e.target.value})}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Change Password (Optional)</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Password {profileData.newPassword && '*'}
                    </label>
                    <input
                      type="password"
                      value={profileData.currentPassword}
                      onChange={(e) => setProfileData({...profileData, currentPassword: e.target.value})}
                      required={!!profileData.newPassword}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={profileData.newPassword}
                      onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="Min 6 characters"
                      minLength={6}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={profileData.confirmPassword}
                      onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="Re-enter new password"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {profileData.newPassword 
                    ? 'Current password is required to change your password'
                    : 'Leave password fields empty if you don\'t want to change your password'
                  }
                </p>
              </div>

              {updateError && (
                <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-xl">
                  {updateError}
                </div>
              )}

              {updateMessage && (
                <div className="bg-green-50 border-2 border-green-200 text-green-800 px-4 py-3 rounded-xl">
                  {updateMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={updating}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        )}

        {/* Enrollment Plan Details */}
        {visibleSections.subscriptionDetails && (() => {
          // Only show subscription details for paid enrollments
          const paidEnrollments = enrollments.filter(enrollment => {
            const hasPayment = enrollment.payment;
            const paymentStatus = enrollment.paymentStatus;
            const paymentApproved = enrollment.payment?.status === 'approved';
            return hasPayment && (paymentApproved || paymentStatus === 'paid');
          });

          return paidEnrollments.length > 0 && (
            <div className="mb-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl shadow-xl p-8 border-2 border-indigo-200 transform transition-all duration-500 hover:shadow-2xl animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">📋</span>
                </div>
                Subscription Details
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Plan Type */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-2xl">💼</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600">Plan Type</h3>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600 capitalize">
                    {paidEnrollments[0].planType}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {paidEnrollments[0].planType === 'monthly' ? 'Billed Monthly' : 'One-time Payment'}
                  </p>
                </div>

                {/* Status */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-2xl">📊</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-600">Status</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {isUserBlocked ? 'Blocked' : 'Active'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {isUserBlocked ? 'Payment required' : 'Access granted'}
                  </p>
                </div>

                {/* Next Payment - Only for monthly plans */}
                {paidEnrollments[0].planType === 'monthly' && (
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-2xl">⏰</span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-600">Next Payment</h3>
                    </div>
                    <p className="text-2xl font-bold text-orange-600">
                      {(() => {
                        const nextPayment = calculateNextPayment(paidEnrollments[0].createdAt, 'monthly');
                        return nextPayment ? nextPayment.date : 'N/A';
                      })()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {paymentCountdown > 0 ? `${paymentCountdown} days remaining` : 'Due today'}
                    </p>
                  </div>
                )}
              </div>

              {/* Enrollment Date */}
              <div className="mt-6 pt-6 border-t border-indigo-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Enrolled on:</span> {' '}
                  {paidEnrollments[0].createdAt?.toDate().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          );
        })()}

        {/* Pay Ahead / Extend Subscription */}
        {visibleSections.extendSubscription && (() => {
          // Only show extend subscription for paid enrollments
          const paidEnrollments = enrollments.filter(enrollment => {
            const hasPayment = enrollment.payment;
            const paymentStatus = enrollment.paymentStatus;
            const paymentApproved = enrollment.payment?.status === 'approved';
            return hasPayment && (paymentApproved || paymentStatus === 'paid');
          });

          return paidEnrollments.length > 0 && paidEnrollments[0].planType === 'monthly' && !isUserBlocked && (() => {
            const nextPayment = calculateNextPayment(paidEnrollments[0].createdAt, 'monthly');
            return nextPayment && nextPayment.daysRemaining <= 3;
          })() && (
            <div className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl p-8 border-2 border-green-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Extend Your Subscription
              </h2>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-gray-700 mb-4">
                  Pay ahead to extend your subscription and ensure uninterrupted access to your courses. 
                  Your current subscription will automatically continue when it expires.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Current Status</h3>
                    <p className="text-sm text-gray-600">
                      {(() => {
                        const nextPayment = calculateNextPayment(paidEnrollments[0].enrolledAt, 'monthly');
                        return nextPayment ? 
                          `Next payment due: ${nextPayment.date} (${nextPayment.daysRemaining} days)` : 
                          'Payment information not available';
                      })()}
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h3 className="font-semibold text-green-900 mb-2">Pay Ahead Benefits</h3>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• No interruption in learning</li>
                      <li>• Automatic subscription renewal</li>
                      <li>• Peace of mind</li>
                    </ul>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate('/extend-subscription')}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:from-green-700 focus:to-emerald-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl focus:shadow-2xl transform hover:scale-105 focus:scale-105 cursor-pointer focus:ring-4 focus:ring-green-300 focus:outline-none flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Pay Ahead & Extend Subscription
                </button>
              </div>
            </div>
          );
        })()}

        {/* Stats Cards */}
        {visibleSections.statsCards && (() => {
          // Only count paid enrollments for stats
          const paidEnrollments = enrollments.filter(enrollment => {
            const hasPayment = enrollment.payment;
            const paymentStatus = enrollment.paymentStatus;
            const paymentApproved = enrollment.payment?.status === 'approved';
            return hasPayment && (paymentApproved || paymentStatus === 'paid');
          });

          return (
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500 transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-semibold mb-1">Total Courses</p>
                    <p className="text-3xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">{paidEnrollments.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-300">
                    <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-semibold mb-1">Active</p>
                    <p className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                      {paidEnrollments.filter(e => {
                        const remaining = calculateDaysRemaining(e);
                        return remaining && remaining.days > 0;
                      }).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-semibold mb-1">Certificates</p>
                    <p className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">0</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Enrolled Courses */}
        {visibleSections.enrolledCourses && (() => {
          // Separate enrollments into paid and unpaid
          const paidEnrollments = enrollments.filter(enrollment => {
            // Check if payment is completed (receipt uploaded)
            const hasPayment = enrollment.payment;
            const paymentStatus = enrollment.paymentStatus;
            const paymentApproved = enrollment.payment?.status === 'approved';
            
            // Consider paid if: payment exists AND (status is approved OR paymentStatus is 'paid')
            return hasPayment && (paymentApproved || paymentStatus === 'paid');
          });
          
          const unpaidEnrollments = enrollments.filter(enrollment => {
            const hasPayment = enrollment.payment;
            const paymentStatus = enrollment.paymentStatus;
            const paymentApproved = enrollment.payment?.status === 'approved';
            
            // Consider unpaid if: no payment OR payment not approved AND paymentStatus not 'paid'
            return !hasPayment || (!paymentApproved && paymentStatus !== 'paid');
          });

          return (
            <div>
              {/* Paid Courses */}
              {paidEnrollments.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Active Courses</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paidEnrollments.map((enrollment) => {
                      const remaining = calculateDaysRemaining(enrollment);
                      const isExpired = remaining && remaining.days <= 0;
                      
                      return (
                        <div
                          key={enrollment.id}
                          className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-indigo-300 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1 group"
                        >
                          {enrollment.course?.featuredImage && (
                            <div className="h-48 overflow-hidden">
                              <img
                                src={enrollment.course.featuredImage}
                                alt={enrollment.courseName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          
                          <div className="p-6">
                            <h3 className="font-bold text-xl text-gray-900 mb-2">
                              {enrollment.courseName}
                            </h3>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                </svg>
                                <span>Enrolled: {enrollment.createdAt?.toDate().toLocaleDateString()}</span>
                              </div>
                              {remaining && (
                                <div className={`flex items-center gap-2 text-sm ${isExpired ? 'text-red-600' : 'text-green-600'}`}>
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                                  </svg>
                                  <span>
                                    {isExpired 
                                      ? `Expired on ${remaining.expiryDate}` 
                                      : `${remaining.days} days remaining`
                                    }
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <button
                              onClick={() => navigate(`/course/${enrollment.courseId}/learn`)}
                              disabled={isExpired}
                              className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                                isExpired
                                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg'
                              }`}
                            >
                              {isExpired ? 'Access Expired' : 'Continue Learning →'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Pending Payment Courses */}
              {unpaidEnrollments.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Pending Payment</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {unpaidEnrollments.map((enrollment) => (
                      <div
                        key={enrollment.id}
                        className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-300"
                      >
                        {enrollment.course?.featuredImage && (
                          <div className="h-48 overflow-hidden relative">
                            <img
                              src={enrollment.course.featuredImage}
                              alt={enrollment.courseName}
                              className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute inset-0 bg-yellow-500 bg-opacity-20 flex items-center justify-center">
                              <div className="bg-yellow-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                                Payment Required
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="p-6">
                          <h3 className="font-bold text-xl text-gray-900 mb-2">
                            {enrollment.courseName}
                          </h3>
                          
                          <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                              </svg>
                              <span className="font-semibold text-yellow-800">Payment Required</span>
                            </div>
                            <p className="text-sm text-yellow-700 mb-3">
                              Complete your payment to access this course. Upload your payment receipt below.
                            </p>
                            
                            {/* Bank Details */}
                            {bankDetails && (
                              <div className="bg-white rounded-lg p-3 mb-3 border border-yellow-200">
                                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Bank Transfer Details</h4>
                                <div className="text-xs text-gray-600 space-y-1">
                                  <div><strong>Bank:</strong> {bankDetails.bankName || 'Access Bank'}</div>
                                  <div><strong>Account Name:</strong> {bankDetails.accountName || 'Abubakar Dev'}</div>
                                  <div><strong>Account Number:</strong> {bankDetails.accountNumber || '1234567890'}</div>
                                  <div><strong>Amount:</strong> ₦{enrollment.planAmount?.toLocaleString() || '30,000'}</div>
                                </div>
                              </div>
                            )}

                            {/* Upload Receipt Button */}
                            <button
                              onClick={() => navigate(`/course/${enrollment.courseId}/payment`, {
                                state: {
                                  plan: {
                                    type: enrollment.planType,
                                    amount: enrollment.planAmount,
                                    courseName: enrollment.courseName,
                                    courseId: enrollment.courseId
                                  },
                                  userId: currentUser.uid,
                                  customerName: userData?.fullName || currentUser.email,
                                  customerEmail: currentUser.email,
                                  customerPhone: userData?.whatsappNumber || ''
                                }
                              })}
                              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                              Complete Payment & Upload Receipt
                            </button>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                            </svg>
                            <span>Enrolled: {enrollment.createdAt?.toDate().toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Courses Message */}
              {enrollments.length === 0 && (
                <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                  <div className="inline-block p-6 bg-gray-100 rounded-full mb-6">
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">No Courses Yet</h2>
                  <p className="text-gray-600 mb-8 text-lg">Start your learning journey by enrolling in a course!</p>
                  <button
                    onClick={() => navigate('/courses')}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Browse Courses
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* Browse More Courses */}
        {visibleSections.browseMore && (
          <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center border-2 border-indigo-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Want to Learn More?</h3>
            <p className="text-gray-600 mb-6">Explore our catalog and enroll in more courses</p>
            <button
              onClick={() => navigate('/courses')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse All Courses
            </button>
          </div>
        )}

        {/* Payment History */}
        {visibleSections.paymentHistory && (
          <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-xl p-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl">💳</span>
              </div>
              Payment History
            </h2>

            {loadingPayments ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-600">Loading payment history...</span>
              </div>
            ) : paymentHistory.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-block p-6 bg-gray-100 rounded-full mb-6">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-6 0l6 6m2-10h-1a2 2 0 00-2 2v10a2 2 0 002 2h1m-6-4h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Payment History</h3>
                <p className="text-gray-600">Your payment transactions will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {(() => {
                  // Generate monthly history data similar to PaymentHistoryModal
                  const generateMonthlyHistory = () => {
                    const monthlyData = {};
                    
                    paymentHistory.forEach(payment => {
                      if (!payment.submittedAt) return;
                      
                      let coveredMonths = [];
                      
                      if (payment.type === 'enrollment') {
                        // For enrollment payments, find the enrollment and calculate covered months
                        const enrollment = enrollments.find(e => e.customerEmail === payment.userEmail);
                        if (enrollment && enrollment.enrolledAt) {
                          const enrolledDate = enrollment.enrolledAt.toDate();
                          const planType = enrollment.enrollmentPlan?.planType;
                          
                          if (planType === 'monthly') {
                            // Monthly plan: covers current month + future months based on payment
                            const paymentAmount = payment.amount || 0;
                            const monthsCovered = Math.floor(paymentAmount / 6500); // Assuming ₦6,500 per month
                            
                            for (let i = 0; i < monthsCovered; i++) {
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
                        }
                      } else if (payment.type === 'renewal' || payment.type === 'extension') {
                        // For renewal/extension payments, calculate which months they cover
                        const enrollment = enrollments.find(e => e.customerEmail === payment.userEmail);
                        if (enrollment && enrollment.enrolledAt) {
                          const enrolledDate = enrollment.enrolledAt.toDate();
                          const paymentAmount = payment.amount || 0;
                          const monthsCovered = Math.floor(paymentAmount / 6500); // Assuming ₦6,500 per month
                          
                          // Find the next unpaid month from enrollment date
                          const paymentDate = payment.submittedAt;
                          let startMonth = new Date(enrolledDate);
                          
                          // Find the month this payment should start covering
                          while (startMonth <= paymentDate) {
                            startMonth.setMonth(startMonth.getMonth() + 1);
                          }
                          startMonth.setMonth(startMonth.getMonth() - 1); // Go back to the current month
                          
                          for (let i = 0; i < monthsCovered; i++) {
                            const monthDate = new Date(startMonth);
                            monthDate.setMonth(startMonth.getMonth() + i);
                            coveredMonths.push(monthDate.toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long' 
                            }));
                          }
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

                  const monthlyHistory = generateMonthlyHistory();
                  
                  return Object.keys(monthlyHistory)
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
                          {monthlyHistory[month].map((payment) => (
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
                    ));
                })()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
