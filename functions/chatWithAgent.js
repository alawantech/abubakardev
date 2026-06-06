const { params } = require("firebase-functions");
const functions = require("firebase-functions/v2");
const admin = require("firebase-admin");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const geminiApiKey = params.defineSecret("GEMINI_API_KEY");

/**
 * HTTPS Callable: chatWithAgent
 * Text-based conversation using Gemini REST API.
 * Returns text responses only (no audio). Used for text chat mode in the widget.
 *
 * Function calling is also supported — if the agent decides to call
 * captureLeadData, we execute it server-side and return the result.
 */
exports.chatWithAgent = functions.https.onCall(
  { secrets: [geminiApiKey] },
  async (request) => {
    const data = request.data || {};
    const userMessage = (data.message || "").trim();

    if (!userMessage) {
      throw new functions.https.HttpsError("invalid-argument", "message is required");
    }

    const apiKey = geminiApiKey.value();
    if (!apiKey) {
      throw new functions.https.HttpsError("failed-precondition", "Gemini API key not configured");
    }

    // Build knowledge base context (same as getAgentSession)
    const knowledgeBase = await fetchKnowledgeBase();

    // Load system prompt from the frontend (frontend has the full prompt)
    // OR build it server-side. We'll build server-side to keep things simple.
    const systemInstruction = buildSystemInstruction(knowledgeBase);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction,
      tools: [{
        functionDeclarations: [
          {
            name: "captureLeadData",
            description: "Captures lead information after project discovery.",
            parameters: {
              type: "OBJECT",
              properties: {
                name: { type: "STRING", description: "Full name of the client" },
                businessType: { type: "STRING", description: "Industry or business type" },
                projectScope: { type: "STRING", description: "Summary of project requirements" },
                budget: { type: "STRING", description: "Budget range in Naira" },
                email: { type: "STRING", description: "Email address" },
                phone: { type: "STRING", description: "Phone/WhatsApp number" },
              },
              required: ["name", "businessType", "projectScope"],
            },
          },
        ],
      }],
    });

    // Conversation history (optional)
    const history = Array.isArray(data.history) ? data.history : [];
    const chat = model.startChat({
      history: history
        .filter((m) => m && (m.text || m.parts))
        .map((m) => ({
          role: m.role === "agent" ? "model" : "user",
          parts: [{ text: m.text || (m.parts && m.parts[0] && m.parts[0].text) || "" }],
        })),
    });

    const result = await chat.sendMessage(userMessage);
    const response = result.response;
    const candidates = response.candidates || [];
    const parts = (candidates[0] && candidates[0].content && candidates[0].content.parts) || [];

    let text = "";
    let functionCall = null;

    for (const part of parts) {
      if (part.text) text += part.text;
      if (part.functionCall) functionCall = part.functionCall;
    }

    // Handle function call: captureLeadData
    let leadCaptured = null;
    if (functionCall && functionCall.name === "captureLeadData") {
      try {
        const args = functionCall.args || {};
        const leadDoc = {
          name: String(args.name || "Unknown").trim(),
          businessType: String(args.businessType || "Unknown").trim(),
          projectScope: String(args.projectScope || "").trim(),
          budget: String(args.budget || "Not specified").trim(),
          email: String(args.email || "").trim(),
          phone: String(args.phone || "").trim(),
          source: "ai_agent_text",
          status: "new",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };
        const docRef = await admin.firestore().collection("leads").add(leadDoc);
        leadCaptured = { leadId: docRef.id };
      } catch (err) {
        console.error("Lead capture error:", err);
      }
    }

    return { text: text.trim(), functionCall: functionCall ? { name: functionCall.name, args: functionCall.args } : null, leadCaptured };
  }
);

async function fetchKnowledgeBase() {
  const db = admin.firestore();
  try {
    const [categoriesSnap, entriesSnap] = await Promise.all([
      db.collection("knowledge_base").doc("categories").collection("items").where("isActive", "!=", false).get(),
      db.collection("knowledge_base").doc("entries").collection("items").get(),
    ]);

    const categories = categoriesSnap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    const entries = entriesSnap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((e) => e.isActive !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    const entriesByCategory = {};
    for (const entry of entries) {
      if (!entriesByCategory[entry.categoryId]) entriesByCategory[entry.categoryId] = [];
      entriesByCategory[entry.categoryId].push(entry);
    }

    const xmlParts = ["<knowledge_base>"];
    for (const cat of categories) {
      const catEntries = entriesByCategory[cat.id] || [];
      if (catEntries.length === 0) continue;
      xmlParts.push(`  <category id="${cat.id}" title="${escapeXml(cat.title || cat.id)}">`);
      for (const entry of catEntries) {
        xmlParts.push(`    <entry id="${entry.id}" title="${escapeXml(entry.title || entry.id)}">`);
        xmlParts.push(`      <content>${escapeXml(entry.content || "")}</content>`);
        xmlParts.push(`    </entry>`);
      }
      xmlParts.push(`  </category>`);
    }
    xmlParts.push("</knowledge_base>");
    return xmlParts.join("\n");
  } catch (err) {
    console.warn("KB fetch failed:", err.message);
    return "";
  }
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSystemInstruction(knowledgeBaseXml) {
  return [
    "You are the elite AI Software Consultant for AbubakarDev — a software development agency based in Northern Nigeria. You are technically sharp, professionally confident, and culturally attuned to Northern Nigerian business culture (Kano, Kaduna, Abuja).",
    "",
    "LANGUAGE RULES:",
    "1. ALWAYS respond in the SAME language the user speaks (English or Hausa).",
    "2. If the user MIXES English and Hausa, mix languages naturally.",
    "3. When speaking Hausa, use natural Northern Nigerian dialect (Kano/Kaduna style): 'Na gode', 'Toh', 'Ina son', 'Sir', 'Mafi kyau', 'Zan yi', 'Babu problem'.",
    "4. Code, technical terms, and project names stay in English.",
    "",
    "SCOPE: ONLY web apps, mobile apps, custom software, UI/UX, technical consulting.",
    "",
    "GUARDRAIL: Do NOT discuss online coding classes, courses, tutoring, or school. Politely redirect: 'I appreciate your interest! However, I'm here for software development projects. For education questions, please visit our education portal. Now tell me — do you have a software project to discuss?'",
    "",
    "GOAL: Guide users through project discovery. Once you have name, business type, and project scope, call captureLeadData immediately.",
    "",
    "SERVICES:",
    "- Web Apps: React, Next.js, Node.js, e-commerce, SaaS, dashboards",
    "- Mobile Apps: React Native, Flutter, iOS/Android, PWA",
    "- Custom Software: APIs, payment integration (Flutterwave, Paystack, Stripe), CRM/ERP, cloud deployment",
    "",
    "PRICING:",
    "- Small: ₦200K–₦500K",
    "- Medium: ₦500K–₦2M",
    "- Enterprise: ₦2M+",
    "",
    "TIMELINE: 2–4 weeks (simple), 4–8 weeks (medium), 8–16 weeks (complex)",
    "",
    "PROCESS: Discovery call (free) → Proposal → Design → Development (agile) → Testing → Deployment → Support",
    "",
    knowledgeBaseXml,
  ].filter(Boolean).join("\n");
}
