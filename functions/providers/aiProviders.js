const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");

/**
 * Multi-provider AI chain. Tries each provider in order and falls back
 * to the next on failure. Decouples the app from any single vendor and
 * keeps free-tier usage within budget.
 *
 *   Chat:  Groq → OpenRouter (free) → Zhipu GLM-4-Flash (free) → Gemini
 *   TTS:   Microsoft Edge TTS (free, no key) → Gemini
 *   STT:   Groq Whisper → Gemini
 *
 * All keys are optional — providers with no configured key are skipped.
 * Edge TTS is always available because it requires no key.
 */

const TIMEOUT_MS = 30_000;

const PLACEHOLDER_VALUES = new Set(["", "unused", "placeholder", "disabled", "todo", "none"]);

function hasRealKey(name) {
  const v = (process.env[name] || "").trim();
  return !!(v && !PLACEHOLDER_VALUES.has(v.toLowerCase()));
}

function envOrEmpty(name) {
  return (process.env[name] || "").trim();
}

// ============================================================
// CHAT
// ============================================================

/**
 * @typedef {Object} ChatResult
 * @property {string} text
 * @property {{name: string, args: object} | null} functionCall
 * @property {string} provider
 */

/**
 * @param {Object} opts
 * @param {string} opts.systemPrompt
 * @param {Array<{role: string, text: string}>} opts.history
 * @param {string} opts.userMessage
 * @param {{functionDeclarations: Array<Object>}} [opts.tools] - Gemini-style tool defs
 * @returns {Promise<ChatResult>}
 */
async function callChat({ systemPrompt, history, userMessage, tools }) {
  const errors = [];

  if (hasRealKey("GROQ_API_KEY")) {
    try {
      return await callOpenAICompatibleChat({
        provider: "groq",
        endpoint: "https://api.groq.com/openai/v1/chat/completions",
        apiKey: envOrEmpty("GROQ_API_KEY"),
        model: "llama-3.3-70b-versatile",
        systemPrompt,
        history,
        userMessage,
        tools,
      });
    } catch (err) {
      errors.push(`Groq: ${err.message}`);
      console.warn("[aiProviders] Groq chat failed:", err.message);
    }
  }

  if (hasRealKey("OPENROUTER_API_KEY")) {
    try {
      return await callOpenAICompatibleChat({
        provider: "openrouter",
        endpoint: "https://openrouter.ai/api/v1/chat/completions",
        apiKey: envOrEmpty("OPENROUTER_API_KEY"),
        model: "meta-llama/llama-3.3-70b-instruct:free",
        systemPrompt,
        history,
        userMessage,
        tools,
      });
    } catch (err) {
      errors.push(`OpenRouter: ${err.message}`);
      console.warn("[aiProviders] OpenRouter chat failed:", err.message);
    }
  }

  if (hasRealKey("ZHIPU_API_KEY")) {
    try {
      return await callOpenAICompatibleChat({
        provider: "zhipu",
        endpoint: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
        apiKey: envOrEmpty("ZHIPU_API_KEY"),
        model: "glm-4-flash",
        systemPrompt,
        history,
        userMessage,
        tools,
      });
    } catch (err) {
      errors.push(`Zhipu: ${err.message}`);
      console.warn("[aiProviders] Zhipu chat failed:", err.message);
    }
  }

  if (process.env.GEMINI_API_KEY) {
    try {
      return await callGeminiChat({
        apiKey: envOrEmpty("GEMINI_API_KEY"),
        systemPrompt,
        history,
        userMessage,
        tools,
      });
    } catch (err) {
      errors.push(`Gemini: ${err.message}`);
      console.warn("[aiProviders] Gemini chat failed:", err.message);
    }
  }

  throw new Error(
    `All chat providers failed: ${errors.join(" | ") || "No providers configured"}`,
  );
}

async function callOpenAICompatibleChat({
  provider,
  endpoint,
  apiKey,
  model,
  systemPrompt,
  history,
  userMessage,
  tools,
}) {
  const messages = [
    { role: "system", content: systemPrompt },
    ...history
      .filter((m) => m && m.text && String(m.text).trim())
      .map((m) => ({
        role:
          m.role === "agent" || m.role === "assistant" || m.role === "model"
            ? "assistant"
            : "user",
        content: m.text,
      })),
    { role: "user", content: userMessage },
  ];

  let openaiTools;
  if (tools && Array.isArray(tools.functionDeclarations) && tools.functionDeclarations.length > 0) {
    openaiTools = tools.functionDeclarations.map((fd) => ({
      type: "function",
      function: {
        name: fd.name,
        description: fd.description,
        parameters: normalizeJsonSchema(fd.parameters),
      },
    }));
  }

  const body = {
    model,
    messages,
    temperature: 0.7,
    max_tokens: 2048,
  };
  if (openaiTools) {
    body.tools = openaiTools;
    body.tool_choice = "auto";
  }

  const headers = {
    Authorization: `Bearer ${apiKey.trim()}`,
    "Content-Type": "application/json",
  };
  if (provider === "openrouter") {
    headers["HTTP-Referer"] = "https://zedrotech.com";
    headers["X-Title"] = "ZedroTech AI Agent";
  }

  const response = await axios.post(endpoint, body, { headers, timeout: TIMEOUT_MS });
  const message = response.data.choices?.[0]?.message;
  if (!message) {
    throw new Error("No message in response");
  }

  const text = message.content || "";
  let functionCall = null;
  if (Array.isArray(message.tool_calls) && message.tool_calls.length > 0) {
    const tc = message.tool_calls[0];
    if (tc.function && tc.function.name) {
      try {
        const args = JSON.parse(tc.function.arguments || "{}");
        functionCall = { name: tc.function.name, args };
      } catch (e) {
        console.warn(
          `[aiProviders] ${provider} tool call args parse failed:`,
          e.message,
        );
      }
    }
  }

  return { text, functionCall, provider };
}

async function callGeminiChat({ apiKey, systemPrompt, history, userMessage, tools }) {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: systemPrompt,
    tools,
  });

  const chat = model.startChat({
    history: history
      .filter((m) => m && m.text && String(m.text).trim())
      .map((m) => ({
        role: m.role === "agent" || m.role === "model" ? "model" : "user",
        parts: [{ text: m.text }],
      })),
  });

  const result = await chat.sendMessage(userMessage);
  const candidates = result.response.candidates || [];
  const parts =
    (candidates[0] && candidates[0].content && candidates[0].content.parts) || [];

  let text = "";
  let functionCall = null;
  for (const part of parts) {
    if (part.text) text += part.text;
    if (part.functionCall) functionCall = part.functionCall;
  }

  return { text, functionCall, provider: "gemini" };
}

// Recursively lowercase `type` fields (Gemini uses UPPERCASE, OpenAI uses lowercase)
function normalizeJsonSchema(schema) {
  if (!schema || typeof schema !== "object") return schema;
  if (Array.isArray(schema)) return schema.map(normalizeJsonSchema);
  const out = {};
  for (const [k, v] of Object.entries(schema)) {
    if (k === "type" && typeof v === "string") {
      out[k] = v.toLowerCase();
    } else {
      out[k] = normalizeJsonSchema(v);
    }
  }
  return out;
}

// ============================================================
// TTS
// ============================================================

/**
 * @param {string} text
 * @returns {Promise<{data: string, mimeType: string, provider: string}>}
 */
async function callTTS(text) {
  const errors = [];

  try {
    return await callEdgeTTS(text);
  } catch (err) {
    errors.push(`EdgeTTS: ${err.message}`);
    console.warn("[aiProviders] Edge TTS failed:", err.message);
  }

  if (process.env.GEMINI_API_KEY) {
    try {
      return await callGeminiTTS(text, envOrEmpty("GEMINI_API_KEY"));
    } catch (err) {
      errors.push(`Gemini: ${err.message}`);
      console.warn("[aiProviders] Gemini TTS failed:", err.message);
    }
  }

  throw new Error(`All TTS providers failed: ${errors.join(" | ")}`);
}

async function callEdgeTTS(text) {
  const { EdgeTTS } = require("node-edge-tts");
  const tts = new EdgeTTS({
    voice: "en-US-AriaNeural",
    lang: "en-US",
    outputFormat: "audio-24khz-48kbitrate-mono-mp3",
    timeout: 25000,
  });

  const tempPath = path.join(
    os.tmpdir(),
    `edge-tts-${Date.now()}-${Math.random().toString(36).slice(2)}.mp3`,
  );

  try {
    await tts.ttsPromise(text, tempPath);
    const buffer = await fs.promises.readFile(tempPath);
    return {
      data: buffer.toString("base64"),
      mimeType: "audio/mpeg",
      provider: "edge-tts",
    };
  } finally {
    fs.promises.unlink(tempPath).catch(() => {});
  }
}

async function callGeminiTTS(text, apiKey) {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-preview-tts",
  });
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text }] }],
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: "Kore" },
        },
      },
    },
  });
  const candidates = result.response.candidates || [];
  const parts =
    (candidates[0] && candidates[0].content && candidates[0].content.parts) || [];
  const audioPart = parts.find((p) => p && p.inlineData && p.inlineData.data);
  if (!audioPart) {
    throw new Error("TTS returned no audio data");
  }
  const mimeType = audioPart.inlineData.mimeType || "audio/L16;rate=24000";
  const sampleRateMatch = /rate=(\d+)/.exec(mimeType);
  const sampleRate = sampleRateMatch ? parseInt(sampleRateMatch[1], 10) : 24000;
  const wavBase64 = pcmBase64ToWavBase64(audioPart.inlineData.data, sampleRate);
  return {
    data: wavBase64,
    mimeType: "audio/wav",
    sourceMimeType: mimeType,
    provider: "gemini-tts",
  };
}

function pcmBase64ToWavBase64(pcmBase64, sampleRate) {
  const pcm = Buffer.from(pcmBase64, "base64");
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]).toString("base64");
}

// ============================================================
// STT
// ============================================================

/**
 * @param {string} audioBase64
 * @param {string} mimeType
 * @returns {Promise<{text: string, provider: string}>}
 */
async function callSTT(audioBase64, mimeType) {
  const errors = [];

  if (hasRealKey("GROQ_API_KEY")) {
    try {
      return await callGroqWhisper(audioBase64, mimeType);
    } catch (err) {
      errors.push(`Groq: ${err.message}`);
      console.warn("[aiProviders] Groq Whisper failed:", err.message);
    }
  }

  if (process.env.GEMINI_API_KEY) {
    try {
      return await callGeminiSTT(audioBase64, mimeType, envOrEmpty("GEMINI_API_KEY"));
    } catch (err) {
      errors.push(`Gemini: ${err.message}`);
      console.warn("[aiProviders] Gemini STT failed:", err.message);
    }
  }

  throw new Error(
    `All STT providers failed: ${errors.join(" | ") || "No providers configured"}`,
  );
}

async function callGroqWhisper(audioBase64, mimeType) {
  const audioBuffer = Buffer.from(audioBase64, "base64");
  const ext = mimeToExt(mimeType);

  const form = new FormData();
  form.append("file", new Blob([audioBuffer], { type: mimeType }), `audio.${ext}`);
  form.append("model", "whisper-large-v3");
  form.append("response_format", "json");
  // Prime Whisper with context so it doesn't mis-route Hausa to Malay/Indonesian,
  // and so it tolerates strong accents, fast speech, and code-switching.
  form.append(
    "prompt",
    "Nigerian audio. The speaker may speak English (any accent — pidgin, Naija, British, American, or local) or Hausa (any regional variety: Kano, Sokoto, Kaduna, Bauchi, Adamawa). Transcribe EXACTLY as spoken. Preserve fillers, code-switching between English and Hausa, and natural disfluencies. Be tolerant of imperfect pronunciation and fast speech. Do not translate.",
  );

  const response = await axios.post(
    "https://api.groq.com/openai/v1/audio/transcriptions",
    form,
    {
      headers: {
        Authorization: `Bearer ${(process.env.GROQ_API_KEY || "").trim()}`,
      },
      timeout: TIMEOUT_MS,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    },
  );

  return {
    text: (response.data.text || "").trim(),
    provider: "groq-whisper",
  };
}

async function callGeminiSTT(audioBase64, mimeType, apiKey) {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { temperature: 0.1, maxOutputTokens: 2048 },
  });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { text: GEMINI_STT_PROMPT },
          { inlineData: { mimeType, data: audioBase64 } },
        ],
      },
    ],
  });

  const text = (result.response.text() || "").trim();
  return { text, provider: "gemini" };
}

const GEMINI_STT_PROMPT = `You are a careful, Nigerian-context audio transcriber. Listen to this voice note and transcribe it EXACTLY as the speaker said it.

LANGUAGE: The speaker is almost certainly speaking English (any variety: pidgin, Naija, British, American, or local) or Hausa (any regional variety: Kano, Sokoto, Kaduna, Bauchi, Adamawa). They may code-switch between the two. Do NOT route Hausa to Malay/Indonesian or any other language — if you hear "barka da aiki" it is Hausa "good day for work", NOT "berkah". Be tolerant of strong accents, fast speech, fillers ("ehn", "toh", "walahi"), and imperfect pronunciation.

RULES:
1. Output ONLY the transcription — no labels, no quotes, no preamble, no translation, no commentary.
2. Preserve natural disfluencies (um, uh, ehn, toh) only if the speaker actually said them. Don't insert them.
3. Preserve the speaker's accent/variety markers. If they speak Bauchi Hausa, don't normalise to Kano — transcribe what they said. If they speak Nigerian pidgin, transcribe the pidgin — don't standardise to "proper" English.
4. Punctuation is allowed and helpful; use it as it would be spoken.
5. If the audio is silent, contains only background noise, or is unintelligible, output EXACTLY the token [inaudible] — nothing else.`;

function mimeToExt(mimeType) {
  if (mimeType.includes("webm")) return "webm";
  if (mimeType.includes("mp4")) return "mp4";
  if (mimeType.includes("ogg")) return "ogg";
  if (mimeType.includes("wav")) return "wav";
  if (mimeType.includes("mpeg") || mimeType.includes("mp3")) return "mp3";
  if (mimeType.includes("aac")) return "aac";
  if (mimeType.includes("flac")) return "flac";
  return "bin";
}

module.exports = {
  callChat,
  callTTS,
  callSTT,
};
