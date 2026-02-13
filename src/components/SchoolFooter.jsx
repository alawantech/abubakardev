import React from 'react'
import './Footer.css'
import whatsappIcon from '../assets/images/whatsapp.png';
import { Link } from 'react-router-dom';

const SchoolFooter = () => {
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
        }
    ]

    const quickLinks = [
        { name: 'Home', to: '/' },
        { name: 'All Courses', to: '/courses' },
        { name: 'Student Dashboard', to: '/dashboard' },
        { name: 'Contact Us', to: '/contact' }
    ]

    const categories = [
        'Web Development',
        'Mobile App Development',
        'UI/UX Design',
        'Digital Marketing',
        'Data Science',
        'Backend Systems'
    ]

    return (
        <footer className="footer school-footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section footer-about">
                        <div className="footer-logo">
                            <Link to="/">
                                <div className="logo-with-tag">
                                    <img src="/logo2.png" alt="ZedroTech Logo" style={{ height: '32px' }} />
                                </div>
                            </Link>
                        </div>
                        <p className="footer-description">
                            ZedroTech Academy is your gateway to mastering modern technology. We provide intensive, project-based training to help you start your career in tech.
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
                        <h3 className="footer-title">Course Categories</h3>
                        <ul className="footer-links">
                            {categories.map((category, index) => (
                                <li key={index}>
                                    <span>{category}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-title">Get in Touch</h3>
                        <div className="contact-info">
                            <div className="contact-item">
                                <a href="mailto:info@zedrotech.com" className="contact-icon" style={{ display: 'inline-block' }}>
                                    <span role="img" aria-label="Email">📧</span>
                                </a>
                                <a href="mailto:info@zedrotech.com">info@zedrotech.com</a>
                            </div>
                            <div className="contact-item">
                                <a href="https://api.whatsapp.com/send?phone=2348156853636&text=Hi,%20I%20want%20to%20enroll%20in%20a%20course." target="_blank" rel="noopener noreferrer" className="contact-icon" style={{ display: 'inline-block' }}>
                                    <img src={whatsappIcon} alt="WhatsApp" style={{ width: '1.5em', verticalAlign: 'middle', filter: 'brightness(0) invert(1)' }} />
                                </a>
                                <a href="https://api.whatsapp.com/send?phone=2348156853636&text=Hi,%20I%20want%20to%20enroll%20in%20a%20course." target="_blank" rel="noopener noreferrer">Admission Chat</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p>&copy; {currentYear} ZedroTech Academy. Empowering the next generation of tech leaders.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default SchoolFooter
