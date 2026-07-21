import React from 'react';
import { FaCogs, FaArrowRight, FaGlobe, FaSpinner, FaCheck, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useUserLocation } from '../hooks/useUserLocation';
import { services } from '../data/services';
import { pricingByService } from '../data/pricing';
import './PricingServicePage.css';

const PricingCustom = () => {
  const { symbol, isNigeria, loading: locLoading, currency } = useUserLocation();
  const service = services.find(s => s.id === 'custom');
  const pricing = pricingByService.custom?.tiers || [];

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
            <FaCogs />
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

              <div className="card-disclaimer">
                Price covers development only. Third-party services (hosting, databases, domains, payment gateways, email APIs, etc.) are billed separately to the project owner.
              </div>

              <Link
                to="/pricing/inquire"
                state={{ service: 'custom', tier: tier.id, tierName: tier.name }}
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
          The prices above cover our <strong>design, development, and deployment</strong> services only.
          Any third-party services required for your custom software — such as <strong>cloud hosting</strong> (AWS, Vercel, DigitalOcean, Railway, Render),
          <strong>domain registration</strong>, <strong>SSL certificates</strong>, <strong>payment gateway fees</strong> (Paystack, Flutterwave, Stripe),
          <strong>email/SMS APIs</strong> (SendGrid, Mailgun, Twilio, Termii),
          <strong>database services</strong> (MongoDB Atlas, Supabase, PlanetScale, Neon),
          <strong>CDN/edge services</strong>, <strong>monitoring/logging</strong> (Datadog, Sentry, LogRocket),
          <strong>authentication providers</strong> (Clerk, Auth0, Supabase Auth),
          or any other <strong>external infrastructure or API subscriptions</strong> — are billed directly by those providers and are <strong>your responsibility</strong>.
          We'll help you choose and configure the right services, but the accounts and payments remain yours.
        </p>
      </div>
    </div>
  );
}

export default PricingCustom;