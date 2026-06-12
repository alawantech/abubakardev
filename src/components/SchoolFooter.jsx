import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaArrowUp } from 'react-icons/fa';
import './SchoolFooter.css';

const SchoolFooter = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="sf">
      <div className="sf-inner">
        {/* Top */}
        <div className="sf-top">
          <div className="sf-brand">
            <Link to="/" className="sf-logo-link">
              <img src="/logo2.png" alt="ZedroTech Academy" className="sf-logo" />
            </Link>
            <p className="sf-desc">
              ZedroTech Academy is your gateway to mastering modern technology.
              Project-based training to help you start and grow your career in tech.
            </p>
            <div className="sf-socials">
              <a href="https://linkedin.com/company/zedrotech" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="https://github.com/zedrotech" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a href="https://twitter.com/zedrotech" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://instagram.com/zedrotech" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>

          <div className="sf-links-group">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">All Courses</Link></li>
              <li><Link to="/dashboard">Student Dashboard</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="sf-links-group">
            <h4>Programs</h4>
            <ul>
              <li><span>Web Development</span></li>
              <li><span>Mobile App Development</span></li>
              <li><span>UI/UX Design</span></li>
              <li><span>Data Science</span></li>
              <li><span>Digital Marketing</span></li>
            </ul>
          </div>

          <div className="sf-links-group">
            <h4>Get in Touch</h4>
            <ul className="sf-contact">
              <li>
                <a href="mailto:info@zedrotech.com">
                  <FaEnvelope /> info@zedrotech.com
                </a>
              </li>
              <li>
                <a href="https://api.whatsapp.com/send?phone=2348156853636&text=Hi,%20I%20want%20to%20enroll%20in%20a%20course." target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp /> Chat on WhatsApp
                </a>
              </li>
            </ul>
            <div className="sf-newsletter">
              <p>Stay updated with new courses</p>
              <div className="sf-newsletter-form">
                <input type="email" placeholder="Your email" readOnly />
                <button type="button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="sf-divider" />

        {/* Bottom */}
        <div className="sf-bottom">
          <p>&copy; {currentYear} ZedroTech Academy. All rights reserved.</p>
          <div className="sf-bottom-links">
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <button onClick={scrollToTop} className="sf-back-top">
              <FaArrowUp size={12} /> Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SchoolFooter;
