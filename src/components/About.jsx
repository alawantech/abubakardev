import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { FaLightbulb, FaStar, FaHandshake, FaBullseye, FaRocket, FaUsers, FaHistory, FaHeadset } from 'react-icons/fa'
import './About.css'

const About = () => {
  const stats = [
    { number: 50, label: "Projects Completed", icon: <FaRocket />, suffix: "+" },
    { number: 30, label: "Happy Clients", icon: <FaUsers />, suffix: "+" },
    { number: 5, label: "Years Experience", icon: <FaHistory />, suffix: "+" },
    { number: 24, label: "Support Available", icon: <FaHeadset />, suffix: "/7" }
  ]

  const values = [
    {
      title: "Innovation",
      description: "We stay ahead of technology trends to deliver cutting-edge solutions that give your business a competitive advantage.",
      icon: <FaLightbulb />,
      color: "#0ea5e9"
    },
    {
      title: "Quality",
      description: "We maintain the highest standards in code quality, testing, and deployment to ensure reliable and robust applications.",
      icon: <FaStar />,
      color: "#f59e0b"
    },
    {
      title: "Collaboration",
      description: "We work closely with our clients throughout the development process to ensure the final product exceeds expectations.",
      icon: <FaHandshake />,
      color: "#10b981"
    },
    {
      title: "Results",
      description: "Our focus is on delivering measurable business value through technology solutions that drive growth and efficiency.",
      icon: <FaBullseye />,
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
            <span className="overline">Our Story</span>
            <h2 className="section-title">Innovating the <span className="highlight">Digital Future</span></h2>
            <div className="about-description">
              <p>
                At AbubakarDev, we believe that technology should be an enabler, not a barrier.
                Our journey started with a simple mission: to help entrepreneurs and businesses
                build digital products that actually work and scale.
              </p>
              <p>
                With half a decade of excellence in software engineering, we’ve mastered the art
                of transforming complex business requirements into elegant, high-performance
                digital experiences.
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
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                  alt="Team Collaboration"
                  className="about-main-img"
                />
              </div>
              <motion.div
                className="floating-experience-card"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="exp-icon"><FaHistory /></div>
                <div className="exp-text">
                  <h5>5+ Years</h5>
                  <span>Proven Track Record</span>
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
          <h3 className="values-header">Our Core <span className="highlight">Values</span></h3>
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

export default About
