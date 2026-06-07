import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowUpRight } from 'react-icons/hi2'
import { FaRobot, FaMobileAlt } from 'react-icons/fa'
import { StaggerReveal, TiltCard } from '../animations/primitives'
import './Portfolio.css'

const EASE = [0.22, 1, 0.36, 1]

const projects = [
  {
    id: 'rady',
    title: 'Rady.ng',
    category: 'Web App',
    tags: ['React', 'Firebase', 'Tailwind', 'Cloud Functions'],
    description: 'A comprehensive SaaS platform enabling businesses to build digital storefronts with integrated inventory and payments.',
    image: '/rady.ng.PNG',
    liveUrl: 'https://www.rady.ng/',
    color: '#0ea5e9',
    metrics: { type: 'SaaS', stack: 'React + Firebase', status: 'Live' }
  },
  {
    id: 'brightorion',
    title: 'Bright Orion Global',
    category: 'Web App',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    description: 'Full-scale multi-level marketing system with real-time earnings tracking and secure wallet architecture.',
    image: '/brightorion.PNG',
    liveUrl: 'https://brightorionglobal.com',
    color: '#8b5cf6',
    metrics: { type: 'Fintech', stack: 'Next.js', status: 'Live' }
  },
  {
    id: 'djenepo',
    title: 'Djenepo Couture',
    category: 'Web App',
    tags: ['React', 'Motion', 'Firebase', 'WhatsApp API'],
    description: 'High-end fashion boutique experience with automated ordering and interactive catalog system.',
    image: '/djenepocouture.PNG',
    liveUrl: 'https://djenepocouture.com',
    color: '#ec4899',
    metrics: { type: 'E-commerce', stack: 'React + Firebase', status: 'Live' }
  },
  {
    id: 'ai-suite',
    title: 'AI Sales Closer',
    category: 'AI Automation',
    tags: ['GPT-4', 'Voice AI', 'Twilio', 'Webhooks'],
    description: 'An AI agent that engages leads, qualifies them, and books sales calls. Trained on a client\'s product catalog and FAQs.',
    image: null,
    color: '#10b981',
    liveUrl: null,
    metrics: { type: 'AI Agent', stack: 'GPT-4 + Voice', status: 'Production' }
  },
  {
    id: 'mobile-banking',
    title: 'PayWave Mobile',
    category: 'Mobile App',
    tags: ['React Native', 'Node.js', 'Stripe', 'Firebase'],
    description: 'A cross-platform mobile wallet for peer-to-peer payments, bill splits, and savings goals. Built for iOS & Android from one codebase.',
    image: null,
    color: '#8b5cf6',
    liveUrl: null,
    metrics: { type: 'Fintech', stack: 'React Native', status: 'In production' }
  }
]

const categories = ['All', 'Web App', 'Mobile App', 'AI Automation']

const Portfolio = () => {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="portfolio-section section" id="portfolio">
      <div className="container">
        <div className="section-heading">
          <motion.span
            className="eyebrow eyebrow-accent"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            Selected work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          >
            Real products.<br/>
            <span className="gradient-text">Real results.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            A small selection of products we've shipped — each one solving a real problem for real people.
          </motion.p>
        </div>

        <motion.div
          className="portfolio-filters"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: 0.15, ease: EASE }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="portfolio-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                className="project-card-wrap"
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: EASE }}
                viewport={{ once: false, amount: 0.1 }}
              >
                <TiltCard className="project-card" max={3} scale={1.008}>
                  <div style={{ '--card-accent': project.color }}>
                    <div className="project-image">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="project-img" loading="lazy" />
                      ) : (
                        <div className="project-placeholder" style={{ background: `linear-gradient(135deg, ${project.color}33, ${project.color}11)` }}>
                          <div className="placeholder-icon" style={{ background: project.color }}>
                            {project.category === 'AI Automation' ? <FaRobot size={28} /> : <FaMobileAlt size={28} />}
                          </div>
                          <div className="placeholder-grid">
                            <div /><div /><div /><div />
                          </div>
                        </div>
                      )}
                      <div className="project-image-overlay" />
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={`View ${project.title}`}>
                          <HiArrowUpRight size={18} />
                        </a>
                      )}
                    </div>
                    <div className="project-body">
                      <div className="project-meta">
                        <span className="project-category">{project.category}</span>
                        <div className="project-tags">
                          {project.tags.slice(0, 3).map((t, j) => (
                            <span key={j} className="tag">{t}</span>
                          ))}
                        </div>
                      </div>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-desc">{project.description}</p>
                      <div className="project-metrics">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <div key={key} className="metric">
                            <span className="metric-val">{value}</span>
                            <span className="metric-lbl">{key}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="portfolio-cta"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          <p>Want to see what we'd build for you?</p>
          <button onClick={() => scrollTo('contact')} className="btn btn-secondary">
            Start a conversation <HiArrowUpRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio
