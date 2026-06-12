import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  FaGraduationCap, FaChalkboardTeacher, FaUsers, FaCertificate,
  FaWhatsapp, FaRocket, FaCode, FaBriefcase, FaArrowRight,
  FaPlay, FaStar, FaCheck, FaLaptopCode, FaHandshake, FaGlobe
} from 'react-icons/fa';
import Courses from './Courses';
import './SchoolLanding.css';

const useScrollReveal = (margin = "-80px") => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin });
  return [ref, isInView];
};

const SchoolLanding = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const [statsRef, statsInView] = useScrollReveal();
  const [stepsRef, stepsInView] = useScrollReveal();
  const [featuresRef, featuresInView] = useScrollReveal();
  const [testimonialsRef, testimonialsInView] = useScrollReveal();
  const [ctaRef, ctaInView] = useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "ZedroTech Academy | Excellence in Tech Education";
  }, []);

  const stats = [
    { icon: <FaGraduationCap />, label: 'Students Enrolled', value: '500+', color: '#3b82f6' },
    { icon: <FaChalkboardTeacher />, label: 'Direct Mentorship', value: '1-on-1', color: '#8b5cf6' },
    { icon: <FaUsers />, label: 'Community Members', value: '2,000+', color: '#10b981' },
    { icon: <FaCertificate />, label: 'Courses Completed', value: '850+', color: '#f59e0b' },
  ];

  const features = [
    {
      icon: <FaRocket />,
      title: "Project-Based Learning",
      description: "Learn by building real-world applications that you can showcase to employers. No theory-only classrooms.",
      color: "#3b82f6"
    },
    {
      icon: <FaCode />,
      title: "Direct Mentorship",
      description: "Get unstuck fast. Personal 1-on-1 guidance from an experienced engineer who's built what you're learning.",
      color: "#8b5cf6"
    },
    {
      icon: <FaBriefcase />,
      title: "Career Placement",
      description: "We connect our top performers with job opportunities and freelance gigs. Your career starts here.",
      color: "#10b981"
    },
    {
      icon: <FaLaptopCode />,
      title: "Hands-On Projects",
      description: "Build 10+ real projects during your learning. Graduate with a portfolio that speaks louder than any certificate.",
      color: '#f59e0b'
    },
    {
      icon: <FaHandshake />,
      title: "Community Support",
      description: "Join a thriving community of 2,000+ learners and alumni. Network, collaborate, and grow together.",
      color: '#ec4899'
    },
    {
      icon: <FaGlobe />,
      title: "Learn From Anywhere",
      description: "100% online. Study at your own pace, from anywhere in the world. Access lessons on any device.",
      color: '#06b6d4'
    }
  ];

  const steps = [
    { num: '01', title: 'Choose a Course', desc: 'Browse our curated catalog and pick the learning path that matches your career goals.', color: '#3b82f6' },
    { num: '02', title: 'Learn & Build', desc: 'Follow HD video lessons, complete hands-on assignments, and build real-world projects.', color: '#8b5cf6' },
    { num: '03', title: 'Get Certified', desc: 'Earn your certificate, build your portfolio, and join our network of skilled developers.', color: '#10b981' },
  ];

  const testimonials = [
    {
      name: 'Amina Bello',
      role: 'Frontend Developer at Paystack',
      text: 'ZedroTech Academy changed my life. I went from knowing nothing about code to landing a frontend role at Paystack in just 4 months.',
      rating: 5
    },
    {
      name: 'Chukwuemeka Obi',
      role: 'Freelance Full-Stack Dev',
      text: 'The mentorship is what sets this apart. Every time I got stuck, there was someone ready to guide me. Now I earn in dollars as a freelancer.',
      rating: 5
    },
    {
      name: 'Fatima Hassan',
      role: 'UI/UX Designer & Developer',
      text: 'I joined knowing just a little HTML. Today I can build full websites and mobile apps. The project-based approach really works.',
      rating: 5
    }
  ];

  return (
    <div className="school-landing">
      {/* ── Hero with Video ── */}
      <section className="sl-hero" ref={heroRef}>
        <div className="sl-video-wrap">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="sl-hero-video"
          >
            <source src="/assets/video2.mp4" type="video/mp4" />
          </video>
          <div className="sl-video-overlay" />
        </div>

        <motion.div
          className="sl-hero-content"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            className="sl-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="sl-badge-dot" /> Welcome to ZedroTech Academy
          </motion.div>

          <motion.h1
            className="sl-title"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Master the Future of{' '}
            <span className="sl-highlight">Technology</span>
          </motion.h1>

          <motion.p
            className="sl-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Unlock your potential with our project-based learning approach.
            From web development to software engineering — we provide the tools,
            mentorship, and community you need to succeed.
          </motion.p>

          <motion.div
            className="sl-hero-btns"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a href="#courses-section" className="sl-btn sl-btn-primary">
              <FaPlay size={12} /> Explore Courses
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=2348156853636&text=Hi,%20I%20want%20to%20enroll%20in%20a%20course."
              target="_blank"
              rel="noopener noreferrer"
              className="sl-btn sl-btn-outline"
            >
              <FaWhatsapp size={16} /> Chat with Admission
            </a>
          </motion.div>

          <motion.div
            className="sl-hero-social-proof"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="sl-avatars">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="sl-avatar" style={{ background: `hsl(${i * 60}, 60%, 50%)`, zIndex: 6 - i }}>
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="sl-social-text">
              <strong>500+</strong> students already enrolled
            </span>
          </motion.div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="sl-hero-stats"
          ref={statsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="sl-stat"
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -6, boxShadow: `0 16px 40px ${stat.color}20` }}
            >
              <div className="sl-stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
              <div className="sl-stat-info">
                <span className="sl-stat-value" style={{ color: stat.color }}>{stat.value}</span>
                <span className="sl-stat-label">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── How It Works ── */}
      <section className="sl-steps" ref={stepsRef}>
        <motion.div
          className="sl-section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={stepsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="sl-section-tag">How It Works</span>
          <h2>Start Your Tech Journey in 3 Steps</h2>
          <p>No experience needed. Just dedication and a willingness to learn.</p>
        </motion.div>
        <div className="sl-steps-grid">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="sl-step"
              initial={{ opacity: 0, y: 50 }}
              animate={stepsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              whileHover={{ y: -8 }}
            >
              <div className="sl-step-num" style={{ color: step.color }}>{step.num}</div>
              <div className="sl-step-line" style={{ background: step.color }} />
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="sl-features" ref={featuresRef}>
        <motion.div
          className="sl-section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="sl-section-tag">Why Us</span>
          <h2>Why Choose ZedroTech Academy?</h2>
          <p>We don't just teach code — we build careers and transform lives.</p>
        </motion.div>
        <div className="sl-features-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="sl-feature-card"
              initial={{ opacity: 0, y: 50 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              whileHover={{ y: -8, boxShadow: `0 20px 48px ${f.color}18` }}
            >
              <div className="sl-feature-icon" style={{ color: f.color, background: `${f.color}12` }}>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="sl-testimonials" ref={testimonialsRef}>
        <motion.div
          className="sl-section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="sl-section-tag">Success Stories</span>
          <h2>What Our Students Say</h2>
          <p>Real stories from real people who transformed their careers.</p>
        </motion.div>
        <div className="sl-testimonials-grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="sl-testimonial-card"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={testimonialsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              whileHover={{ y: -6 }}
            >
              <div className="sl-testimonial-stars">
                {[...Array(t.rating)].map((_, j) => (
                  <FaStar key={j} size={14} />
                ))}
              </div>
              <p className="sl-testimonial-text">"{t.text}"</p>
              <div className="sl-testimonial-author">
                <div className="sl-testimonial-avatar" style={{ background: `hsl(${i * 120}, 50%, 45%)` }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Courses ── */}
      <section id="courses-section" className="sl-courses">
        <motion.div
          className="sl-section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="sl-section-tag">Our Courses</span>
          <h2>Popular Learning Paths</h2>
          <p>Carefully curated paths to take you from Zero to Hero.</p>
        </motion.div>
        <Courses />
      </section>

      {/* ── CTA ── */}
      <section className="sl-cta" ref={ctaRef}>
        <motion.div
          className="sl-cta-inner"
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={ctaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="sl-cta-glow" />
          <h2>Ready to Start Your Journey?</h2>
          <p>Join hundreds of students who have transformed their careers with ZedroTech Academy. Your future in tech starts today.</p>
          <div className="sl-cta-btns">
            <a href="#courses-section" className="sl-btn sl-btn-primary">
              Browse Courses <FaArrowRight size={14} />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=2348156853636&text=Hi,%20I%20need%20help%20choosing%20a%20course."
              target="_blank"
              rel="noopener noreferrer"
              className="sl-btn sl-btn-outline"
            >
              <FaWhatsapp size={16} /> Talk to Us
            </a>
          </div>
          <div className="sl-cta-checks">
            <span><FaCheck /> No hidden fees</span>
            <span><FaCheck /> Learn at your pace</span>
            <span><FaCheck /> Certificate included</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default SchoolLanding;
