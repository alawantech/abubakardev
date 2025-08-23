import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Contact.css'
import whatsappIcon from '../assets/images/whatsapp.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
      setFormData({ name: '', email: '', message: '' })
      
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
            <form onSubmit={handleSubmit} className="contact-form">
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
                <label htmlFor="message">Project Details</label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell us about your project, timeline, and requirements..."
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