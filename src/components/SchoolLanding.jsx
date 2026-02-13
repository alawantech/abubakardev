import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { FaGraduationCap, FaChalkboardTeacher, FaUsers, FaCertificate, FaWhatsapp, FaRocket, FaCode, FaBriefcase } from 'react-icons/fa';
import Courses from './Courses';
import './SchoolLanding.css';

const SchoolLanding = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef(null);
    const featuresRef = useRef(null);

    const { scrollYProgress } = useScroll();
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const yParallaxSpring = useSpring(yParallax, { stiffness: 100, damping: 30 });

    const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "ZedroTech Academy | Excellence in Tech Education";

        // Mouse move effect for parallax
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const stats = [
        { icon: <FaGraduationCap />, label: 'Students Enrolled', value: '500+', color: '#3b82f6' },
        { icon: <FaChalkboardTeacher />, label: 'Direct Mentorship', value: '1-on-1', color: '#8b5cf6' },
        { icon: <FaUsers />, label: 'Community Members', value: '2k+', color: '#10b981' },
        { icon: <FaCertificate />, label: 'Courses Completed', value: '850+', color: '#f59e0b' },
    ];

    const features = [
        {
            icon: <FaRocket />,
            title: "Project-Based Learning",
            description: "Learn by building real-world applications that you can showcase to employers.",
            color: "#3b82f6"
        },
        {
            icon: <FaCode />,
            title: "Direct Mentorship",
            description: "Get stuck? I am here to guide you every step of the way through dedicated 1-on-1 support.",
            color: "#8b5cf6"
        },
        {
            icon: <FaBriefcase />,
            title: "Career Placement",
            description: "We assist our top performers with job opportunities and freelance gigs.",
            color: "#10b981"
        }
    ];

    // Floating particles animation
    const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
    }));

    return (
        <div className="school-landing">
            {/* Animated Background Particles */}
            <div className="particles-container">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="particle"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Animated Gradient Orbs */}
            <div className="gradient-orbs">
                <motion.div
                    className="orb orb-1"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -100, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="orb orb-2"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="orb orb-3"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Hero Section */}
            <section className="school-hero" ref={heroRef}>
                <div className="video-background-container">
                    <motion.video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="hero-video"
                    >
                        <source src="/assets/video2.mp4" type="video/mp4" />
                    </motion.video>
                    <div className="hero-overlay"></div>
                </div>

                <motion.div
                    className="school-hero-content"
                    style={{
                        x: mousePosition.x * 0.5,
                        y: mousePosition.y * 0.5,
                    }}
                >
                    <motion.span
                        className="school-badge"
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.6, 0.05, 0.01, 0.9],
                            delay: 0.2
                        }}
                    >
                        <motion.span
                            animate={{
                                boxShadow: [
                                    "0 0 20px rgba(59, 130, 246, 0.3)",
                                    "0 0 40px rgba(59, 130, 246, 0.6)",
                                    "0 0 20px rgba(59, 130, 246, 0.3)"
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ display: 'block', borderRadius: '99px' }}
                        >
                            Welcome to ZedroTech Academy
                        </motion.span>
                    </motion.span>

                    <motion.h1
                        className="school-title"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1,
                            ease: [0.6, 0.05, 0.01, 0.9],
                            delay: 0.4
                        }}
                    >
                        Master the Future of{' '}
                        <motion.span
                            className="highlight"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            style={{ backgroundSize: '200% 200%' }}
                        >
                            Technology
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        className="school-description"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.6, 0.05, 0.01, 0.9],
                            delay: 0.6
                        }}
                    >
                        Unlock your potential with our project-based learning approach.
                        From web development to software engineering, we provide the tools
                        and mentorship you need to succeed.
                    </motion.p>

                    <motion.div
                        className="school-hero-buttons"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.6, 0.05, 0.01, 0.9],
                            delay: 0.8
                        }}
                    >
                        <motion.button
                            className="primary-btn"
                            onClick={() => document.getElementById('courses-section').scrollIntoView({ behavior: 'smooth' })}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                View Our Courses
                            </motion.span>
                        </motion.button>
                        <motion.button
                            className="secondary-btn flex items-center gap-2"
                            onClick={() => window.open('https://api.whatsapp.com/send?phone=2348156853636&text=Hi,%20I%20want%20to%20enroll%20in%20a%20course.', '_blank')}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: "rgba(255, 255, 255, 0.15)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <FaWhatsapp className="text-emerald-500" />
                            </motion.div>
                            Chat with Admission
                        </motion.button>
                    </motion.div>
                </motion.div>

                <div className="school-hero-stats">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stat-card"
                            initial={{ opacity: 0, y: 50, rotateX: -15 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 1 + (index * 0.15),
                                ease: [0.6, 0.05, 0.01, 0.9]
                            }}
                            whileHover={{
                                y: -10,
                                boxShadow: `0 20px 60px ${stat.color}40`,
                                borderColor: stat.color,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <motion.div
                                className="stat-icon"
                                whileHover={{
                                    rotate: [0, -10, 10, 0],
                                    scale: 1.2
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                {stat.icon}
                            </motion.div>
                            <div className="stat-info">
                                <motion.span
                                    className="stat-value"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.2 + (index * 0.15), duration: 0.5 }}
                                >
                                    {stat.value}
                                </motion.span>
                                <motion.span
                                    className="stat-label"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.3 + (index * 0.15) }}
                                >
                                    {stat.label}
                                </motion.span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="school-features" ref={featuresRef}>
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Why Choose ZedroTech Academy?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        We don't just teach code; we build careers.
                    </motion.p>
                </motion.div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-item"
                            initial={{ opacity: 0, y: 80, rotateY: -20 }}
                            animate={featuresInView ? {
                                opacity: 1,
                                y: 0,
                                rotateY: 0
                            } : {}}
                            transition={{
                                duration: 0.8,
                                delay: 0.4 + (index * 0.2),
                                ease: [0.6, 0.05, 0.01, 0.9]
                            }}
                            whileHover={{
                                y: -15,
                                scale: 1.02,
                                boxShadow: `0 30px 60px ${feature.color}30`,
                                borderColor: feature.color,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <motion.div
                                className="feature-icon"
                                style={{ color: feature.color }}
                                whileHover={{
                                    scale: 1.2,
                                    rotate: 360,
                                    filter: `drop-shadow(0 0 20px ${feature.color})`
                                }}
                                transition={{ duration: 0.6 }}
                            >
                                {feature.icon}
                            </motion.div>
                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={featuresInView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.6 + (index * 0.2) }}
                            >
                                {feature.title}
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={featuresInView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.7 + (index * 0.2) }}
                            >
                                {feature.description}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Courses Section */}
            <motion.section
                id="courses-section"
                className="school-courses-list"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2>Our Popular Courses</h2>
                    <p>Carefully curated paths to take you from Zero to Hero.</p>
                </motion.div>
                <Courses />
            </motion.section>
        </div>
    );
};

export default SchoolLanding;
