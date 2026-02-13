import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCloudUploadAlt,
  FaHistory,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUniversity,
  FaUser,
  FaEnvelope,
  FaWallet,
  FaInfoCircle,
  FaArrowRight,
} from "react-icons/fa";
import "./CoursePayment.css";

const CoursePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { plan: statePlan, userId, customerName, customerEmail, customerPhone } =
    location.state || {};

  const [course, setCourse] = useState(null);
  const [bankDetails, setBankDetails] = useState(null);
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fallback plan if navigating directly to payment page
  const plan = React.useMemo(() => {
    if (statePlan) return statePlan;
    if (!course) return null;

    // Determine plan type and amount based on admin's displayPricing setting
    let planType = "onetime";
    let planAmount = 0;

    if (course.displayPricing === "monthly" && course.pricing?.monthly) {
      planType = "monthly";
      planAmount = course.pricing.monthly;
    } else if (course.displayPricing === "yearly" && course.pricing?.yearly) {
      planType = "yearly";
      planAmount = course.pricing.yearly;
    } else if (course.displayPricing === "one-time" && course.price) {
      planType = "onetime";
      planAmount = course.price;
    } else {
      // Fallback: use whatever is available
      planType = "onetime";
      planAmount = course.price || 0;
    }

    return {
      type: planType,
      amount: planAmount,
      courseId: course.id,
      courseName: course.title,
    };
  }, [statePlan, course]);

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    } else {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    return () => {
      if (receiptPreview) {
        URL.revokeObjectURL(receiptPreview);
      }
    };
  }, [receiptPreview]);

  const fetchCourse = async () => {
    try {
      const courseDoc = await getDoc(doc(db, "courses", courseId));
      if (courseDoc.exists()) {
        setCourse({ id: courseDoc.id, ...courseDoc.data() });
      }

      const bankDoc = await getDoc(doc(db, "admin", "bankDetails"));
      if (bankDoc.exists()) {
        setBankDetails(bankDoc.data());
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (PNG, JPG, JPEG)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      if (receiptPreview) {
        URL.revokeObjectURL(receiptPreview);
      }

      const previewURL = URL.createObjectURL(file);
      setReceiptPreview(previewURL);
      setPaymentReceipt(file);
    }
  };

  const handleSubmitPayment = async () => {
    if (!paymentReceipt) {
      alert("Please select a payment receipt image");
      return;
    }

    setUploading(true);

    try {
      let receiptURL = null;
      let uploadAttempts = 0;
      const maxAttempts = 3;

      while (uploadAttempts < maxAttempts && !receiptURL) {
        try {
          uploadAttempts++;
          const fileName = `payment-receipts/${userId}/${courseId}_${Date.now()}_${uploadAttempts}`;
          const receiptRef = ref(storage, fileName);
          const uploadTask = await uploadBytes(receiptRef, paymentReceipt);
          receiptURL = await getDownloadURL(receiptRef);
          break;
        } catch (uploadError) {
          console.warn(
            `Upload attempt ${uploadAttempts} failed:`,
            uploadError.message,
          );
          if (uploadAttempts >= maxAttempts) break;
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * uploadAttempts),
          );
        }
      }

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
        status: receiptURL ? "approved" : "receipt_pending_upload",
        submittedAt: new Date(),
        paymentMethod: "bank_transfer",
        receiptFileName: paymentReceipt.name,
        isRenewal: false,
        uploadSuccessful: !!receiptURL,
      };

      // Check for an existing pending payment and update it instead of creating duplicates
      const existingPaymentQuery = query(
        collection(db, "payments"),
        where("userId", "==", userId),
        where("courseId", "==", courseId),
        where("status", "in", ["receipt_pending_upload", "receipt_required"]),
      );

      const existingSnapshot = await getDocs(existingPaymentQuery);

      if (!existingSnapshot.empty) {
        const existingDoc = existingSnapshot.docs[0];
        await updateDoc(doc(db, "payments", existingDoc.id), {
          ...paymentData,
        });
      } else {
        await addDoc(collection(db, "payments"), paymentData);
      }

      if (receiptURL) {
        const enrollmentQuery = query(
          collection(db, "enrollmentPlans"),
          where("userId", "==", userId),
          where("courseId", "==", courseId),
        );

        const enrollmentSnapshot = await getDocs(enrollmentQuery);

        if (!enrollmentSnapshot.empty) {
          const enrollmentDoc = enrollmentSnapshot.docs[0];
          await updateDoc(doc(db, "enrollmentPlans", enrollmentDoc.id), {
            planType: plan.type,
            planAmount: plan.amount,
            paymentStatus: "paid",
            blocked: false,
            nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          });
        } else {
          await setDoc(doc(db, "enrollmentPlans", `${userId}_${courseId}`), {
            userId,
            courseId,
            planType: plan.type,
            planAmount: plan.amount,
            paymentStatus: "paid",
            blocked: false,
            createdAt: new Date(),
            nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          });
        }

        await addDoc(collection(db, "enrollments"), {
          customerEmail,
          courseId,
          courseName: plan.courseName,
          enrolledAt: new Date(),
          completedLessons: [],
          planType: plan.type,
          planAmount: plan.amount,
          userId,
          receiptURL,
        });

        navigate("/dashboard", {
          state: {
            paymentSuccess: true,
            message:
              "Payment receipt submitted successfully! Your enrollment has been activated.",
          },
        });
      } else {
        navigate("/dashboard", {
          state: {
            paymentSuccess: false,
            message: "Upload failed. Please contact support.",
            receiptUploadFailed: true,
          },
        });
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      alert(`Error submitting payment: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  if (!plan) {
    return (
      <div className="payment-wrapper flex items-center justify-center text-center">
        <div className="payment-card">
          <h2 className="text-2xl font-bold mb-4">No Payment Plan Found</h2>
          <button onClick={() => navigate("/courses")} className="signup-btn">
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="payment-wrapper flex items-center justify-center">
        <div className="signup-spinner"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-blob payment-blob-1"></div>
      <div className="payment-blob payment-blob-2"></div>

      <motion.div
        className="max-w-4xl mx-auto pt-32 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-3">
            Complete Your Payment
          </h1>
          <p className="text-slate-400">
            Secure your access and start learning immediately
          </p>
        </div>

        <motion.div variants={itemVariants} className="payment-card">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FaWallet className="text-emerald-500" /> Payment Summary
          </h2>

          <div className="space-y-2 mb-8">
            <div className="summary-row">
              <span className="summary-label">Course</span>
              <span className="summary-value">{plan?.courseName || "Unknown Course"}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Student</span>
              <span className="summary-value">{customerName || "Student"}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Email</span>
              <span className="summary-value">{customerEmail || "Not provided"}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Plan</span>
              <span className="summary-value">
                {plan?.type === "monthly" ? "Monthly Subscription" : plan?.type === "yearly" ? "Yearly Subscription" : "Full Access (One-Time)"}
              </span>
            </div>
          </div>

          <div className="amount-container">
            <div className="amount-label">Total Amount to Pay</div>
            <div className="amount-value">₦{(plan?.amount || 0).toLocaleString()}</div>
          </div>

          <motion.div variants={itemVariants} className="bank-details-premium">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FaUniversity className="text-blue-500" /> Bank Transfer Details
            </h3>
            {bankDetails && (
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
                {bankDetails.branch && (
                  <div className="bank-item">
                    <label>Branch</label>
                    <span>{bankDetails.branch}</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8"
          >
            <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
              <FaCloudUploadAlt /> Upload Receipt
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Please upload a clear screenshot of your bank transfer receipt for
              verification.
            </p>

            <div
              onClick={() => document.getElementById("receipt-upload").click()}
              className="upload-container-premium"
            >
              <div className="upload-icon">
                <FaCloudUploadAlt size={32} />
              </div>
              <p className="text-white font-semibold">
                Click to upload receipt
              </p>
              <p className="text-slate-500 text-sm">
                Supports PNG, JPG, JPEG (Max 5MB)
              </p>
            </div>

            <input
              id="receipt-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {receiptPreview && (
              <motion.div
                className="receipt-preview-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <img
                  src={receiptPreview}
                  alt="Receipt Preview"
                  className="receipt-preview-image"
                />
                <p className="text-slate-600 text-xs text-center mt-3 font-medium">
                  Image Preview for Verification
                </p>
              </motion.div>
            )}
          </motion.div>

          <button
            onClick={handleSubmitPayment}
            disabled={!paymentReceipt || uploading}
            className="payment-btn-premium"
          >
            {uploading ? (
              <div className="signup-spinner"></div>
            ) : (
              <>
                Submit Payment Receipt <FaArrowRight />
              </>
            )}
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="steps-container">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" /> What Happens Next?
          </h3>
          <div className="space-y-4">
            {[
              "Transfer the amount to the bank account above",
              "Screenshot the successful transfer receipt",
              "Upload the receipt using the form above",
              "Our team reviews and activates access (usually < 12h)",
              "You'll receive a confirmation email when ready",
            ].map((step, idx) => (
              <div key={idx} className="step-item">
                <div className="step-number">{idx + 1}</div>
                <div className="step-text">{step}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-center font-bold text-sm"
        >
          <FaExclamationTriangle className="inline mr-2" />
          All payments are non-refundable. Please verify all details before
          transferring.
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CoursePayment;
