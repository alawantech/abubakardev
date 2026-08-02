import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { FaHeart, FaBolt, FaUsers, FaTrophy } from 'react-icons/fa'
import './About.css'

const values = [
  {
    icon: FaHeart,
    title: 'Craft over hype',
    description: 'We obsess over the details — performance, accessibility, the tiny interactions users feel but can\'t name.'
  },
  {
    icon: FaBolt,
    title: 'Ship fast, sleep well',
    description: 'Velocity doesn\'t mean cutting corners. We move fast with solid engineering and proper testing.'
  },
  {
    icon: FaUsers,
    title: 'Real partnerships',
    description: 'We embed with your team, learn your business, and care about your success as much as you do.'
  },
  {
    icon: FaTrophy,
    title: 'Outcomes, not output',
    description: 'Lines of code don\'t matter. Users retained, revenue grown, problems solved — that\'s what counts.'
  }
]

const stats = [
  { value: 5, suffix: '+', label: 'Years building' },
  { value: 40, suffix: '+', label: 'Projects shipped' },
  { value: 8, suffix: '', label: 'Countries served' },
  { value: 98, suffix: '%', label: 'Client retention' }
]

const About = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section className="about-section section" id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-left"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow eyebrow-accent">About us</span>
            <h2 className="about-title">
              A software development agency<br/>
              <span className="gradient-text">that actually ships.</span>
            </h2>
            <p className="about-lead">
              We're a senior software development and AI automation agency, based in Nigeria and serving clients worldwide. We started in 2020 with a simple belief: the best software comes from tight collaboration between people who actually care.
            </p>
            <p className="about-text">
              We don't do "resources" or "agile theatre." You work directly with the engineers building your product. 
              No middlemen, no account managers, no surprises on Friday afternoon.
            </p>
            <div className="about-stats">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="stat-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <div className="stat-number">
                    {inView && (
                      <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                    )}
                  </div>
                  <div className="stat-name">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="about-right">
            <div className="about-visual">
              {[
                { icon: '🚀', title: 'Based in Nigeria', sub: 'Engineering for the world', delay: 0.25 },
                { icon: '💎', title: 'Senior only', sub: 'No juniors learning on your dime', delay: 0.35 },
                { icon: '🌍', title: 'Remote-first', sub: 'Async by default, sync when it matters', delay: 0.45 },
                { icon: '⚡', title: 'Fast feedback', sub: 'Daily updates, weekly demos, monthly metrics', delay: 0.55 }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  className={`visual-card vc-${i + 1}`}
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: card.delay, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="vc-icon">{card.icon}</div>
                  <div>
                    <div className="vc-title">{card.title}</div>
                    <div className="vc-sub">{card.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="values-section">
          <motion.h3
            className="values-title"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            What we believe
          </motion.h3>
          <div className="values-grid">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={i}
                  className="value-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <div className="value-icon"><Icon size={20} /></div>
                  <h4 className="value-name">{value.title}</h4>
                  <p className="value-desc">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
