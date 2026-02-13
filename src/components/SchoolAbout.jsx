import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { FaGraduationCap, FaChalkboardTeacher, FaUsers, FaCertificate, FaRocket, FaCode, FaMicrochip, FaGlobe } from 'react-icons/fa'
import './About.css'

const SchoolAbout = () => {
    const stats = [
        { number: 500, label: "Students Trained", icon: <FaGraduationCap />, suffix: "+" },
        { number: 1, label: "Primary Mentor", icon: <FaChalkboardTeacher />, suffix: "" },
        { number: 850, label: "Projects Completed", icon: <FaCertificate />, suffix: "+" },
        { number: 2000, label: "Community", icon: <FaUsers />, suffix: "+" }
    ]

    const values = [
        {
            title: "Project-First Approach",
            description: "We don't just teach syntax. We teach you how to build real-world products that solve actual business problems.",
            icon: <FaRocket />,
            color: "#0ea5e9"
        },
        {
            title: "Industry Standards",
            description: "Learn the exact tools and workflows used by top tech companies globally, from Git to Cloud Deployment.",
            icon: <FaCode />,
            color: "#f59e0b"
        },
        {
            title: "Future-Ready Skills",
            description: "My curriculum is constantly updated to include emerging technologies like AI, Software Development, and Modern Web & Mobile Frameworks.",
            icon: <FaMicrochip />,
            color: "#10b981"
        },
        {
            title: "Global Reach",
            description: "Join a community of learners from across the globe, sharing insights and collaborating on innovative local solutions.",
            icon: <FaGlobe />,
            color: "#ef4444"
        }
    ]

    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
    }

    return (
        <section id="about" className="about-section">
            <div className="about-bg-elements">
                <div className="about-blob about-blob-1"></div>
                <div className="about-blob about-blob-2"></div>
            </div>

            <div className="container">
                <motion.div
                    className="about-grid"
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <motion.div className="about-text-content" variants={itemVariants}>
                        <span className="overline" style={{ color: '#60a5fa', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', display: 'block' }}>Our Mission</span>
                        <h2 className="section-title">Empowering the Next <span className="highlight">Tech Leaders</span></h2>
                        <div className="about-description">
                            <p>
                                ZedroTech Academy was founded with a single goal: to bridge the gap between academic theory and industrial practice. We believe that everyone has the potential to become a world-class engineer if given the right mentorship and projects.
                            </p>
                            <p>
                                I provide a direct, hands-on learning experience that focuses on building. My method skips the fluff and dives straight into the core concepts and technologies that drive the modern digital economy.
                            </p>
                        </div>

                        <div className="about-stats-grid">
                            {stats.map((stat, index) => (
                                <div key={index} className="about-stat-card">
                                    <div className="stat-icon">{stat.icon}</div>
                                    <div className="stat-info">
                                        <h4 className="stat-val">
                                            <CountUp end={stat.number} duration={2.5} start={inView ? 0 : null} />
                                            {stat.suffix}
                                        </h4>
                                        <span className="stat-name">{stat.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="about-visual-content" variants={itemVariants}>
                        <div className="image-stack">
                            <div className="main-image-wrapper">
                                <img
                                    src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg"
                                    alt="Academy Mentorship"
                                    className="about-main-img"
                                />
                            </div>
                            <motion.div
                                className="floating-experience-card"
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="exp-icon"><FaRocket /></div>
                                <div className="exp-text">
                                    <h5>Practical</h5>
                                    <span>Career Focused</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="values-section"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <h3 className="values-header">Why Learn at <span className="highlight">ZedroTech Academy</span></h3>
                    <div className="values-grid">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                className="value-card-premium"
                                whileHover={{ y: -10 }}
                            >
                                <div className="value-icon-wrapper" style={{ backgroundColor: `${value.color}20`, color: value.color }}>
                                    {value.icon}
                                </div>
                                <h4 className="value-card-title">{value.title}</h4>
                                <p className="value-card-desc">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default SchoolAbout
