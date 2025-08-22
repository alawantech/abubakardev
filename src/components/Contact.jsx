import React, { useState } from 'react'
import './Contact.css'

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
      value: "hello@abubakardev.com",
      icon: "📧",
      link: "mailto:hello@abubakardev.com"
    },
    {
      title: "Call Us",
      value: "+1 (555) 123-4567",
      icon: "📞",
      link: "tel:+15551234567"
    },
    {
      title: "Visit Us",
      value: "123 Tech Street, Silicon Valley, CA",
      icon: "📍",
      link: "#"
    }
  ]

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Ready to start your next project? Let's discuss how we can help bring your ideas to life.
        </p>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-info-title">Let's Talk</h3>
            <p className="contact-info-description">
              We'd love to hear about your project and discuss how we can help. 
              Get in touch with us today and let's start building something amazing together.
            </p>
            
            <div className="contact-methods">
              {contactInfo.map((info, index) => (
                <a 
                  key={index}
                  href={info.link}
                  className="contact-method"
                >
                  <div className="contact-method-icon">{info.icon}</div>
                  <div className="contact-method-content">
                    <h4 className="contact-method-title">{info.title}</h4>
                    <p className="contact-method-value">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="contact-hours">
              <h4>Business Hours</h4>
              <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
              <p>Weekend: Emergency support available</p>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell us about your project, timeline, and requirements..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitStatus === 'success' && (
                <div className="success-message">
                  ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact