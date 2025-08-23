import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Services.css'

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Grow your business with a stunning, high-converting website. We build fast, secure, and mobile-friendly sites that attract customers and turn visitors into loyal clients.",
      features: [
        "Increase your online sales & leads",
        "100% mobile responsive for all devices",
        "SEO-optimized to rank on Google",
        "Modern, professional design that builds trust"
      ],
      icon: "🌐"
    },
    {
      title: "Mobile App Development",
      description: "Engage your audience anywhere with a custom mobile app. We deliver smooth, intuitive apps that keep users coming back and help you stand out in the app stores.",
      features: [
        "Reach customers on Android & iOS",
        "Push notifications to boost engagement",
        "Easy-to-use interface for happy users",
        "App store launch & support"
      ],
      icon: "📱"
    },
    {
      title: "Custom Software Solutions",
      description: "Streamline your business and save time with software built just for you. Automate tasks, manage data, and scale your operations with powerful, easy-to-use tools.",
      features: [
        "Automate repetitive tasks & save money",
        "Integrate with your existing systems",
        "Cloud-based for access anywhere",
        "Ongoing support & updates"
      ],
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
          Our solutions are designed to help you attract more customers, boost your revenue, and make your business run smoother—so you can focus on what matters most.
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