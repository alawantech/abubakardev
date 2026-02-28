import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot
} from "firebase/firestore";
import {
    updateProfile,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth, storage } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import {
    FaGraduationCap,
    FaBook,
    FaClock,
    FaCheckCircle,
    FaExclamationTriangle,
    FaChartLine,
    FaCrown,
    FaCalendarAlt,
    FaUser,
    FaEnvelope,
    FaWhatsapp,
    FaLock,
    FaSave,
    FaTimes,
    FaEye,
    FaEyeSlash,
    FaCloudUploadAlt,
    FaHistory,
    FaArrowRight,
    FaUniversity,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, userData, loading } = useAuth();
    const [enrollments, setEnrollments] = useState([]);
    const [dashboardLoading, setDashboardLoading] = useState(true);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showProfileEdit, setShowProfileEdit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [profileData, setProfileData] = useState({
        fullName: "",
        whatsappNumber: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [bankDetails, setBankDetails] = useState(null);
    const [paymentReceipt, setPaymentReceipt] = useState(null);
    const [receiptPreview, setReceiptPreview] = useState(null);
    const [uploadingRenewal, setUploadingRenewal] = useState(false);
    const [updateError, setUpdateError] = useState("");
    const [updateMessage, setUpdateMessage] = useState("");
    const [updating, setUpdating] = useState(false);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [loadingPayments, setLoadingPayments] = useState(false);

    const fetchData = async () => {
        if (!currentUser) return;
        setDashboardLoading(true);
        setLoadingPayments(true);

        try {
            // 1. Fetch enrollments and payments in parallel
            const [enrollmentsSnapshot, paymentsSnapshot, bankDoc] = await Promise.all([
                getDocs(query(collection(db, "enrollmentPlans"), where("userId", "==", currentUser.uid))),
                getDocs(query(collection(db, "payments"), where("userId", "==", currentUser.uid))),
                getDoc(doc(db, "admin", "bankDetails"))
            ]);

            // 2. Process payments (shared for dashboard and history)
            const allPayments = paymentsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                submittedAt: doc.data().submittedAt?.toDate(),
            })).sort((a, b) => (b.submittedAt || 0) - (a.submittedAt || 0));

            setPaymentHistory(allPayments);
            if (bankDoc.exists()) setBankDetails(bankDoc.data());

            // 3. Batch course fetches (to avoid N+1)
            const enrollmentDocs = enrollmentsSnapshot.docs;
            const uniqueCourseIds = [...new Set(enrollmentDocs.map(d => d.data().courseId))];

            const courseDocs = await Promise.all(
                uniqueCourseIds.map(id => getDoc(doc(db, "courses", id)))
            );

            const coursesMap = {};
            courseDocs.forEach(d => {
                if (d.exists()) coursesMap[d.id] = d.data();
            });

            // 4. Assemble enrollment data
            const enrollmentsData = enrollmentDocs.map(enrollmentDoc => {
                const enrollmentData = enrollmentDoc.data();
                const courseData = coursesMap[enrollmentData.courseId] || null;
                const paymentData = allPayments.find(p => p.courseId === enrollmentData.courseId);

                return {
                    id: enrollmentDoc.id,
                    ...enrollmentData,
                    course: courseData,
                    payment: paymentData || null,
                    courseName: courseData?.title || "Unknown Course",
                    blocked: enrollmentData.blocked || false,
                };
            });

            setEnrollments(enrollmentsData);
            setDashboardLoading(false);
            setLoadingPayments(false);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            setDashboardLoading(false);
            setLoadingPayments(false);
        }
    };

    const calculateDaysRemaining = (expiryDate) => {
        if (!expiryDate) return null;
        try {
            const now = new Date();
            const expiry = expiryDate.toDate ? expiryDate.toDate() : new Date(expiryDate);
            const diffTime = expiry.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        } catch (e) {
            console.error("Error calculating days remaining:", e);
            return null;
        }
    };

    useEffect(() => {
        if (!currentUser) return;

        // Real-time listener for enrollment changes
        const q = query(collection(db, "enrollmentPlans"), where("userId", "==", currentUser.uid));
        const unsubscribe = onSnapshot(q, () => {
            fetchData();
        });

        // Initial fetch and profile load
        fetchData();
        loadProfileData();

        return () => unsubscribe();
    }, [currentUser]);

    useEffect(() => {
        if (location.state?.paymentSuccess) {
            setShowSuccessMessage(true);
        }
    }, [currentUser, loading, navigate, location.state]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    const loadProfileData = async () => {
        if (userData) {
            setProfileData({
                fullName: userData.fullName || "",
                whatsappNumber: userData.whatsappNumber || "",
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setUpdateError("");
        setUpdateMessage("");
        setUpdating(true);

        try {
            await updateDoc(doc(db, "users", currentUser.uid), {
                fullName: profileData.fullName,
                whatsappNumber: profileData.whatsappNumber,
            });

            await updateProfile(currentUser, {
                displayName: profileData.fullName,
            });

            if (profileData.newPassword) {
                if (!profileData.currentPassword) {
                    setUpdateError("Current password is required to change password");
                    setUpdating(false);
                    return;
                }

                if (profileData.newPassword !== profileData.confirmPassword) {
                    setUpdateError("New passwords do not match");
                    setUpdating(false);
                    return;
                }

                if (profileData.newPassword.length < 6) {
                    setUpdateError("Password must be at least 6 characters");
                    setUpdating(false);
                    return;
                }

                const credential = EmailAuthProvider.credential(
                    currentUser.email,
                    profileData.currentPassword
                );
                await reauthenticateWithCredential(currentUser, credential);
                await updatePassword(currentUser, profileData.newPassword);
            }

            setUpdateMessage("Profile updated successfully!");
            setProfileData({
                ...profileData,
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            setTimeout(() => {
                setShowProfileEdit(false);
                setUpdateMessage("");
            }, 2000);
        } catch (error) {
            console.error("Error updating profile:", error);
            if (error.code === "auth/wrong-password") {
                setUpdateError("Current password is incorrect");
            } else {
                setUpdateError("Failed to update profile. Please try again.");
            }
        } finally {
            setUpdating(false);
        }
    };

    const handleRenewalFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File size must be less than 5MB");
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
            const storageRef = ref(
                storage,
                `renewal-payments/${currentUser.uid}/${Date.now()}_${paymentReceipt.name}`
            );
            await uploadBytes(storageRef, paymentReceipt);
            const receiptURL = await getDownloadURL(storageRef);

            const targetEnrollment = enrollments.find(e => e.blocked) || enrollments[0];
            const getNumericalAmount = (enrollment) => {
                if (!enrollment || !enrollment.course) return 6500;
                const plan = enrollment.planType || 'monthly';
                const pricing = enrollment.course.pricing;
                if (plan === 'monthly' && pricing?.monthly) return Number(pricing.monthly);
                if (plan === 'yearly' && pricing?.yearly) return Number(pricing.yearly);
                if (enrollment.course.price) return Number(enrollment.course.price);
                return 6500;
            };

            const actualAmount = getNumericalAmount(targetEnrollment);

            const renewalData = {
                userId: currentUser.uid,
                customerEmail: currentUser.email,
                courseId: targetEnrollment.courseId,
                receiptURL,
                amount: actualAmount,
                status: "pending",
                submittedAt: new Date(),
                type: isInitialPayment ? "initial" : "renewal",
                planType: targetEnrollment.planType || 'monthly'
            };

            await addDoc(collection(db, "payments"), renewalData);

            const enrollmentPlansQuery = query(
                collection(db, "enrollmentPlans"),
                where("userId", "==", currentUser.uid),
                where("courseId", "==", targetEnrollment.courseId)
            );
            const plansSnapshot = await getDocs(enrollmentPlansQuery);

            const updatePromises = plansSnapshot.docs.map(async (planDoc) => {
                const planData = planDoc.data();
                const currentExpiry = planData.expiryDate?.toDate() || new Date();
                const now = new Date();

                // Extension logic: if expiry is in future, extend from that. Otherwise, start from now.
                const baseDate = currentExpiry > now ? currentExpiry : now;
                const newExpiryDate = new Date(baseDate);

                if (planData.planType === 'yearly') {
                    newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
                } else {
                    newExpiryDate.setMonth(newExpiryDate.getMonth() + 1);
                }

                await updateDoc(doc(db, "enrollmentPlans", planDoc.id), {
                    blocked: false,
                    expiryDate: newExpiryDate,
                    lastRenewalDate: new Date(),
                });
            });

            await Promise.all(updatePromises);

            alert(
                "Renewal payment submitted successfully! Your access will be restored once payment is verified."
            );
            setPaymentReceipt(null);
            setReceiptPreview(null);
            fetchData();
        } catch (error) {
            console.error("Error submitting renewal:", error);
            alert("Failed to submit renewal payment. Please try again.");
        } finally {
            setUploadingRenewal(false);
        }
    };

    const hasActiveEnrollment = enrollments.some(e => !e.blocked);
    const hasPendingAccess = enrollments.length > 0 && enrollments.every(e => {
        const p = e.payment;
        return !p || p.status === 'pending';
    });
    const hasAnyApprovedPayment = enrollments.some(e => e.payment?.status === 'approved' || e.paymentStatus === 'paid');

    // Block if: Admin explicitly blocked user OR all enrollments are blocked
    const isUserBlocked = userData?.blocked || (enrollments.length > 0 && !hasActiveEnrollment);
    const isInitialPayment = enrollments.length > 0 && !hasAnyApprovedPayment;

    // Helper to get pricing for the blocked/initial screen
    const targetEnrollment = isInitialPayment ? enrollments[0] : (enrollments.find(e => e.blocked) || enrollments[0]);
    const getDisplayAmount = (enrollment) => {
        if (!enrollment || !enrollment.course) return "₦6,500";
        const plan = enrollment.planType || 'monthly';
        const pricing = enrollment.course.pricing;
        if (plan === 'monthly' && pricing?.monthly) return `₦${Number(pricing.monthly).toLocaleString()}`;
        if (plan === 'yearly' && pricing?.yearly) return `₦${Number(pricing.yearly).toLocaleString()}`;
        if (enrollment.course.price) return `₦${Number(enrollment.course.price).toLocaleString()}`;
        return "₦6,500";
    };
    const displayAmount = getDisplayAmount(targetEnrollment);
    const planLabel = targetEnrollment?.planType ? `(${targetEnrollment.planType.charAt(0).toUpperCase() + targetEnrollment.planType.slice(1)})` : '(Monthly)';

    // Account Level Block or All Courses Pending screen
    if (isUserBlocked) {
        return (
            <div className="dashboard-wrapper">
                <div className="dashboard-blob dashboard-blob-1"></div>
                <div className="dashboard-blob dashboard-blob-2"></div>

                <div className="dashboard-container">
                    <motion.div
                        className="blocked-screen"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className={`blocked-icon ${hasPendingAccess ? 'pending' : (isInitialPayment ? 'initial' : '')}`}>
                            {hasPendingAccess ? <FaClock /> : (isInitialPayment ? <FaBook /> : <FaExclamationTriangle />)}
                        </div>
                        <h1 className="blocked-title">
                            {hasPendingAccess
                                ? "Verification in Progress"
                                : (isInitialPayment ? "Step 1: Finish Payment" : (userData?.blocked ? "Account Blocked" : "Your Access Has Ended"))
                            }
                        </h1>
                        <p className="blocked-subtitle">
                            {hasPendingAccess
                                ? "We have received your receipt! Our team is checking it now. You'll get access as soon as it's confirmed."
                                : (isInitialPayment
                                    ? "Finish your initial payment to start your learning journey with us."
                                    : (userData?.blocked
                                        ? "Your account has been restricted by the administrator. Please contact support for more details."
                                        : "Your subscription period has finished. Please choose a plan below to renew and keep learning."))
                            }
                        </p>

                        {!hasPendingAccess && (
                            <div className="renewal-card">
                                <h2 className="renewal-title">
                                    {isInitialPayment ? "Step 1: Finish Your Payment" : "Step 1: Renew Your Access"}
                                </h2>

                                {bankDetails && (
                                    <div className="bank-details-box">
                                        <h3>
                                            <FaUniversity /> Transfer to our Bank
                                        </h3>
                                        <div className="bank-grid">
                                            <div className="bank-item">
                                                <label>Bank Name</label>
                                                <span>{bankDetails.bankName}</span>
                                            </div>
                                            <div className="bank-item">
                                                <label>Account Name</label>
                                                <span>{bankDetails.accountName}</span>
                                            </div>
                                            <div className="bank-item">
                                                <label>Account Number</label>
                                                <span>{bankDetails.accountNumber}</span>
                                            </div>
                                            <div className="bank-item">
                                                <label>Amount to Pay</label>
                                                <span style={{ color: '#6366f1', fontSize: '1.2rem', fontWeight: '800' }}>
                                                    {displayAmount} {planLabel}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="upload-receipt-box">
                                    <h3>
                                        <FaCloudUploadAlt /> Step 2: Upload Your Receipt
                                    </h3>
                                    <div
                                        className="upload-area"
                                        onClick={() =>
                                            document.getElementById("renewal-receipt").click()
                                        }
                                    >
                                        <FaCloudUploadAlt className="upload-icon" />
                                        <p>Click here to upload your receipt photo</p>
                                        <small>PNG or JPG images only</small>
                                    </div>
                                    <input
                                        id="renewal-receipt"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleRenewalFileChange}
                                        style={{ display: "none" }}
                                    />

                                    {receiptPreview && (
                                        <div className="receipt-preview">
                                            <img src={receiptPreview} alt="Receipt preview" />
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handleRenewalSubmit}
                                    disabled={!paymentReceipt || uploadingRenewal}
                                    className="renewal-submit-btn"
                                >
                                    {uploadingRenewal ? (
                                        <>
                                            <div className="spinner"></div>
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <FaCloudUploadAlt />
                                            {isInitialPayment ? "Submit Initial Payment" : "Submit Renewal Payment"}
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        {hasPendingAccess && (
                            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button
                                    onClick={fetchData}
                                    className="btn-secondary"
                                >
                                    Refresh Status
                                </button>
                                <a
                                    href="https://wa.me/2348156853636?text=I%20made%20a%20payment,%20I%20am%20waiting%20for%20approval"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="whatsapp-admin-btn"
                                >
                                    <FaWhatsapp /> Chat with Admin
                                </a>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        );
    }

    if (dashboardLoading || loading) {
        return (
            <div className="dashboard-wrapper">
                <div className="dashboard-loading">
                    <div className="spinner-large"></div>
                    <p>Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (!currentUser) {
        return null;
    }

    const totalCourses = enrollments.length;
    const completedCourses = 0; // TODO: Calculate based on progress
    const inProgressCourses = enrollments.filter(
        (e) => !e.blocked && e.payment?.status === "approved"
    ).length;

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-blob dashboard-blob-1"></div>
            <div className="dashboard-blob dashboard-blob-2"></div>

            <div className="dashboard-container">
                {/* Success Message */}
                <AnimatePresence>
                    {showSuccessMessage && location.state?.message && (
                        <motion.div
                            className="success-banner"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div className="success-icon">
                                <FaCheckCircle />
                            </div>
                            <div className="success-content">
                                <h3>🎉 Payment Successful!</h3>
                                <p>{location.state.message}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Header */}
                <motion.div
                    className="dashboard-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="header-content">
                        <h1>Welcome back, {userData?.fullName || "Student"}! 👋</h1>
                        <p>Track your progress and continue your learning journey</p>
                    </div>
                    <button
                        className="edit-profile-btn"
                        onClick={() => setShowProfileEdit(!showProfileEdit)}
                    >
                        <FaUser />
                        {showProfileEdit ? "Close Profile" : "Edit Profile"}
                    </button>
                </motion.div>

                {/* Profile Edit Section */}
                <AnimatePresence>
                    {showProfileEdit && (
                        <motion.div
                            className="profile-edit-card"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <h2>
                                <FaUser /> Edit Profile
                            </h2>

                            {updateError && (
                                <div className="error-message">
                                    <FaExclamationTriangle /> {updateError}
                                </div>
                            )}

                            {updateMessage && (
                                <div className="success-message">
                                    <FaCheckCircle /> {updateMessage}
                                </div>
                            )}

                            <form onSubmit={handleProfileUpdate}>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>
                                            <FaUser /> Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.fullName}
                                            onChange={(e) =>
                                                setProfileData({
                                                    ...profileData,
                                                    fullName: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            <FaWhatsapp /> WhatsApp Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={profileData.whatsappNumber}
                                            onChange={(e) =>
                                                setProfileData({
                                                    ...profileData,
                                                    whatsappNumber: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            <FaEnvelope /> Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={currentUser.email}
                                            disabled
                                            className="disabled-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            <FaLock /> Current Password
                                        </label>
                                        <div className="password-input-wrapper">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={profileData.currentPassword}
                                                onChange={(e) =>
                                                    setProfileData({
                                                        ...profileData,
                                                        currentPassword: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter current password to change"
                                            />
                                            <button
                                                type="button"
                                                className="password-toggle"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            <FaLock /> New Password
                                        </label>
                                        <div className="password-input-wrapper">
                                            <input
                                                type={showNewPassword ? "text" : "password"}
                                                value={profileData.newPassword}
                                                onChange={(e) =>
                                                    setProfileData({
                                                        ...profileData,
                                                        newPassword: e.target.value,
                                                    })
                                                }
                                                placeholder="Leave blank to keep current"
                                            />
                                            <button
                                                type="button"
                                                className="password-toggle"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                            >
                                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            <FaLock /> Confirm New Password
                                        </label>
                                        <div className="password-input-wrapper">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={profileData.confirmPassword}
                                                onChange={(e) =>
                                                    setProfileData({
                                                        ...profileData,
                                                        confirmPassword: e.target.value,
                                                    })
                                                }
                                                placeholder="Confirm new password"
                                            />
                                            <button
                                                type="button"
                                                className="password-toggle"
                                                onClick={() =>
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }
                                            >
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="btn-secondary"
                                        onClick={() => setShowProfileEdit(false)}
                                    >
                                        <FaTimes /> Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-primary"
                                        disabled={updating}
                                    >
                                        {updating ? (
                                            <>
                                                <div className="spinner"></div>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <FaSave /> Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <motion.div
                        className="stat-card stat-card-blue"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="stat-icon">
                            <FaGraduationCap />
                        </div>
                        <div className="stat-content">
                            <h3>{totalCourses}</h3>
                            <p>Total Courses</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="stat-card stat-card-green"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="stat-icon">
                            <FaCheckCircle />
                        </div>
                        <div className="stat-content">
                            <h3>{completedCourses}</h3>
                            <p>Completed</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="stat-card stat-card-purple"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="stat-icon">
                            <FaChartLine />
                        </div>
                        <div className="stat-content">
                            <h3>{inProgressCourses}</h3>
                            <p>In Progress</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className={`stat-card ${(() => {
                            const minDays = Math.min(...enrollments.map(e => calculateDaysRemaining(e.expiryDate)).filter(d => d !== null), Infinity);
                            return (minDays <= 3 && minDays !== Infinity) ? 'stat-card-red' : 'stat-card-orange';
                        })()}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="stat-icon">
                            <FaClock />
                        </div>
                        <div className="stat-content">
                            <h3>{(() => {
                                const activeDays = enrollments
                                    .map(e => calculateDaysRemaining(e.expiryDate))
                                    .filter(d => d !== null);
                                if (activeDays.length === 0) return '---';
                                const minDays = Math.min(...activeDays);
                                return minDays <= 0 ? 'Expired' : `${minDays} Days`;
                            })()}</h3>
                            <p>Access Remaining</p>
                        </div>
                    </motion.div>
                </div>

                {/* Enrolled Courses */}
                <motion.div
                    className="section-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="section-header">
                        <h2>
                            <FaBook /> My Courses
                        </h2>
                    </div>

                    {enrollments.length === 0 ? (
                        <div className="empty-state">
                            <FaGraduationCap className="empty-icon" />
                            <h3>No Courses Yet</h3>
                            <p>Start your learning journey by enrolling in a course</p>
                            <button
                                className="btn-primary"
                                onClick={() => navigate("/courses")}
                            >
                                Browse Courses <FaArrowRight />
                            </button>
                        </div>
                    ) : (
                        <div className="courses-grid">
                            {enrollments.map((enrollment) => (
                                <motion.div
                                    key={enrollment.id}
                                    className="course-card"
                                    whileHover={{ y: -5 }}
                                >
                                    {enrollment.course?.featuredImage && (
                                        <div className="course-image">
                                            <img
                                                src={enrollment.course.featuredImage}
                                                alt={enrollment.courseName}
                                            />
                                            {enrollment.blocked && (
                                                <div className="course-badge badge-blocked">
                                                    <FaExclamationTriangle /> Blocked
                                                </div>
                                            )}
                                            {!enrollment.blocked && enrollment.payment?.status === "pending" && (
                                                <div className="course-badge badge-pending">
                                                    <FaHistory /> Verification Pending
                                                </div>
                                            )}
                                            {!enrollment.blocked &&
                                                (enrollment.payment?.status === "approved" || enrollment.paymentStatus === 'paid') && (
                                                    <div className="course-badge badge-active">
                                                        <FaCheckCircle /> Active
                                                    </div>
                                                )}
                                        </div>
                                    )}
                                    <div className="course-content">
                                        <h3>{enrollment.courseName}</h3>
                                        <div className="course-meta">
                                            <span>
                                                <FaCalendarAlt /> {enrollment.planType || "One-Time"}
                                            </span>
                                            <span>
                                                <FaCrown /> ₦
                                                {(enrollment.planAmount || 0).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="course-actions">
                                            <button
                                                className="course-btn"
                                                onClick={() =>
                                                    navigate(`/course/${enrollment.courseId}/learn`)
                                                }
                                                disabled={enrollment.blocked}
                                            >
                                                {enrollment.blocked ? "Renew to Access" : "Continue Learning"}
                                                <FaArrowRight />
                                            </button>
                                            <button
                                                className="renew-action-btn"
                                                onClick={() => navigate('/renew-payment', {
                                                    state: {
                                                        courseId: enrollment.courseId,
                                                        courseName: enrollment.courseName
                                                    }
                                                })}
                                                title={enrollment.blocked ? "Renew Subscription" : "Extend Subscription"}
                                            >
                                                <FaHistory /> {enrollment.blocked ? "Renew" : "Extend"}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Payment History */}
                <motion.div
                    className="section-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="section-header">
                        <h2>
                            <FaHistory /> Payment History
                        </h2>
                    </div>

                    {loadingPayments ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading payments...</p>
                        </div>
                    ) : paymentHistory.length === 0 ? (
                        <div className="empty-state-small">
                            <p>No payment history yet</p>
                        </div>
                    ) : (
                        <div className="payment-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentHistory.map((payment) => (
                                        <tr key={payment.id}>
                                            <td>
                                                {payment.submittedAt
                                                    ? payment.submittedAt.toLocaleDateString()
                                                    : "N/A"}
                                            </td>
                                            <td className="amount">
                                                ₦{(payment.amount || 0).toLocaleString()}
                                            </td>
                                            <td>
                                                <span className="payment-type">
                                                    {payment.type || "enrollment"}
                                                    {payment.planType ? ` (${payment.planType})` : ""}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`status-badge status-${payment.status}`}>
                                                    {payment.status || "pending"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
