import React from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa'
import { MagneticButton } from '../animations/primitives'
import './CTABanner.css'

const EASE = [0.22, 1, 0.36, 1]

const CTABanner = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="cta-section" id="cta">
      <div className="container">
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="cta-bg">
            <div className="cta-grid-pattern" />
            <div className="cta-glow cta-glow-1" />
            <div className="cta-glow cta-glow-2" />
          </div>

          <div className="cta-content">
            <motion.span
              className="eyebrow eyebrow-accent"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
            >
              Ready to ship?
            </motion.span>

            <motion.h2
              className="cta-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            >
              Let's build something<br/>
              <span className="gradient-text-aurora">people actually use.</span>
            </motion.h2>

            <motion.p
              className="cta-text"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            >
              Free 30-minute consultation. No pitch deck, no pressure — just an honest conversation about your project.
            </motion.p>

            <motion.div
              className="cta-actions"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
            >
              <MagneticButton
                as="button"
                onClick={() => scrollTo('contact')}
                className="btn btn-primary"
              >
                Start your project <FaArrowRight />
              </MagneticButton>
              <a href="https://wa.me/2348156853636" className="btn btn-secondary">
                <FaCalendarAlt size={13} /> Book a call
              </a>
            </motion.div>

            <motion.div
              className="cta-meta"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
            >
              <div className="meta-item">
                <span className="meta-dot" /> Available Q3 2026
              </div>
              <div className="meta-divider" />
              <div className="meta-item">
                Replies within <strong>4 hours</strong>
              </div>
              <div className="meta-divider" />
              <div className="meta-item">
                <strong>Free</strong> discovery call
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTABanner
