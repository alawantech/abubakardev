import React, { useState, useCallback, useRef, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaExclamationCircle, FaWifi } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Login.css';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2500;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();
  const abortRef = useRef(false);

  useEffect(() => {
    return () => { abortRef.current = true; };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isNetworkError = useCallback((err) => {
    const code = err.code || '';
    const msg = (err.message || '').toLowerCase();
    if (code === 'auth/network-request-failed') return true;
    if (!code.startsWith('auth/') && (
      msg.includes('network') || msg.includes('fetch') || msg.includes('cors') ||
      msg.includes('quota') || msg.includes('failed to fetch')
    )) return true;
    return false;
  }, []);

  const attemptLogin = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        navigate('/admin');
        return;
      }
    } catch (docErr) {
      console.warn('Could not check user role:', docErr.message);
    }

    navigate('/dashboard');
  };

  const handleSubmit = async (e, currentRetry = 0) => {
    e.preventDefault();
    if (currentRetry === 0) {
      setError('');
      abortRef.current = false;
    }
    if (abortRef.current) return;
    setLoading(true);

    if (!auth) {
      setError('Service temporarily unavailable. Please try again later.');
      setLoading(false);
      return;
    }

    try {
      await attemptLogin(formData.email, formData.password);
    } catch (err) {
      console.error('Login error:', {
        code: err.code,
        message: err.message,
        retry: currentRetry,
      });

      if (isNetworkError(err) && currentRetry < MAX_RETRIES - 1) {
        setRetrying(true);
        setRetryCount(currentRetry + 1);
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
        if (!abortRef.current) {
          return handleSubmit(e, currentRetry + 1);
        }
      }

      setRetrying(false);
      setRetryCount(0);
      const code = err.code || '';
      const msg = (err.message || '').toLowerCase();
      switch (code) {
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/invalid-credential':
          setError('Invalid email or password.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please wait a few minutes and try again.');
          break;
        case 'auth/network-request-failed':
          setError('Unable to connect. Please try switching between WiFi and mobile data, or try a different network.');
          break;
        case 'auth/operation-not-allowed':
          setError('Email/password login is not enabled. Contact support.');
          break;
        case 'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
          setError('Service configuration error. Please contact support.');
          break;
        default:
          if (isNetworkError(err)) {
            setError('Unable to connect. Please try switching between WiFi and mobile data, or try a different network.');
          } else if (code && !code.startsWith('auth/')) {
            setError(`Login error: ${code}`);
          } else {
            setError('Failed to log in. Please try again.');
          }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="auth-blob blob-primary"></div>
      <div className="auth-blob blob-purple"></div>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      >
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Unlock your digital potential. Login to your account.</p>

        {error && (
          <motion.div
            className="error-message"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <FaExclamationCircle /> {error}
          </motion.div>
        )}

        {retrying && !error && (
          <motion.div
            className="retry-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FaWifi className="retry-icon" />
            Connection issue. Retrying ({retryCount}/{MAX_RETRIES})...
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="password-input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                minLength="6"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            className="login-btn"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="premium-spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></span>
                {retrying ? `Retrying (${retryCount}/${MAX_RETRIES})...` : 'Logging in...'}
              </span>
            ) : 'Sign In'}
          </motion.button>
        </form>

        <div className="login-footer">
          <p>
            Not enrolled in a course yet? <Link to="/courses">Register now</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

