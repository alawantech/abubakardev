import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './Testimonials.css'

const EASE = [0.22, 1, 0.36, 1]

const testimonials = [
  {
    quote: "Working with ZedroTech felt like having an in-house engineering team. They pushed back when they needed to, shipped faster than we expected, and the code quality is genuinely some of the best I've seen.",
    name: 'Aisha Mohammed',
    role: 'CEO',
    company: 'Halal Finance',
    location: 'Lagos, Nigeria',
    initials: 'AM',
    color: '#6366f1',
    rating: 5
  },
  {
    quote: "We tried two other agencies before finding this team. The difference? They actually understand product. Our retention went from 40% to 78% in three months after the redesign.",
    name: 'Ibrahim Sani',
    role: 'Founder',
    company: 'MediConnect',
    location: 'Abuja, Nigeria',
    initials: 'IS',
    color: '#06b6d4',
    rating: 5
  },
  {
    quote: "Senior engineers who actually care about the outcome. They didn't just build what we asked for — they helped us figure out what we should have asked for in the first place.",
    name: 'Fatima Khalil',
    role: 'CTO',
    company: 'AgriOS',
    location: 'Kano, Nigeria',
    initials: 'FK',
    color: '#f59e0b',
    rating: 5
  },
  {
    quote: "Three years in, they still feel like part of the team. Reliable, fast, and somehow always available when something breaks at 2am. Can't recommend them enough.",
    name: 'David Okonkwo',
    role: 'VP Engineering',
    company: 'VoiceFirst AI',
    location: 'London, UK',
    initials: 'DO',
    color: '#8b5cf6',
    rating: 5
  }
]

const slideVariants = {
  enter: (dir) => ({ opacity: 0, y: dir > 0 ? 24 : -24 }),
  center: { opacity: 1, y: 0 },
  exit: (dir) => ({ opacity: 0, y: dir > 0 ? -24 : 24 })
}

const Testimonials = () => {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const next = () => { setDirection(1); setActive((prev) => (prev + 1) % testimonials.length) }
  const prev = () => { setDirection(-1); setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length) }

  const t = testimonials[active]

  return (
    <section className="testimonials-section section" id="testimonials">
      <div className="bg-orb bg-orb-1" style={{ opacity: 0.1, top: '20%', left: '10%' }} />
      <div className="container">
        <div className="section-heading">
          <motion.span
            className="eyebrow eyebrow-accent"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            What clients say
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          >
            Trusted by people<br/>
            <span className="gradient-text-aurora">who don't trust easily.</span>
          </motion.h2>
        </div>

        <motion.div
          className="testimonial-stage"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          <div className="quote-mark">
            <FaQuoteLeft size={32} />
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              className="testimonial-content"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="rating">
                {[...Array(t.rating)].map((_, i) => <FaStar key={i} />)}
              </div>
              <blockquote className="quote">"{t.quote}"</blockquote>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: t.color }}>{t.initials}</div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-role">{t.role} · {t.company}</div>
                  <div className="author-location">{t.location}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="testimonial-controls">
            <div className="dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === active ? 'active' : ''}`}
                  onClick={() => { setDirection(i > active ? 1 : -1); setActive(i) }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="arrows">
              <button onClick={prev} className="arrow-btn" aria-label="Previous">
                <FaChevronLeft size={14} />
              </button>
              <button onClick={next} className="arrow-btn" aria-label="Next">
                <FaChevronRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="testimonial-strip">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="strip-avatar"
              style={{ background: t.color, opacity: i === active ? 0.3 : 1 }}
              onClick={() => { setDirection(i > active ? 1 : -1); setActive(i) }}
              whileHover={{ y: -4 }}
            >
              {t.initials}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
