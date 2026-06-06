import { useState, useRef, useCallback, useEffect } from "react";
import { httpsCallable } from "firebase/functions";
import * as firebaseModule from "../../firebase";
const functions = firebaseModule.functions;
import { buildSystemPrompt, FUNCTION_DECLARATIONS } from "./systemPrompt";

const WS_URL = "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent";
// 2.0 Flash Live supports both AUDIO and TEXT output, so the model can
// respond with text when the user types, and audio when the user speaks.
const MODEL = "models/gemini-2.0-flash-live-001";
const VOICE_NAME = "Aoede";
const INPUT_SAMPLE_RATE = 16000;
const OUTPUT_SAMPLE_RATE = 24000;
const SCRIPT_BUFFER_SIZE = 4096;

/**
 * Custom hook for Gemini Live API — WebSocket + bidirectional audio streaming.
 *
 * Returns:
 *  - connectionState: "disconnected" | "connecting" | "connected"
 *  - aiState: "idle" | "thinking" | "speaking" | "listening"
 *  - messages: Array<{ role: "user"|"agent", text?: string, audio?: boolean }>
 *  - isVoiceMode: boolean (live call active)
 *  - isRecording: boolean (voice note recording)
 *  - startSession: () => Promise<void>
 *  - endSession: () => void
 *  - sendText: (text: string) => void
 *  - startVoiceCall: () => Promise<void>
 *  - endVoiceCall: () => void
 *  - toggleRecording: () => Promise<void>
 *  - error: string | null
 */
export default function useGeminiLive() {
  const [connectionState, setConnectionState] = useState("disconnected");
  const [aiState, setAiState] = useState("idle");
  const [messages, setMessages] = useState([]);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);

  const wsRef = useRef(null);
  const audioContextRef = useRef(null);
  const micStreamRef = useRef(null);
  const micProcessorRef = useRef(null);
  const nextPlayTimeRef = useRef(0);
  const playbackQueueRef = useRef([]);
  const sessionConfigRef = useRef(null);
  const capturedLeadsRef = useRef(new Set());
  const aiStateRef = useRef("idle");

  // Keep aiStateRef in sync
  useEffect(() => {
    aiStateRef.current = aiState;
  }, [aiState]);

  // --- Audio helpers ---

  function float32ToInt16(float32Array) {
    const int16 = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return int16;
  }

  function int16ToFloat32(int16Array) {
    const float32 = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32[i] = int16Array[i] / 32768;
    }
    return float32;
  }

  function encodePCM16ToBase64(int16Array) {
    const bytes = new Uint8Array(int16Array.buffer);
    let binary = "";
    const chunkSize = 8192;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
    }
    return btoa(binary);
  }

  function decodeBase64ToPCM16(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new Int16Array(bytes.buffer);
  }

  // --- Audio playback queue (gap-free pre-scheduling) ---

  function getAudioContext() {
    if (!audioContextRef.current || audioContextRef.current.state === "closed") {
      audioContextRef.current = new AudioContext({
        sampleRate: OUTPUT_SAMPLE_RATE,
        latencyHint: "interactive",
      });
    }
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }

  // Monitoring timer to detect end of playback
  const monitorTimerRef = useRef(null);

  function queueAudioPlayback(base64Data) {
    try {
      const int16Data = decodeBase64ToPCM16(base64Data);
      if (int16Data.length === 0) return;

      const float32Data = int16ToFloat32(int16Data);
      const ctx = getAudioContext();
      const audioBuffer = ctx.createBuffer(1, float32Data.length, OUTPUT_SAMPLE_RATE);
      audioBuffer.getChannelData(0).set(float32Data);

      playbackQueueRef.current.push(audioBuffer);
      schedulePlayback();
    } catch (e) {
      console.warn("Audio playback error:", e);
    }
  }

  // Pre-schedule up to LOOKAHEAD seconds of audio ahead of time.
  // This eliminates the gap that occurs when waiting for `onended` between chunks.
  const PLAYBACK_LOOKAHEAD = 0.15; // 150ms lookahead

  function schedulePlayback() {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Keep scheduling while there are chunks AND the next start time
    // is within the lookahead window of `now`
    while (playbackQueueRef.current.length > 0) {
      const nextStart = Math.max(now + 0.01, nextPlayTimeRef.current);
      if (nextStart > now + PLAYBACK_LOOKAHEAD) break;

      const buffer = playbackQueueRef.current.shift();
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(nextStart);
      nextPlayTimeRef.current = nextStart + buffer.duration;
    }

    // Start (or restart) the end-of-playback monitor
    startPlaybackMonitor();
  }

  function startPlaybackMonitor() {
    if (monitorTimerRef.current) return; // already monitoring

    monitorTimerRef.current = setInterval(() => {
      const ctx = audioContextRef.current;
      if (!ctx || ctx.state === "closed") {
        stopPlaybackMonitor();
        return;
      }
      // If the queue is empty AND we've passed the last scheduled time,
      // playback has finished
      if (
        playbackQueueRef.current.length === 0 &&
        ctx.currentTime >= nextPlayTimeRef.current - 0.05
      ) {
        stopPlaybackMonitor();
        if (aiStateRef.current === "speaking") {
          setAiState("idle");
        }
      }
    }, 100);
  }

  function stopPlaybackMonitor() {
    if (monitorTimerRef.current) {
      clearInterval(monitorTimerRef.current);
      monitorTimerRef.current = null;
    }
  }

  // --- Microphone capture ---

  async function startMicCapture() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: INPUT_SAMPLE_RATE,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      micStreamRef.current = stream;

      const ctx = getAudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const processor = ctx.createScriptProcessor(SCRIPT_BUFFER_SIZE, 1, 1);
      micProcessorRef.current = processor;

      processor.onaudioprocess = (event) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
        if (aiStateRef.current === "speaking") return; // Don't send while AI is speaking (full-duplex: comment out to enable interruption)

        const inputData = event.inputBuffer.getChannelData(0);
        // Resample if needed (AudioContext may give us a different rate)
        const resampled = resampleAudio(inputData, ctx.sampleRate, INPUT_SAMPLE_RATE);
        const int16Data = float32ToInt16(resampled);
        const base64 = encodePCM16ToBase64(int16Data);

        wsRef.current.send(JSON.stringify({
          realtimeInput: {
            mediaChunks: [{
              mimeType: `audio/pcm;rate=${INPUT_SAMPLE_RATE}`,
              data: base64,
            }],
          },
        }));
      };

      source.connect(processor);
      processor.connect(ctx.destination);
    } catch (err) {
      console.error("Microphone access error:", err);
      setError("Microphone access denied. Please allow microphone access and try again.");
      throw err;
    }
  }

  function stopMicCapture() {
    if (micProcessorRef.current) {
      micProcessorRef.current.disconnect();
      micProcessorRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
  }

  function resampleAudio(inputData, fromRate, toRate) {
    if (fromRate === toRate) return inputData;
    const ratio = fromRate / toRate;
    const newLength = Math.round(inputData.length / ratio);
    const result = new Float32Array(newLength);
    for (let i = 0; i < newLength; i++) {
      const idx = i * ratio;
      const low = Math.floor(idx);
      const high = Math.min(low + 1, inputData.length - 1);
      const frac = idx - low;
      result[i] = inputData[low] * (1 - frac) + inputData[high] * frac;
    }
    return result;
  }

  // --- WebSocket message handling ---

  async function handleServerMessage(data) {
    // Convert Blob to text if needed
    if (data instanceof Blob) {
      data = await data.text();
    }

    try {
      const msg = JSON.parse(data);

      if (msg.setupComplete) {
        setConnectionState("connected");
        setAiState("idle");
        return;
      }

      if (msg.serverContent) {
        const { modelTurn, turnComplete } = msg.serverContent;

        if (modelTurn && modelTurn.parts) {
          let hasAudio = false;
          for (const part of modelTurn.parts) {
            if (part.text) {
              setMessages((prev) => [...prev, { role: "agent", text: part.text }]);
            }
            if (part.inlineData) {
              hasAudio = true;
              queueAudioPlayback(part.inlineData.data);
            }
            if (part.functionCall) {
              handleFunctionCall(part.functionCall);
            }
          }
          if (hasAudio) {
            setAiState("speaking");
          } else {
            // Text-only response: briefly show "thinking" then go idle
            setAiState("thinking");
            setTimeout(() => {
              if (aiStateRef.current === "thinking") {
                setAiState("idle");
              }
            }, 400);
          }
        }

        if (turnComplete) {
          // Let the queued audio finish playing naturally.
          // The monitor will detect end-of-playback and set state to idle.
          // Only reset nextPlayTime if it's in the past (start fresh for next turn)
          const ctx = audioContextRef.current;
          if (ctx && nextPlayTimeRef.current < ctx.currentTime) {
            nextPlayTimeRef.current = 0;
          }
        }
        return;
      }

      // Interrupted — AI stopped speaking
      if (msg.serverContent && msg.serverContent.interrupted) {
        playbackQueueRef.current = [];
        nextPlayTimeRef.current = 0;
        setAiState("idle");
      }
    } catch (e) {
      console.warn("Failed to parse WS message:", e);
    }
  }

  // --- Function calling ---

  async function handleFunctionCall(functionCall) {
    const { name, args } = functionCall;

    if (name === "captureLeadData") {
      const leadKey = `${args.name}-${args.businessType}`;
      if (capturedLeadsRef.current.has(leadKey)) {
        // Already captured this lead, don't duplicate
        sendFunctionResponse(name, { status: "already_captured", message: "Lead already captured." });
        return;
      }

      try {
        setMessages((prev) => [...prev, {
          role: "agent",
          text: "Ina aika bayananku zuwa ga ƙungiyar mu... / Sending your details to our team...",
        }]);

        const captureLead = httpsCallable(functions, "captureLeadToFirestore");
        const result = await captureLead(args);
        capturedLeadsRef.current.add(leadKey);

        sendFunctionResponse(name, { status: "success", leadId: result.data.leadId });

        setMessages((prev) => [...prev, {
          role: "agent",
          text: "An samu! An aika bayananku ga ƙungiyar mu. Za su tuntuɓi ku a cikin sa'oo'i 24. Na gode! / Done! Your details have been sent to our team. They'll reach out to you within 24 hours. Thank you!",
        }]);
      } catch (err) {
        console.error("Lead capture error:", err);
        sendFunctionResponse(name, { status: "error", message: err.message });
      }
    }
  }

  function sendFunctionResponse(name, response) {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({
      clientContent: {
        turns: [{
          role: "user",
          parts: [{
            functionResponse: {
              name,
              response,
            },
          }],
        }],
        turnComplete: true,
      },
    }));
  }

  // --- Session management ---

  async function getSessionConfig() {
    if (sessionConfigRef.current) return sessionConfigRef.current;

    if (!functions) {
      throw new Error("Firebase Functions is not initialized. Please check your .env configuration.");
    }

    try {
      const getAgentSession = httpsCallable(functions, "getAgentSession");
      const result = await getAgentSession();
      sessionConfigRef.current = result.data;
      return sessionConfigRef.current;
    } catch (err) {
      console.error("Failed to get agent session:", err);
      throw new Error("Failed to initialize AI session. Please try again.");
    }
  }

  async function connectWebSocket() {
    const config = await getSessionConfig();

    if (!config.apiKey) {
      throw new Error("Gemini API key not configured. Please set GEMINI_API_KEY in Firebase secrets.");
    }

    const ws = new WebSocket(`${WS_URL}?key=${config.apiKey}`);
    wsRef.current = ws;

    return new Promise((resolve, reject) => {
      ws.onopen = () => {
        const systemInstruction = buildSystemPrompt(config.knowledgeBase);

        const setupMsg = {
          setup: {
            model: MODEL,
            generationConfig: {
              responseModalities: ["AUDIO", "TEXT"],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: VOICE_NAME,
                  },
                },
              },
            },
            systemInstruction: {
              parts: [{ text: systemInstruction }],
            },
            tools: [{
              functionDeclarations: FUNCTION_DECLARATIONS,
            }],
          },
        };

        ws.send(JSON.stringify(setupMsg));
      };

      ws.onmessage = async (event) => {
        let data = event.data;

        // Convert Blob to text if needed
        if (data instanceof Blob) {
          data = await data.text();
        }

        // Check for setupComplete or setup error
        try {
          const msg = JSON.parse(data);
          if (msg.setupComplete) {
            setConnectionState("connected");
            resolve();
            return;
          }
          if (msg.error) {
            console.error("Gemini setup error:", JSON.stringify(msg.error, null, 2));
            setError(`Gemini error: ${msg.error.message || JSON.stringify(msg.error)}`);
            ws.close(1000);
            return;
          }
        } catch {
          // Not JSON, ignore
        }

        handleServerMessage(data);
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        setError("Connection error. Please check your internet and try again.");
        reject(err);
      };

      ws.onclose = (event) => {
        setConnectionState("disconnected");
        console.warn("WebSocket closed:", { code: event.code, reason: event.reason, wasClean: event.wasClean });
        if (event.code !== 1000) {
          setError(`Connection closed (code: ${event.code}${event.reason ? `: ${event.reason}` : ""})`);
        }
      };
    });
  }

  // --- Public API ---

  const startSession = useCallback(async () => {
    if (connectionState === "connected") return;
    setConnectionState("connecting");
    setError(null);
    try {
      await connectWebSocket();
    } catch (err) {
      setConnectionState("disconnected");
      setError(err.message || "Failed to connect.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionState]);

  const endSession = useCallback(() => {
    stopMicCapture();
    stopPlaybackMonitor();
    playbackQueueRef.current = [];
    nextPlayTimeRef.current = 0;

    if (wsRef.current) {
      wsRef.current.close(1000, "Session ended");
      wsRef.current = null;
    }
    setConnectionState("disconnected");
    setAiState("idle");
    setIsVoiceMode(false);
    setIsRecording(false);
  }, []);

  const sendText = useCallback((text) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: text.trim() }]);
    setAiState("thinking");

    wsRef.current.send(JSON.stringify({
      clientContent: {
        turns: [{
          role: "user",
          parts: [{ text: text.trim() }],
        }],
        turnComplete: true,
      },
    }));
  }, []);

  const startVoiceCall = useCallback(async () => {
    if (connectionState !== "connected") {
      await startSession();
    }
    try {
      await startMicCapture();
      setIsVoiceMode(true);
      setAiState("listening");
    } catch (err) {
      setError(err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionState, startSession]);

  const endVoiceCall = useCallback(() => {
    stopMicCapture();
    setIsVoiceMode(false);
    setAiState("idle");
  }, []);

  const toggleRecording = useCallback(async () => {
    if (isRecording) {
      stopMicCapture();
      setIsRecording(false);
      setAiState("idle");
    } else {
      if (connectionState !== "connected") {
        await startSession();
      }
      try {
        await startMicCapture();
        setIsRecording(true);
        setAiState("listening");
      } catch (err) {
        setError(err.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording, connectionState, startSession]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMicCapture();
      stopPlaybackMonitor();
      playbackQueueRef.current = [];
      if (wsRef.current) {
        wsRef.current.close(1000);
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    connectionState,
    aiState,
    messages,
    isVoiceMode,
    isRecording,
    startSession,
    endSession,
    sendText,
    startVoiceCall,
    endVoiceCall,
    toggleRecording,
    error,
  };
}
