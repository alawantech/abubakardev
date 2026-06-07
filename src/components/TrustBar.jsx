import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './TrustBar.css'

const partners = [
  'TechCrunch', 'Forbes', 'Y Combinator', 'Product Hunt',
  'GitHub', 'Vercel', 'Stripe', 'Cloudflare',
  'Notion', 'Linear', 'Framer', 'Webflow'
]

const stats = [
  { value: '40+', label: 'Projects shipped' },
  { value: '8', label: 'Countries served' },
  { value: '4.9★', label: 'Client rating' },
  { value: '99.9%', label: 'Uptime delivered' }
]

const TrustBar = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section className="trust-section" id="trust" ref={ref}>
      <div className="container">
        <motion.div
          className="trust-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <div className="stat-value gradient-text">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="trust-logos"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="trust-eyebrow">Trusted by ambitious teams worldwide</div>
          <div className="marquee-wrap">
            <div className="marquee-track">
              {[...partners, ...partners].map((p, i) => (
                <div key={i} className="marquee-item">{p}</div>
              ))}
            </div>
            <div className="marquee-fade marquee-fade-l" />
            <div className="marquee-fade marquee-fade-r" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrustBar
