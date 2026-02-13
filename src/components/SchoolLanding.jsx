import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaChalkboardTeacher, FaUsers, FaCertificate, FaWhatsapp } from 'react-icons/fa';
import Courses from './Courses';
import './SchoolLanding.css';

const SchoolLanding = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "ZedroTech Academy | Excellence in Tech Education";
    }, []);

    const stats = [
        { icon: <FaGraduationCap />, label: 'Students Enrolled', value: '500+' },
        { icon: <FaChalkboardTeacher />, label: 'Direct Mentorship', value: '1-on-1' },
        { icon: <FaUsers />, label: 'Community Members', value: '2k+' },
        { icon: <FaCertificate />, label: 'Courses Completed', value: '850+' },
    ];

    return (
        <div className="school-landing">
            {/* Hero Section */}
            <section className="school-hero">
                <div className="video-background-container">
                    <motion.video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="hero-video"
                    >
                        <source src="/assets/video2.mp4" type="video/mp4" />
                    </motion.video>
                    <div className="hero-overlay"></div>
                </div>

                <div className="school-hero-content">
                    <motion.span
                        className="school-badge"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Welcome to ZedroTech Academy
                    </motion.span>
                    <motion.h1
                        className="school-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Master the Future of <span className="highlight">Technology</span>
                    </motion.h1>
                    <motion.p
                        className="school-description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Unlock your potential with our project-based learning approach.
                        From web development to software engineering, we provide the tools
                        and mentorship you need to succeed.
                    </motion.p>
                    <motion.div
                        className="school-hero-buttons"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <button className="primary-btn" onClick={() => document.getElementById('courses-section').scrollIntoView({ behavior: 'smooth' })}>
                            View Our Courses
                        </button>
                        <button
                            className="secondary-btn flex items-center gap-2"
                            onClick={() => window.open('https://api.whatsapp.com/send?phone=2348156853636&text=Hi,%20I%20want%20to%20enroll%20in%20a%20course.', '_blank')}
                        >
                            <FaWhatsapp className="text-emerald-500" /> Chat with Admission
                        </button>
                    </motion.div>
                </div>

                <div className="school-hero-stats">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stat-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                        >
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-info">
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="school-features">
                <div className="section-header">
                    <h2>Why Choose ZedroTech Academy?</h2>
                    <p>We don't just teach code; we build careers.</p>
                </div>
                <div className="features-grid">
                    <div className="feature-item">
                        <div className="feature-icon">🚀</div>
                        <h3>Project-Based Learning</h3>
                        <p>Learn by building real-world applications that you can showcase to employers.</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">👨‍🏫</div>
                        <h3>Direct Mentorship</h3>
                        <p>Get stuck? I am here to guide you every step of the way through dedicated 1-on-1 support.</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">💼</div>
                        <h3>Career Placement</h3>
                        <p>We assist our top performers with job opportunities and freelance gigs.</p>
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section id="courses-section" className="school-courses-list">
                <div className="section-header">
                    <h2>Our Popular Courses</h2>
                    <p>Carefully curated paths to take you from Zero to Hero.</p>
                </div>
                <Courses />
            </section>
        </div>
    );
};

export default SchoolLanding;
