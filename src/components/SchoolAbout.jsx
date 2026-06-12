import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaGraduationCap, FaChalkboardTeacher, FaUsers, FaCertificate,
  FaRocket, FaCode, FaMicrochip, FaGlobe, FaCheck, FaStar, FaHandshake, FaLightbulb
} from 'react-icons/fa';
import './SchoolAbout.css';

const EASE = [0.22, 1, 0.36, 1];

const SchoolAbout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About Us | ZedroTech Academy";
  }, []);

  const stats = [
    { number: '500+', label: 'Students Trained', icon: <FaGraduationCap />, color: '#3b82f6' },
    { number: '1-on-1', label: 'Direct Mentorship', icon: <FaChalkboardTeacher />, color: '#8b5cf6' },
    { number: '850+', label: 'Projects Completed', icon: <FaCertificate />, color: '#10b981' },
    { number: '2,000+', label: 'Community Members', icon: <FaUsers />, color: '#f59e0b' },
  ];

  const values = [
    {
      icon: <FaRocket />,
      title: "Project-First Approach",
      description: "We don't just teach syntax. We teach you how to build real-world products that solve actual business problems.",
      color: "#3b82f6"
    },
    {
      icon: <FaCode />,
      title: "Industry Standards",
      description: "Learn the exact tools and workflows used by top tech companies globally, from Git to Cloud Deployment.",
      color: "#8b5cf6"
    },
    {
      icon: <FaMicrochip />,
      title: "Future-Ready Skills",
      description: "Our curriculum is constantly updated to include emerging technologies like AI, Software Development, and Modern Web & Mobile Frameworks.",
      color: "#10b981"
    },
    {
      icon: <FaGlobe />,
      title: "Global Reach",
      description: "Join a community of learners from across the globe, sharing insights and collaborating on innovative local solutions.",
      color: "#f59e0b"
    },
    {
      icon: <FaHandshake />,
      title: "Real Mentorship",
      description: "Every student gets direct 1-on-1 sessions with experienced engineers who've built products at scale.",
      color: "#ec4899"
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation Mindset",
      description: "We teach you to think like a founder — spotting problems, prototyping fast, and shipping solutions that matter.",
      color: "#06b6d4"
    }
  ];

  const milestones = [
    { year: '2022', title: 'Founded', desc: 'ZedroTech Academy launched with a vision to bridge the gap between theory and practice.' },
    { year: '2023', title: '500+ Students', desc: 'Reached our first 500 students across Nigeria and beyond.' },
    { year: '2024', title: 'Expanded Curriculum', desc: 'Added AI, Mobile Development, and UI/UX Design tracks.' },
    { year: '2025', title: 'Community Growth', desc: 'Grew to 2,000+ community members with alumni in top tech companies.' },
  ];

  return (
    <div className="sa-page">
      {/* Hero */}
      <section className="sa-hero">
        <div className="sa-hero-bg">
          <div className="sa-grid-pattern" />
          <div className="sa-orb sa-orb-1" />
          <div className="sa-orb sa-orb-2" />
          <div className="sa-orb sa-orb-3" />
        </div>
        <div className="sa-hero-content">
          <motion.span
            className="sa-tag"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            About ZedroTech Academy
          </motion.span>
          <motion.h1
            className="sa-hero-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            Empowering the Next{' '}
            <span className="sa-gradient">Tech Leaders</span>
          </motion.h1>
          <motion.p
            className="sa-hero-sub"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          >
            We bridge the gap between academic theory and industrial practice.
            Everyone has the potential to become a world-class engineer — with the right mentorship.
          </motion.p>
          <motion.div
            className="sa-hero-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
          >
            <a href="/courses" className="sa-btn sa-btn-primary">Explore Courses</a>
            <a href="/contact" className="sa-btn sa-btn-ghost">Talk to Us</a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="sa-stats">
        <div className="sa-stats-grid">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="sa-stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            >
              <div className="sa-stat-icon" style={{ color: s.color, background: `${s.color}15` }}>{s.icon}</div>
              <div className="sa-stat-num" style={{ color: s.color }}>{s.number}</div>
              <div className="sa-stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="sa-mission">
        <div className="sa-mission-grid">
          <motion.div
            className="sa-mission-text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="sa-tag">Our Mission</span>
            <h2>Learning That Actually Works</h2>
            <p>
              ZedroTech Academy was founded with a single goal: to bridge the gap between
              academic theory and industrial practice. We believe that everyone has the
              potential to become a world-class engineer if given the right mentorship and projects.
            </p>
            <p>
              We provide a direct, hands-on learning experience that focuses on building.
              Our method skips the fluff and dives straight into the core concepts and
              technologies that drive the modern digital economy.
            </p>
            <div className="sa-mission-checks">
              <span><FaCheck /> No theory-only classrooms</span>
              <span><FaCheck /> Real-world projects from day one</span>
              <span><FaCheck /> 1-on-1 mentorship throughout</span>
              <span><FaCheck /> Career support after graduation</span>
            </div>
          </motion.div>
          <motion.div
            className="sa-mission-visual"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <div className="sa-mission-img-wrap">
              <img
                src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg"
                alt="Mentorship at ZedroTech Academy"
                className="sa-mission-img"
              />
              <div className="sa-mission-img-overlay" />
            </div>
            <div className="sa-floating-card sa-fc-1">
              <FaStar className="sa-fc-icon" style={{ color: '#f59e0b' }} />
              <div>
                <strong>4.9/5 Rating</strong>
                <span>From 200+ students</span>
              </div>
            </div>
            <div className="sa-floating-card sa-fc-2">
              <FaRocket className="sa-fc-icon" style={{ color: '#3b82f6' }} />
              <div>
                <strong>Practical & Focused</strong>
                <span>Career-oriented training</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="sa-values">
        <motion.div
          className="sa-section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="sa-tag">Why Choose Us</span>
          <h2>Built for Real-World Success</h2>
          <p>We focus on what matters — building skills that get you hired.</p>
        </motion.div>
        <div className="sa-values-grid">
          {values.map((v, i) => (
            <motion.div
              key={i}
              className="sa-value-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <div className="sa-value-icon" style={{ color: v.color, background: `${v.color}15` }}>
                {v.icon}
              </div>
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="sa-timeline">
        <motion.div
          className="sa-section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="sa-tag">Our Journey</span>
          <h2>From Zero to Impact</h2>
        </motion.div>
        <div className="sa-timeline-list">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              className="sa-timeline-item"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            >
              <div className="sa-timeline-dot" />
              <div className="sa-timeline-content">
                <span className="sa-timeline-year">{m.year}</span>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="sa-cta">
        <motion.div
          className="sa-cta-inner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2>Ready to Start Your Tech Journey?</h2>
          <p>Join hundreds of students already building their future with ZedroTech Academy.</p>
          <div className="sa-cta-btns">
            <a href="/courses" className="sa-btn sa-btn-primary">Browse Courses</a>
            <a href="/contact" className="sa-btn sa-btn-outline">Contact Us</a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default SchoolAbout;
