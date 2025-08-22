import React from 'react'
import './Services.css'

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Custom websites built with modern technologies like React, Node.js, and responsive design principles. We create fast, secure, and user-friendly websites that drive business growth.",
      features: ["Responsive Design", "SEO Optimized", "Fast Performance", "Modern UI/UX"],
      icon: "🌐"
    },
    {
      title: "Mobile App Development",
      description: "Cross-platform mobile applications using React Native. Build once, deploy everywhere. We create intuitive mobile experiences that engage your users.",
      features: ["Cross-Platform", "Native Performance", "Push Notifications", "App Store Ready"],
      icon: "📱"
    },
    {
      title: "Custom Software Solutions",
      description: "Tailored software solutions for your unique business needs. From automation tools to complex enterprise systems, we build software that scales with your business.",
      features: ["Scalable Architecture", "Integration Ready", "Cloud Deployment", "24/7 Support"],
      icon: "⚙️"
    }
  ]

  return (
    <section id="services" className="services section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          We offer comprehensive software development services to help your business succeed in the digital world
        </p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <span>{service.icon}</span>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button className="service-cta">Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services