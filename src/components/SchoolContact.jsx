import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaEnvelope, FaWhatsapp, FaPaperPlane, FaCheckCircle, FaClock, FaArrowRight } from 'react-icons/fa';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './SchoolContact.css';

const SchoolContact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', whatsapp: '', country: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'schoolInquiries'), {
        ...formData,
        status: 'pending',
        submittedAt: serverTimestamp(),
        type: 'academy_inquiry'
      });
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', whatsapp: '', country: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 8000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to send inquiry. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sc-page">
      {/* Hero */}
      <section className="sc-hero" ref={heroRef}>
        <div className="sc-hero-bg">
          <div className="sc-orb sc-orb-1" />
          <div className="sc-orb sc-orb-2" />
        </div>
        <div className="sc-hero-content">
          <motion.span
            className="sc-tag"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get In Touch
          </motion.span>
          <motion.h1
            className="sc-hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Start Your{' '}
            <span className="sc-gradient">Tech Journey</span>
          </motion.h1>
          <motion.p
            className="sc-hero-sub"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Ready to level up your skills? Send us a message and let's discuss
            how ZedroTech Academy can help you reach your career goals.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="sc-methods">
        <div className="sc-methods-grid">
          <motion.a
            href="mailto:info@zedrotech.com"
            className="sc-method-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
          >
            <div className="sc-method-icon" style={{ color: '#3b82f6', background: 'rgba(59,130,246,0.1)' }}>
              <FaEnvelope />
            </div>
            <div>
              <strong>Email Admissions</strong>
              <span>info@zedrotech.com</span>
            </div>
            <FaArrowRight className="sc-method-arrow" />
          </motion.a>
          <motion.a
            href="https://api.whatsapp.com/send?phone=2348156853636&text=Hi,%20I%20want%20to%20enroll%20in%20a%20course."
            target="_blank"
            rel="noopener noreferrer"
            className="sc-method-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="sc-method-icon" style={{ color: '#10b981', background: 'rgba(16,185,129,0.1)' }}>
              <FaWhatsapp />
            </div>
            <div>
              <strong>WhatsApp Chat</strong>
              <span>+234 815 685 3636</span>
            </div>
            <FaArrowRight className="sc-method-arrow" />
          </motion.a>
          <motion.div
            className="sc-method-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sc-method-icon" style={{ color: '#8b5cf6', background: 'rgba(139,92,246,0.1)' }}>
              <FaClock />
            </div>
            <div>
              <strong>Fast Response</strong>
              <span>We reply within hours</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="sc-form-section" ref={formRef}>
        <div className="sc-form-grid">
          {/* Info Side */}
          <motion.div
            className="sc-info"
            initial={{ opacity: 0, x: -40 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2>Why ZedroTech Academy?</h2>
            <p>
              We focus on project-based learning. You won't just learn theory —
              you'll build real software that employers care about, with 1-on-1
              direct mentorship throughout your journey.
            </p>
            <div className="sc-info-features">
              <div className="sc-info-feature">
                <div className="sc-info-num">01</div>
                <div>
                  <strong>Personalized Learning</strong>
                  <span>Every student gets 1-on-1 mentorship sessions</span>
                </div>
              </div>
              <div className="sc-info-feature">
                <div className="sc-info-num">02</div>
                <div>
                  <strong>Real Projects</strong>
                  <span>Build 10+ portfolio-worthy projects during your course</span>
                </div>
              </div>
              <div className="sc-info-feature">
                <div className="sc-info-num">03</div>
                <div>
                  <strong>Career Support</strong>
                  <span>Job placement assistance for top performers</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            className="sc-form-card"
            initial={{ opacity: 0, x: 40 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h3>Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="sc-form">
              <div className="sc-form-row">
                <div className="sc-field">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div className="sc-field">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="sc-form-row">
                <div className="sc-field">
                  <label>WhatsApp Number *</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    placeholder="+234..."
                  />
                </div>
                <div className="sc-field">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g. Nigeria, USA, UK"
                  />
                </div>
              </div>
              <div className="sc-field">
                <label>Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  placeholder="Tell us how we can help you..."
                />
              </div>
              <motion.button
                type="submit"
                className="sc-submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="sc-submit-loading">
                    <span className="sc-spinner" /> Sending...
                  </span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane size={14} />
                  </>
                )}
              </motion.button>
            </form>

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  className="sc-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FaCheckCircle /> Message sent! We'll get back to you soon.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SchoolContact;
