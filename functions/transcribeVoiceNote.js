const { params } = require("firebase-functions");
const functions = require("firebase-functions/v2");

const { callSTT } = require("./providers/aiProviders");

const geminiApiKey = params.defineSecret("GEMINI_API_KEY");
const groqApiKey = params.defineSecret("GROQ_API_KEY");

const SUPPORTED_MIME_PREFIXES = [
  "audio/webm", "audio/mp4", "audio/ogg", "audio/wav", "audio/wave",
  "audio/mpeg", "audio/m4a", "audio/aac", "audio/flac",
];
const MIN_AUDIO_BYTES = 600;
const MAX_AUDIO_BYTES = 8 * 1024 * 1024;

/**
 * HTTPS Callable: transcribeVoiceNote
 * Accepts a base64-encoded audio blob and returns the verbatim transcript
 * in the speaker's original language.
 *
 * Routes STT through a multi-provider chain
 * (Groq Whisper → Gemini multimodal) to stay within free-tier limits.
 */
exports.transcribeVoiceNote = functions.https.onCall(
  { secrets: [geminiApiKey, groqApiKey], maxInstances: 10 },
  async (request) => {
    const data = request.data || {};
    const audio = data.audio;
    const mimeType = (data.mimeType || "audio/webm").toLowerCase();

    if (!audio || typeof audio !== "string" || audio.length < 100) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "No voice note received. Please record again and tap send.",
      );
    }

    const approxBytes = Math.floor((audio.length * 3) / 4);

    if (approxBytes < MIN_AUDIO_BYTES) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "That voice note is too short. Hold the mic a bit longer — at least 1 second of speech — then try again.",
      );
    }

    if (approxBytes > MAX_AUDIO_BYTES) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "That voice note is too long. Please keep it under about 2 minutes and try again.",
      );
    }

    const isSupported = SUPPORTED_MIME_PREFIXES.some((p) => mimeType.startsWith(p));
    if (!isSupported) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        `Audio format not supported (got ${mimeType}). Please try a different browser, or use the text input.`,
      );
    }

    try {
      const { text, provider } = await callSTT(audio, mimeType);

      if (!text) {
        throw new functions.https.HttpsError(
          "internal",
          "We couldn't hear anything in that voice note. Please speak more clearly and try again.",
        );
      }
      if (text === "[inaudible]" || /^\[inaudible\]/i.test(text)) {
        throw new functions.https.HttpsError(
          "internal",
          "We couldn't make out what you said. Please try again in a quieter place, or type your message instead.",
        );
      }
      if (text.length < 2) {
        throw new functions.https.HttpsError(
          "internal",
          "The transcription came back empty. Please try recording again.",
        );
      }

      return { text, mimeType, provider: provider || null };
    } catch (err) {
      if (err instanceof functions.https.HttpsError) throw err;
      console.error("transcribeVoiceNote unexpected error:", err && err.message ? err.message : err);
      const msg = (err && err.message) || "Unknown error";
      const lower = msg.toLowerCase();
      if (lower.includes("timeout") || lower.includes("deadline")) {
        throw new functions.https.HttpsError("deadline-exceeded", "Transcription timed out. Please check your connection and try again.");
      }
      if (lower.includes("quota") || lower.includes("rate") || lower.includes("429")) {
        throw new functions.https.HttpsError("resource-exhausted", "Too many requests right now. Please wait a moment and try again.");
      }
      if (lower.includes("network") || lower.includes("econnrefused") || lower.includes("enotfound")) {
        throw new functions.https.HttpsError("unavailable", "Network problem. Please check your connection and try again.");
      }
      throw new functions.https.HttpsError("internal", "We couldn't transcribe that voice note. Please try again, or type your message instead.");
    }
  },
);
