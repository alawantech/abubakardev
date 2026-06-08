import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCode,
  FaMobile,
  FaRobot,
  FaCogs,
  FaBullhorn,
  FaWhatsapp,
  FaVideo,
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaCheckCircle,
  FaClock,
  FaGlobe,
  FaEnvelope,
  FaUserTie,
  FaLightbulb,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaShieldAlt,
  FaCommentDots,
  FaSearch,
  FaQuestion,
  FaLanguage,
  FaSpinner
} from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import { services } from "../data/services";
import { countries } from "../data/countries";
import { useUserTimezone, formatInTimezone } from "../hooks/useUserTimezone";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import "./BookCall.css";

const STORAGE_KEY = "zedrotech_book_call_draft_v1";

const SERVICE_ICONS = {
  web: FaCode,
  ai: FaRobot,
  mobile: FaMobile,
  custom: FaCogs,
  marketing: FaBullhorn,
  other: FaQuestion
};

const STEP_LABELS = [
  "Language",
  "Service",
  "Your business",
  "Project",
  "Schedule"
];

const initialForm = {
  language: "",
  services: [],
  customService: "",
  name: "",
  email: "",
  whatsapp: "",
  countryCode: "",
  countryName: "",
  countryDialCode: "",
  businessName: "",
  businessDescription: "",
  projectDescription: "",
  currentSoftware: "",
  problem: "",
  additionalInfo: "",
  callType: "whatsapp",
  slotId: "",
  slotStartUtc: "",
  slotEndUtc: "",
  slotDurationMinutes: 30
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.35, ease: "easeOut" }
};

function loadDraft() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { ...initialForm, ...parsed };
  } catch {
    return null;
  }
}

function saveDraft(form, step) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...form, _step: step }));
  } catch {
    // ignore quota / disabled storage
  }
}

function clearDraft() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || "").trim());
}

function validateWhatsApp(num) {
  const digits = (num || "").replace(/[^\d]/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function StepIndicator({ step }) {
  return (
    <div className="bc-stepper">
      <div className="bc-stepper-track">
        {STEP_LABELS.map((label, i) => {
          const n = i + 1;
          const status = n < step ? "done" : n === step ? "active" : "pending";
          return (
            <React.Fragment key={label}>
              <div className={`bc-step bc-step-${status}`}>
                <div className="bc-step-circle">
                  {status === "done" ? <FaCheck size={11} /> : n}
                </div>
                <div className="bc-step-label">{label}</div>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div className={`bc-step-line ${n < step ? "filled" : ""}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function WelcomeStep({ onStart }) {
  return (
    <motion.div {...fadeUp} className="bc-step-content bc-welcome">
      <div className="bc-welcome-badge">
        <FaCalendarAlt size={12} /> Free 30-min discovery call
      </div>
      <h1 className="bc-welcome-title">
        Book a call.<br />
        <span className="gradient-text">Get a real plan.</span>
      </h1>
      <p className="bc-welcome-lede">
        Before we get on a call, we want to learn a bit about your business.
        That way, when we meet, we skip the small talk and walk you through
        a concrete plan — what we'd build, how long it takes, and what it costs.
      </p>

      <div className="bc-welcome-points">
        <div className="bc-welcome-point">
          <div className="bc-welcome-point-icon"><FaClock size={14} /></div>
          <div>
            <strong>2 minutes to fill.</strong>
            <p>Five short questions. Nothing overwhelming.</p>
          </div>
        </div>
        <div className="bc-welcome-point">
          <div className="bc-welcome-point-icon"><FaUserTie size={14} /></div>
          <div>
            <strong>Talk to a senior, not a salesperson.</strong>
            <p>You'll meet the person who'd actually build your project.</p>
          </div>
        </div>
        <div className="bc-welcome-point">
          <div className="bc-welcome-point-icon"><FaLightbulb size={14} /></div>
          <div>
            <strong>Leave with a plan — even if it's not us.</strong>
            <p>If we're not the right fit, we'll tell you on the spot.</p>
          </div>
        </div>
        <div className="bc-welcome-point">
          <div className="bc-welcome-point-icon"><FaShieldAlt size={14} /></div>
          <div>
            <strong>Your details stay private.</strong>
            <p>We only use them to prep for the call. No spam, ever.</p>
          </div>
        </div>
      </div>

      <div className="bc-welcome-cta">
        <button
          onClick={onStart}
          className="btn btn-primary bc-cta-primary"
        >
          Let's begin <FaArrowRight />
        </button>
        <span className="bc-welcome-foot">No commitment. Takes about 2 minutes.</span>
      </div>
    </motion.div>
  );
}

function LanguageStep({ form, setForm, onNext, onBack }) {
  return (
    <motion.div {...fadeUp} className="bc-step-content">
      <div className="bc-step-header">
        <span className="eyebrow eyebrow-accent">Step 1 of 5</span>
        <h2>What language should we use for the call?</h2>
        <p>Pick the language you're most comfortable speaking.</p>
      </div>

      <div className="bc-language-grid">
        <button
          type="button"
          className={`bc-language-card ${form.language === "english" ? "active" : ""}`}
          onClick={() => setForm((f) => ({ ...f, language: "english" }))}
        >
          <div className="bc-language-flag">🇬🇧</div>
          <div className="bc-language-info">
            <div className="bc-language-name">English</div>
            <div className="bc-language-desc">We'll speak English on the call.</div>
          </div>
          {form.language === "english" && <div className="bc-language-check"><FaCheck size={10} /></div>}
        </button>
        <button
          type="button"
          className={`bc-language-card ${form.language === "hausa" ? "active" : ""}`}
          onClick={() => setForm((f) => ({ ...f, language: "hausa" }))}
        >
          <div className="bc-language-flag">🇳🇬</div>
          <div className="bc-language-info">
            <div className="bc-language-name">Hausa</div>
            <div className="bc-language-desc">Za mu yi magana a harshen Hausa.</div>
          </div>
          {form.language === "hausa" && <div className="bc-language-check"><FaCheck size={10} /></div>}
        </button>
      </div>

      <div className="bc-step-footer">
        <button onClick={onBack} className="btn btn-ghost"><FaArrowLeft /> Back</button>
        <button onClick={onNext} disabled={!form.language} className="btn btn-primary">
          Continue <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );
}

function ServiceStep({ form, setForm, onNext, onBack }) {
  const isOther = form.services.includes("other");

  const toggle = (id) => {
    setForm((f) => {
      const current = f.services || [];
      const next = current.includes(id)
        ? current.filter((s) => s !== id)
        : [...current, id];
      return { ...f, services: next, customService: id === "other" && !current.includes("other") ? f.customService : (id !== "other" ? f.customService : "") };
    });
  };

  const canNext = form.services.length > 0 && (!isOther || (form.customService && form.customService.trim().length > 0));

  return (
    <motion.div {...fadeUp} className="bc-step-content">
      <div className="bc-step-header">
        <span className="eyebrow eyebrow-accent">Step 2 of 5</span>
        <h2>What do you need help with?</h2>
        <p>Select all that apply. Don't worry — we'll go deeper on the call.</p>
      </div>

      <div className="bc-services-grid">
        {services.map((s) => {
          const Icon = s.icon;
          const active = form.services.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              className={`bc-service-card ${active ? "active" : ""}`}
              onClick={() => toggle(s.id)}
              style={{ "--accent": s.accent }}
            >
              <div className="bc-service-icon"><Icon size={20} /></div>
              <div className="bc-service-name">{s.title}</div>
              <div className="bc-service-desc">{s.description}</div>
              {active && <div className="bc-service-check"><FaCheck size={11} /></div>}
            </button>
          );
        })}

        <button
          type="button"
          className={`bc-service-card bc-service-other ${isOther ? "active" : ""}`}
          onClick={() => toggle("other")}
          style={{ "--accent": "#94a3b8" }}
        >
          <div className="bc-service-icon"><FaQuestion size={20} /></div>
          <div className="bc-service-name">Something else</div>
          <div className="bc-service-desc">
            If you don't see a match above, pick this and tell us what you have in mind.
          </div>
          {isOther && <div className="bc-service-check"><FaCheck size={11} /></div>}
        </button>
      </div>

      <AnimatePresence>
        {isOther && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="bc-other-wrap"
          >
            <label className="bc-field">
              <span className="bc-field-label">What kind of project is it?</span>
              <input
                type="text"
                value={form.customService}
                onChange={(e) => setForm((f) => ({ ...f, customService: e.target.value }))}
                placeholder="e.g. A Chrome extension, a Chrome plugin, an internal tool, a desktop app…"
                className="bc-input"
                autoFocus
              />
            </label>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bc-services-selected-hint">
        {form.services.length > 0 && (
          <span>{form.services.length} service{form.services.length > 1 ? "s" : ""} selected</span>
        )}
      </div>

      <div className="bc-step-footer bc-step-footer-sticky">
        <button onClick={onBack} className="btn btn-ghost"><FaArrowLeft /> Back</button>
        <button onClick={onNext} disabled={!canNext} className="btn btn-primary">
          Continue <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );
}

function BusinessStep({ form, setForm, onNext, onBack }) {
  const [countryQuery, setCountryQuery] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const countryRef = useRef(null);

  useEffect(() => {
    if (form.countryName && !countryQuery) setCountryQuery(form.countryName);
  }, [form.countryName]);

  useEffect(() => {
    const onClick = (e) => {
      if (countryRef.current && !countryRef.current.contains(e.target)) setCountryOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const filtered = useMemo(() => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((c) => c.name.toLowerCase().includes(q));
  }, [countryQuery]);

  const selectCountry = (c) => {
    setForm((f) => ({ ...f, countryCode: c.code, countryName: c.name, countryDialCode: c.dialCode }));
    setCountryQuery(c.name);
    setCountryOpen(false);
  };

  const requiredOk =
    form.name.trim() &&
    validateEmail(form.email) &&
    form.countryCode &&
    form.businessName.trim();

  return (
    <motion.div {...fadeUp} className="bc-step-content">
      <div className="bc-step-header">
        <span className="eyebrow eyebrow-accent">Step 3 of 5</span>
        <h2>Tell us about your business</h2>
        <p>The basics. So we can do our homework before the call.</p>
      </div>

      <div className="bc-form">
        <div className="bc-form-row">
          <label className="bc-field">
            <span className="bc-field-label">Your name</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Jane Doe"
              className="bc-input"
              autoComplete="name"
            />
          </label>
          <label className="bc-field">
            <span className="bc-field-label">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="jane@company.com"
              className="bc-input"
              autoComplete="email"
            />
          </label>
        </div>

        <div className="bc-form-row">
          <div className="bc-field" ref={countryRef}>
            <span className="bc-field-label">Country</span>
            <div className="bc-combobox">
              <FaGlobe className="bc-combobox-icon" />
              <FaSearch className="bc-combobox-search" />
              <input
                type="text"
                value={countryQuery}
                onChange={(e) => {
                  setCountryQuery(e.target.value);
                  setCountryOpen(true);
                  if (!e.target.value) {
                    setForm((f) => ({ ...f, countryCode: "", countryName: "", countryDialCode: "" }));
                  }
                }}
                onFocus={() => setCountryOpen(true)}
                placeholder="Search countries…"
                className="bc-input bc-input-with-icon"
                autoComplete="off"
              />
              <AnimatePresence>
                {countryOpen && filtered.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="bc-combobox-list"
                  >
                    {filtered.slice(0, 200).map((c) => (
                      <li
                        key={c.code}
                        className={`bc-combobox-item ${form.countryCode === c.code ? "active" : ""}`}
                        onClick={() => selectCountry(c)}
                      >
                        <span className="bc-combobox-flag">{getFlagEmoji(c.code)}</span>
                        <span className="bc-combobox-name">{c.name}</span>
                        <span className="bc-combobox-dial">{c.dialCode}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
          <label className="bc-field">
            <span className="bc-field-label">
              WhatsApp <span className="bc-optional">(optional, no country code)</span>
            </span>
            <div className="bc-phone">
              {form.countryDialCode && <span className="bc-phone-prefix">{form.countryDialCode}</span>}
              <input
                type="tel"
                value={form.whatsapp}
                onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
                placeholder="800 000 0000"
                className="bc-input"
                autoComplete="tel"
              />
            </div>
          </label>
        </div>

        <label className="bc-field">
          <span className="bc-field-label">Business or project name</span>
          <input
            type="text"
            value={form.businessName}
            onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
            placeholder="e.g. Zee Logistics, Adunni Couture, Sunmark Energy…"
            className="bc-input"
          />
        </label>

        <div className="bc-field">
          <span className="bc-field-label">What does your business do?</span>
          <span className="bc-field-hint">Explain what you sell or offer, who your customers are, and how your business works.</span>
          <textarea
            value={form.businessDescription}
            onChange={(e) => setForm((f) => ({ ...f, businessDescription: e.target.value }))}
            placeholder="e.g. We sell building materials to contractors. We have a warehouse in Lagos and deliver across Nigeria. We currently take orders by phone and WhatsApp…"
            rows={4}
            className="bc-textarea"
          />
        </div>
      </div>

      <div className="bc-step-footer">
        <button onClick={onBack} className="btn btn-ghost"><FaArrowLeft /> Back</button>
        <button onClick={onNext} disabled={!requiredOk} className="btn btn-primary">
          Continue <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );
}

function ProjectStep({ form, setForm, onNext, onBack }) {
  const [hasSoftware, setHasSoftware] = useState(() => !!form.currentSoftware);
  const canNext = true;

  const toggleSoftware = (val) => {
    setHasSoftware(val);
    if (!val) setForm((f) => ({ ...f, currentSoftware: "" }));
  };

  return (
    <motion.div {...fadeUp} className="bc-step-content">
      <div className="bc-step-header">
        <span className="eyebrow eyebrow-accent">Step 4 of 5</span>
        <h2>Tell us about the project</h2>
        <p>The more details you give, the more useful the call will be. Only the first question is required.</p>
      </div>

      <div className="bc-form">
        <div className="bc-field">
          <span className="bc-field-label">What's the final outcome you want?</span>
          <span className="bc-field-hint">Describe the result — a website, an app, a system, or a feature you need built.</span>
          <textarea
            value={form.projectDescription}
            onChange={(e) => setForm((f) => ({ ...f, projectDescription: e.target.value }))}
            placeholder="e.g. I want a website where my customers can place orders, track deliveries, and pay online…"
            rows={4}
            className="bc-textarea"
          />
        </div>

        <div className="bc-field">
          <span className="bc-field-label">Do you use any software in your business?</span>
          <span className="bc-field-hint">CRM, accounting, marketing tools, website, or anything else you use to run your business.</span>
          <div className="bc-yesno">
            <button
              type="button"
              className={`bc-yesno-btn ${hasSoftware ? "active" : ""}`}
              onClick={() => toggleSoftware(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={`bc-yesno-btn ${!hasSoftware && form.currentSoftware === "" ? "" : !hasSoftware ? "active" : ""}`}
              onClick={() => toggleSoftware(false)}
            >
              No
            </button>
          </div>
          <AnimatePresence>
            {hasSoftware && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="text"
                  value={form.currentSoftware}
                  onChange={(e) => setForm((f) => ({ ...f, currentSoftware: e.target.value }))}
                  placeholder="e.g. HubSpot, Zoho, WooCommerce, Excel…"
                  className="bc-input"
                  style={{ marginTop: 10 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bc-field">
          <span className="bc-field-label">
            What's your biggest challenge right now? <span className="bc-optional">(optional)</span>
          </span>
          <span className="bc-field-hint">What problem are you trying to solve? What's slowing your business down?</span>
          <textarea
            value={form.problem}
            onChange={(e) => setForm((f) => ({ ...f, problem: e.target.value }))}
            placeholder="e.g. We're losing customers because we can't reply to WhatsApp messages fast enough…"
            rows={3}
            className="bc-textarea"
          />
        </div>

        <div className="bc-field">
          <span className="bc-field-label">
            Anything else? <span className="bc-optional">(optional)</span>
          </span>
          <span className="bc-field-hint">Budget range, deadline, links to your current site, or anything else you want us to know.</span>
          <textarea
            value={form.additionalInfo}
            onChange={(e) => setForm((f) => ({ ...f, additionalInfo: e.target.value }))}
            placeholder="e.g. Budget is around ₦2M, need it ready by March, here's our current site: …"
            rows={3}
            className="bc-textarea"
          />
        </div>
      </div>

      <div className="bc-step-footer">
        <button onClick={onBack} className="btn btn-ghost"><FaArrowLeft /> Back</button>
        <button onClick={onNext} disabled={!canNext} className="btn btn-primary">
          Continue <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );
}

function ScheduleStep({ form, setForm, onBack, onSubmit, isSubmitting, uploadStatus, error }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slotError, setSlotError] = useState(null);
  const [browsing, setBrowsing] = useState(false);
  const userTimezone = useUserTimezone();
  const tz = userTimezone || form.timezone || "UTC";

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setSlotError(null);
      try {
        const fn = httpsCallable(functions, "listAvailableSlots");
        const res = await fn({ days: 21 });
        const slotData = res.data?.slots || [];
        console.log("[slots] received", slotData.length, "slots from function");
        if (!cancelled) setSlots(slotData);
      } catch (err) {
        console.error("[slots] listAvailableSlots FAILED:", err?.code, err?.message, err?.details);
        if (!cancelled) {
          setSlots([]);
          setSlotError(err?.details || err?.message || "Failed to load available times");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const grouped = useMemo(() => groupSlotsByDay(slots, tz), [slots, tz]);

  const selectSlot = (s) => {
    setForm((f) => ({
      ...f,
      slotId: s.id,
      slotStartUtc: s.startUtc,
      slotEndUtc: s.endUtc,
      slotDurationMinutes: s.durationMinutes
    }));
    setBrowsing(false);
  };

  const selectedSlot = form.slotId
    ? slots.find((s) => s.id === form.slotId)
    : null;

  const selectedDayLabel = selectedSlot
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "long", day: "numeric", month: "long", timeZone: tz
      }).format(new Date(selectedSlot.startUtc))
    : "";

  const selectedTimeLabel = selectedSlot
    ? new Intl.DateTimeFormat("en-US", {
        hour: "numeric", minute: "2-digit", timeZone: tz, timeZoneName: "short"
      }).format(new Date(selectedSlot.startUtc))
    : "";

  const canSubmit = !!form.slotStartUtc && (form.callType === "whatsapp" || form.callType === "google_meet");

  return (
    <motion.div {...fadeUp} className="bc-step-content">
      <div className="bc-step-header">
        <span className="eyebrow eyebrow-accent">Step 5 of 5</span>
        <h2>Pick a time that works for you</h2>
        <p>All times shown in <strong>{tz.replace(/_/g, " ")}</strong>. We'll send a confirmation email with the details.</p>
      </div>

      <div className="bc-calltype">
        <button
          type="button"
          className={`bc-calltype-card ${form.callType === "whatsapp" ? "active" : ""}`}
          onClick={() => setForm((f) => ({ ...f, callType: "whatsapp" }))}
          style={{ "--accent": "#10b981" }}
        >
          <FaWhatsapp size={22} />
          <div className="bc-calltype-name">WhatsApp call</div>
          <div className="bc-calltype-desc">We call you on WhatsApp. Quick and personal.</div>
          {form.callType === "whatsapp" && <div className="bc-calltype-check"><FaCheck size={11} /></div>}
        </button>
        <button
          type="button"
          className={`bc-calltype-card ${form.callType === "google_meet" ? "active" : ""}`}
          onClick={() => setForm((f) => ({ ...f, callType: "google_meet" }))}
          style={{ "--accent": "#6366f1" }}
        >
          <FaVideo size={22} />
          <div className="bc-calltype-name">Google Meet</div>
          <div className="bc-calltype-desc">Video call with screen-share. Link sent 24h before.</div>
          {form.callType === "google_meet" && <div className="bc-calltype-check"><FaCheck size={11} /></div>}
        </button>
      </div>

      <div className="bc-slots-wrap">
        <h3 className="bc-slots-title">Available times</h3>
        {loading ? (
          <div className="bc-slots-loading">
            <div className="bc-spinner" />
            <span>Loading available times…</span>
          </div>
        ) : slots.length === 0 ? (
          <div className="bc-slots-empty">
            <FaExclamationTriangle size={18} />
            <div>
              <strong>No slots available right now.</strong>
              {slotError && <p className="bc-slot-error-detail">{slotError}</p>}
              <p>Reach out on WhatsApp and we'll find a time that works.</p>
              <a
                href="https://wa.me/2348156853636"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ marginTop: 10 }}
              >
                <FaWhatsapp /> Chat on WhatsApp
              </a>
            </div>
          </div>
        ) : selectedSlot && !browsing ? (
          <div className="bc-slot-selected">
            <div className="bc-slot-selected-card">
              <FaCalendarAlt size={16} />
              <div className="bc-slot-selected-info">
                <div className="bc-slot-selected-day">{selectedDayLabel}</div>
                <div className="bc-slot-selected-time">{selectedTimeLabel}</div>
              </div>
              <button
                type="button"
                className="bc-slot-change-btn"
                onClick={() => setBrowsing(true)}
              >
                Change
              </button>
            </div>
          </div>
        ) : (
          <div className="bc-slots-days">
            {grouped.map((day) => (
              <div className="bc-slots-day" key={day.label}>
                <div className="bc-slots-day-label">{day.label}</div>
                <div className="bc-slots-day-grid">
                  {day.slots.map((s) => {
                    const active = form.slotId === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        className={`bc-slot-pill ${active ? "active" : ""}`}
                        onClick={() => selectSlot(s)}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <div className="bc-error">{error}</div>}
      {isSubmitting && uploadStatus && (
        <div className="bc-upload-status">
          <FaSpinner className="bc-spin" /> {uploadStatus}
        </div>
      )}

      <div className="bc-step-footer">
        <button onClick={onBack} className="btn btn-ghost" disabled={isSubmitting}><FaArrowLeft /> Back</button>
        <button onClick={onSubmit} disabled={!canSubmit || isSubmitting} className="btn btn-primary">
          {isSubmitting ? (
            <><div className="bc-spinner bc-spinner-inline" /> Confirming…</>
          ) : (
            <>Confirm booking <FaArrowRight /></>
          )}
        </button>
      </div>
    </motion.div>
  );
}

function ConfirmationStep({ form, confirmation, onReset }) {
  const start = confirmation?.scheduledAt ? new Date(confirmation.scheduledAt) : null;
  const tz = form.timezone || "UTC";
  const when = start ? formatInTimezone(start, tz, {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  }) : "";
  const time = start ? formatInTimezone(start, tz, { hour: "numeric", minute: "2-digit" }) : "";
  const callTypeLabel = form.callType === "google_meet" ? "Google Meet" : "WhatsApp call";
  const languageLabel = form.language === "hausa" ? "Hausa" : "English";

  return (
    <motion.div {...fadeUp} className="bc-step-content bc-confirmation">
      <motion.div
        initial={{ scale: 0.6, rotate: -8 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 14 }}
        className="bc-confirm-check"
      >
        <FaCheck size={32} />
      </motion.div>

      <h2>You're booked. 🎉</h2>
      <p className="bc-confirm-lede">
        We've sent a confirmation to <strong>{form.email}</strong>. Check your inbox (and your spam folder, just in case).
      </p>

      <div className="bc-confirm-card">
        <div className="bc-confirm-row">
          <span className="bc-confirm-label">Language</span>
          <span className="bc-confirm-value">{languageLabel}</span>
        </div>
        <div className="bc-confirm-row">
          <span className="bc-confirm-label">Services</span>
          <span className="bc-confirm-value">
            {(form.services || []).map((s) => {
              if (s === "other") return form.customService || "Other";
              return services.find((svc) => svc.id === s)?.title || s;
            }).join(", ") || "—"}
          </span>
        </div>
        <div className="bc-confirm-row">
          <span className="bc-confirm-label">When</span>
          <span className="bc-confirm-value">{when} · {time}</span>
        </div>
        <div className="bc-confirm-row">
          <span className="bc-confirm-label">Duration</span>
          <span className="bc-confirm-value">{form.slotDurationMinutes} minutes</span>
        </div>
        <div className="bc-confirm-row">
          <span className="bc-confirm-label">Call type</span>
          <span className="bc-confirm-value">{callTypeLabel}</span>
        </div>
        <div className="bc-confirm-row">
          <span className="bc-confirm-label">Reference</span>
          <span className="bc-confirm-value"><code>{confirmation?.bookingId || "—"}</code></span>
        </div>
      </div>

      <p className="bc-confirm-fine">
        We'll review everything you sent and come prepared. Need to reschedule?
        Just reply to the confirmation email.
      </p>

      <div className="bc-confirm-actions">
        <button onClick={onReset} className="btn btn-ghost">Book another time</button>
        <a href="/" className="btn btn-secondary">Back to home</a>
      </div>
    </motion.div>
  );
}

function groupSlotsByDay(slots, tz) {
  const groups = {};
  for (const s of slots) {
    const d = new Date(s.startUtc);
    const dayKey = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: tz }).format(d);
    const dayLabel = new Intl.DateTimeFormat("en-US", {
      weekday: "short", day: "numeric", month: "short", timeZone: tz
    }).format(d);
    if (!groups[dayKey]) groups[dayKey] = { label: dayLabel, slots: [] };
    const timeLabel = new Intl.DateTimeFormat("en-US", {
      hour: "numeric", minute: "2-digit", timeZone: tz
    }).format(d);
    groups[dayKey].slots.push({ ...s, label: timeLabel });
  }
  return Object.entries(groups)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, g]) => g);
}

function getFlagEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2) return "";
  const codePoints = countryCode.toUpperCase().split("").map((c) => 127397 + c.charCodeAt(0));
  try {
    return String.fromCodePoint(...codePoints);
  } catch {
    return "";
  }
}

export default function BookCall() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(() => loadDraft() || initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const userTimezone = useUserTimezone();

  useEffect(() => {
    if (confirmation) return;
    if (form && step > 1) saveDraft(form, step);
  }, [form, step, confirmation]);

  useEffect(() => {
    if (userTimezone && !form.timezone) {
      setForm((f) => ({ ...f, timezone: userTimezone }));
    }
  }, [userTimezone]);

  const goTo = (n) => {
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStep(n);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");
    setUploadStatus("");
    try {
      const clientBookingId = (typeof crypto !== "undefined" && crypto.randomUUID)
        ? crypto.randomUUID()
        : `b_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

      const fn = httpsCallable(functions, "createBooking");
      const payload = {
        clientBookingId,
        slotStartUtc: form.slotStartUtc,
        language: form.language || "english",
        services: form.services || [],
        customService: form.services.includes("other") ? form.customService : "",
        name: form.name,
        email: form.email,
        whatsapp: form.whatsapp,
        countryCode: form.countryCode,
        countryName: form.countryName,
        countryDialCode: form.countryDialCode,
        businessName: form.businessName,
        businessDescription: form.businessDescription,
        projectDescription: form.projectDescription,
        currentSoftware: form.currentSoftware,
        problem: form.problem,
        additionalInfo: form.additionalInfo,
        callType: form.callType,
        timezone: form.timezone || userTimezone || "UTC"
      };
      setUploadStatus("Confirming booking…");
      const res = await fn(payload);
      setConfirmation(res.data);
      setForm((f) => ({ ...f, ...payload, _finalStep: true }));
      clearDraft();
      setStep(7);
    } catch (err) {
      console.error("createBooking error:", err);
      const msg = err?.message || err?.details || "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setIsSubmitting(false);
      setUploadStatus("");
    }
  };

  const reset = () => {
    setForm({ ...initialForm, timezone: userTimezone || "" });
    setConfirmation(null);
    setStep(1);
    clearDraft();
  };

  return (
    <section className="bc-page">
      <div className="bc-bg">
        <div className="bc-bg-orb bc-bg-orb-1" />
        <div className="bc-bg-orb bc-bg-orb-2" />
        <div className="bc-bg-orb bc-bg-orb-3" />
        <div className="bc-bg-grid" />
      </div>

      <div className="container">
        <div className="bc-shell">
          <div className="bc-back-home-wrap">
            <button type="button" className="bc-back-home" onClick={() => navigate("/")}>
              <FaArrowLeft size={12} /> Back to home
            </button>
          </div>
          <div className="bc-shell-inner">
            {step > 1 && step < 7 && <StepIndicator step={step - 1} />}

            <AnimatePresence mode="wait">
              {step === 1 && (
                <WelcomeStep
                  key="welcome"
                  onStart={() => goTo(2)}
                />
              )}
              {step === 2 && (
                <LanguageStep
                  key="language"
                  form={form}
                  setForm={setForm}
                  onNext={() => goTo(3)}
                  onBack={() => goTo(1)}
                />
              )}
              {step === 3 && (
                <ServiceStep
                  key="service"
                  form={form}
                  setForm={setForm}
                  onNext={() => goTo(4)}
                  onBack={() => goTo(2)}
                />
              )}
              {step === 4 && (
                <BusinessStep
                  key="business"
                  form={form}
                  setForm={setForm}
                  onNext={() => goTo(5)}
                  onBack={() => goTo(3)}
                />
              )}
              {step === 5 && (
                <ProjectStep
                  key="project"
                  form={form}
                  setForm={setForm}
                  onNext={() => goTo(6)}
                  onBack={() => goTo(4)}
                />
              )}
              {step === 6 && !confirmation && (
                <ScheduleStep
                  key="schedule"
                  form={form}
                  setForm={setForm}
                  onBack={() => goTo(5)}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  uploadStatus={uploadStatus}
                  error={error}
                />
              )}
              {step === 7 && confirmation && (
                <ConfirmationStep
                  key="confirm"
                  form={form}
                  confirmation={confirmation}
                  onReset={reset}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
