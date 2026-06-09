import React, { useState } from "react";
import {
  FaCheck,
  FaGlobe,
  FaSpinner,
  FaArrowRight,
  FaClock,
  FaQuestionCircle,
  FaWhatsapp
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUserLocation } from "../hooks/useUserLocation";
import { services } from "../data/services";
import { pricingByService } from "../data/pricing";
import "./Pricing.css";

const Pricing = () => {
  const { symbol, isNigeria, loading, currency } = useUserLocation();
  const [activeService, setActiveService] = useState("all");

  const filteredServices = activeService === "all"
    ? services
    : services.filter((s) => s.id === activeService);

  const scrollToService = (id) => {
    const el = document.getElementById(`pricing-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="pricing-section section" id="pricing">
      <div className="bg-orb bg-orb-1" style={{ opacity: 0.1, top: '5%', right: '5%' }} />
      <div className="bg-orb bg-orb-2" style={{ opacity: 0.1, bottom: '5%', left: '5%' }} />

      <div className="container pricing-fade-in">
        {/* HERO */}
        <div className="section-heading">
          <span className="eyebrow eyebrow-accent">
            Pricing
          </span>
          <h2>
            Honest pricing.<br/>
            <span className="gradient-text">Pick the service you need.</span>
          </h2>
          <p>
            Every service, priced transparently. We adjust to your currency based on where you're browsing from. No hidden fees, no surprises.
          </p>

          <div className="currency-indicator">
            <FaGlobe size={12} />
            {loading ? (
              <span><FaSpinner className="spin" size={11} /> Detecting your region…</span>
            ) : (
              <span>
                Showing prices in <strong>{currency}</strong>
                {isNigeria ? " 🇳🇬" : " 🌍"} · One-time fees unless noted
              </span>
            )}
          </div>
        </div>

        {/* SERVICE NAV (sticky pills) */}
        <div className="pricing-service-nav">
          <button
            className={`service-nav-btn ${activeService === 'all' ? 'active' : ''}`}
            onClick={() => setActiveService('all')}
            style={{ '--btn-accent': 'var(--grad-primary)' }}
          >
            All services
          </button>
          {services.map((s) => {
            const Icon = s.icon
            return (
              <button
                key={s.id}
                className={`service-nav-btn ${activeService === s.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveService(s.id)
                  scrollToService(s.id)
                }}
                style={{ '--btn-accent': s.accent }}
              >
                <Icon size={12} /> {s.shortTitle}
              </button>
            )
          })}
        </div>

        {/* SERVICE SECTIONS */}
        <div className="pricing-services">
          {filteredServices.map((service, sIdx) => {
            const Icon = service.icon
            const pricing = pricingByService[service.id]
            if (!pricing) return null

            return (
              <div
                key={service.id}
                id={`pricing-${service.id}`}
                className="pricing-service pricing-stagger"
                style={{
                  '--service-accent': service.accent,
                  animationDelay: `${sIdx * 0.08}s`
                }}
              >
                <div className="service-header">
                  <div className="service-header-icon">
                    <Icon size={22} />
                  </div>
                  <div className="service-header-text">
                    <h3 className="service-header-title">{service.title}</h3>
                    <p className="service-header-desc">{service.description}</p>
                  </div>
                </div>

                <div className="tier-grid">
                  {pricing.tiers.map((tier, tIdx) => {
                    const price = isNigeria ? tier.priceNGN : tier.priceUSD
                    return (
                      <div
                        key={tier.id}
                        className={`tier-card ${tier.popular ? 'popular' : ''}`}
                      >
                        {tier.popular && <div className="tier-badge">Most popular</div>}
                        {tier.recurring && <div className="tier-badge tier-badge-recur">Recurring</div>}

                        <div className="tier-name">{tier.name}</div>
                        <div className="tier-tagline">{tier.tagline}</div>

                        <div className="tier-price">
                          {price === null ? (
                            <span className="tier-price-custom">Let's talk</span>
                          ) : (
                            <>
                              <span className="tier-price-symbol">{symbol}</span>
                              <span className="tier-price-value">{price.toLocaleString()}</span>
                            </>
                          )}
                        </div>

                        {price !== null && (
                          <div className="tier-timeline">
                            <FaClock size={10} /> {tier.timeline}
                            {tier.recurring && " · recurring"}
                          </div>
                        )}

                        <ul className="tier-features">
                          {tier.features.map((f, j) => (
                            <li key={j}>
                              <FaCheck size={10} /> <span>{f}</span>
                            </li>
                          ))}
                        </ul>

                        <Link to="/#contact" className="tier-cta">
                          {tier.cta} <FaArrowRight size={12} />
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* FOOTER CARD */}
        <div className="pricing-help pricing-stagger" style={{ animationDelay: '0.4s' }}>
          <div className="help-card">
            <div className="help-icon"><FaQuestionCircle size={20} /></div>
            <div className="help-text">
              <h4>Not sure which one you need?</h4>
              <p>Book a free 30-minute call. We'll review your situation and recommend the right tier — even if it's not us.</p>
            </div>
            <div className="help-actions">
              <Link to="/#contact" className="btn btn-primary">Book a free call</Link>
              <a href="https://wa.me/2348156853636" target="_blank" rel="noopener noreferrer" className="btn btn-secondary"><FaWhatsapp size={13} /> Chat on WhatsApp</a>
            </div>
          </div>

          <div className="pricing-fineprint">
            <p>
              <strong>All prices shown are one-time development fees.</strong> Any third-party services your project needs to subscribe to or purchase — such as OpenAI / LLM API usage, Twilio (calls/WhatsApp), hosting, domains, or SMS providers — are billed separately by those providers, directly to you (the project owner). We help you set them up, but the subscription costs are not included in our development price.
              <br/><br/>
              <strong>What's included in every project:</strong> Source code, deployment, 30 days of bug-fix support, and a 30-minute handover call.
              <br/>
              <strong>Payment terms:</strong> 50% upfront, 50% on delivery. International clients pay in USD via invoice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
