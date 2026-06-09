import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy,
  deleteDoc
} from "firebase/firestore";
import { db } from "../firebase";
import {
  FaSearch,
  FaCheckCircle,
  FaClock,
  FaArchive,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaBuilding,
  FaGlobe,
  FaTrash,
  FaExternalLinkAlt,
  FaSync,
  FaCog,
  FaUser
} from "react-icons/fa";
import "./PricingInquiriesManagement.css";

const STATUS_LABELS = { new: "New", contacted: "Contacted", closed: "Closed" };
const STATUS_FILTERS = ["all", "new", "contacted", "closed"];

function formatDate(ts) {
  if (!ts) return "—";
  try {
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(d);
  } catch {
    return "—";
  }
}

const PricingInquiriesManagement = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "pricing_inquiries"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setInquiries(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error("Error fetching pricing inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "pricing_inquiries", id), { status });
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    try {
      await deleteDoc(doc(db, "pricing_inquiries", id));
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Error deleting inquiry:", err);
    }
  };

  const filtered = inquiries.filter((i) => {
    if (filter !== "all" && i.status !== filter) return false;
    if (search) {
      const s = search.toLowerCase();
      return (
        (i.fullName || "").toLowerCase().includes(s) ||
        (i.email || "").toLowerCase().includes(s) ||
        (i.businessName || "").toLowerCase().includes(s) ||
        (i.serviceName || "").toLowerCase().includes(s) ||
        (i.tierName || "").toLowerCase().includes(s)
      );
    }
    return true;
  });

  const statusCounts = { new: 0, contacted: 0, closed: 0 };
  inquiries.forEach((i) => {
    if (statusCounts[i.status] !== undefined) statusCounts[i.status]++;
  });

  return (
    <div className="pim">
      <div className="pim-header">
        <h2>Pricing Inquiries</h2>
        <button onClick={fetchInquiries} className="pim-refresh" title="Refresh">
          <FaSync />
        </button>
      </div>

      <div className="pim-stats">
        <div className="pim-stat pim-stat-new">
          <FaClock /> <span>{statusCounts.new}</span> New
        </div>
        <div className="pim-stat pim-stat-contacted">
          <FaCheckCircle /> <span>{statusCounts.contacted}</span> Contacted
        </div>
        <div className="pim-stat pim-stat-closed">
          <FaArchive /> <span>{statusCounts.closed}</span> Closed
        </div>
      </div>

      <div className="pim-controls">
        <div className="pim-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by name, email, business…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="pim-filters">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              className={`pim-filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : STATUS_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="pim-loading">Loading inquiries…</div>
      ) : filtered.length === 0 ? (
        <div className="pim-empty">
          {inquiries.length === 0
            ? "No pricing inquiries yet."
            : "No inquiries match your search."}
        </div>
      ) : (
        <div className="pim-list">
          {filtered.map((inquiry) => (
            <div
              key={inquiry.id}
              className={`pim-card status-${inquiry.status || "new"} ${expandedId === inquiry.id ? "expanded" : ""}`}
            >
              <div
                className="pim-card-header"
                onClick={() => setExpandedId(expandedId === inquiry.id ? null : inquiry.id)}
              >
                <div className="pim-card-main">
                  <div className="pim-card-name">
                    <FaUser className="pim-icon" />
                    <strong>{inquiry.fullName}</strong>
                  </div>
                  <div className="pim-card-meta">
                    <span className="pim-tier">{inquiry.tierName}</span>
                    <span className="pim-service">{inquiry.serviceName}</span>
                    {inquiry.price != null && (
                      <span className="pim-price">
                        {inquiry.currency === "NGN" ? "₦" : "$"}
                        {Number(inquiry.price).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="pim-card-right">
                  <span className={`pim-status-badge status-${inquiry.status || "new"}`}>
                    {STATUS_LABELS[inquiry.status] || "New"}
                  </span>
                  <span className="pim-date">{formatDate(inquiry.createdAt)}</span>
                </div>
              </div>

              {expandedId === inquiry.id && (
                <div className="pim-card-body">
                  <div className="pim-detail-grid">
                    <div className="pim-detail">
                      <FaEnvelope className="pim-detail-icon" />
                      <div>
                        <span className="pim-detail-label">Email</span>
                        <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>
                      </div>
                    </div>
                    <div className="pim-detail">
                      <FaPhone className="pim-detail-icon" />
                      <div>
                        <span className="pim-detail-label">Phone</span>
                        <span>{inquiry.phone || "N/A"}</span>
                      </div>
                    </div>
                    {inquiry.whatsapp && (
                      <div className="pim-detail">
                        <FaWhatsapp className="pim-detail-icon" />
                        <div>
                          <span className="pim-detail-label">WhatsApp</span>
                          <span>{inquiry.whatsapp}</span>
                        </div>
                      </div>
                    )}
                    <div className="pim-detail">
                      <FaBuilding className="pim-detail-icon" />
                      <div>
                        <span className="pim-detail-label">Business</span>
                        <span>{inquiry.businessName || "N/A"}</span>
                      </div>
                    </div>
                    <div className="pim-detail">
                      <FaGlobe className="pim-detail-icon" />
                      <div>
                        <span className="pim-detail-label">Country</span>
                        <span>{inquiry.country || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  {inquiry.businessDescription && (
                    <div className="pim-section">
                      <h4>Business Description</h4>
                      <p>{inquiry.businessDescription}</p>
                    </div>
                  )}

                  {inquiry.usesSoftware && (
                    <div className="pim-section">
                      <h4><FaCog /> Current Software</h4>
                      <p>
                        <strong>{inquiry.softwareName || "Unnamed tool"}</strong>
                        {inquiry.softwareDescription && ` — ${inquiry.softwareDescription}`}
                      </p>
                    </div>
                  )}

                  {inquiry.featuresNeeded && (
                    <div className="pim-section">
                      <h4>Features Desired</h4>
                      <p>{inquiry.featuresNeeded}</p>
                    </div>
                  )}

                  <div className="pim-actions">
                    <div className="pim-status-buttons">
                      <button
                        className={`pim-status-btn new ${(inquiry.status || "new") === "new" ? "active" : ""}`}
                        onClick={() => updateStatus(inquiry.id, "new")}
                      >
                        New
                      </button>
                      <button
                        className={`pim-status-btn contacted ${inquiry.status === "contacted" ? "active" : ""}`}
                        onClick={() => updateStatus(inquiry.id, "contacted")}
                      >
                        Contacted
                      </button>
                      <button
                        className={`pim-status-btn closed ${inquiry.status === "closed" ? "active" : ""}`}
                        onClick={() => updateStatus(inquiry.id, "closed")}
                      >
                        Closed
                      </button>
                    </div>
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="pim-action-btn"
                      title="Send email"
                    >
                      <FaEnvelope />
                    </a>
                    <button
                      className="pim-action-btn pim-delete"
                      onClick={() => deleteInquiry(inquiry.id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PricingInquiriesManagement;
