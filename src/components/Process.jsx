import React from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaPencilRuler, FaCode, FaRocket, FaChartLine } from 'react-icons/fa'
import { StaggerReveal } from '../animations/primitives'
import './Process.css'

const EASE = [0.22, 1, 0.36, 1]

const steps = [
  {
    icon: FaSearch,
    number: '01',
    title: 'Discovery',
    description: 'We dig deep into your business, users, and goals. No assumptions, just real conversations and research.',
    deliverable: 'Project brief & roadmap'
  },
  {
    icon: FaPencilRuler,
    number: '02',
    title: 'Design',
    description: 'Wireframes turn into polished, clickable prototypes. You see and approve every screen before code is written.',
    deliverable: 'Figma designs & prototype'
  },
  {
    icon: FaCode,
    number: '03',
    title: 'Build',
    description: 'Senior engineers ship in 2-week sprints. You get weekly demos, daily Slack updates, and a shared staging URL.',
    deliverable: 'Working software, every week'
  },
  {
    icon: FaRocket,
    number: '04',
    title: 'Launch',
    description: 'We handle deployment, monitoring, and the scary first 72 hours. Load tested, secure, and ready to scale.',
    deliverable: 'Live production app'
  },
  {
    icon: FaChartLine,
    number: '05',
    title: 'Grow',
    description: 'Post-launch, we keep optimizing based on real user data. A/B tests, performance tuning, new features.',
    deliverable: 'Continuous improvement'
  }
]

const Process = () => {
  return (
    <section className="process-section section" id="process">
      <div className="container">
        <div className="section-heading">
          <motion.span
            className="eyebrow eyebrow-accent"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            How we work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          >
            A process built on<br/>
            <span className="gradient-text-aurora">transparency.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            No black boxes. No surprises. Just a clear path from idea to production.
          </motion.p>
        </div>

        <div className="process-timeline">
          <motion.div
            className="process-line"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.1, ease: EASE }}
            style={{ transformOrigin: "top center" }}
          />
          <StaggerReveal className="process-steps" amount={0.1} stagger={0.07}>
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="process-step">
                  <div className="step-marker">
                    <div className="step-icon"><Icon size={18} /></div>
                    <div className="step-pulse" />
                  </div>
                  <div className="step-card">
                    <div className="step-number">{step.number}</div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.description}</p>
                    <div className="step-deliverable">
                      <span className="deliverable-dot" />
                      {step.deliverable}
                    </div>
                  </div>
                </div>
              )
            })}
          </StaggerReveal>
        </div>
      </div>
    </section>
  )
}

export default Process
