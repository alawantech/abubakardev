import React from 'react'
import './About.css'

const About = () => {
  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "30+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" }
  ]

  const values = [
    {
      title: "Innovation",
      description: "We stay ahead of technology trends to deliver cutting-edge solutions that give your business a competitive advantage.",
      icon: "💡"
    },
    {
      title: "Quality",
      description: "We maintain the highest standards in code quality, testing, and deployment to ensure reliable and robust applications.",
      icon: "⭐"
    },
    {
      title: "Collaboration",
      description: "We work closely with our clients throughout the development process to ensure the final product exceeds expectations.",
      icon: "🤝"
    },
    {
      title: "Results",
      description: "Our focus is on delivering measurable business value through technology solutions that drive growth and efficiency.",
      icon: "🎯"
    }
  ]

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About AbubakarDev</h2>
            <div className="about-description">
              <p>
                We are a software development company helping businesses grow with technology. 
                With years of experience in web development, mobile app creation, and custom software solutions, 
                we transform ideas into powerful digital experiences.
              </p>
              <p>
                Our team of skilled developers and designers is passionate about creating innovative solutions 
                that solve real business problems. We believe in the power of technology to transform businesses 
                and are committed to delivering exceptional results for every project.
              </p>
              <p>
                From startups to enterprise companies, we've helped organizations across various industries 
                leverage technology to streamline operations, improve customer experiences, and drive sustainable growth.
              </p>
            </div>
          </div>
          
          <div className="about-image">
            <img 
              src="https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="AbubakarDev Team"
            />
            <div className="about-experience">
              <span className="experience-number">5+</span>
              <span className="experience-text">Years of Excellence</span>
            </div>
          </div>
        </div>
        
        <div className="about-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
        
        <div className="about-values">
          <h3 className="values-title">Our Core Values</h3>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h4 className="value-title">{value.title}</h4>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About