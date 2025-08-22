import React from 'react'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/abubakardev',
      icon: 'in'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/abubakardev',
      icon: 'gh'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/abubakardev',
      icon: 'tw'
    }
  ]

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ]

  const services = [
    'Web Development',
    'Mobile App Development',
    'Custom Software Solutions',
    'UI/UX Design',
    'Technical Consulting'
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-about">
            <div className="footer-logo">
              <span>AbubakarDev</span>
            </div>
            <p className="footer-description">
              We build websites, mobile apps, and custom software solutions that help businesses grow and succeed in the digital world.
            </p>
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={link.name}
                >
                  <span className={`social-icon icon-${link.icon}`}>
                    {link.icon === 'in' && '💼'}
                    {link.icon === 'gh' && '🔗'}
                    {link.icon === 'tw' && '🐦'}
                  </span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Our Services</h3>
            <ul className="footer-links">
              {services.map((service, index) => (
                <li key={index}>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Contact Info</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <a href="mailto:hello@abubakardev.com">hello@abubakardev.com</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Silicon Valley, CA</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} AbubakarDev. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer