const functions = require("firebase-functions/v2");
const admin = require("firebase-admin");

/**
 * HTTPS Callable: getAgentSession
 * Fetches business knowledge from Firestore and returns the Gemini API key
 * for the frontend to establish a Live API WebSocket session.
 *
 * The API key is fetched from Firebase secrets (not hardcoded in the frontend bundle).
 * Collections read: knowledge_base/core_directives, knowledge_base/services, knowledge_base/faq
 */
exports.getAgentSession = functions.https.onCall(async (request) => {
  const db = admin.firestore();
  const result = {
    apiKey: process.env.GEMINI_API_KEY || "",
    knowledgeBase: {
      coreDirectives: "",
      services: "",
      faq: "",
    },
  };

  if (!result.apiKey) {
    console.error("GEMINI_API_KEY secret not configured. Run: firebase functions:secrets:set GEMINI_API_KEY");
  }

  // Fetch knowledge base from Firestore (fall back to empty if missing)
  try {
    const [directivesSnap, servicesSnap, faqSnap] = await Promise.all([
      db.collection("knowledge_base").doc("core_directives").get(),
      db.collection("knowledge_base").doc("services").get(),
      db.collection("knowledge_base").doc("faq").get(),
    ]);

    if (directivesSnap.exists) {
      const data = directivesSnap.data();
      result.knowledgeBase.coreDirectives = data.content || data.text || JSON.stringify(data);
    }
    if (servicesSnap.exists) {
      const data = servicesSnap.data();
      result.knowledgeBase.services = data.content || data.text || JSON.stringify(data);
    }
    if (faqSnap.exists) {
      const data = faqSnap.data();
      result.knowledgeBase.faq = data.content || data.text || JSON.stringify(data);
    }
  } catch (err) {
    console.warn("Firestore knowledge base read failed, using defaults:", err.message);
  }

  return result;
});
