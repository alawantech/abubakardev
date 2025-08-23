
import React from 'react';
import './Courses.css';

const Courses = () => {
  return (
    <div className="courses-page">
      <div className="video-section">
        <h2 className="video-title highlight">Unlock Your Future in Tech!</h2>
        <p className="video-desc highlight">
          <span className="attention">&#9888; Important:</span> <br />
          <strong>Before registering, you <span style={{color:'#ed8936'}}>must watch</span> this video!</strong><br />
          It contains everything you need to know about our Software Development course, including benefits, curriculum, and outcomes. <br />
          <span className="watch-now">Don't miss out—click and watch now!</span>
        </p>
        <div className="video-wrapper">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/1hHMwLxN6EM"
            title="Why Learn Software Development?"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
          ></iframe>
        </div>
        <div className="register-btn-wrapper">
          <a href="#register" className="register-btn">Register Now</a>
        </div>
      </div>

      <div className="course-banner">
        <h2>Software Development (Web & App Dev)</h2>
        <div className="course-details">
          <span className="course-price">₦55,000</span>
          <span className="course-duration">Duration: 3 - 4 Months</span>
        </div>
      </div>

      <div className="course-description">
        <div className="course-desc-header">
          <h3 className="course-section-title">Become a Highly Sought-After Developer</h3>
          <p className="course-main-desc">
            <strong>Our Software Development course</strong> is your gateway from beginner to full stack developer. Gain the expertise to build modern web and mobile applications from scratch, mastering industry-leading technologies and best practices.
          </p>
        </div>
        <div className="course-desc-content">
          <div className="course-features-grid">
            <div className="course-feature-item"><span role="img" aria-label="stack">🖥️</span> Build full stack web & mobile applications</div>
            <div className="course-feature-item"><span role="img" aria-label="react">⚛️</span> Master React for dynamic user interfaces</div>
            <div className="course-feature-item"><span role="img" aria-label="typescript">📘</span> Learn TypeScript & JavaScript for scalable code</div>
            <div className="course-feature-item"><span role="img" aria-label="firebase">🔥</span> Backend development with Firebase (auth, database, hosting)</div>
            <div className="course-feature-item"><span role="img" aria-label="deploy">🚀</span> Deploy real-world web applications</div>
            <div className="course-feature-item"><span role="img" aria-label="certificate">🎓</span> Earn a certificate of completion</div>
            <div className="course-feature-item"><span role="img" aria-label="portfolio">📁</span> Hands-on projects & portfolio building</div>
          </div>
          <div className="course-cert-desc">
            <span role="img" aria-label="award">🏅</span> <strong>Certificate of Completion:</strong> Showcase your expertise and boost your career prospects.
          </div>
          <div className="register-btn-wrapper">
            <a href="#register" className="register-btn">Register Now</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
