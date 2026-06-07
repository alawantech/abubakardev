import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaWhatsapp,
  FaCheck,
  FaCheckCircle,
  FaTimes,
  FaSearch,
  FaExternalLinkAlt,
  FaUserTie,
  FaBuilding,
  FaLightbulb,
  FaTools,
  FaExclamationTriangle,
  FaEnvelope,
  FaPhone,
  FaCopy,
  FaLink,
  FaSync,
  FaLanguage
} from "react-icons/fa";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

const STATUS_LABELS = {
  all: "All",
  upcoming: "Upcoming",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
  no_show: "No-show"
};

const STATUS_FILTERS = ["upcoming", "confirmed", "completed", "cancelled", "no_show", "all"];

const LANGUAGE_LABELS = {
  english: "English",
  hausa: "Hausa"
};

function formatDateTime(iso, tz) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    const date = new Intl.DateTimeFormat("en-US", {
      weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: tz || "UTC"
    }).format(d);
    const time = new Intl.DateTimeFormat("en-US", {
      hour: "numeric", minute: "2-digit", timeZone: tz || "UTC", timeZoneName: "short"
    }).format(d);
    return `${date} · ${time}`;
  } catch {
    return new Date(iso).toLocaleString();
  }
}

function isUpcoming(iso) {
  return new Date(iso).getTime() > Date.now();
}

function buildGoogleCalendarUrl(booking) {
  const start = booking.startUtc.replace(/[-:]|\.\d{3}/g, "");
  const end = booking.endUtc.replace(/[-:]|\.\d{3}/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `ZedroTech Discovery Call — ${booking.name}`,
    dates: `${start}/${end}`,
    details:
`Discovery call with ${booking.name} (${booking.email})
Business: ${booking.businessName || "—"}
What they want: ${booking.projectDescription || "—"}
${booking.currentSoftware ? `Current tools: ${booking.currentSoftware}\n` : ""}${booking.problem ? `Challenges: ${booking.problem}\n` : ""}${booking.additionalInfo ? `Notes: ${booking.additionalInfo}\n` : ""}
(After saving, click "Add Google Meet video conferencing" to generate a Meet link, then paste it back into the dashboard.)`,
    location: booking.callType === "google_meet" ? "Google Meet (link to be generated)" : `WhatsApp: ${booking.countryDialCode || ""}${booking.whatsapp || ""}`
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("upcoming");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [meetLinkDraft, setMeetLinkDraft] = useState({});
  const [savingMeet, setSavingMeet] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [adminTimezone] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");

  const load = async () => {
    setLoading(true);
    try {
      const fn = httpsCallable(functions, "adminListBookings");
      const res = await fn({});
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("adminListBookings error:", err);
      setFeedback({ type: "error", message: err?.message || "Failed to load bookings" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    let list = [...bookings];
    const now = Date.now();
    if (statusFilter === "upcoming") {
      list = list.filter((b) => b.startUtc && new Date(b.startUtc).getTime() > now && b.status !== "cancelled" && b.status !== "completed");
    } else if (statusFilter !== "all") {
      list = list.filter((b) => b.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((b) =>
        (b.name || "").toLowerCase().includes(q) ||
        (b.email || "").toLowerCase().includes(q) ||
        (b.businessName || "").toLowerCase().includes(q) ||
        (b.serviceTitle || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [bookings, statusFilter, search]);

  const counts = useMemo(() => {
    const now = Date.now();
    const c = { all: bookings.length, upcoming: 0, confirmed: 0, completed: 0, cancelled: 0, no_show: 0 };
    for (const b of bookings) {
      if (b.status && c[b.status] !== undefined) c[b.status]++;
      if (b.startUtc && new Date(b.startUtc).getTime() > now && b.status !== "cancelled" && b.status !== "completed") c.upcoming++;
    }
    return c;
  }, [bookings]);

  const setStatus = async (bookingId, status) => {
    try {
      const fn = httpsCallable(functions, "adminSetBookingStatus");
      await fn({ bookingId, status });
      setFeedback({ type: "success", message: `Marked as ${status.replace("_", " ")}` });
      setTimeout(() => setFeedback(null), 2500);
      await load();
    } catch (err) {
      setFeedback({ type: "error", message: err?.message || "Failed to update status" });
    }
  };

  const saveMeetLink = async (bookingId) => {
    const link = (meetLinkDraft[bookingId] || "").trim();
    if (!link) return;
    setSavingMeet(bookingId);
    try {
      const fn = httpsCallable(functions, "adminAddMeetLink");
      await fn({ bookingId, meetLink: link });
      setFeedback({ type: "success", message: "Meet link saved & email sent to user" });
      setMeetLinkDraft((d) => ({ ...d, [bookingId]: "" }));
      setExpanded(null);
      setTimeout(() => setFeedback(null), 3000);
      await load();
    } catch (err) {
      setFeedback({ type: "error", message: err?.message || "Failed to save Meet link" });
    } finally {
      setSavingMeet(null);
    }
  };

  const copyText = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setFeedback({ type: "success", message: "Copied" });
      setTimeout(() => setFeedback(null), 1500);
    } catch {
      setFeedback({ type: "error", message: "Couldn't copy — please copy manually" });
    }
  };

  return (
    <div className="bookings-management">
      <div className="bm-header">
        <div>
          <h2>Discovery call bookings</h2>
          <p>Self-service bookings from the website. Times shown in your local timezone: <strong>{adminTimezone.replace(/_/g, " ")}</strong></p>
        </div>
        <button onClick={load} className="bm-refresh" disabled={loading}>
          <FaSync className={loading ? "spin" : ""} /> Refresh
        </button>
      </div>

      <div className="bm-filters">
        <div className="bm-filter-tabs">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              className={`bm-tab ${statusFilter === f ? "active" : ""}`}
              onClick={() => setStatusFilter(f)}
            >
              {STATUS_LABELS[f]} {counts[f] > 0 && <span className="bm-tab-count">{counts[f]}</span>}
            </button>
          ))}
        </div>
        <div className="bm-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search name, email, business, service…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`bm-feedback bm-${feedback.type}`}
          >
            {feedback.type === "success" ? <FaCheck /> : <FaExclamationTriangle />}
            <span>{feedback.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="bm-loading">
          <div className="bm-spinner" /> Loading bookings…
        </div>
      ) : filtered.length === 0 ? (
        <div className="bm-empty">
          <FaCalendarAlt size={28} />
          <h3>No bookings yet</h3>
          <p>When someone books a discovery call from the website, it will appear here.</p>
        </div>
      ) : (
        <div className="bm-list">
          {filtered.map((b) => {
            const expandedNow = expanded === b.id;
            const upcoming = isUpcoming(b.startUtc);
            return (
              <motion.div
                key={b.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bm-card ${expandedNow ? "expanded" : ""} ${b.status}`}
              >
                <div className="bm-card-top" onClick={() => setExpanded(expandedNow ? null : b.id)}>
                  <div className="bm-card-when">
                    <div className="bm-card-date">
                      <FaCalendarAlt size={11} />
                      <span>{formatDateTime(b.startUtc, adminTimezone)}</span>
                    </div>
                    <div className="bm-card-when-sub">
                      User's tz: {b.timezone || "—"}
                      {!upcoming && b.status === "confirmed" && <span className="bm-pill bm-pill-amber">Awaiting</span>}
                    </div>
                  </div>

                  <div className="bm-card-who">
                    <div className="bm-card-name"><FaUserTie size={11} /> {b.name}</div>
                    <div className="bm-card-business"><FaBuilding size={11} /> {b.businessName || "—"}</div>
                  </div>

                  <div className="bm-card-meta">
                    <div className={`bm-calltype ${b.callType}`}>
                      {b.callType === "google_meet" ? <FaVideo size={11} /> : <FaWhatsapp size={11} />}
                      {b.callType === "google_meet" ? "Google Meet" : "WhatsApp"}
                    </div>
                    <div className="bm-service">{b.serviceTitle}{b.customService ? ` · ${b.customService}` : ""}</div>
                    {b.language && b.language !== "english" && (
                      <div className="bm-language-pill">
                        <FaLanguage size={9} /> {LANGUAGE_LABELS[b.language] || b.language}
                      </div>
                    )}
                  </div>

                  <div className="bm-card-status">
                    <span className={`bm-status bm-status-${b.status}`}>{b.status.replace("_", " ")}</span>
                  </div>

                  <button className="bm-expand-btn" aria-label={expandedNow ? "Collapse" : "Expand"}>
                    {expandedNow ? <FaTimes /> : <span className="bm-chev">▾</span>}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedNow && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bm-card-body"
                    >
                      <div className="bm-grid">
                        <Field icon={<FaUserTie />} label="Name" value={b.name} />
                        <Field icon={<FaEnvelope />} label="Email" value={
                          <a href={`mailto:${b.email}`}>{b.email}</a>
                        } />
                        <Field icon={<FaWhatsapp />} label="WhatsApp" value={
                          b.whatsapp
                            ? <a href={`https://wa.me/${(b.countryDialCode || "").replace(/[^\d]/g, "")}${b.whatsapp}`} target="_blank" rel="noopener noreferrer">
                                {b.countryDialCode} {b.whatsapp} <FaExternalLinkAlt size={9} />
                              </a>
                            : <em>not provided</em>
                        } />
                        <Field icon={<FaLanguage />} label="Call language" value={LANGUAGE_LABELS[b.language] || b.language || "—"} />
                        <Field icon={<FaBuilding />} label="Business" value={b.businessName || "—"} />
                        <Field icon={<FaLightbulb />} label="What they want" value={b.projectDescription || "—"} fullWidth />
                        <Field icon={<FaBuilding />} label="Business description" value={b.businessDescription || "—"} fullWidth />
                        {b.currentSoftware && <Field icon={<FaTools />} label="Current software" value={b.currentSoftware} fullWidth />}
                        {b.problem && <Field icon={<FaExclamationTriangle />} label="Challenge" value={b.problem} fullWidth />}
                        {b.additionalInfo && <Field icon={<FaLightbulb />} label="Notes" value={b.additionalInfo} fullWidth />}
                        <Field icon={<FaPhone />} label="Timezone" value={`${b.timezone || "—"} (${b.countryName || ""})`} />
                        <Field icon={<FaClock />} label="Duration" value={`${b.durationMinutes} minutes`} />
                      </div>

                      <div className="bm-actions">
                        <a
                          href={buildGoogleCalendarUrl(b)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bm-btn bm-btn-secondary"
                        >
                          <FaCalendarAlt /> Create Google Calendar event
                        </a>

                        {b.callType === "google_meet" ? (
                          <div className="bm-meet-block">
                            {b.meetLink ? (
                              <div className="bm-meet-current">
                                <FaCheckCircle className="bm-meet-check" />
                                <div className="bm-meet-link-row">
                                  <code className="bm-meet-link">{b.meetLink}</code>
                                  <button onClick={() => copyText(b.meetLink, b.id)} className="bm-mini-btn" title="Copy"><FaCopy /></button>
                                  <a href={b.meetLink} target="_blank" rel="noopener noreferrer" className="bm-mini-btn" title="Open"><FaExternalLinkAlt /></a>
                                </div>
                                <div className="bm-meet-helper">Email sent to user. To resend, update the link above.</div>
                                <div className="bm-meet-update">
                                  <input
                                    type="url"
                                    placeholder="Update Meet link…"
                                    value={meetLinkDraft[b.id] || ""}
                                    onChange={(e) => setMeetLinkDraft((d) => ({ ...d, [b.id]: e.target.value }))}
                                  />
                                  <button
                                    onClick={() => saveMeetLink(b.id)}
                                    disabled={!meetLinkDraft[b.id] || savingMeet === b.id}
                                    className="bm-btn bm-btn-primary"
                                  >
                                    {savingMeet === b.id ? <><div className="bm-spinner bm-spinner-sm" /> Saving…</> : <><FaLink /> Update & resend</>}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="bm-meet-add">
                                <div className="bm-meet-helper">
                                  <strong>How to add the Meet link:</strong>
                                  <ol>
                                    <li>Click "Create Google Calendar event" above</li>
                                    <li>In the new tab, click "Add Google Meet video conferencing"</li>
                                    <li>Save the event, then copy the Meet URL</li>
                                    <li>Paste it below and click "Save & send"</li>
                                  </ol>
                                </div>
                                <div className="bm-meet-input-row">
                                  <FaLink />
                                  <input
                                    type="url"
                                    placeholder="https://meet.google.com/abc-defg-hij"
                                    value={meetLinkDraft[b.id] || ""}
                                    onChange={(e) => setMeetLinkDraft((d) => ({ ...d, [b.id]: e.target.value }))}
                                  />
                                  <button
                                    onClick={() => saveMeetLink(b.id)}
                                    disabled={!meetLinkDraft[b.id] || savingMeet === b.id}
                                    className="bm-btn bm-btn-primary"
                                  >
                                    {savingMeet === b.id ? "Saving…" : "Save & send"}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <a
                            href={`https://wa.me/${(b.countryDialCode || "").replace(/[^\d]/g, "")}${b.whatsapp || ""}?text=${encodeURIComponent(`Hi ${b.name.split(" ")[0]}, this is ZedroTech — calling for our scheduled discovery call. Can you take the call now?`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bm-btn bm-btn-whatsapp"
                          >
                            <FaWhatsapp /> Open WhatsApp
                          </a>
                        )}

                        <div className="bm-status-actions">
                          <span className="bm-status-label">Mark as:</span>
                          {["confirmed", "completed", "no_show", "cancelled"].map((s) => (
                            <button
                              key={s}
                              onClick={() => setStatus(b.id, s)}
                              disabled={b.status === s}
                              className={`bm-mini-btn ${b.status === s ? "active" : ""}`}
                            >
                              {s.replace("_", " ")}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bm-card-foot">
                        <span>Booking ID: <code>{b.id}</code></span>
                        <span>Created: {b.createdAt ? new Date(b.createdAt).toLocaleString() : "—"}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Field({ icon, label, value, fullWidth }) {
  return (
    <div className={`bm-field ${fullWidth ? "full" : ""}`}>
      <div className="bm-field-label">{icon} {label}</div>
      <div className="bm-field-value">{value}</div>
    </div>
  );
}

export default BookingsManagement;
