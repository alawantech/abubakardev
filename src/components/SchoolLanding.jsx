import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGraduationCap, FaChalkboardTeacher, FaUsers, FaCertificate, FaWhatsapp, FaRocket, FaCode, FaBriefcase, FaArrowRight } from 'react-icons/fa';
import './SchoolLanding.css';

const Courses = lazy(() => import('./Courses'));

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
};

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" }
};

const SchoolLanding = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "ZedroTech Academy | Excellence in Tech Education";
  }, []);

  const stats = [
    { icon: <FaGraduationCap />, label: 'Students Enrolled', value: '500+', color: '#3b82f6' },
    { icon: <FaChalkboardTeacher />, label: 'Direct Mentorship', value: '1-on-1', color: '#8b5cf6' },
    { icon: <FaUsers />, label: 'Community Members', value: '2k+', color: '#10b981' },
    { icon: <FaCertificate />, label: 'Courses Completed', value: '850+', color: '#f59e0b' },
  ];

  const features = [
    {
      icon: <FaRocket />,
      title: "Project-Based Learning",
      description: "Learn by building real-world applications that you can showcase to employers.",
      color: "#3b82f6"
    },
    {
      icon: <FaCode />,
      title: "Direct Mentorship",
      description: "Get stuck? I am here to guide you every step of the way through dedicated 1-on-1 support.",
      color: "#8b5cf6"
    },
    {
      icon: <FaBriefcase />,
      title: "Career Placement",
      description: "We assist our top performers with job opportunities and freelance gigs.",
      color: "#10b981"
    }
  ];

  const steps = [
    { num: '01', title: 'Choose a Course', desc: 'Browse our catalog and pick the path that matches your goal.' },
    { num: '02', title: 'Learn & Build', desc: 'Follow video lessons, complete assignments, and build real projects.' },
    { num: '03', title: 'Get Certified', desc: 'Earn your certificate and join our network of skilled developers.' },
  ];

  return (
    <div className="school-landing">
      {/* Hero */}
      <section className="sl-hero" ref={heroRef}>
        <div className="sl-hero-bg">
          <div className="sl-orb sl-orb-1" />
          <div className="sl-orb sl-orb-2" />
          <div className="sl-grid-pattern" />
        </div>

        <div className="sl-hero-content">
          <motion.span
            className="sl-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Welcome to ZedroTech Academy
          </motion.span>

          <motion.h1
            className="sl-title"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Master the Future of{' '}
            <span className="sl-highlight">Technology</span>
          </motion.h1>

          <motion.p
            className="sl-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Unlock your potential with our project-based learning approach.
            From web development to software engineering, we provide the tools
            and mentorship you need to succeed.
          </motion.p>

          <motion.div
            className="sl-hero-btns"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a href="#courses-section" className="sl-btn sl-btn-primary">
              View Our Courses <FaArrowRight size={14} />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=2348156853636&text=Hi,%20I%20want%20to%20enroll%20in%20a%20course."
              target="_blank"
              rel="noopener noreferrer"
              className="sl-btn sl-btn-secondary"
            >
              <FaWhatsapp size={16} /> Chat with Admission
            </a>
          </motion.div>
        </div>

        <div className="sl-hero-stats">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="sl-stat"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
            >
              <div className="sl-stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
              <div className="sl-stat-info">
                <span className="sl-stat-value" style={{ color: stat.color }}>{stat.value}</span>
                <span className="sl-stat-label">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="sl-steps">
        <motion.div className="sl-section-header" {...fadeUp}>
          <h2>How It Works</h2>
          <p>Three simple steps to start your tech career</p>
        </motion.div>
        <div className="sl-steps-grid">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="sl-step"
              {...stagger}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <span className="sl-step-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="sl-features">
        <motion.div className="sl-section-header" {...fadeUp}>
          <h2>Why Choose ZedroTech Academy?</h2>
          <p>We don't just teach code; we build careers.</p>
        </motion.div>
        <div className="sl-features-grid">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="sl-feature-card"
              {...stagger}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="sl-feature-icon" style={{ color: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section id="courses-section" className="sl-courses">
        <motion.div className="sl-section-header" {...fadeUp}>
          <h2>Our Popular Courses</h2>
          <p>Carefully curated paths to take you from Zero to Hero.</p>
        </motion.div>
        <Suspense fallback={<div className="sl-loading">Loading courses…</div>}>
          <Courses />
        </Suspense>
      </section>

      {/* CTA */}
      <section className="sl-cta">
        <motion.div className="sl-cta-inner" {...fadeUp}>
          <h2>Ready to Start Your Journey?</h2>
          <p>Join hundreds of students who have transformed their careers with ZedroTech Academy.</p>
          <div className="sl-cta-btns">
            <a href="#courses-section" className="sl-btn sl-btn-primary">
              Browse Courses <FaArrowRight size={14} />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=2348156853636&text=Hi,%20I%20need%20help%20choosing%20a%20course."
              target="_blank"
              rel="noopener noreferrer"
              className="sl-btn sl-btn-secondary"
            >
              <FaWhatsapp size={16} /> Talk to Us
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default SchoolLanding;
