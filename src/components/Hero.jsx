import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Hero.css'


const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  }
  const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  }
  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  }

  // Intersection Observer for scroll animation
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-pattern"></div>
      </div>
      <div className="container">
        <motion.div
          className="hero-content"
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <motion.div
            className="hero-text"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeLeft}
          >
            <motion.h1 className="hero-title" whileHover={{ scale: 1.04 }}>
              We Build Websites, Mobile Apps, and Custom Software for Businesses
            </motion.h1>
            <motion.p className="hero-description" variants={fadeUp}>
              Transform your business with cutting-edge technology solutions. 
              We create custom software that drives growth and delivers exceptional user experiences.
            </motion.p>
            <div className="hero-buttons">
              <motion.button
                className="btn-primary hero-cta"
                onClick={scrollToContact}
                whileHover={{ scale: 1.08, boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
                whileTap={{ scale: 0.96 }}
              >
                Get Started
              </motion.button>
              <motion.a
                href="#services"
                className="btn-secondary"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('services').scrollIntoView({ behavior: 'smooth' })
                }}
                whileHover={{ scale: 1.08, color: '#0ea5e9' }}
                whileTap={{ scale: 0.96 }}
              >
                View Services
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeRight}
          >
            <motion.div className="hero-image" whileHover={{ scale: 1.03, rotate: 2 }}>
              <img 
                src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Modern Software Development Workspace"
              />
            </motion.div>
            <div className="floating-elements">
              <motion.div
                className="floating-card card-1"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                whileHover={{ scale: 1.1, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
              >
                <span>Web Development</span>
              </motion.div>
              <motion.div
                className="floating-card card-2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                whileHover={{ scale: 1.1, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
              >
                <span>Mobile Apps</span>
              </motion.div>
              <motion.div
                className="floating-card card-3"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                whileHover={{ scale: 1.1, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
              >
                <span>Custom Software</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero