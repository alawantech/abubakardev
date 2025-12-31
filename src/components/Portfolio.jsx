import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaExternalLinkAlt, FaArrowRight, FaCode, FaGithub, FaEye } from "react-icons/fa";
import './Portfolio.css'

const Portfolio = () => {
  const projects = [
    {
      title: "Rady.ng - E-Commerce",
      description: "A comprehensive SaaS platform enabling businesses to build digital storefronts with integrated inventory and payments.",
      image: "/rady.ng.PNG",
      tech: ["React", "Firebase", "Tailwind", "Cloud Functions"],
      category: "Web Platform",
      liveLink: "https://www.rady.ng/",
      color: "#0ea5e9"
    },
    {
      title: "Bright Orion Global",
      description: "Full-scale multi-level marketing system with real-time earnings tracking and secure wallet architecture.",
      image: "/brightorion.PNG",
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      category: "Fintech",
      liveLink: "https://brightorionglobal.com",
      color: "#8b5cf6"
    },
    {
      title: "Djenepo Couture",
      description: "High-end fashion boutique experience with automated ordering and interactive catalog system.",
      image: "/djenepocouture.PNG",
      tech: ["React", "Motion", "Firebase", "WhatsApp API"],
      category: "E-Commerce",
      liveLink: "https://djenepocouture.com",
      color: "#ec4899"
    }
  ]

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    }
  }

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-bg-elements">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="container">
        <motion.div
          className="section-header"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="overline projects-overline">Featured Work</span>
          <h2 className="section-title">Selected <span className="highlight">Projects</span></h2>
          <p className="section-subtitle">
            A showcase of digital products we've built for ambitious brands and startups worldwide.
          </p>
        </motion.div>

        <motion.div
          className="portfolio-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="portfolio-card-glass"
                variants={cardVariants}
                whileHover={{ y: -10 }}
              >
                <div className="card-inner">
                  <div className="project-image-wrapper">
                    <img src={project.image} alt={project.title} className="project-img" />
                    <div className="image-overlay">
                      <div className="overlay-content">
                        <motion.a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="view-project-btn"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaEye />
                          <span>View Demo</span>
                        </motion.a>
                      </div>
                    </div>
                    <div className="project-tag" style={{ backgroundColor: project.color }}>
                      {project.category}
                    </div>
                  </div>

                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>

                    <div className="project-tech-stack">
                      {project.tech.map((tech, idx) => (
                        <span key={idx} className="tech-pill">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="project-footer">
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        Explore Project
                        <FaArrowRight className="link-icon" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio
