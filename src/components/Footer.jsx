import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa'
import './Footer.css'

const EASE = [0.22, 1, 0.36, 1]

const colVariants = {
  hidden: { opacity: 0, y: 14 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.05 + i * 0.06, ease: EASE }
  })
}

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/zedrotech/about/', icon: FaLinkedin },
    { name: 'Facebook', url: 'https://www.facebook.com/share/14fSMqNf1V6/', icon: FaFacebook },
    { name: 'Instagram', url: 'https://www.instagram.com/zedrotech?igsh=MndqZGhlb2ZydQ%3D%3D&utm_source=qr', icon: FaInstagram },
    { name: 'X', url: 'https://x.com/zedrotech?s=21', icon: FaTwitter },
    { name: 'TikTok', url: 'https://www.tiktok.com/@zedrotech?_r=1&_t=ZS-970XTt7AlQD', icon: FaTiktok }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { name: 'Home', to: '/' },
    { name: 'Services', to: '/#services' },
    { name: 'AI Automation', to: '/#ai-automation' },
    { name: 'Projects', to: '/#portfolio' },
    { name: 'About', to: '/#about' },
    { name: 'Pricing', to: '/pricing' },
    { name: 'Contact', to: '/#contact' }
  ]

  const serviceLinks = [
    'Web Applications',
    'AI Automation',
    'Mobile Apps',
    'Custom Software',
    'Marketing Technology'
  ]

  return (
    <footer className="footer">
      <div className="footer-bg">
        <div className="footer-grid" />
        <div className="footer-glow footer-glow-1" />
        <div className="footer-glow footer-glow-2" />
      </div>

      <div className="container">
        <motion.div
          className="footer-cta-bar"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div>
            <h3 className="footer-cta-title">Ready to build something great?</h3>
            <p className="footer-cta-text">Free 30-minute discovery call. No pitch, no pressure — just an honest conversation.</p>
          </div>
          <div className="footer-cta-actions">
            <Link to="/#contact" className="btn btn-primary">Start your project</Link>
            <a href="https://wa.me/2348156853636" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <FaWhatsapp size={14} /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>

        <div className="footer-grid-main">
          {[
            <div className="footer-brand" key="brand">
              <Link to="/" className="footer-logo">
                <img src="/logo2.png" alt="ZedroTech" />
              </Link>
              <p className="footer-description">
                A senior software development and AI automation agency. We build web apps, mobile apps, custom software, and AI agents for ambitious teams worldwide.
              </p>
              <div className="footer-socials">
                {socialLinks.map((s, i) => {
                  const Icon = s.icon
                  return (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="social-pill">
                      <Icon size={14} />
                    </a>
                  )
                })}
              </div>
            </div>,
            <div className="footer-col" key="company">
              <h4 className="footer-col-title">Company</h4>
              <ul className="footer-list">
                {quickLinks.map((l, i) => (
                  <li key={i}>
                    <Link to={l.to}>{l.name}</Link>
                  </li>
                ))}
              </ul>
            </div>,
            <div className="footer-col" key="services">
              <h4 className="footer-col-title">Services</h4>
              <ul className="footer-list">
                {serviceLinks.map((s, i) => (
                  <li key={i}>
                    <Link to="/#services">{s}</Link>
                  </li>
                ))}
              </ul>
            </div>,
            <div className="footer-col" key="contact">
              <h4 className="footer-col-title">Get in touch</h4>
              <ul className="footer-contact">
                <li>
                  <FaEnvelope size={14} />
                  <a href="mailto:info@zedrotech.com">info@zedrotech.com</a>
                </li>
                <li>
                  <FaWhatsapp size={14} />
                  <a href="https://wa.me/2348156853636" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
                </li>
                <li>
                  <FaMapMarkerAlt size={14} />
                  <span>Nigeria · Serving the world</span>
                </li>
              </ul>
              <div className="footer-availability">
                <span className="avail-pulse" />
                <span>Available Q3 2026</span>
              </div>
            </div>
          ].map((child, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={colVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1, margin: "0px 0px -8% 0px" }}
              className="footer-grid-item"
            >
              {child}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
        >
          <div className="footer-bottom-left">
            <p>© {currentYear} ZedroTech. All rights reserved.</p>
            <span className="footer-sep">·</span>
            <p>Built with care in Nigeria</p>
          </div>
          <div className="footer-bottom-right">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms and Conditions</Link>
            <button onClick={scrollToTop} className="back-to-top">
              Back to top <FaArrowUp size={11} />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
