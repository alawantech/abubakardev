const functions = require("firebase-functions/v2");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

/**
 * Verifies Flutterwave payment and creates enrollment
 * This is a publicly accessible HTTPS function with input validation
 */
exports.verifyPayment = functions.https.onRequest({ cors: true }, async (req, res) => {
  // Set security headers
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
  });

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const {
      transaction_id,
      expected_amount,
      courseId,
      courseName,
      customerEmail,
      customerName,
      customerPhone,
    } = req.body;

    // Comprehensive input validation
    if (!transaction_id || typeof transaction_id !== 'string' || transaction_id.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing transaction ID",
      });
    }

    if (!expected_amount || typeof expected_amount !== 'number' || expected_amount <= 0 || expected_amount > 1000000) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    if (!courseId || typeof courseId !== 'string' || courseId.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    if (!customerEmail || typeof customerEmail !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // Validate optional fields
    if (courseName && (typeof courseName !== 'string' || courseName.length > 200)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course name",
      });
    }

    if (customerName && (typeof customerName !== 'string' || customerName.length > 100)) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer name",
      });
    }

    if (customerPhone && (typeof customerPhone !== 'string' || customerPhone.length > 20)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    // Verify payment with Flutterwave using SECRET KEY
    const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;

    if (!secretKey) {
      console.error("Flutterwave secret key not configured");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    // Add timeout and retry logic for external API call
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        headers: {
          "Authorization": `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        timeout: 30000, // 30 second timeout
      },
    );

    const paymentData = response.data.data;

    // Verify payment status and amount with additional checks
    if (
      paymentData.status === "successful" &&
      paymentData.amount >= expected_amount &&
      paymentData.currency === "NGN" &&
      paymentData.customer?.email === customerEmail
    ) {
      // Check if enrollment already exists to prevent duplicates
      const existingEnrollment = await admin.firestore()
        .collection("enrollments")
        .where("transactionId", "==", paymentData.tx_ref)
        .limit(1)
        .get();

      if (!existingEnrollment.empty) {
        return res.status(409).json({
          success: false,
          message: "Enrollment already exists for this transaction",
        });
      }

      // Create enrollment in Firestore with additional security fields
      const enrollmentRef = await admin.firestore()
        .collection("enrollments")
        .add({
          userId: customerEmail, // Using email as userId for now
          courseId: courseId,
          courseName: courseName || "Unknown Course",
          customerName: customerName || "Unknown",
          customerEmail: customerEmail,
          customerPhone: customerPhone || "",
          paymentReference: paymentData.id.toString(),
          transactionId: paymentData.tx_ref,
          amount: paymentData.amount,
          currency: paymentData.currency,
          paymentType: paymentData.payment_type || "card",
          status: "completed",
          paymentStatus: "successful",
          enrolledAt: admin.firestore.FieldValue.serverTimestamp(),
          verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
          ipAddress: req.ip || req.connection.remoteAddress,
          userAgent: req.get('User-Agent') || 'Unknown',
        });

      return res.json({
        success: true,
        message: "Payment verified and enrollment created successfully",
        data: {
          enrollmentId: enrollmentRef.id,
          transactionId: paymentData.id,
          amount: paymentData.amount,
          currency: paymentData.currency,
        },
      });
    } else {
      // Log failed verification for security monitoring
      console.warn("Payment verification failed:", {
        transactionId: transaction_id,
        expectedAmount: expected_amount,
        actualAmount: paymentData.amount,
        status: paymentData.status,
        currency: paymentData.currency,
        customerEmail: paymentData.customer?.email,
      });

      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
        details: {
          status: paymentData.status,
          amount: paymentData.amount,
          currency: paymentData.currency,
        },
      });
    }
  } catch (error) {
    console.error("Payment verification error:", {
      message: error.message,
      stack: error.stack,
      transactionId: req.body?.transaction_id,
    });

    // Handle different types of errors appropriately
    if (error.response) {
      // Flutterwave API error
      return res.status(502).json({
        success: false,
        message: "Payment gateway error",
        error: "Unable to verify payment with gateway",
      });
    } else if (error.code === 'ECONNABORTED') {
      // Timeout error
      return res.status(504).json({
        success: false,
        message: "Payment verification timeout",
        error: "Please try again later",
      });
    } else {
      // Other errors
      return res.status(500).json({
        success: false,
        message: "Error verifying payment",
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }
});

// Email Notification Function
exports.sendContactNotification = functions.https.onRequest({ cors: true }, async (req, res) => {
  // Set security headers
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block'
  });

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { formData, source } = req.body;
    const API_TOKEN = process.env.MAILERSEND_API_TOKEN;
    const API_URL = "https://api.mailersend.com/v1";

    if (!API_TOKEN) {
      console.error("MailerSend API token not configured in environment");
      return res.status(500).json({ success: false, message: "Email service not configured" });
    }

    const emailData = {
      from: { email: "notifications@zedrotech.com", name: "ZedroTech System" },
      to: [
        { email: "info@zedrotech.com", name: "ZedroTech Admin" },
        { email: "abubakarlawan671@gmail.com", name: "Lawan Abubakar" }
      ],
      subject: `New Form Submission: ${source}`,
      text: `New message from ${formData.name} (${formData.email}).\nSource: ${source}\nMessage: ${formData.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
          <p><strong>Source:</strong> ${source}</p>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>WhatsApp:</strong> ${formData.whatsapp || 'N/A'}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${formData.message}</p>
          <br />
          <a href="https://zedrotech.com/dashboard" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Dashboard</a>
        </div>
      `
    };

    const response = await axios.post(`${API_URL}/email`, emailData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });

    return res.json({ success: true, message: "Notification sent" });
  } catch (error) {
    console.error("Email notification error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to send notification",
      error: error.message
    });
  }
});

const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
