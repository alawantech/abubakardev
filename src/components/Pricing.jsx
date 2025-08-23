import React from "react";
import { Link } from "react-router-dom";
import "./Pricing.css";

const pricingOptions = [
  {
    title: "Starter Website",
    price: "₦150,000",
    description: "Perfect for small businesses and personal brands who want a professional online presence.",
    features: [
      "Conversion-focused design",
      "Free domain & hosting for 1 year",
      "1 month free support",
      "4 to 5 pages",
      "Contact form integration",
      "No e-commerce functionality"
    ],
    cta: "Get Started"
  },
  {
    title: "Business Ecommerce",
    price: "₦250,000",
    description: "Ideal for businesses ready to sell online with a simple, effective e-commerce solution.",
    features: [
      "E-commerce functionality (sell products online)",
      "Free domain & hosting for 1 year",
      "1 month free support",
      "5 to 7 pages",
      "Payment gateway integration",
      "Product management dashboard"
    ],
    cta: "Start Selling"
  },
  {
    title: "Advanced Ecommerce",
    price: "₦350,000",
    description: "For growing businesses needing advanced features and a scalable online store.",
    features: [
      "Advanced e-commerce features",
      "Free domain & hosting for 1 year",
      "1 month free support",
      "7 to 10 pages",
      "Custom integrations",
      "Analytics & reporting",
      "Customer accounts & wishlists"
    ],
    cta: "Go Advanced"
  },
  {
    title: "Custom Solution",
    price: "Custom Pricing",
    description: "Have unique needs? Describe your project and we'll provide a tailored quote.",
    features: [
      "Any number of pages",
      "Any features you need",
      "Expert consultation",
      "Flexible support options"
    ],
    cta: "Request Quote"
  }
];

const Pricing = () => {
  return (
    <div className="pricing-page">
      <h1 className="pricing-title">Website Development Pricing</h1>
      <p className="pricing-subtitle">Choose the perfect package for your business. All plans include free domain, hosting, and expert support.</p>
      <div className="pricing-grid">
        {pricingOptions.map((option, idx) => (
          <div className="pricing-card" key={idx}>
            <h2 className="pricing-card-title">{option.title}</h2>
            <div className="pricing-card-price">{option.price}</div>
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
  );
};

export default Pricing;
