import { useState, useRef, useCallback, useEffect } from "react";
import { httpsCallable } from "firebase/functions";
import * as firebaseModule from "../../firebase";
const functions = firebaseModule.functions;

function newId(prefix = "m") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result || "";
      const commaIdx = String(result).indexOf(",");
      resolve(commaIdx >= 0 ? String(result).slice(commaIdx + 1) : String(result));
    };
    reader.onerror = () => reject(reader.error || new Error("FileReader failed"));
    reader.readAsDataURL(blob);
  });
}

/**
 * Custom hook for the ZedroTech AI chat agent.
 *
 * Two input modes:
 *  - Text:   sendText(text) -> REST chatWithAgent
 *  - Voice:  WhatsApp-style recorded voice note.
 *            startRecording() -> pause/resume -> sendVoiceNote() / cancelRecording()
 *            Audio is sent to transcribeVoiceNote, the transcript is then
 *            fed back through sendText so the same state machine handles it.
 *
 * Message lifecycle: the user message is added to the chat IMMEDIATELY
 * (with a "transcribing"/"sending" status), then the network operation runs
 * in the background. If it fails, the message stays in the chat with an
 * error indicator and a Retry button — the user never loses their input.
 */
export default function useChatAgent() {
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState(null);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const lastInputKindRef = useRef("text");
  const intentRef = useRef(null);
  const onAutoPlayRef = useRef(null);
  const transcribeFnRef = useRef(null);

  useEffect(() => {
    return () => stopAllTimers();
  }, []);

  function blobToBase64Local(blob) {
    return blobToBase64(blob);
  }

  function stopAllTimers() {
    if (levelTimerRef.current) {
      clearInterval(levelTimerRef.current);
      levelTimerRef.current = null;
    }
    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
      durationTimerRef.current = null;
    }
  }

  function pickMimeType() {
    const candidates = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/mp4",
      "audio/ogg;codecs=opus",
    ];
    if (typeof MediaRecorder === "undefined") return "audio/webm";
    for (const c of candidates) {
      if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(c)) return c;
    }
    return "audio/webm";
  }

  const [recordingState, setRecordingState] = useState("idle");
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const mimeTypeRef = useRef("audio/webm");
  const startedAtRef = useRef(0);
  const accumulatedMsRef = useRef(0);
  const levelTimerRef = useRef(null);
  const durationTimerRef = useRef(null);
  const lastLevelTsRef = useRef(0);

  function startLevelMonitor() {
    if (!analyserRef.current) return;
    const buf = new Uint8Array(analyserRef.current.fftSize);
    levelTimerRef.current = setInterval(() => {
      if (!analyserRef.current) return;
      analyserRef.current.getByteTimeDomainData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i++) {
        const v = (buf[i] - 128) / 128;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / buf.length);
      const smoothed = Math.min(1, rms * 2.5);
      const now = performance.now();
      if (now - lastLevelTsRef.current > 60) {
        lastLevelTsRef.current = now;
        setAudioLevel(smoothed);
      }
    }, 50);
  }

  function startDurationTimer() {
    durationTimerRef.current = setInterval(() => {
      const elapsedMs =
        accumulatedMsRef.current + (performance.now() - startedAtRef.current);
      setRecordingDuration(Math.floor(elapsedMs / 1000));
    }, 250);
  }

  const startRecording = useCallback(async () => {
    if (recordingState !== "idle") return;
    setError(null);
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      setError("Audio recording is not supported in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;

      const mimeType = pickMimeType();
      mimeTypeRef.current = mimeType;
      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onerror = (e) => {
        console.error("MediaRecorder error:", e);
        setError("Recording error. Please try again.");
        cancelRecording();
      };

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0.6;
        source.connect(analyser);
        analyserRef.current = analyser;
      }

      recorder.start(250);
      startedAtRef.current = performance.now();
      accumulatedMsRef.current = 0;
      setRecordingDuration(0);
      setAudioLevel(0);
      setRecordingState("recording");
      startLevelMonitor();
      startDurationTimer();
    } catch (err) {
      console.error("Mic access error:", err);
      setError("Microphone access denied. Please allow microphone access and try again.");
      cleanupRecorder();
    }
  }, [recordingState]);

  const pauseRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state !== "recording") return;
    recorder.pause();
    accumulatedMsRef.current += performance.now() - startedAtRef.current;
    stopAllTimers();
    setAudioLevel(0);
    setRecordingState("paused");
  }, []);

  const resumeRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state !== "paused") return;
    recorder.resume();
    startedAtRef.current = performance.now();
    setRecordingState("recording");
    startLevelMonitor();
    startDurationTimer();
  }, []);

  const cancelRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      try {
        recorder.stop();
      } catch {
        /* ignore */
      }
    }
    cleanupRecorder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendVoiceNote = useCallback(async () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;
    if (recorder.state === "recording") {
      // Add the current session's elapsed time to the accumulated total
      // (the paused-state case was already added in pauseRecording).
      accumulatedMsRef.current += performance.now() - startedAtRef.current;
    } else if (recorder.state === "paused") {
      // Nothing to add — already accumulated when pause was triggered.
    }
    if (recorder.state !== "inactive") {
      recorder.stop();
    }
    const mimeType = mimeTypeRef.current;
    const totalMs = accumulatedMsRef.current;

    await new Promise((resolve) => {
      const r = mediaRecorderRef.current;
      if (!r) return resolve();
      if (r.state === "inactive") return resolve();
      r.onstop = () => resolve();
    });

    const chunks = chunksRef.current;
    cleanupRecorder();

    if (!chunks.length) {
      setError("No audio captured. Please try again.");
      return;
    }
    const blob = new Blob(chunks, { type: mimeType });
    if (blob.size < 800) {
      setError("That voice note is too short. Hold the mic a bit longer.");
      return;
    }

    const voiceMsgId = newId("voice");
    const blobUrl = URL.createObjectURL(blob);
    lastInputKindRef.current = "voice";
    setMessages((prev) => [
      ...prev,
      {
        id: voiceMsgId,
        role: "user",
        kind: "voice",
        text: "Transcribing your voice note…",
        status: "transcribing",
        audioBlob: blob,
        audioBlobUrl: blobUrl,
        audioMimeType: mimeType,
        durationMs: totalMs,
      },
    ]);
    setIsTranscribing(true);

    try {
      const base64 = await blobToBase64(blob);
      const transcribe = httpsCallable(functions, "transcribeVoiceNote");
      const result = await transcribe({ audio: base64, mimeType });
      const transcript = ((result.data && result.data.text) || "").trim();
      if (!transcript) throw new Error("Empty transcription");

      setMessages((prev) =>
        prev.map((m) =>
          m.id === voiceMsgId
            ? { ...m, text: transcript, status: "sending" }
            : m
        )
      );

      await runChatForMessage(voiceMsgId, transcript, { audioResponse: true });
    } catch (err) {
      console.error("Voice note error:", err);
      const message = (err && err.message) || "Failed to transcribe voice note";
      setMessages((prev) =>
        prev.map((m) =>
          m.id === voiceMsgId
            ? {
                ...m,
                status: "error",
                error: message,
                text: "Voice note (transcription failed)",
              }
            : m
        )
      );
    } finally {
      setIsTranscribing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function cleanupRecorder() {
    stopAllTimers();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      const ctx = audioContextRef.current;
      if (ctx.state !== "closed") ctx.close().catch(() => {});
      audioContextRef.current = null;
    }
    mediaRecorderRef.current = null;
    analyserRef.current = null;
    chunksRef.current = [];
    startedAtRef.current = 0;
    accumulatedMsRef.current = 0;
    setRecordingDuration(0);
    setAudioLevel(0);
    setRecordingState("idle");
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendText = useCallback(
    async (text) => {
      const clean = (text || "").trim();
      if (!clean) return;
      const msgId = newId("text");
      lastInputKindRef.current = "text";
      setMessages((prev) => [
        ...prev,
        { id: msgId, role: "user", kind: "text", text: clean, status: "sending" },
      ]);
      try {
        await runChatForMessage(msgId, clean, { audioResponse: false });
      } catch (err) {
        const message = (err && err.message) || "Failed to send message";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, status: "error", error: message } : m
          )
        );
      }
    },
    []
  );

  async function runChatForMessage(userMessageId, userText, options) {
    if (!functions) {
      throw new Error("Firebase Functions is not initialized. Check your .env configuration.");
    }
    setIsSending(true);
    setError(null);
    try {
      const chat = httpsCallable(functions, "chatWithAgent");
      const history = messages
        .filter((m) => m.id !== userMessageId && m.status !== "error")
        .slice(-20)
        .map((m) => ({ role: m.role, text: m.text || "" }));
      const result = await chat({
        message: userText,
        history,
        intent: intentRef.current || null,
        audioResponse: options.audioResponse === true,
      });
      const data = result.data || {};
      setMessages((prev) =>
        prev.map((m) => (m.id === userMessageId ? { ...m, status: "sent" } : m))
      );
      if (data.text) {
        const newMsg = {
          id: newId("agent"),
          role: "agent",
          text: data.text,
          audio: data.audio ? data.audio.data : null,
          audioMimeType: data.audio ? data.audio.mimeType : null,
        };
        setMessages((prev) => [...prev, newMsg]);
        if (newMsg.audio && lastInputKindRef.current === "voice" && onAutoPlayRef.current) {
          setTimeout(() => onAutoPlayRef.current && onAutoPlayRef.current(newMsg.id), 200);
        }
      }
      if (data.leadCaptured) {
        setLeadCaptured(true);
        setMessages((prev) => [
          ...prev,
          { id: newId("cta"), role: "agent", kind: "book_meeting_cta" },
        ]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      throw err;
    } finally {
      setIsSending(false);
    }
  }

  const retryMessage = useCallback(async (msgId) => {
    const msg = messages.find((m) => m.id === msgId);
    if (!msg) return;
    setError(null);

    if (msg.kind === "text") {
      const text = (msg.text || "").trim();
      if (!text) return;
      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, status: "sending", error: undefined } : m))
      );
      try {
        await runChatForMessage(msgId, text, { audioResponse: false });
      } catch (err) {
        const message = (err && err.message) || "Failed to send message";
        setMessages((prev) =>
          prev.map((m) => (m.id === msgId ? { ...m, status: "error", error: message } : m))
        );
      }
    } else if (msg.kind === "voice" && msg.audioBlob) {
      const blob = msg.audioBlob;
      const mimeType = msg.audioMimeType || "audio/webm";
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msgId
            ? { ...m, status: "transcribing", text: "Transcribing your voice note…", error: undefined }
            : m
        )
      );
      setIsTranscribing(true);
      try {
        const base64 = await blobToBase64(blob);
        const transcribe = httpsCallable(functions, "transcribeVoiceNote");
        const result = await transcribe({ audio: base64, mimeType });
        const transcript = ((result.data && result.data.text) || "").trim();
        if (!transcript) throw new Error("Empty transcription");
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, text: transcript, status: "sending" } : m
          )
        );
        await runChatForMessage(msgId, transcript, { audioResponse: true });
      } catch (err) {
        const message = (err && err.message) || "Failed to transcribe voice note";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId
              ? { ...m, status: "error", error: message, text: "Voice note (transcription failed)" }
              : m
          )
        );
      } finally {
        setIsTranscribing(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const removeMessage = useCallback((msgId) => {
    setMessages((prev) => {
      const idx = prev.findIndex((m) => m.id === msgId);
      if (idx === -1) return prev;
      const target = prev[idx];
      if (target && target.audioBlobUrl) {
        try {
          URL.revokeObjectURL(target.audioBlobUrl);
        } catch {
          /* ignore */
        }
      }
      const result = prev.slice(0, idx);
      for (let i = idx + 1; i < prev.length; i++) {
        if (prev[i].role === "user") {
          return [...result, ...prev.slice(i)];
        }
      }
      return result;
    });
  }, []);

  const reset = useCallback(() => {
    cancelRecording();
    setMessages((prev) => {
      prev.forEach((m) => {
        if (m.audioBlobUrl) {
          try {
            URL.revokeObjectURL(m.audioBlobUrl);
          } catch {
            /* ignore */
          }
        }
      });
      return [];
    });
    setError(null);
    setLeadCaptured(false);
    intentRef.current = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancelRecording]);

  const setIntent = useCallback((intent) => {
    intentRef.current = intent || null;
  }, []);

  const requestAutoPlay = useCallback((fn) => {
    onAutoPlayRef.current = typeof fn === "function" ? fn : null;
  }, []);

  const setPlayingMessage = useCallback((id) => {
    setPlayingId(id);
  }, []);

  return {
    messages,
    isSending,
    isTranscribing,
    error,
    leadCaptured,
    playingId,
    recordingState,
    recordingDuration,
    audioLevel,
    startRecording,
    pauseRecording,
    resumeRecording,
    cancelRecording,
    sendVoiceNote,
    sendText,
    retryMessage,
    removeMessage,
    reset,
    setIntent,
    requestAutoPlay,
    setPlayingMessage,
  };
}
