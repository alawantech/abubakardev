const functions = require("firebase-functions/v2");
const admin = require("firebase-admin");
const axios = require("axios");

const MAILERSEND_URL = "https://api.mailersend.com/v1/email";
const MAILERSEND_FROM = { email: "notifications@zedrotech.com", name: "ZedroTech" };
const ADMIN_RECIPIENTS = [
  { email: "info@zedrotech.com", name: "ZedroTech Admin" },
  { email: "abubakarlawan671@gmail.com", name: "Lawan Abubakar" }
];

const SLOT_DURATION_MINUTES = 30;
const BUFFER_MINUTES = 120;
const MIN_LEAD_MINUTES = 7 * 60;
const SLOT_STEP_MINUTES = 30;

function escapeHtml(s) {
  if (s === null || s === undefined) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatSlotForEmail(isoUtc, tz) {
  try {
    const date = new Date(isoUtc);
    const opts = { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: tz || "UTC" };
    const dateStr = new Intl.DateTimeFormat("en-US", opts).format(date);
    const timeStr = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz || "UTC",
      timeZoneName: "short"
    }).format(date);
    return { dateStr, timeStr };
  } catch {
    const d = new Date(isoUtc);
    return { dateStr: d.toUTCString(), timeStr: d.toISOString().substring(11, 16) + " UTC" };
  }
}

async function sendMailersendEmail({ to, subject, html, text, replyTo }) {
  const token = process.env.MAILERSEND_API_TOKEN;
  if (!token) {
    console.warn("MAILERSEND_API_TOKEN not configured; skipping email send");
    return { skipped: true };
  }
  const payload = {
    from: MAILERSEND_FROM,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    text
  };
  if (replyTo) payload.reply_to = replyTo;
  try {
    await axios.post(MAILERSEND_URL, payload, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      timeout: 15000
    });
    return { sent: true };
  } catch (err) {
    console.error("MailerSend error:", err.response?.data || err.message);
    return { sent: false, error: err.message };
  }
}

function buildUserConfirmationEmail({ booking, serviceTitle, meetLink }) {
  const { dateStr, timeStr } = formatSlotForEmail(booking.slotStartUtc, booking.timezone);
  const callTypeLabel = booking.callType === "google_meet" ? "Google Meet video call" : "WhatsApp voice call";

  const callSection = booking.callType === "google_meet"
    ? meetLink
      ? `<p style="margin:12px 0;padding:14px;background:#f5f3ff;border-left:4px solid #6366f1;border-radius:6px;">
           <strong>Your Google Meet link is ready:</strong><br/>
           <a href="${escapeHtml(meetLink)}" style="color:#6366f1;font-weight:600;word-break:break-all;">${escapeHtml(meetLink)}</a><br/>
           <span style="font-size:12px;color:#6b7280;">Join a few minutes before the call to test your camera and mic.</span>
         </p>`
      : `<p style="margin:12px 0;padding:14px;background:#f5f3ff;border-left:4px solid #6366f1;border-radius:6px;">
           <strong>Google Meet link:</strong> We'll send your unique Meet link in a follow-up email within 24 hours of the call.
         </p>`
    : `<p style="margin:12px 0;padding:14px;background:#ecfdf5;border-left:4px solid #10b981;border-radius:6px;">
         <strong>WhatsApp call:</strong> We'll call you on
         <a href="https://wa.me/${(booking.countryDialCode || "").replace(/[^\d]/g, "")}${(booking.whatsapp || "").replace(/[^\d]/g, "")}" style="color:#10b981;font-weight:600;">
           ${escapeHtml((booking.countryDialCode || "") + " " + (booking.whatsapp || ""))}
         </a> at the scheduled time. Make sure WhatsApp is installed and that your number is online.
       </p>`;

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#ffffff;color:#1f2937;">
      <div style="text-align:center;padding:20px 0;border-bottom:1px solid #e5e7eb;">
        <h1 style="margin:0;font-size:24px;background:linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899);-webkit-background-clip:text;background-clip:text;color:transparent;">
          You're booked. 🎉
        </h1>
        <p style="margin:6px 0 0;color:#6b7280;font-size:14px;">Your free discovery call is confirmed.</p>
      </div>

      <div style="padding:24px 0;">
        <p>Hi ${escapeHtml(booking.name || "there")},</p>
        <p>Thanks for taking 2 minutes to fill out the discovery form. Your call is locked in — here's the plan:</p>

        <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:20px 0;background:#fafafa;border-radius:8px;overflow:hidden;">
          <tr><td style="padding:12px 16px;color:#6b7280;font-size:13px;width:140px;border-bottom:1px solid #e5e7eb;">Service</td>
              <td style="padding:12px 16px;font-weight:600;border-bottom:1px solid #e5e7eb;">${escapeHtml(serviceTitle)}${booking.customService ? ` (${escapeHtml(booking.customService)})` : ""}</td></tr>
          <tr><td style="padding:12px 16px;color:#6b7280;font-size:13px;border-bottom:1px solid #e5e7eb;">Date</td>
              <td style="padding:12px 16px;font-weight:600;border-bottom:1px solid #e5e7eb;">${escapeHtml(dateStr)}</td></tr>
          <tr><td style="padding:12px 16px;color:#6b7280;font-size:13px;border-bottom:1px solid #e5e7eb;">Time</td>
              <td style="padding:12px 16px;font-weight:600;border-bottom:1px solid #e5e7eb;">${escapeHtml(timeStr)}</td></tr>
          <tr><td style="padding:12px 16px;color:#6b7280;font-size:13px;border-bottom:1px solid #e5e7eb;">Duration</td>
              <td style="padding:12px 16px;font-weight:600;border-bottom:1px solid #e5e7eb;">${SLOT_DURATION_MINUTES} minutes</td></tr>
          <tr><td style="padding:12px 16px;color:#6b7280;font-size:13px;">Call type</td>
              <td style="padding:12px 16px;font-weight:600;">${escapeHtml(callTypeLabel)}</td></tr>
        </table>

        ${callSection}

        <h3 style="margin:24px 0 8px;font-size:15px;color:#374151;">What happens on the call</h3>
        <ul style="margin:8px 0;padding-left:20px;color:#4b5563;line-height:1.7;">
          <li>You walk us through your business and what you're trying to solve.</li>
          <li>We come back with a concrete plan — what we'd build, how long it would take, and what it would cost.</li>
          <li>No pitch. No pressure. If we're not the right fit, we'll tell you on the spot.</li>
        </ul>

        <p style="margin-top:24px;color:#6b7280;font-size:13px;">
          Need to reschedule? Just reply to this email at least 4 hours before the call.
        </p>
      </div>

      <div style="text-align:center;padding:20px 0;border-top:1px solid #e5e7eb;color:#9ca3af;font-size:12px;">
        Booking reference: <code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;">${escapeHtml(booking.id)}</code><br/>
        © ${new Date().getFullYear()} ZedroTech
      </div>
    </div>
  `;

  const text = `You're booked!\n\nService: ${serviceTitle}${booking.customService ? ` (${booking.customService})` : ""}\nDate: ${dateStr}\nTime: ${timeStr}\nDuration: ${SLOT_DURATION_MINUTES} minutes\nCall type: ${callTypeLabel}\n${booking.callType === "google_meet" && meetLink ? `Meet link: ${meetLink}\n` : ""}${booking.callType === "whatsapp" ? `We'll call you on: ${booking.countryDialCode || ""} ${booking.whatsapp || ""}\n` : ""}\nBooking reference: ${booking.id}\n\nNeed to reschedule? Reply to this email at least 4 hours before the call.`;

  return { html, text };
}

function buildAdminNotificationEmail({ booking, serviceTitle }) {
  const { dateStr, timeStr } = formatSlotForEmail(booking.slotStartUtc, booking.timezone);
  const fields = [
    ["Scheduled", `${dateStr} · ${timeStr} (user timezone: ${booking.timezone || "UTC"})`],
    ["Duration", `${SLOT_DURATION_MINUTES} min`],
    ["Call type", booking.callType === "google_meet" ? "Google Meet" : "WhatsApp voice call"],
    ["Name", booking.name],
    ["Email", booking.email],
    ["WhatsApp", `${booking.countryDialCode || ""} ${booking.whatsapp || "(none)"}`],
    ["Country", `${booking.countryName || ""} (${booking.countryCode || ""})`],
    ["Business", booking.businessName || "(not provided)"],
    ["Business description", booking.businessDescription || "(not provided)"],
    ["Project description", booking.projectDescription || "(not provided)"],
    ["Current software", booking.currentSoftware || "(not provided)"],
    ["Problem / challenge", booking.problem || "(not provided)"],
    ["Additional info", booking.additionalInfo || "(not provided)"],
    ["Booking ID", booking.id]
  ];

  const rows = fields.map(([k, v]) =>
    `<tr><td style="padding:8px 12px;color:#6b7280;font-size:13px;width:160px;vertical-align:top;background:#fafafa;">${escapeHtml(k)}</td>` +
    `<td style="padding:8px 12px;font-size:14px;vertical-align:top;white-space:pre-wrap;">${escapeHtml(v)}</td></tr>`
  ).join("");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:700px;margin:0 auto;padding:24px;background:#ffffff;color:#1f2937;">
      <h2 style="margin:0 0 8px;font-size:22px;color:#111827;">📅 New discovery call booked</h2>
      <p style="margin:0 0 4px;color:#374151;font-size:16px;">
        <strong>${escapeHtml(booking.name)}</strong> — ${escapeHtml(serviceTitle)}${booking.customService ? ` (${escapeHtml(booking.customService)})` : ""}
      </p>
      <p style="margin:0 0 20px;color:#6366f1;font-size:15px;font-weight:600;">
        ${escapeHtml(dateStr)} · ${escapeHtml(timeStr)} (${escapeHtml(booking.timezone || "UTC")})
      </p>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">${rows}</table>
      <p style="margin:20px 0 0;color:#6b7280;font-size:12px;">Open the admin dashboard to manage slots & bookings.</p>
    </div>
  `;

  const text = `New discovery call booked\n\n${booking.name} — ${serviceTitle}\n${dateStr} · ${timeStr} (${booking.timezone || "UTC"})\n\n` +
    fields.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nBooking ID: ${booking.id}`;

  return { html, text };
}

function buildMeetLinkEmail({ booking, meetLink, serviceTitle }) {
  const { dateStr, timeStr } = formatSlotForEmail(booking.slotStartUtc, booking.timezone);
  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#ffffff;color:#1f2937;">
      <h2 style="margin:0 0 16px;font-size:22px;color:#111827;">Your Google Meet link is ready 🎥</h2>
      <p>Hi ${escapeHtml(booking.name)},</p>
      <p>Your discovery call is coming up on <strong>${escapeHtml(dateStr)}</strong> at <strong>${escapeHtml(timeStr)}</strong>. Here's your Meet link:</p>
      <p style="margin:24px 0;text-align:center;">
        <a href="${escapeHtml(meetLink)}" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;padding:14px 32px;border-radius:999px;text-decoration:none;font-weight:600;">
          Join the Google Meet
        </a>
      </p>
      <p style="font-size:13px;color:#6b7280;">Or copy this link: <a href="${escapeHtml(meetLink)}" style="color:#6366f1;word-break:break-all;">${escapeHtml(meetLink)}</a></p>
      <p style="margin-top:24px;font-size:13px;color:#6b7280;">See you on the call. — ZedroTech</p>
    </div>
  `;
  const text = `Your Google Meet link is ready!\n\nYour discovery call is on ${dateStr} at ${timeStr}.\n\nMeet link: ${meetLink}\n\nSee you on the call. — ZedroTech`;
  return { html, text };
}

exports.listAvailableSlots = functions.https.onCall(async (request) => {
  const days = Math.min(Math.max(parseInt(request.data?.days || "14", 10) || 14, 1), 60);
  const nowMs = Date.now();
  const minStartMs = nowMs + MIN_LEAD_MINUTES * 60 * 1000;
  const maxStartMs = nowMs + days * 24 * 60 * 60 * 1000;

  let existing = [];
  try {
    const minTs = admin.firestore.Timestamp.fromMillis(nowMs);
    const maxTs = admin.firestore.Timestamp.fromMillis(maxStartMs + BUFFER_MINUTES * 60 * 1000);
    const snap = await admin.firestore()
      .collection("discovery_bookings")
      .where("status", "in", ["confirmed", "pending"])
      .where("slotStartUtc", ">=", minTs)
      .where("slotStartUtc", "<=", maxTs)
      .get();
    existing = snap.docs.map((d) => d.data().slotStartUtc.toMillis());
    console.log(`listAvailableSlots: found ${existing.length} existing bookings in range`);
  } catch (queryErr) {
    console.error("listAvailableSlots: Firestore query failed (likely missing composite index):", queryErr.message);
    existing = [];
  }

  let blocked = [];
  try {
    const minTs = admin.firestore.Timestamp.fromMillis(nowMs);
    const maxTs = admin.firestore.Timestamp.fromMillis(maxStartMs + SLOT_DURATION_MINUTES * 60 * 1000);
    const blockSnap = await admin.firestore()
      .collection("blocked_slots")
      .where("slotStartUtc", ">=", minTs)
      .where("slotStartUtc", "<=", maxTs)
      .get();
    blocked = blockSnap.docs.map((d) => d.data().slotStartUtc.toMillis());
    console.log(`listAvailableSlots: found ${blocked.length} blocked slots in range`);
  } catch (blockErr) {
    console.error("listAvailableSlots: blocked_slots query failed:", blockErr.message);
    blocked = [];
  }

  const bufferMs = BUFFER_MINUTES * 60 * 1000;
  const stepMs = SLOT_STEP_MINUTES * 60 * 1000;

  const slots = [];
  let cursor = Math.ceil(minStartMs / stepMs) * stepMs;
  while (cursor <= maxStartMs && slots.length < 240) {
    const isBlocked = existing.some((b) => cursor >= b && cursor < b + bufferMs)
      || blocked.some((b) => cursor >= b && cursor < b + bufferMs);
    if (!isBlocked) {
      slots.push({
        id: `dyn-${cursor}`,
        startUtc: new Date(cursor).toISOString(),
        endUtc: new Date(cursor + SLOT_DURATION_MINUTES * 60 * 1000).toISOString(),
        durationMinutes: SLOT_DURATION_MINUTES,
        isBooked: false
      });
    }
    cursor += stepMs;
  }

  console.log(`listAvailableSlots: generated ${slots.length} slots from ${new Date(minStartMs).toISOString()} to ${new Date(maxStartMs).toISOString()}`);
  return { slots, count: slots.length, slotDurationMinutes: SLOT_DURATION_MINUTES, bufferMinutes: BUFFER_MINUTES };
});

exports.createBooking = functions.https.onCall(async (request) => {
  const data = request.data || {};
  const tz = data.timezone || "UTC";

  const required = {
    slotStartUtc: data.slotStartUtc,
    name: data.name,
    email: data.email,
    businessName: data.businessName,
    projectDescription: data.projectDescription,
    callType: data.callType,
    countryCode: data.countryCode
  };
  for (const [key, val] of Object.entries(required)) {
    if (!val || (typeof val === "string" && val.trim().length === 0)) {
      throw new functions.https.HttpsError("invalid-argument", `Missing required field: ${key}`);
    }
  }

  const services = Array.isArray(data.services) ? data.services.filter((s) => typeof s === "string" && s.length > 0) : [];
  if (services.length === 0) {
    throw new functions.https.HttpsError("invalid-argument", "At least one service must be selected");
  }

  if (typeof data.name === "string" && data.name.length > 100) {
    throw new functions.https.HttpsError("invalid-argument", "name is too long");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new functions.https.HttpsError("invalid-argument", "Invalid email");
  }
  if (services.includes("other") && (!data.customService || data.customService.trim().length === 0)) {
    throw new functions.https.HttpsError("invalid-argument", "customService is required when 'other' is selected");
  }
  if (!["whatsapp", "google_meet"].includes(data.callType)) {
    throw new functions.https.HttpsError("invalid-argument", "callType must be 'whatsapp' or 'google_meet'");
  }
  const language = ["english", "hausa"].includes(data.language) ? data.language : "english";
  const clientBookingId = typeof data.clientBookingId === "string" && data.clientBookingId.length > 0 && data.clientBookingId.length <= 100
    ? data.clientBookingId
    : null;

  const startMs = new Date(data.slotStartUtc).getTime();
  if (!Number.isFinite(startMs)) {
    throw new functions.https.HttpsError("invalid-argument", "Invalid slotStartUtc");
  }
  const minStartMs = Date.now() + MIN_LEAD_MINUTES * 60 * 1000;
  if (startMs < minStartMs) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      `Please pick a time at least ${MIN_LEAD_MINUTES / 60} hours from now`
    );
  }

  const bookingRef = clientBookingId
    ? admin.firestore().collection("discovery_bookings").doc(clientBookingId)
    : admin.firestore().collection("discovery_bookings").doc();

  const startTs = admin.firestore.Timestamp.fromMillis(startMs);
  const endTs = admin.firestore.Timestamp.fromMillis(startMs + SLOT_DURATION_MINUTES * 60 * 1000);
  const bufferMs = BUFFER_MINUTES * 60 * 1000;

  try {
    const conflictSnap = await admin.firestore()
      .collection("discovery_bookings")
      .where("status", "in", ["confirmed", "pending"])
      .where("slotStartUtc", ">=", admin.firestore.Timestamp.fromMillis(startMs - bufferMs))
      .where("slotStartUtc", "<=", admin.firestore.Timestamp.fromMillis(startMs + bufferMs))
      .get();
    const realConflict = conflictSnap.docs.filter((d) => d.id !== bookingRef.id);
    if (realConflict.length > 0) {
      throw new functions.https.HttpsError(
        "already-exists",
        "This time was just booked or is too close to another booking. Please pick a different time."
      );
    }
  } catch (conflictErr) {
    if (conflictErr instanceof functions.https.HttpsError) throw conflictErr;
    console.error("createBooking: conflict check query failed, proceeding anyway:", conflictErr.message);
  }

  const bookingDoc = {
    slotStartUtc: startTs,
    slotEndUtc: endTs,
    durationMinutes: SLOT_DURATION_MINUTES,

    language,

    services,
    customService: services.includes("other") ? (data.customService || "").trim() : "",

    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    whatsapp: (data.whatsapp || "").replace(/[^\d]/g, ""),
    countryCode: data.countryCode,
    countryName: data.countryName || "",
    countryDialCode: data.countryDialCode || "",

    businessName: data.businessName.trim(),
    businessDescription: (data.businessDescription || "").trim(),
    projectDescription: data.projectDescription.trim(),
    currentSoftware: (data.currentSoftware || "").trim(),
    problem: (data.problem || "").trim(),
    additionalInfo: (data.additionalInfo || "").trim(),

    callType: data.callType,
    timezone: tz,

    status: "confirmed",
    meetLink: "",
    meetLinkSentAt: null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    userAgent: request.rawRequest?.headers?.["user-agent"] || "",
    ip: request.rawRequest?.ip || ""
  };

  await bookingRef.set(bookingDoc);
  const bookingId = bookingRef.id;
  bookingDoc.id = bookingId;
  bookingDoc.slotStartUtc = startMs;

  const SERVICE_TITLES = {
    web: "Web Applications",
    ai: "AI Automation",
    mobile: "Mobile Apps",
    custom: "Custom Software",
    marketing: "Marketing Technology",
    other: "Custom Service"
  };
  const serviceTitle = (bookingDoc.services || []).map((s) => SERVICE_TITLES[s] || s).join(", ") || "Discovery Call";

  const userMail = buildUserConfirmationEmail({ booking: bookingDoc, serviceTitle });
  await sendMailersendEmail({
    to: { email: bookingDoc.email, name: bookingDoc.name },
    subject: `Your free discovery call is booked — ${serviceTitle}`,
    html: userMail.html,
    text: userMail.text,
    replyTo: { email: "info@zedrotech.com", name: "ZedroTech" }
  });

  const { dateStr, timeStr } = formatSlotForEmail(startMs, bookingDoc.timezone);
  const adminMail = buildAdminNotificationEmail({ booking: bookingDoc, serviceTitle });
  await sendMailersendEmail({
    to: ADMIN_RECIPIENTS,
    subject: `📅 New booking: ${bookingDoc.name} on ${dateStr} at ${timeStr}`,
    html: adminMail.html,
    text: adminMail.text
  });

  return {
    success: true,
    bookingId,
    scheduledAt: new Date(startMs).toISOString(),
    callType: bookingDoc.callType
  };
});

exports.adminAddMeetLink = functions.https.onCall(async (request) => {
  if (!request.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Login required");
  }
  const { bookingId, meetLink } = request.data || {};
  if (!bookingId || !meetLink) {
    throw new functions.https.HttpsError("invalid-argument", "bookingId and meetLink are required");
  }
  const trimmed = String(meetLink).trim();
  if (!/^https:\/\//i.test(trimmed)) {
    throw new functions.https.HttpsError("invalid-argument", "Meet link must be a valid https:// URL");
  }
  if (!/(meet\.google\.com|zoom\.us|teams\.microsoft\.com)/i.test(trimmed)) {
    throw new functions.https.HttpsError("invalid-argument", "URL doesn't look like a Google Meet (or Zoom/Teams) link");
  }

  const ref = admin.firestore().collection("discovery_bookings").doc(bookingId);
  const snap = await ref.get();
  if (!snap.exists) {
    throw new functions.https.HttpsError("not-found", "Booking not found");
  }
  const data = snap.data();
  if (data.callType !== "google_meet") {
    throw new functions.https.HttpsError("failed-precondition", "This booking is not a Google Meet call");
  }

  await ref.update({
    meetLink: trimmed,
    meetLinkSentAt: admin.firestore.FieldValue.serverTimestamp(),
    meetLinkAddedBy: request.auth.uid
  });

  const updated = { ...data, meetLink: trimmed, id: bookingId, slotStartUtc: data.slotStartUtc.toMillis() };
  const SERVICE_TITLES = {
    web: "Web Applications",
    ai: "AI Automation",
    mobile: "Mobile Apps",
    custom: "Custom Software",
    marketing: "Marketing Technology",
    other: "Custom Service"
  };
  const serviceTitle = SERVICE_TITLES[updated.service] || updated.service;

  const email = buildMeetLinkEmail({ booking: updated, meetLink: trimmed, serviceTitle });
  await sendMailersendEmail({
    to: { email: updated.email, name: updated.name },
    subject: `Your Google Meet link is ready — ${serviceTitle}`,
    html: email.html,
    text: email.text,
    replyTo: { email: "info@zedrotech.com", name: "ZedroTech" }
  });

  return { success: true, meetLink: trimmed };
});

exports.adminSetBookingStatus = functions.https.onCall(async (request) => {
  if (!request.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Login required");
  }
  const { bookingId, status } = request.data || {};
  const allowed = ["confirmed", "completed", "cancelled", "no_show"];
  if (!bookingId || !allowed.includes(status)) {
    throw new functions.https.HttpsError("invalid-argument", "bookingId and a valid status are required");
  }
  const ref = admin.firestore().collection("discovery_bookings").doc(bookingId);
  await ref.update({
    status,
    statusUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
    statusUpdatedBy: request.auth.uid
  });
  return { success: true, status };
});

exports.adminListBookings = functions.https.onCall(async (request) => {
  if (!request.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Login required");
  }
  const filter = request.data?.status || "all";
  let query = admin.firestore().collection("discovery_bookings").orderBy("slotStartUtc", "asc");
  const snap = await query.get();
  const SERVICE_TITLES = {
    web: "Web Applications",
    ai: "AI Automation",
    mobile: "Mobile Apps",
    custom: "Custom Software",
    marketing: "Marketing Technology",
    other: "Custom Service"
  };
  let bookings = snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      countryDialCode: data.countryDialCode,
      countryName: data.countryName,
      countryCode: data.countryCode,
      businessName: data.businessName,
      businessDescription: data.businessDescription,
      projectDescription: data.projectDescription,
      currentSoftware: data.currentSoftware,
      problem: data.problem,
      additionalInfo: data.additionalInfo,
      service: data.service,
      services: data.services || (data.service ? [data.service] : []),
      customService: data.customService,
      serviceTitle: (data.services || (data.service ? [data.service] : [])).map((s) => SERVICE_TITLES[s] || s).join(", "),
      callType: data.callType,
      language: data.language || "english",
      timezone: data.timezone,
      status: data.status,
      meetLink: data.meetLink || "",
      startUtc: data.slotStartUtc?.toDate().toISOString() || null,
      endUtc: data.slotEndUtc?.toDate().toISOString() || null,
      durationMinutes: data.durationMinutes,
      createdAt: data.createdAt?.toDate().toISOString() || null
    };
  });
  if (filter !== "all") {
    bookings = bookings.filter((b) => b.status === filter);
  }
  return { bookings };
});

exports.adminBlockSlot = functions.https.onCall(async (request) => {
  if (!request.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Login required");
  }
  const { slotStartUtc, reason } = request.data || {};
  if (!slotStartUtc) {
    throw new functions.https.HttpsError("invalid-argument", "slotStartUtc is required");
  }
  const startMs = new Date(slotStartUtc).getTime();
  if (!Number.isFinite(startMs)) {
    throw new functions.https.HttpsError("invalid-argument", "Invalid slotStartUtc");
  }
  const startTs = admin.firestore.Timestamp.fromMillis(startMs);
  const endTs = admin.firestore.Timestamp.fromMillis(startMs + SLOT_DURATION_MINUTES * 60 * 1000);

  await admin.firestore().collection("blocked_slots").add({
    slotStartUtc: startTs,
    slotEndUtc: endTs,
    durationMinutes: SLOT_DURATION_MINUTES,
    reason: (reason || "").trim(),
    blockedBy: request.auth.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  return { success: true };
});

exports.adminUnblockSlot = functions.https.onCall(async (request) => {
  if (!request.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Login required");
  }
  const { blockId } = request.data || {};
  if (!blockId) {
    throw new functions.https.HttpsError("invalid-argument", "blockId is required");
  }
  await admin.firestore().collection("blocked_slots").doc(blockId).delete();
  return { success: true };
});

exports.adminListBlockedSlots = functions.https.onCall(async (request) => {
  if (!request.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Login required");
  }
  const snap = await admin.firestore().collection("blocked_slots")
    .orderBy("slotStartUtc", "asc")
    .get();
  const blocked = snap.docs.map((d) => ({
    id: d.id,
    slotStartUtc: d.data().slotStartUtc?.toDate().toISOString() || null,
    slotEndUtc: d.data().slotEndUtc?.toDate().toISOString() || null,
    reason: d.data().reason || "",
    blockedBy: d.data().blockedBy || "",
    createdAt: d.data().createdAt?.toDate().toISOString() || null
  }));
  return { blocked };
});
