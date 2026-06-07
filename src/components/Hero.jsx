import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaPlay, FaStar } from 'react-icons/fa'
import { TextReveal, MagneticButton, ScrollScale, CountUp } from '../animations/primitives'
import './Hero.css'

const EASE = [0.22, 1, 0.36, 1]

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const videoRef = useRef(null)

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24
      const y = (e.clientY / window.innerHeight - 0.5) * 24
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const word = {
    hidden: { y: "105%", opacity: 0 },
    show: { y: "0%", opacity: 1, transition: { duration: 0.6, ease: EASE } }
  }
  const lineContainer = (delay = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren: 0.025, delayChildren: delay } }
  })

  return (
    <section className="hero-section">
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="hero-video"
        >
          <source src="/assets/video2.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>

      <div className="hero-bg">
        <div
          className="bg-orb bg-orb-1 float-orb"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        />
        <div
          className="bg-orb bg-orb-2 float-orb"
          style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)`, animationDelay: '-7s' }}
        />
        <div className="bg-grid" />
        <div className="noise-overlay" />
      </div>

      <div className="container hero-content-wrap">
        <div className="hero-text">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
          >
            <span className="badge-dot" />
            <span>Available for new projects · Q3 2026</span>
          </motion.div>

          <h1 className="hero-title">
            <motion.span
              className="hero-line tr-container"
              variants={lineContainer(0.15)}
              initial="hidden"
              animate="show"
              aria-label="We build software"
            >
              {"We build software".split(" ").map((w, i) => (
                <span key={i} className="tr-word-wrap" aria-hidden="true">
                  <motion.span className="tr-word" variants={word}>
                    {w}{i < 2 ? "\u00A0" : ""}
                  </motion.span>
                </span>
              ))}
            </motion.span>
            <motion.span
              className="hero-line tr-container"
              variants={lineContainer(0.3)}
              initial="hidden"
              animate="show"
              aria-label="that actually ships"
            >
              {"that".split(" ").map((w, i) => (
                <span key={i} className="tr-word-wrap" aria-hidden="true">
                  <motion.span className="tr-word" variants={word}>{w}{"\u00A0"}</motion.span>
                </span>
              ))}
              <span className="tr-word-wrap" aria-hidden="true">
                <motion.span className="tr-word gradient-text-aurora" variants={word}>
                  actually ships
                </motion.span>
              </span>
            </motion.span>
            <motion.span
              className="hero-line tr-container"
              variants={lineContainer(0.45)}
              initial="hidden"
              animate="show"
              aria-label="and scales."
            >
              <span className="tr-word-wrap" aria-hidden="true">
                <motion.span className="tr-word" variants={word}>and{"\u00A0"}</motion.span>
              </span>
              <span className="tr-word-wrap" aria-hidden="true">
                <motion.span className="tr-word serif-italic" variants={word}>
                  scales.
                </motion.span>
              </span>
            </motion.span>
          </h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
          >
            A full-stack software development agency building web apps, mobile apps, custom software, and AI automation — for ambitious teams across the world.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85, ease: EASE }}
          >
            <MagneticButton
              as="button"
              onClick={() => scrollTo('contact')}
              className="btn btn-primary"
            >
              Start your project <FaArrowRight />
            </MagneticButton>
            <button onClick={() => scrollTo('portfolio')} className="btn btn-secondary">
              <FaPlay size={11} /> See our work
            </button>
          </motion.div>

          <motion.div
            className="hero-trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="trust-avatars">
              <div className="avatar" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>AM</div>
              <div className="avatar" style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)' }}>FK</div>
              <div className="avatar" style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}>BS</div>
              <div className="avatar" style={{ background: 'linear-gradient(135deg, #f59e0b, #ec4899)' }}>IN</div>
            </div>
            <div className="trust-text">
              <div className="trust-stars">
                {[...Array(5)].map((_, i) => <FaStar key={i} size={12} />)}
                <span><strong><CountUp to={4.9} duration={1.2} />/5</strong> from <CountUp to={40} duration={1.4} suffix="+" /> clients</span>
              </div>
              <span className="trust-line">Trusted by founders & teams in 8+ countries</span>
            </div>
          </motion.div>
        </div>

        <ScrollScale from={0.94} to={1} amount={0.1} className="hero-visual">
          <div className="visual-stack">
            <div className="code-card card-1">
              <div className="card-head">
                <div className="dot r" /><div className="dot y" /><div className="dot g" />
                <span className="card-name">agent.tsx</span>
              </div>
              <pre className="code-body">
                <code>
                  <span className="kw">const</span> <span className="fn">shipIt</span> = <span className="kw">async</span> () =&gt; {'{'}
                  {'\n  '} <span className="kw">await</span> <span className="fn">design</span>()
                  {'\n  '} <span className="kw">await</span> <span className="fn">build</span>()
                  {'\n  '} <span className="kw">await</span> <span className="fn">deploy</span>()
                  {'\n  '} <span className="cm">// to production</span>
                  {'\n'}{'}'}
                </code>
              </pre>
            </div>

            <div className="metric-card card-2">
              <div className="metric-row">
                <span className="metric-label">Uptime</span>
                <span className="metric-value gradient-text"><CountUp to={99.99} duration={1.6} suffix="%" /></span>
              </div>
              <div className="metric-bar">
                <div className="metric-bar-fill" />
              </div>
            </div>

            <div className="status-card card-3">
              <div className="status-icon"><span className="status-pulse" /></div>
              <div>
                <div className="status-title">AI agents live</div>
                <div className="status-sub"><CountUp to={12} duration={1.4} /> services running</div>
              </div>
            </div>

            <div className="floating-tag tag-1">
              <span>⚡</span> Next.js
            </div>
            <div className="floating-tag tag-2">
              <span>🤖</span> AI-native
            </div>
            <div className="floating-tag tag-3">
              <span>🔒</span> Secure
            </div>
          </div>
        </ScrollScale>
      </div>

      <motion.div
        className="hero-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onClick={() => scrollTo('trust')}
      >
        <span>Scroll to explore</span>
        <div className="scroll-line"><div className="scroll-dot" /></div>
      </motion.div>
    </section>
  )
}

export default Hero
