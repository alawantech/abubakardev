import React from 'react'
import './Footer.css'
import whatsappIcon from '../assets/images/whatsapp.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/zedrotech',
      icon: 'in'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/zedrotech',
      icon: 'gh'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/zedrotech',
      icon: 'tw'
    }
  ]

  const quickLinks = [
    { name: 'Home', to: '/' },
    { name: 'Services', to: '/services' },
    { name: 'Projects', to: '/portfolio' },
    { name: 'Courses', to: '/courses' },
    { name: 'Pricing', to: '/pricing' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' }
  ]

  const services = [
    'Website Development',
    'E-Commerce Website',
    'Mobile App Development',
    'Custom Software Solutions',
    'Online Class',
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
              <a href="#home" onClick={e => { e.preventDefault(); scrollToSection('home'); }}>
                <img src="/logo2.png" alt="ZedroTech Logo" style={{ height: '32px' }} />
              </a>
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
                  <Link to={link.to}>
                    {link.name}
                  </Link>
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
                <a href="mailto:info@zedrotech.com" className="contact-icon" style={{ display: 'inline-block' }}>
                  <span role="img" aria-label="Email">📧</span>
                </a>
                <a href="mailto:info@zedrotech.com">info@zedrotech.com</a>
              </div>
              <div className="contact-item">
                <a href="https://api.whatsapp.com/send?phone=2348156853636&text=Hi,%20I%20need%20to%20know%20more%20information%20about%20your%20services." target="_blank" rel="noopener noreferrer" className="contact-icon" style={{ display: 'inline-block' }}>
                  <img src={whatsappIcon} alt="WhatsApp" style={{ width: '1.5em', verticalAlign: 'middle', filter: 'brightness(0) invert(1)' }} />
                </a>
                <a href="https://api.whatsapp.com/send?phone=2348156853636&text=Hi,%20I%20need%20to%20know%20more%20information%20about%20your%20services." target="_blank" rel="noopener noreferrer">Whatsapp</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Kano Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} ZedroTech. All rights reserved.</p>
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