import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGlobe, FaMobileAlt, FaCogs, FaArrowRight, FaCheckCircle, FaChalkboardTeacher, FaShoppingCart } from 'react-icons/fa'
import './Services.css'

const Services = () => {
  const services = [
    {
      title: "Website Development",
      description: "Grow your business with a stunning, high-converting website. We build fast, secure, and mobile-friendly sites that attract customers and turn visitors into loyal clients.",
      features: [
        "Modern, SEO-friendly websites",
        "100% mobile responsive design",
        "Fast loading & secure performance",
        "Google Search optimization"
      ],
      icon: <FaGlobe />,
      color: "var(--primary-blue)"
    },
    {
      title: "E-Commerce Website",
      description: "Start selling online with a powerful e-commerce platform. We build secure, scalable online stores that provide a seamless shopping experience for your customers.",
      features: [
        "Secure payment integrations",
        "Product & inventory management",
        "Shopping cart & checkout flow",
        "Sales tracking & analytics"
      ],
      icon: <FaShoppingCart />,
      color: "#f43f5e"
    },
    {
      title: "Mobile App Development",
      description: "Engage your audience anywhere with a custom mobile app. We deliver smooth, intuitive apps that keep users coming back and help you stand out in the app stores.",
      features: [
        "Reach customers on Android & iOS",
        "Push notifications to boost engagement",
        "Easy-to-use interface",
        "App store launch & support"
      ],
      icon: <FaMobileAlt />,
      color: "var(--accent-teal)"
    },
    {
      title: "Custom Software",
      description: "Streamline your business and save time with software built just for you. Automate tasks, manage data, and scale your operations with powerful, easy-to-use tools.",
      features: [
        "Automate repetitive tasks",
        "Integrate with existing systems",
        "Cloud-based for access anywhere",
        "Ongoing support & updates"
      ],
      icon: <FaCogs />,
      color: "var(--primary-purple)"
    }
  ]

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <section id="services" className="services-section">
      <div className="background-elements">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="container">
        <div className="section-header" ref={ref}>
          <motion.span
            className="overline"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Capabilities
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tailored <span className="highlight">Solutions</span> for Growth
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We combine strategic thinking with technical excellence to deliver digital products that move the needle for your business.
          </motion.p>
        </div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={cardVariants}
              whileHover={{
                y: -15,
                transition: { duration: 0.3 }
              }}
            >
              <div className="card-glass-reveal"></div>
              <div className="service-icon-wrapper" style={{ '--icon-color': service.color }}>
                <div className="icon-bg"></div>
                <div className="icon-inner">{service.icon}</div>
              </div>

              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>

              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <FaCheckCircle className="check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                className="service-cta"
                whileHover={{ gap: '12px' }}
              >
                Learn More <FaArrowRight />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services