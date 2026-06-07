import React from 'react'
import { motion } from 'framer-motion'
import { HiArrowUpRight } from 'react-icons/hi2'
import { services } from '../data/services'
import { StaggerReveal, TiltCard } from '../animations/primitives'
import './Services.css'

const EASE = [0.22, 1, 0.36, 1]

const Services = () => {
  return (
    <section className="services-section section" id="services">
      <div className="bg-orb bg-orb-2" style={{ opacity: 0.15 }} />
      <div className="container">
        <div className="section-heading">
          <motion.span
            className="eyebrow eyebrow-accent"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            What we do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          >
            Software, AI & automation,<br/>
            <span className="gradient-text">end to end.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            Web apps, mobile apps, custom software, AI agents, and marketing automation — built and shipped by one senior team.
          </motion.p>
        </div>

        <StaggerReveal className="services-bento" amount={0.08} stagger={0.06}>
          {services.map((service) => {
            const Icon = service.icon
            return (
              <TiltCard
                key={service.id}
                className={`service-card-wrap service-${service.size}`}
                max={4}
                scale={1.012}
              >
                <div
                  className="service-card"
                  style={{ '--accent': service.accent }}
                >
                  <div className="service-glow" />
                  <div className="service-content">
                    <div className="service-icon-wrap">
                      <Icon size={22} />
                    </div>
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-desc">{service.description}</p>
                    <ul className="service-features">
                      {service.features.map((f, j) => (
                        <li key={j}>{f}</li>
                      ))}
                    </ul>
                    <div className="service-arrow">
                      <HiArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  )
}

export default Services
