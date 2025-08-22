import React from 'react'
import './Hero.css'

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-pattern"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              We Build Websites, Mobile Apps, and Custom Software for Businesses
            </h1>
            <p className="hero-description">
              Transform your business with cutting-edge technology solutions. 
              We create custom software that drives growth and delivers exceptional user experiences.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary hero-cta" onClick={scrollToContact}>
                Get Started
              </button>
              <a href="#services" className="btn-secondary" onClick={(e) => {
                e.preventDefault()
                document.getElementById('services').scrollIntoView({ behavior: 'smooth' })
              }}>
                View Services
              </a>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-image">
              <img 
                src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Modern Software Development Workspace"
              />
            </div>
            <div className="floating-elements">
              <div className="floating-card card-1">
                <span>Web Development</span>
              </div>
              <div className="floating-card card-2">
                <span>Mobile Apps</span>
              </div>
              <div className="floating-card card-3">
                <span>Custom Software</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero