import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEnvelope, FaWhatsapp, FaArrowRight, FaCheckCircle, FaPaperPlane, FaMapMarkerAlt, FaClock, FaLinkedin, FaFacebook, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { sendAdminNotification } from '../services/emailService'
import { services as serviceList } from '../data/services'
import { StaggerReveal } from '../animations/primitives'
import './Contact.css'

const EASE = [0.22, 1, 0.36, 1]

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

      await sendAdminNotification(formData, 'ZedroTech Main Website')

      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', whatsapp: '', service: '', customService: '', businessName: '', businessDescription: '', budget: '', message: '', features: '' })
      setTimeout(() => setSubmitStatus(null), 10000)
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      alert('Failed to send inquiry. Please try again.')
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "info@zedrotech.com",
      link: "mailto:info@zedrotech.com",
      color: "#6366f1"
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      value: "Chat on WhatsApp",
      link: "https://wa.me/2348156853636",
      color: "#10b981"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Studio",
      value: "Kano, Nigeria",
      link: null,
      color: "#ec4899"
    }
  ]

  return (
    <section className="contact-section section" id="contact">
      <div className="bg-orb bg-orb-2" style={{ opacity: 0.1, top: '30%', right: '5%' }} />
      <div className="container">
        <div className="section-heading">
          <motion.span
            className="eyebrow eyebrow-accent"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            Get in touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          >
            Let's talk about<br/>
            <span className="gradient-text">your project.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            Tell us what you're building. We'll get back within 4 hours with honest feedback — even if it's "this isn't a good fit for us."
          </motion.p>
        </div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          >
            <StaggerReveal className="contact-methods" amount={0.1} stagger={0.06} delayChildren={0.1}>
              {contactMethods.map((method, i) => {
                const Icon = method.icon
                const Wrapper = method.link ? 'a' : 'div'
                return (
                  <Wrapper
                    key={i}
                    {...(method.link ? { href: method.link, target: method.link.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : {})}
                    className="contact-method"
                    style={{ '--method-color': method.color }}
                  >
                    <div className="method-icon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="method-label">{method.title}</div>
                      <div className="method-value">{method.value}</div>
                    </div>
                  </Wrapper>
                )
              })}
            </StaggerReveal>

            <div className="availability">
              <div className="avail-row">
                <FaClock size={14} />
                <div>
                  <div className="avail-label">Response time</div>
                  <div className="avail-value">Within 4 hours</div>
                </div>
              </div>
              <div className="avail-row">
                <span className="status-indicator" />
                <div>
                  <div className="avail-label">Current status</div>
                  <div className="avail-value">Accepting new projects</div>
                </div>
              </div>
            </div>

            <div className="socials">
              <span className="socials-label">Follow along</span>
              <div className="social-links">
                <a href="https://www.linkedin.com/company/zedrotech/about/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link"><FaLinkedin size={14} /></a>
                <a href="https://www.facebook.com/share/14fSMqNf1V6/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link"><FaFacebook size={14} /></a>
                <a href="https://www.instagram.com/zedrotech?igsh=MndqZGhlb2ZydQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link"><FaInstagram size={14} /></a>
                <a href="https://x.com/zedrotech?s=21" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="social-link"><FaTwitter size={14} /></a>
                <a href="https://www.tiktok.com/@zedrotech?_r=1&_t=ZS-970XTt7AlQD" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="social-link"><FaTiktok size={14} /></a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <StaggerReveal className="form-stagger" amount={0.05} stagger={0.04} delayChildren={0.05}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>WhatsApp</label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                  <div className="form-group">
                    <label>Service needed</label>
                    <select name="service" value={formData.service} onChange={handleChange} required>
                      <option value="">Select a service</option>
                      {serviceList.map((s) => (
                        <option key={s.id} value={s.shortTitle}>{s.title}</option>
                      ))}
                      <option value="Other">Other (tell us below)</option>
                    </select>
                  </div>
                </div>

                <AnimatePresence>
                  {formData.service === 'Other' && (
                    <motion.div
                      className="form-group"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label>Describe what you need</label>
                      <input
                        type="text"
                        name="customService"
                        value={formData.customService}
                        onChange={handleChange}
                        placeholder="e.g. Need help with a Chrome extension..."
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="form-group">
                  <label>Business / project name</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="What's the project called?"
                  />
                </div>

                <div className="form-group">
                  <label>Tell us about your project</label>
                  <textarea
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleChange}
                    rows="4"
                    placeholder="What are you building? Who's it for? Any deadlines or constraints we should know about?"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Budget range</label>
                    <select name="budget" value={formData.budget} onChange={handleChange}>
                      <option value="">Select budget</option>
                      <option value="< ₦500K">Under ₦500K</option>
                      <option value="₦500K - ₦2M">₦500K - ₦2M</option>
                      <option value="₦2M - ₦5M">₦2M - ₦5M</option>
                      <option value="₦5M+">₦5M+</option>
                      <option value="USD">Pay in USD</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Key features (optional)</label>
                    <input
                      type="text"
                      name="features"
                      value={formData.features}
                      onChange={handleChange}
                      placeholder="e.g. Auth, payments, AI..."
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary form-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>Send inquiry <FaPaperPlane size={14} /></>
                  )}
                </button>
              </StaggerReveal>

              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    className="success-message"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <FaCheckCircle />
                    <div>
                      <strong>Got it!</strong> We'll get back to you within 4 hours.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
