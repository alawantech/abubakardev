import React from "react";
import { Link } from "react-router-dom";
import "./Pricing.css";

const pricingOptions = [
  {
    title: "Starter Website",
    price: "₦150,000",
    description: "Perfect for any small business, startup, or personal brand wanting a professional online presence.",
    features: [
      "Conversion-focused design for any business type",
      "Free domain (yourbusinessname.com)",
      "1 month free support",
      "4 to 5 pages (Home, About, Services, Contact, etc.)",
      "Contact form integration",
      "No e-commerce functionality"
    ],
    cta: "Get Started"
  },
  {
    title: "Business Website",
    price: "₦250,000",
    description: "Great for businesses needing more features, including online sales or advanced service pages.",
    features: [
      "E-commerce or advanced business functionality (optional)",
      "Free domain (yourbusinessname.com)",
      "1 month free support",
      "5 to 7 pages (Home, About, Services, Contact, Blog, etc.)",
      "Payment gateway integration (if needed)",
      "Product or service management dashboard"
    ],
    cta: "Start Now"
  },
  {
    title: "Advanced Business Website",
    price: "₦650,000",
    description: "For growing businesses needing advanced features, scalable solutions, and user accounts.",
    features: [
      "Advanced features for any business (e-commerce, booking, custom forms, etc.)",
      "Free domain (yourbusinessname.com)",
      "1 month free support",
      "7 to 15 pages",
      "Custom integrations",
      "Analytics & reporting",
      "Customer accounts & and business management",
      "Login & registration features"
    ],
    cta: "Go Advanced"
  },
  {
    title: "Custom Solution",
    price: "Custom Pricing",
    description: "Have unique needs? Describe your project and we'll provide a tailored quote. Includes login & registration features if required.",
    features: [
      "Any number of pages",
      "Any features you need (e-commerce, booking, login, etc.)",
      "Expert consultation",
      "Flexible support options",
      "Login & registration features (if needed)"
    ],
    cta: "Request Quote"
  }
];

const Pricing = () => {
  return (
    <section className="pricing-section">
      <div className="pricing-bg-elements">
        <div className="pricing-blob blob-1"></div>
        <div className="pricing-blob blob-2"></div>
      </div>

      <div className="container">
        <div className="section-header center-header">
          <span className="overline">Pricing</span>
          <h2 className="section-title">Flexible Plans for Every <span className="highlight">Business</span></h2>
          <p className="section-subtitle">Choose the perfect package for your business. All plans include free domain, hosting, and expert support.</p>
        </div>

        <div className="pricing-grid">
          {pricingOptions.map((option, idx) => (
            <div className="pricing-card" key={idx}>
              {idx === 1 && <div className="plan-badge">Popular</div>}
              <h3 className="pricing-card-title">{option.title}</h3>
              <div className="pricing-card-price">{option.price}</div>
              <div className="pricing-note">One-time fee · includes 1 month support.</div>
              <p className="pricing-card-desc">{option.description}</p>
              <ul className="pricing-features">
                {option.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <Link to="/contact" className="pricing-cta-btn">{option.cta}</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing;
