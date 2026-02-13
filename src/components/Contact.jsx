import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaEnvelope, FaWhatsapp, FaArrowRight, FaCheckCircle, FaPaperPlane, FaClock } from 'react-icons/fa'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { sendAdminNotification } from '../services/emailService'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    service: '',
    customService: '',
    businessName: '',
    businessDescription: '',
    features: '',
    budget: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        status: 'pending',
        submittedAt: serverTimestamp(),
        type: 'main_website'
      })

      // Send Email Notification to Admin
      await sendAdminNotification(formData, 'ZedroTech Main Website')

      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', whatsapp: '', service: '', customService: '', businessName: '', businessDescription: '', budget: '', message: '', features: '' })
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      alert('Failed to send inquiry. Please try again.')
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      title: "Email Us",
      value: "info@zedrotech.com",
      icon: <FaEnvelope />,
      link: "mailto:info@zedrotech.com",
      color: "#3b82f6"
    },
    {
      title: "Chat on WhatsApp",
      value: "+234 815 685 3636",
      icon: <FaWhatsapp />,
      link: "https://wa.me/2348156853636",
      color: "#10b981"
    }
  ]

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-bg-elements">
        <div className="contact-blob blob-1"></div>
        <div className="contact-blob blob-2"></div>
      </div>

      <div className="container" ref={ref}>
        <motion.div
          className="section-header center-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="overline">Contact Us</span>
          <h2 className="section-title">Let’s Start Your <span className="highlight">Next Project</span></h2>
          <p className="section-subtitle">
            Fill out the form below or reach out via our direct channels. We're ready to build something remarkable.
          </p>
        </motion.div>

        <motion.div
          className="contact-grid-premium"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="contact-info-glass" variants={itemVariants}>
            <div className="contact-info-inner">
              <h3 className="info-title">Why Choose Us?</h3>
              <p className="info-desc">
                We don't just write code; we solve problems. Get a dedicated team that understands your business goals.
              </p>

              <div className="methods-list">
                {contactMethods.map((method, idx) => (
                  <motion.a
                    key={idx}
                    href={method.link}
                    className="method-item-premium"
                    whileHover={{ x: 10 }}
                  >
                    <div className="method-icon-wrap" style={{ color: method.color, backgroundColor: `${method.color}15` }}>
                      {method.icon}
                    </div>
                    <div className="method-text">
                      <span className="method-label">{method.title}</span>
                      <span className="method-val">{method.value}</span>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="work-hours-glass">
                <div className="hours-icon"><FaClock /></div>
                <div className="hours-text">
                  <h5>Business Hours</h5>
                  <p>24/7 Availability. Real-time response on WhatsApp.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="contact-form-glass" variants={itemVariants}>
            <form onSubmit={handleSubmit} className="premium-form">
              <div className="form-row">
                <div className="input-group">
                  <label>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                </div>
                <div className="input-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>WhatsApp Number</label>
                  <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required placeholder="+234..." />
                </div>
                <div className="input-group">
                  <label>Service Interested In</label>
                  <div className="select-wrap">
                    <select name="service" value={formData.service} onChange={handleChange} required>
                      <option value="">Select Service</option>
                      <option value="Website Development">Website Development</option>
                      <option value="Web App">Web Application</option>
                      <option value="Mobile App">Mobile Application</option>
                      <option value="E-Commerce">E-Commerce Website</option>
                      <option value="Custom Software">Custom Software</option>
                      <option value="Online Class">Online Class</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {formData.service === 'Other' && (
                  <motion.div
                    className="input-group"
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                  >
                    <label>Please Specify Your Service</label>
                    <input
                      type="text"
                      name="customService"
                      value={formData.customService}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Data Analysis, Cyber Security, etc."
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="input-group">
                <label>Tell Us About Your Project</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Briefly describe your goals..." required></textarea>
              </div>

              <motion.button
                type="submit"
                className="premium-submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="loading-state">
                    <div className="spinner"></div>
                    Sending...
                  </span>
                ) : (
                  <>
                    <span>Send Inquiry</span>
                    <FaPaperPlane className="btn-icon-plane" />
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    className="success-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="success-modal-content"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                      <div className="success-icon-check">
                        <FaCheckCircle />
                      </div>
                      <h2>Message Sent!</h2>
                      <p>Thank you for reaching out to ZedroTech. Our team has received your inquiry and will get back to you shortly.</p>
                      <button
                        className="modal-ok-btn"
                        onClick={() => setSubmitStatus(null)}
                      >
                        Awesome!
                      </button>
                      <div className="modal-progress-container">
                        <motion.div
                          className="modal-progress-bar"
                          initial={{ width: "100%" }}
                          animate={{ width: "0%" }}
                          transition={{ duration: 5, ease: "linear" }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
