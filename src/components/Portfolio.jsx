import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import './Portfolio.css'

const Portfolio = () => {
  const projects = [
    {
      title: "Rady.ng - E-Commerce Platform",
      description: "An intuitive e-commerce platform with website builder, custom domains, inventory management, and payment processing. Build and grow your online store effortlessly.",
      image: "/rady.ng.PNG",
      tech: ["React", "Firebase", "Tailwind", "Flutterwave"],
      category: "Web Development",
      liveLink: "https://www.rady.ng/"
    },
    {
      title: "Bright Orion Global",
      description: "A multi-level referral platform featuring user onboarding, authentication, wallet management, earnings tracking, and comprehensive dashboard functionality.",
      image: "/brightorion.PNG",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
      category: "Web Development",
      liveLink: "https://brightorionglobal.com"
    },
    {
      title: "Djenepo Couture",
      description: "Premium African fashion brand showcasing custom-made Abacosts, Tuniques, and Vestes with WhatsApp ordering and 7+ years of expert craftsmanship.",
      image: "/djenepocouture.PNG",
      tech: ["React", "Tailwind CSS", "Firebase"],
      category: "Web Development",
      liveLink: "https://djenepocouture.com"
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
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <motion.h2
          className="section-title"
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          whileHover={{ scale: 1.04 }}
        >
          Our Portfolio
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeLeft}
        >
          Take a look at some of our recent projects and see how we've helped businesses achieve their goals
        </motion.p>

        <motion.div
          className="portfolio-grid"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="portfolio-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.2, duration: 0.7 }}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
            >
              <motion.div className="portfolio-image" whileHover={{ scale: 1.03, rotate: 2 }}>
                <img src={project.image} alt={project.title} />
                <motion.div className="portfolio-overlay" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                  <div className="portfolio-category">{project.category}</div>
                </motion.div>
              </motion.div>

              <div className="portfolio-content">
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-description">{project.description}</p>

                <div className="portfolio-tech">
                  {project.tech.map((tech, idx) => (
                    <motion.span key={idx} className="tech-tag" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + idx * 0.1 }}>
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="portfolio-actions">
                  {project.liveLink && (
                    <motion.a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="portfolio-btn live-demo-btn" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <span>Live Demo</span>
                      <FaArrowRight className="btn-icon" />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio