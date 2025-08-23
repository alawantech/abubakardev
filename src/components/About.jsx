import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import './About.css'

const About = () => {
  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "30+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" }
  ]

  const values = [
    {
      title: "Innovation",
      description: "We stay ahead of technology trends to deliver cutting-edge solutions that give your business a competitive advantage.",
      icon: "💡"
    },
    {
      title: "Quality",
      description: "We maintain the highest standards in code quality, testing, and deployment to ensure reliable and robust applications.",
      icon: "⭐"
    },
    {
      title: "Collaboration",
      description: "We work closely with our clients throughout the development process to ensure the final product exceeds expectations.",
      icon: "🤝"
    },
    {
      title: "Results",
      description: "Our focus is on delivering measurable business value through technology solutions that drive growth and efficiency.",
      icon: "🎯"
    }
  ]


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
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          className="about-content"
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <motion.div
            className="about-text"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeLeft}
          >
            <motion.h2 className="section-title" whileHover={{ scale: 1.04 }}>
              About AbubakarDev
            </motion.h2>
            <div className="about-description">
              <motion.p variants={fadeUp}>
                We are a software development company helping businesses grow with technology. 
                With years of experience in web development, mobile app creation, and custom software solutions, 
                we transform ideas into powerful digital experiences.
              </motion.p>
              <motion.p variants={fadeUp}>
                Our team of skilled developers and designers is passionate about creating innovative solutions 
                that solve real business problems. We believe in the power of technology to transform businesses 
                and are committed to delivering exceptional results for every project.
              </motion.p>
              <motion.p variants={fadeUp}>
                From startups to enterprise companies, we've helped organizations across various industries 
                leverage technology to streamline operations, improve customer experiences, and drive sustainable growth.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            className="about-image"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeRight}
            whileHover={{ scale: 1.03, rotate: 2 }}
          >
            <img 
              src="https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="AbubakarDev Team"
            />
            <motion.div
              className="about-experience"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              whileHover={{ scale: 1.1, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
            >
              <span className="experience-number">5+</span>
              <span className="experience-text">Years of Excellence</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="about-stats"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.08, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}
            >
              <span className="stat-number">
                {stat.number === "24/7"
                  ? "24/7"
                  : <CountUp end={parseInt(stat.number)} duration={2} suffix="+" start={inView ? 0 : undefined} />}
              </span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="about-values"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <h3 className="values-title">Our Core Values</h3>
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.08, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}
              >
                <div className="value-icon">{value.icon}</div>
                <h4 className="value-title">{value.title}</h4>
                <p className="value-description">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About