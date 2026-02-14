import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaArrowRight, FaRocket, FaCode, FaMobileAlt, FaDatabase } from 'react-icons/fa'
// Serve videos from the public folder in production so they're available at /assets/*
import './Hero.css'

const Hero = () => {
  const [currentVideo, setCurrentVideo] = useState(1)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const videoRef = React.useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Autoplay prevented:", err))
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <section id="home" className="hero-section">
      <div className="video-background-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="hero-video"
          style={{ opacity: 1 }}
        >
          <source src="/assets/video2.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="glass-morphism-bg"></div>
      </div>

      <div className="container">
        <motion.div
          className="hero-content"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="hero-text-content">
            <motion.div className="hero-badge" variants={itemVariants}>
              <FaRocket className="badge-icon" />
              <span>Innovating the Digital Future</span>
            </motion.div>

            <motion.h1 className="hero-title" variants={itemVariants}>
              Crafting <span className="text-gradient">Premium</span> Digital Experiences
            </motion.h1>

            <motion.p className="hero-subtitle" variants={itemVariants}>
              We transform complex business challenges into elegant software solutions.
              From high-end web platforms to intuitive mobile apps, we build technology that scales.
            </motion.p>

            <motion.div className="hero-actions" variants={itemVariants}>
              <Link to="/contact" className="cta-primary">
                Launch Project <FaArrowRight />
              </Link>
              <Link to="/portfolio" className="cta-secondary">
                View Showcase
              </Link>
            </motion.div>
          </div>

          <div className="hero-visual-content">
            <motion.div
              className="featured-glass-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -10 }}
            >
              <div className="card-top">
                <div className="tech-stack">
                  <span className="tech-pill">React</span>
                  <span className="tech-pill">Flutter</span>
                  <span className="tech-pill">Node.js</span>
                </div>
              </div>
              <div className="card-body">
                <div className="metric">
                  <span className="metric-value">99%</span>
                  <span className="metric-label">Client Satisfaction</span>
                </div>
                <div className="status-indicator">
                  <div className="pulse-dot"></div>
                  <span>Available for New Projects</span>
                </div>
              </div>
            </motion.div>

            <div className="tech-icons-float">
              <motion.div className="floating-icon icon-1" animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <FaCode />
              </motion.div>
              <motion.div className="floating-icon icon-2" animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}>
                <FaMobileAlt />
              </motion.div>
              <motion.div className="floating-icon icon-3" animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}>
                <FaDatabase />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </motion.div>
    </section>
  )
}

// Small helper for Link if not imported globally in App.js or similar
const Link = ({ to, children, className }) => (
  <a href={to} className={className} onClick={(e) => {
    if (to.startsWith('#')) {
      e.preventDefault();
      document.querySelector(to)?.scrollIntoView({ behavior: 'smooth' });
    }
  }}>
    {children}
  </a>
);

export default Hero