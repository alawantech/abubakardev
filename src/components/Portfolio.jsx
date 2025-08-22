import React from 'react'
import './Portfolio.css'

const Portfolio = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with payment integration, inventory management, and admin dashboard. Built with React and Node.js.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Web Development"
    },
    {
      title: "Task Management App",
      description: "Cross-platform mobile app for team collaboration and project management. Features real-time updates and offline sync.",
      image: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React Native", "Firebase", "Redux", "TypeScript"],
      category: "Mobile App"
    },
    {
      title: "Business Analytics Dashboard",
      description: "Custom analytics platform with real-time data visualization, reporting tools, and automated insights for business intelligence.",
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Python", "PostgreSQL", "Chart.js"],
      category: "Custom Software"
    },
    {
      title: "Restaurant POS System",
      description: "Point-of-sale system for restaurants with order management, kitchen display, and payment processing integration.",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Vue.js", "Express", "MySQL", "Socket.io"],
      category: "Custom Software"
    },
    {
      title: "Fitness Tracking App",
      description: "Mobile app for tracking workouts, nutrition, and progress with social features and personal trainer integration.",
      image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Flutter", "Firebase", "GraphQL", "AWS"],
      category: "Mobile App"
    },
    {
      title: "Corporate Website",
      description: "Professional corporate website with CMS integration, SEO optimization, and multilingual support for global reach.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Next.js", "Strapi", "TailwindCSS", "Vercel"],
      category: "Web Development"
    }
  ]

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <h2 className="section-title">Our Portfolio</h2>
        <p className="section-subtitle">
          Take a look at some of our recent projects and see how we've helped businesses achieve their goals
        </p>
        
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <div key={index} className="portfolio-card">
              <div className="portfolio-image">
                <img src={project.image} alt={project.title} />
                <div className="portfolio-overlay">
                  <div className="portfolio-category">{project.category}</div>
                </div>
              </div>
              
              <div className="portfolio-content">
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-description">{project.description}</p>
                
                <div className="portfolio-tech">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="portfolio-actions">
                  <button className="portfolio-btn">View Project</button>
                  <button className="portfolio-btn-secondary">Live Demo</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio