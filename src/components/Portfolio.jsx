import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Portfolio.css'

const Portfolio = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with payment integration, inventory management, and admin dashboard. Built with React and Node.js.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Web Development"
    },
    {
      title: "Task Management App",
      description: "Cross-platform mobile app for team collaboration and project management. Features real-time updates and offline sync.",
      image: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React Native", "Firebase", "Redux", "TypeScript"],
      category: "Mobile App"
    },
    {
      title: "Business Analytics Dashboard",
      description: "Custom analytics platform with real-time data visualization, reporting tools, and automated insights for business intelligence.",
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Python", "PostgreSQL", "Chart.js"],
      category: "Custom Software"
    },
    {
      title: "Restaurant POS System",
      description: "Point-of-sale system for restaurants with order management, kitchen display, and payment processing integration.",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Vue.js", "Express", "MySQL", "Socket.io"],
      category: "Custom Software"
    },
    {
      title: "Fitness Tracking App",
      description: "Mobile app for tracking workouts, nutrition, and progress with social features and personal trainer integration.",
      image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Flutter", "Firebase", "GraphQL", "AWS"],
      category: "Mobile App"
    },
    {
      title: "Corporate Website",
      description: "Professional corporate website with CMS integration, SEO optimization, and multilingual support for global reach.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Next.js", "Strapi", "TailwindCSS", "Vercel"],
      category: "Web Development"
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
                  <motion.button className="portfolio-btn" whileHover={{ scale: 1.08, backgroundColor: '#0ea5e9', color: '#fff' }} whileTap={{ scale: 0.96 }}>
                    View Project
                  </motion.button>
                  <motion.button className="portfolio-btn-secondary" whileHover={{ scale: 1.08, backgroundColor: '#0ea5e9', color: '#fff' }} whileTap={{ scale: 0.96 }}>
                    Live Demo
                  </motion.button>
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