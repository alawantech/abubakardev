import React from 'react';
import { FaBullhorn, FaArrowRight, FaGlobe, FaSpinner, FaCheck, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useUserLocation } from '../hooks/useUserLocation';
import { services } from '../data/services';
import { pricingByService } from '../data/pricing';
import './PricingServicePage.css';

const PricingMarketing = () => {
  const { symbol, isNigeria, loading: locLoading, currency } = useUserLocation();
  const service = services.find(s => s.id === 'marketing');
  const pricing = pricingByService.marketing?.tiers || [];

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
            <FaBullhorn />
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
                state={{ service: 'marketing', tier: tier.id, tierName: tier.name }}
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
          The prices above cover our <strong>setup, configuration, and integration</strong> services only.
          Any third-party platforms or services used — such as <strong>email platforms</strong> (Mailchimp, ConvertKit, HubSpot, ActiveCampaign),
          <strong>CRM subscriptions</strong> (HubSpot, Pipedrive, Salesforce), <strong>analytics tools</strong> (Mixpanel, Amplitude, GA4),
          <strong>SMS/notification services</strong> (Twilio, Termii, OneSignal), <strong>landing page builders</strong>,
          <strong>CDN/hosting</strong>, <strong>domain/SSL</strong>, or any other
          <strong>external SaaS subscriptions or API fees</strong> — are billed directly by those providers and are <strong>your responsibility</strong>.
          We'll help you select and configure the right stack, but the accounts and payments remain yours.
        </p>
      </div>
    </div>
  );
}

export default PricingMarketing;