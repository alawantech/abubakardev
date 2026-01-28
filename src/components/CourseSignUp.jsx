import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaWhatsapp,
  FaLock,
  FaCheck,
  FaArrowRight,
  FaExclamationCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./CourseSignUp.css";

const CourseSignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    whatsappNumber: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!agreedToTerms) {
      setError("You must agree to the terms and conditions");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.whatsappNumber.length < 10) {
      setError("Please enter a valid WhatsApp number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        whatsappNumber: formData.whatsappNumber,
        role: "student",
        createdAt: serverTimestamp(),
        uid: user.uid,
      });

      const planToSend = plan?.pricing
        ? {
            type: selectedPlan,
            amount: plan.pricing[selectedPlan],
            courseId: plan.courseId,
            courseName: plan.courseName,
          }
        : {
            type: plan?.type || "onetime",
            amount: plan?.amount || 49000,
            courseId: plan?.courseId,
            courseName: plan?.courseName,
          };

      // Create a pending enrollment plan and a payment record so the user can complete payment later
      try {
        const enrollmentPlanRef = doc(
          db,
          "enrollmentPlans",
          `${user.uid}_${planToSend.courseId}`,
        );
        await setDoc(enrollmentPlanRef, {
          userId: user.uid,
          courseId: planToSend.courseId,
          planType: planToSend.type,
          planAmount: planToSend.amount,
          paymentStatus: "receipt_required",
          blocked: true,
          createdAt: serverTimestamp(),
        });

        await addDoc(collection(db, "payments"), {
          userId: user.uid,
          userEmail: formData.email,
          courseId: planToSend.courseId,
          courseName: planToSend.courseName,
          planType: planToSend.type,
          amount: planToSend.amount,
          status: "receipt_pending_upload",
          paymentMethod: "bank_transfer",
          submittedAt: serverTimestamp(),
          isRenewal: false,
        });
      } catch (err) {
        console.error("Error creating pending enrollment/payment:", err);
      }

      navigate(`/course/${planToSend.courseId}/payment`, {
        state: {
          plan: planToSend,
          userId: user.uid,
          customerName: formData.fullName,
          customerEmail: formData.email,
          customerPhone: formData.whatsappNumber,
        },
      });
    } catch (error) {
      console.error("Error registering user:", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered. Please login instead.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/weak-password":
          setError("Password is too weak. Use at least 6 characters.");
          break;
        default:
          setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!plan) {
    return (
      <div className="signup-wrapper flex items-center justify-center text-center">
        <div className="signup-card">
          <h2 className="text-2xl font-bold mb-4">No Plan Selected</h2>
          <p className="text-slate-400 mb-8">
            Please select a pricing plan first from the course page.
          </p>
          <button onClick={() => navigate("/courses")} className="signup-btn">
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-blob signup-blob-1"></div>
      <div className="signup-blob signup-blob-2"></div>

      <div className="relative max-w-4xl mx-auto pt-32 pb-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full background-rgba(59, 130, 246, 0.1) border border-blue-500/20 text-blue-400 font-semibold text-sm mb-6">
            🚀 Start Your Journey
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Join <span className="text-blue-500">{plan.courseName}</span>
          </h1>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 font-bold">
            {plan?.pricing ? (
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="plan"
                    value="monthly"
                    checked={selectedPlan === "monthly"}
                    onChange={() => setSelectedPlan("monthly")}
                  />
                  <span className="ml-2">
                    Monthly: ₦{(plan.pricing?.monthly || 0).toLocaleString()} /
                    month
                  </span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="plan"
                    value="yearly"
                    checked={selectedPlan === "yearly"}
                    onChange={() => setSelectedPlan("yearly")}
                  />
                  <span className="ml-2">
                    Yearly: ₦{(plan.pricing?.yearly || 0).toLocaleString()} /
                    year
                  </span>
                </label>
              </div>
            ) : (
              <>
                💎 One-Time Investment: ₦{plan?.amount || 49000} (Full Access)
              </>
            )}
          </div>
        </motion.div>

        <motion.div
          className="signup-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {error && (
            <motion.div
              className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 flex items-center gap-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <FaExclamationCircle /> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="signup-input-group">
              <label>
                <FaUser className="inline mr-2 mt-[-2px]" /> Full Name
              </label>
              <div className="signup-input-wrapper">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="signup-input"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="signup-input-group">
              <label>
                <FaEnvelope className="inline mr-2 mt-[-2px]" /> Email Address
              </label>
              <div className="signup-input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="signup-input"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="signup-input-group">
              <label>
                <FaWhatsapp className="inline mr-2 mt-[-2px]" /> WhatsApp Number
              </label>
              <div className="signup-input-wrapper">
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  required
                  className="signup-input"
                  placeholder="+234 800 000 0000"
                />
              </div>
            </div>

            <div className="signup-input-group">
              <label>
                <FaLock className="inline mr-2 mt-[-2px]" /> Password
              </label>
              <div className="signup-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="signup-input has-icon"
                  placeholder="Minimum 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="signup-password-toggle"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="signup-input-group">
              <label>
                <FaLock className="inline mr-2 mt-[-2px]" /> Confirm Password
              </label>
              <div className="signup-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="signup-input has-icon"
                  placeholder="Re-enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="signup-password-toggle"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="terms-checkbox-container">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="terms-checkbox"
              />
              <label htmlFor="terms" className="terms-label">
                I agree to the{" "}
                <span onClick={() => setShowTerms(true)} className="terms-link">
                  Terms and Conditions
                </span>{" "}
                *
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !agreedToTerms}
              className="signup-btn"
            >
              {loading ? (
                <div className="signup-spinner mx-auto"></div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Create Account & Continue <FaArrowRight />
                </div>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-700 text-center text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 font-bold hover:underline"
            >
              Login Here
            </Link>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showTerms && (
          <motion.div
            className="modal-overlay-premium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTerms(false)}
          >
            <motion.div
              className="modal-card-premium"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowTerms(false)}
                className="modal-close-btn"
              >
                <FaArrowRight className="rotate-180" />
              </button>

              <div className="modal-content-premium">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Terms & Conditions
                </h2>

                <section>
                  <h3>1. Payment Options</h3>
                  <p>
                    You may choose between <strong>Monthly</strong>{" "}
                    (₦9,500/month) or <strong>Yearly</strong> (₦57,000/year — a
                    50% discount compared to paying monthly for 12 months). The
                    selected plan determines billing frequency and access.
                  </p>
                  <p className="text-red-400 font-bold mt-2">
                    Note: All payments are 100% non-refundable.
                  </p>
                </section>

                <section>
                  <h3>2. Full Course Access</h3>
                  <p>
                    You will have full access to the course content as specified
                    in the curriculum. Our goal is to ensure you complete your
                    training successfully and transition into a professional
                    developer.
                  </p>
                </section>

                <section>
                  <h3>3. Importance of Support</h3>
                  <p>
                    We provide <strong>instant and dedicated support</strong> to
                    our students. Getting stuck is part of learning, and our
                    expert team is here to guide you. Active participation and
                    reaching out for support when needed is critical to your
                    success.
                  </p>
                </section>

                <section>
                  <h3>4. Requirements</h3>
                  <p>
                    You MUST own a functional laptop. Mobile devices are not
                    sufficient for this programming course. You must be able to
                    understand basics of English.
                  </p>
                </section>

                <div className="modal-footer">
                  <button
                    onClick={() => setShowTerms(false)}
                    className="modal-btn-secondary"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setAgreedToTerms(true);
                      setShowTerms(false);
                    }}
                    className="modal-btn-primary"
                  >
                    I Agree to Terms
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseSignUp;
