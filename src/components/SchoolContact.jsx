import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaWhatsapp, FaPaperPlane, FaCheckCircle, FaClock, FaMapMarkerAlt, FaPhone, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './SchoolContact.css';

const EASE = [0.22, 1, 0.36, 1];

const SchoolContact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', whatsapp: '', country: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact Us | ZedroTech Academy";
  }, []);

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

  const contactMethods = [
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      value: "info@zedrotech.com",
      link: "mailto:info@zedrotech.com",
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.08)"
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      value: "+234 815 685 3636",
      link: "https://api.whatsapp.com/send?phone=2348156853636&text=Hi,%20I%20want%20to%20enroll%20in%20a%20course.",
      color: "#10b981",
      bg: "rgba(16,185,129,0.08)"
    },
    {
      icon: <FaPhone />,
      title: "Call Us",
      value: "+234 815 685 3636",
      link: "tel:+2348156853636",
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.08)"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      value: "Kano, Nigeria",
      link: null,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.08)"
    }
  ];

  return (
    <div className="sco-page">
      {/* Hero */}
      <section className="sco-hero">
        <div className="sco-hero-bg">
          <div className="sco-grid-pattern" />
          <div className="sco-orb sco-orb-1" />
          <div className="sco-orb sco-orb-2" />
        </div>
        <div className="sco-hero-content">
          <motion.span
            className="sco-tag"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            Get In Touch
          </motion.span>
          <motion.h1
            className="sco-hero-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            Start Your{' '}
            <span className="sco-gradient">Tech Journey</span>
          </motion.h1>
          <motion.p
            className="sco-hero-sub"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          >
            Ready to level up your skills? Send us a message and let's discuss
            how ZedroTech Academy can help you reach your career goals.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="sco-methods">
        <div className="sco-methods-grid">
          {contactMethods.map((m, i) => (
            <motion.div
              key={i}
              className="sco-method-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              {m.link ? (
                <a href={m.link} target={m.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="sco-method-inner">
                  <div className="sco-method-icon" style={{ color: m.color, background: m.bg }}>
                    {m.icon}
                  </div>
                  <div>
                    <span className="sco-method-label">{m.title}</span>
                    <span className="sco-method-value">{m.value}</span>
                  </div>
                </a>
              ) : (
                <div className="sco-method-inner">
                  <div className="sco-method-icon" style={{ color: m.color, background: m.bg }}>
                    {m.icon}
                  </div>
                  <div>
                    <span className="sco-method-label">{m.title}</span>
                    <span className="sco-method-value">{m.value}</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form + Info */}
      <section className="sco-form-section">
        <div className="sco-form-grid">
          {/* Info Side */}
          <motion.div
            className="sco-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="sco-tag">Why ZedroTech Academy?</span>
            <h2>We Focus on What Matters</h2>
            <p>
              We focus on project-based learning. You won't just learn theory —
              you'll build real software that employers care about, with 1-on-1
              direct mentorship throughout your journey.
            </p>

            <div className="sco-info-stats">
              <div className="sco-info-stat">
                <div className="sco-info-stat-num">4.9<span>/5</span></div>
                <div className="sco-info-stat-label">Student Rating</div>
              </div>
              <div className="sco-info-stat">
                <div className="sco-info-stat-num">95%</div>
                <div className="sco-info-stat-label">Completion Rate</div>
              </div>
              <div className="sco-info-stat">
                <div className="sco-info-stat-num">24h</div>
                <div className="sco-info-stat-label">Response Time</div>
              </div>
            </div>

            <div className="sco-availability">
              <div className="sco-avail-row">
                <div className="sco-status-dot" />
                <div>
                  <span className="sco-avail-label">Status</span>
                  <span className="sco-avail-value">Currently Enrolling</span>
                </div>
              </div>
              <div className="sco-avail-row">
                <FaClock size={14} style={{ color: '#3b82f6' }} />
                <div>
                  <span className="sco-avail-label">Response Time</span>
                  <span className="sco-avail-value">Within 24 hours</span>
                </div>
              </div>
            </div>

            <div className="sco-socials">
              <span className="sco-socials-label">Follow Us</span>
              <div className="sco-social-links">
                <a href="https://linkedin.com/company/zedrotech" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={14} /></a>
                <a href="https://instagram.com/zedrotech" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={14} /></a>
                <a href="https://twitter.com/zedrotech" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter size={14} /></a>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            className="sco-form-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <h3>Send Us a Message</h3>
            <p className="sco-form-sub">Fill out the form below and we'll get back to you shortly.</p>
            <form onSubmit={handleSubmit} className="sco-form">
              <div className="sco-form-row">
                <div className="sco-field">
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
                <div className="sco-field">
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
              <div className="sco-form-row">
                <div className="sco-field">
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
                <div className="sco-field">
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
              <div className="sco-field">
                <label>Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  placeholder="Tell us about your goals and how we can help..."
                />
              </div>
              <motion.button
                type="submit"
                className="sco-submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="sco-submit-loading">
                    <span className="sco-spinner" /> Sending...
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
                  className="sco-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FaCheckCircle /> Message sent! We'll get back to you within 24 hours.
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
