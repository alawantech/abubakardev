import React from 'react';
import { FaRobot, FaArrowRight, FaGlobe, FaSpinner, FaCheck, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useUserLocation } from '../hooks/useUserLocation';
import { services } from '../data/services';
import { pricingByService } from '../data/pricing';
import './PricingServicePage.css';

const PricingAI = () => {
  const { symbol, isNigeria, loading: locLoading, currency } = useUserLocation();
  const service = services.find(s => s.id === 'ai');
  const pricing = pricingByService.ai?.tiers || [];

  return (
    <section className="pricing-service-page section">
      <div className="bg-orb bg-orb-1" style={{ opacity: 0.08, top: '5%', right: '5%' }} />
      <div className="bg-orb bg-orb-2" style={{ opacity: 0.08, bottom: '5%', left: '5%' }} />

      <div className="container">
        <Link to="/pricing" className="back-link">
          <FaArrowRight /> Back to all pricing
        </Link>

        <div className="service-header">
          <div className="service-badge" style={{ background: service?.accent }}>
            <FaRobot />
          </div>
          <h1>{service?.title}</h1>
          <p className="service-tagline">{service?.description}</p>

          <div className="currency-indicator">
            <FaGlobe size={12} />
            {locLoading ? (
              <span><FaSpinner className="spin" size={11} /> Detecting your region…</span>
            ) : (
              <span>
                Showing prices in <strong>{currency}</strong>
                {isNigeria ? " 🇳🇬" : " 🌍"} · One-time project fees
              </span>
            )}
          </div>
        </div>

        <div className="pricing-grid">
          {pricing.map((tier) => (
            <article
              key={tier.id}
              className={`pricing-card ${tier.popular ? 'popular' : ''}`}
            >
              {tier.popular && <span className="popular-badge">Most Popular</span>}

              <div className="card-header">
                <h3>{tier.name}</h3>
                <p className="tier-tagline">{tier.tagline}</p>
              </div>

              <div className="card-price">
                <span className="amount">
                  {tier.priceNGN !== null ? symbol + tier.priceNGN.toLocaleString() : 'Custom quote'}
                </span>
                <span className="timeline">
                  <FaClock size={14} /> {tier.timeline}
                </span>
              </div>

              <ul className="features-list">
                {tier.features.map((feat, i) => (
                  <li key={i}><FaCheck /> {feat}</li>
                ))}
              </ul>

              <Link
                to="/pricing/inquire"
                state={{ service: 'ai', tier: tier.id, tierName: tier.name }}
                className={`cta-btn ${tier.popular ? 'primary' : 'secondary'}`}
              >
                {tier.cta || 'Get started'}
                <FaArrowRight />
              </Link>
            </article>
          ))}
        </div>

        <ThirdPartyNote />
      </div>
    </section>
  );
};

function ThirdPartyNote() {
  return (
    <div className="third-party-note">
      <div className="note-icon">ℹ️</div>
      <div className="note-content">
        <h4>Important: Third-Party Costs</h4>
        <p>
          The prices above cover our <strong>design, development, training, and deployment</strong> services only.
          Any third-party services required for your AI solution — such as <strong>LLM API costs</strong> (OpenAI, Anthropic, Groq, etc.),
          <strong>voice/twilio fees</strong> for phone integration, <strong>WhatsApp Business API</strong> (Meta charges per conversation),
          <strong>cloud hosting</strong> (AWS, Vercel, Railway, Render), <strong>vector databases</strong> (Pinecone, Weaviate, Qdrant),
          <strong>domain/SSL</strong>, <strong>monitoring/analytics</strong>, or any other
          <strong>external infrastructure or API subscriptions</strong> — are billed directly by those providers and are <strong>your responsibility</strong>.
          We'll help you estimate and configure the right services, but the accounts and payments remain yours.
        </p>
      </div>
    </div>
  );
}

export default PricingAI;