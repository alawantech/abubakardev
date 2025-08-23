import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Contact.css'
import whatsappIcon from '../assets/images/whatsapp.png';

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', whatsapp: '', service: '', customService: '', businessName: '', businessDescription: '', budget: '', message: '' })
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000)
    }, 1000)
  }

  const contactInfo = [
    {
      title: "Email Us",
      value: "info@abubakardev.dev",
      icon: "📧",
      link: "mailto:info@abubakardev.dev"
    },
    {
      title: "Chat Us",
      value: "Message us on Whatsapp",
    icon: <img src={whatsappIcon} alt="WhatsApp" style={{width: '1.5em', verticalAlign: 'middle'}} />,
      link: "https://api.whatsapp.com/send?phone=2348156853636&text=Hi,%20I%20need%20to%20know%20more%20information%20about%20your%20services."
    }
  ]


  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  }
  const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  }
  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  }

  // Intersection Observer for scroll animation
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.h2
          className="section-title"
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          whileHover={{ scale: 1.04 }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeLeft}
        >
          Ready to start your next project? Let's discuss how we can help bring your ideas to life.
        </motion.p>

        <motion.div
          className="contact-content"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <motion.div
            className="contact-info"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeLeft}
          >
            <h3 className="contact-info-title">Let's Talk</h3>
            <p className="contact-info-description">
              We'd love to hear about your project and discuss how we can help. 
              Get in touch with us today and let's start building something amazing together.
            </p>

            <div className="contact-methods">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  className="contact-method"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
                  whileHover={{ scale: 1.08, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}
                >
                  <div className="contact-method-icon">{info.icon}</div>
                  <div className="contact-method-content">
                    <h4 className="contact-method-title">{info.title}</h4>
                    <p className="contact-method-value">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="contact-hours">
              <h4>Business Hours</h4>
              <p>We are working 24/7. We reply to WhatsApp messages any time.</p>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-container"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeRight}
          >
            <form onSubmit={handleSubmit} className="contact-form" id="contactform">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  whileFocus={{ scale: 1.03, borderColor: '#0ea5e9' }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  whileFocus={{ scale: 1.03, borderColor: '#0ea5e9' }}
                />
              </div>

                <div className="form-group">
                  <label htmlFor="whatsapp">WhatsApp Number</label>
                  <motion.input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    placeholder="e.g. +2348012345678"
                    whileFocus={{ scale: 1.03, borderColor: '#0ea5e9' }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="businessName">Business Name</label>
                  <motion.input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    placeholder="Your business name"
                    whileFocus={{ scale: 1.03, borderColor: '#0ea5e9' }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="businessDescription">Business Description</label>
                  <motion.input
                    type="text"
                    id="businessDescription"
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleChange}
                    required
                    placeholder="Describe your business"
                    whileFocus={{ scale: 1.03, borderColor: '#0ea5e9' }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="features">Features & Goals (optional)</label>
                  <motion.textarea
                    id="features"
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Describe what features you want, what it should do, and what you want to achieve."
                    whileFocus={{ scale: 1.03, borderColor: '#0ea5e9' }}
                  ></motion.textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Budget (optional)</label>
                  <motion.input
                    type="number"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    min="0"
                    placeholder="Amount you budgeted (₦, $, etc.)"
                    whileFocus={{ scale: 1.03, borderColor: '#0ea5e9' }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service You Want</label>
                  <motion.select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    whileFocus={{ scale: 1.03, borderColor: '#0ea5e9' }}
                  >
                    <option value="">Select a service</option>
                    <option value="Website">Website</option>
                    <option value="Software for Business">Software for Business</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Business Website">Business Website</option>
                    <option value="Ecommerce Website">Ecommerce Website</option>
                    <option value="App">App</option>
                    <option value="Software Development Online Class">Software Development Online Class (Web & App Dev)</option>
                    <option value="Other">Other (please specify below)</option>
                  </motion.select>
                </div>

                {formData.service === 'Other' && (
                  <div className="form-group">
                    <label htmlFor="customService">Please specify your service</label>
                    <motion.input
                      type="text"
                      id="customService"
                      name="customService"
                      value={formData.customService}
                      onChange={handleChange}
                      required
                      placeholder="Describe your service request"
                      whileFocus={{ scale: 1.03, borderColor: '#0ea5e9' }}
                    />
                  </div>
                )}

              <div className="form-group">
                <label htmlFor="message">Additional Info (optional)</label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Any extra details, questions, or requirements..."
                  whileFocus={{ scale: 1.03, borderColor: '#0ea5e9' }}
                ></motion.textarea>
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: 1.08, backgroundColor: '#0ea5e9', color: '#fff' }}
                whileTap={{ scale: 0.96 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div className="success-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact