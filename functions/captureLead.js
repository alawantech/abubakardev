const functions = require("firebase-functions/v2");
const admin = require("firebase-admin");

/**
 * HTTPS Callable: captureLeadToFirestore
 * Called by the frontend after the AI's function_call for captureLeadData.
 * Writes the lead to the Firestore 'leads' collection.
 */
exports.captureLeadToFirestore = functions.https.onCall(async (request) => {
  const data = request.data;

  // Input validation
  if (!data || typeof data !== "object") {
    throw new functions.https.HttpsError("invalid-argument", "Request body must be an object.");
  }

  const { name, businessType, projectScope, budget, email, phone, source } = data;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    throw new functions.https.HttpsError("invalid-argument", "name is required.");
  }
  if (!businessType || typeof businessType !== "string") {
    throw new functions.https.HttpsError("invalid-argument", "businessType is required.");
  }
  if (!projectScope || typeof projectScope !== "string") {
    throw new functions.https.HttpsError("invalid-argument", "projectScope is required.");
  }

  const leadDoc = {
    name: name.trim(),
    businessType: businessType.trim(),
    projectScope: projectScope.trim(),
    budget: budget ? String(budget).trim() : "Not specified",
    email: email ? String(email).trim() : "",
    phone: phone ? String(phone).trim() : "",
    source: source || "ai_agent",
    status: "new",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    userAgent: request.rawRequest?.headers?.["user-agent"] || "",
  };

  const docRef = await admin.firestore().collection("leads").add(leadDoc);

  return { success: true, leadId: docRef.id };
});
