const { params } = require("firebase-functions");
const functions = require("firebase-functions/v2");
const admin = require("firebase-admin");

const geminiApiKey = params.defineSecret("GEMINI_API_KEY");

/**
 * HTTPS Callable: getAgentSession
 * Fetches all knowledge base data (categories + entries) and returns
 * the Gemini API key for the frontend to establish a Live API WebSocket.
 *
 * Knowledge base structure:
 *   knowledge_base/categories/{id} → { title, icon, order, isActive }
 *   knowledge_base/entries/{id}    → { categoryId, title, content, order, isActive }
 */
exports.getAgentSession = functions.https.onCall(
  { secrets: [geminiApiKey] },
  async (request) => {
    const db = admin.firestore();
    const result = {
      apiKey: geminiApiKey.value() || "",
      knowledgeBase: {
        coreDirectives: "",
        services: "",
        faq: "",
        fullStructured: "",
      },
    };

    if (!result.apiKey) {
      console.error("GEMINI_API_KEY secret not configured.");
    }

    // Fetch all knowledge base data
    try {
      const [categoriesSnap, entriesSnap, directivesSnap, servicesSnap, faqSnap] = await Promise.all([
        db.collection("knowledge_base").doc("categories").collection("items").where("isActive", "!=", false).get(),
        db.collection("knowledge_base").doc("entries").collection("items").get(),
        db.collection("knowledge_base").doc("core_directives").get(),
        db.collection("knowledge_base").doc("services").get(),
        db.collection("knowledge_base").doc("faq").get(),
      ]);

      // Build categories map
      const categories = categoriesSnap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (a.order || 0) - (b.order || 0));

      // Build entries grouped by category
      const entries = entriesSnap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((e) => e.isActive !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0));

      const entriesByCategory = {};
      for (const entry of entries) {
        if (!entriesByCategory[entry.categoryId]) {
          entriesByCategory[entry.categoryId] = [];
        }
        entriesByCategory[entry.categoryId].push(entry);
      }

      // Build structured XML knowledge base
      const xmlParts = ["<knowledge_base>"];
      for (const cat of categories) {
        const catEntries = entriesByCategory[cat.id] || [];
        if (catEntries.length === 0) continue;

        xmlParts.push(`  <category id="${cat.id}" title="${escapeXml(cat.title || cat.id)}">`);
        if (cat.description) {
          xmlParts.push(`    <description>${escapeXml(cat.description)}</description>`);
        }
        for (const entry of catEntries) {
          xmlParts.push(`    <entry id="${entry.id}" title="${escapeXml(entry.title || entry.id)}">`);
          xmlParts.push(`      <content>${escapeXml(entry.content || "")}</content>`);
          xmlParts.push(`    </entry>`);
        }
        xmlParts.push(`  </category>`);
      }
      xmlParts.push("</knowledge_base>");

      result.knowledgeBase.fullStructured = xmlParts.join("\n");

      // Legacy fields (backward compatibility)
      if (directivesSnap.exists) {
        const data = directivesSnap.data();
        result.knowledgeBase.coreDirectives = data.content || data.text || "";
      }
      if (servicesSnap.exists) {
        const data = servicesSnap.data();
        result.knowledgeBase.services = data.content || data.text || "";
      }
      if (faqSnap.exists) {
        const data = faqSnap.data();
        result.knowledgeBase.faq = data.content || data.text || "";
      }
    } catch (err) {
      console.warn("Firestore knowledge base read failed:", err.message);
    }

    return result;
  }
);

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
