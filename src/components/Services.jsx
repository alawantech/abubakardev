import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Services.css'

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Custom websites built with modern technologies like React, Node.js, and responsive design principles. We create fast, secure, and user-friendly websites that drive business growth.",
      features: ["Responsive Design", "SEO Optimized", "Fast Performance", "Modern UI/UX"],
      icon: "🌐"
    },
    {
      title: "Mobile App Development",
      description: "Cross-platform mobile applications using React Native. Build once, deploy everywhere. We create intuitive mobile experiences that engage your users.",
      features: ["Cross-Platform", "Native Performance", "Push Notifications", "App Store Ready"],
      icon: "📱"
    },
    {
      title: "Custom Software Solutions",
      description: "Tailored software solutions for your unique business needs. From automation tools to complex enterprise systems, we build software that scales with your business.",
      features: ["Scalable Architecture", "Integration Ready", "Cloud Deployment", "24/7 Support"],
      icon: "⚙️"
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
    <section id="services" className="services section">
      <div className="container">
        <motion.h2
          className="section-title"
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          whileHover={{ scale: 1.04 }}
        >
          Our Services
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeLeft}
        >
          We offer comprehensive software development services to help your business succeed in the digital world
        </motion.p>

        <motion.div
          className="services-grid"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.2, duration: 0.7 }}
              whileHover={{ scale: 1.08, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
            >
              <motion.div className="service-icon" whileHover={{ scale: 1.2 }}>
                <span>{service.icon}</span>
              </motion.div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <motion.li key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + idx * 0.1 }}>
                    {feature}
                  </motion.li>
                ))}
              </ul>
              <motion.button className="service-cta" whileHover={{ scale: 1.08, backgroundColor: '#0ea5e9', color: '#fff' }} whileTap={{ scale: 0.96 }}>
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services