const functions = require("firebase-functions/v2");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

/**
 * Verifies Flutterwave payment and creates enrollment
 * This is a publicly accessible HTTPS function
 */
exports.verifyPayment = functions.https.onRequest({cors: true}, async (req, res) => {
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

    // Validate required fields
    if (!transaction_id || !expected_amount || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
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

    const response = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
        {
          headers: {
            "Authorization": `Bearer ${secretKey}`,
          },
        },
    );

    const paymentData = response.data.data;

    // Verify payment status and amount
    if (
      paymentData.status === "successful" &&
      paymentData.amount >= expected_amount
    ) {
      // Create enrollment in Firestore
      const enrollmentRef = await admin.firestore()
          .collection("enrollments")
          .add({
            userId: customerEmail,
            courseId: courseId,
            courseName: courseName,
            customerName: customerName,
            customerEmail: customerEmail,
            customerPhone: customerPhone,
            paymentReference: paymentData.id,
            transactionId: paymentData.tx_ref,
            amount: paymentData.amount,
            currency: paymentData.currency,
            paymentType: paymentData.payment_type,
            status: "completed",
            paymentStatus: "successful",
            enrolledAt: admin.firestore.FieldValue.serverTimestamp(),
            verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
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
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
        status: paymentData.status,
        amount: paymentData.amount,
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Error verifying payment",
      error: error.response?.data?.message || error.message,
    });
  }
});

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
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
