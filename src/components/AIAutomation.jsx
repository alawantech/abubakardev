import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCheck, FaArrowRight } from 'react-icons/fa'
import { aiAgents } from '../data/services'
import './AIAutomation.css'

const AIAutomation = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [active, setActive] = React.useState(0)
  const current = aiAgents[active]

  return (
    <section className="ai-section section" id="ai-automation" ref={ref}>
      <div className="bg-orb bg-orb-1" style={{ opacity: 0.12, top: '10%', right: '5%' }} />
      <div className="bg-orb bg-orb-2" style={{ opacity: 0.12, bottom: '10%', left: '5%' }} />

      <div className="container">
        <div className="section-heading">
          <motion.span
            className="eyebrow eyebrow-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            AI Automation
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            AI that runs your business<br/>
            <span className="gradient-text-aurora">while you sleep.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We build AI agents that talk to your customers, close your deals, answer your calls, and qualify your leads — trained on your business, integrated with your tools.
          </motion.p>
        </div>

        <div className="ai-layout">
          <motion.div
            className="ai-tabs"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {aiAgents.map((agent, i) => (
              <button
                key={agent.id}
                className={`ai-tab ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
                style={{ '--tab-accent': agent.accent }}
              >
                <span className="ai-tab-icon">{agent.icon}</span>
                <div className="ai-tab-text">
                  <div className="ai-tab-name">{agent.name}</div>
                  <div className="ai-tab-tag">{agent.tagline}</div>
                </div>
                <FaArrowRight className="ai-tab-arrow" size={14} />
              </button>
            ))}
          </motion.div>

          <motion.div
            className="ai-panel"
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ '--panel-accent': current.accent }}
          >
            <div className="ai-panel-head">
              <div className="ai-panel-icon">{current.icon}</div>
              <div>
                <h3 className="ai-panel-title">{current.name}</h3>
                <p className="ai-panel-tag">{current.tagline}</p>
              </div>
            </div>

            <p className="ai-panel-desc">{current.description}</p>

            <ul className="ai-features">
              {current.features.map((f, j) => (
                <li key={j}>
                  <FaCheck size={12} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="ai-panel-cta">
              <a href="#contact" className="btn btn-primary">
                Build one for your business <FaArrowRight />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="ai-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="ai-stat">
            <div className="ai-stat-value gradient-text">24/7</div>
            <div className="ai-stat-label">Always on</div>
          </div>
          <div className="ai-stat">
            <div className="ai-stat-value gradient-text">20+</div>
            <div className="ai-stat-label">Languages supported</div>
          </div>
          <div className="ai-stat">
            <div className="ai-stat-value gradient-text">60%</div>
            <div className="ai-stat-label">Avg. cost reduction</div>
          </div>
          <div className="ai-stat">
            <div className="ai-stat-value gradient-text">3x</div>
            <div className="ai-stat-label">Faster response</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AIAutomation
