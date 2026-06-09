import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { countries } from "../data/countries";
import { services } from "../data/services";
import { pricingByService } from "../data/pricing";
import { useUserLocation } from "../hooks/useUserLocation";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import "./PricingInquiryForm.css";

const functions = getFunctions();

const PricingInquiryForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isNigeria } = useUserLocation();

  const serviceId = searchParams.get("service") || "web";
  const tierId = searchParams.get("tier") || "web-starter";

  const service = services.find((s) => s.id === serviceId) || services[0];
  const pricing = pricingByService[serviceId];
  const tier = pricing?.tiers.find((t) => t.id === tierId) || pricing?.tiers[0];

  const price = tier ? (isNigeria ? tier.priceNGN : tier.priceUSD) : null;
  const currency = isNigeria ? "NGN" : "USD";
  const symbol = isNigeria ? "₦" : "$";

  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    email: "",
    country: isNigeria ? "Nigeria" : "",
    phone: "",
    whatsapp: "",
    sameAsPhone: false,
    businessDescription: "",
    usesSoftware: false,
    softwareName: "",
    softwareDescription: "",
    featuresNeeded: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (field, value) => {
    setForm((f) => {
      const next = { ...f, [field]: value };
      if (field === "phone" && f.sameAsPhone) next.whatsapp = value;
      if (field === "sameAsPhone") {
        next.whatsapp = value ? f.phone : "";
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      await addDoc(collection(db, "pricing_inquiries"), {
        serviceName: service.title,
        serviceId: service.id,
        tierName: tier?.name || "",
        tierId: tier?.id || "",
        price: price,
        currency: currency,
        fullName: form.fullName.trim(),
        businessName: form.businessName.trim(),
        email: form.email.trim().toLowerCase(),
        country: form.country,
        phone: form.phone.trim(),
        whatsapp: form.whatsapp.trim() || "",
        businessDescription: form.businessDescription.trim(),
        usesSoftware: form.usesSoftware,
        softwareName: form.softwareName.trim(),
        softwareDescription: form.softwareDescription.trim(),
        featuresNeeded: form.featuresNeeded.trim(),
        status: "new",
        createdAt: serverTimestamp(),
      });

      try {
        const sendNotification = httpsCallable(functions, "sendPricingInquiryNotification");
        await sendNotification({
          serviceName: service.title,
          tierName: tier?.name || "",
          price: price,
          currency: currency,
          fullName: form.fullName.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          country: form.country,
          businessName: form.businessName.trim(),
        });
      } catch (emailErr) {
        console.warn("Email notification failed (inquiry still saved):", emailErr.message);
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting inquiry:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pi-page">
        <div className="pi-container">
          <div className="pi-success">
            <div className="pi-success-icon">✓</div>
            <h2>Inquiry Submitted!</h2>
            <p>
              Thank you, <strong>{form.fullName}</strong>. We've received your inquiry for the{" "}
              <strong>{tier?.name}</strong> package. Our team will review it and contact you
              shortly at <strong>{form.email}</strong>.
            </p>
            <div className="pi-success-actions">
              <button onClick={() => navigate("/pricing")} className="pi-btn pi-btn-primary">
                Back to Pricing
              </button>
              <button onClick={() => navigate("/")} className="pi-btn pi-btn-secondary">
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pi-page">
      <div className="pi-container">
        <button onClick={() => navigate(-1)} className="pi-back">← Back to Pricing</button>

        <div className="pi-header">
          <h1>Get Started with {tier?.name}</h1>
          <p>Fill in your details and we'll get back to you within 24 hours.</p>
        </div>

        <div className="pi-package-summary">
          <div className="pi-pkg-row">
            <span className="pi-pkg-label">Package</span>
            <span className="pi-pkg-value">{tier?.name}</span>
          </div>
          <div className="pi-pkg-row">
            <span className="pi-pkg-label">Service</span>
            <span className="pi-pkg-value">{service.title}</span>
          </div>

          <div className="pi-pkg-row pi-pkg-price">
            <span className="pi-pkg-label">Price</span>
            <span className="pi-pkg-value">
              {price !== null ? `${symbol}${price.toLocaleString()}` : "Let's talk"}
              {price !== null && <span className="pi-pkg-currency">{currency}</span>}
            </span>
          </div>
          <div className="pi-pkg-change">
            <button onClick={() => navigate("/pricing")} className="pi-link-btn">
              Change package
            </button>
          </div>
        </div>

        {error && <div className="pi-error">{error}</div>}

        <form onSubmit={handleSubmit} className="pi-form">
          <div className="pi-section">
            <h3>Your Information</h3>

            <div className="pi-field">
              <label>Full Name *</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="John Doe"
                required
              />
              <span className="pi-hint">Your full name as you'd like us to address you</span>
            </div>

            <div className="pi-field">
              <label>Business / Company Name</label>
              <input
                type="text"
                value={form.businessName}
                onChange={(e) => update("businessName", e.target.value)}
                placeholder="Acme Corp"
              />
              <span className="pi-hint">Leave blank if you don't have one yet</span>
            </div>

            <div className="pi-field">
              <label>Email Address *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="john@acme.com"
                required
              />
              <span className="pi-hint">We'll use this to send you project updates</span>
            </div>

            <div className="pi-field">
              <label>Country</label>
              <select
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
              >
                <option value="">Select country…</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <span className="pi-hint">This helps us understand your timezone and currency</span>
            </div>

            <div className="pi-field">
              <label>Phone Number *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+234 800 000 0000"
                required
              />
              <span className="pi-hint">Include country code, e.g. +234 for Nigeria</span>
            </div>

            <div className="pi-field">
              <label>WhatsApp Number (optional)</label>
              <input
                type="tel"
                value={form.whatsapp}
                onChange={(e) => update("whatsapp", e.target.value)}
                placeholder="+234 800 000 0000"
                disabled={form.sameAsPhone}
              />
              <span className="pi-hint">We'll use this to reach you quickly if needed</span>
              <label className="pi-checkbox">
                <input
                  type="checkbox"
                  checked={form.sameAsPhone}
                  onChange={(e) => update("sameAsPhone", e.target.checked)}
                />
                <span>Same as phone number</span>
              </label>
            </div>
          </div>

          <div className="pi-section">
            <h3>About Your Business</h3>

            <div className="pi-field">
              <label>Describe your business — what do you do?</label>
              <textarea
                value={form.businessDescription}
                onChange={(e) => update("businessDescription", e.target.value)}
                placeholder="e.g. We run a logistics company that delivers packages across West Africa..."
                rows={3}
              />
              <span className="pi-hint">What products or services do you offer? Who are your customers?</span>
            </div>

            <div className="pi-field">
              <label>Do you currently use any software in your business?</label>
              <div className="pi-yesno">
                <button
                  type="button"
                  className={`pi-yesno-btn ${form.usesSoftware ? "active" : ""}`}
                  onClick={() => update("usesSoftware", true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`pi-yesno-btn ${!form.usesSoftware ? "active" : ""}`}
                  onClick={() => update("usesSoftware", false)}
                >
                  No
                </button>
              </div>
            </div>

            {form.usesSoftware && (
              <div className="pi-field-group">
                <div className="pi-field">
                  <label>Software / Tool Name</label>
                  <input
                    type="text"
                    value={form.softwareName}
                    onChange={(e) => update("softwareName", e.target.value)}
                    placeholder="e.g. Salesforce, custom CRM, etc."
                  />
                  <span className="pi-hint">What tool or app are you currently using?</span>
                </div>
                <div className="pi-field">
                  <label>What does it do?</label>
                  <textarea
                    value={form.softwareDescription}
                    onChange={(e) => update("softwareDescription", e.target.value)}
                    placeholder="e.g. It manages our customer database and sends invoices..."
                    rows={2}
                  />
                  <span className="pi-hint">Briefly describe what you use it for</span>
                </div>
              </div>
            )}

            <div className="pi-field">
              <label>What features do you need? What should this service achieve?</label>
              <textarea
                value={form.featuresNeeded}
                onChange={(e) => update("featuresNeeded", e.target.value)}
                placeholder="e.g. I need an online booking system, payment integration, and a customer dashboard..."
                rows={4}
              />
              <span className="pi-hint">Describe the outcome you're looking for — the more detail, the better we can prepare</span>
            </div>
          </div>

          <button
            type="submit"
            className="pi-btn pi-btn-primary pi-submit"
            disabled={submitting}
          >
            {submitting ? "Submitting…" : "Submit Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PricingInquiryForm;
