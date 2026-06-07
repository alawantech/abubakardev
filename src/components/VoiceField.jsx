import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMicrophone,
  FaStop,
  FaTrash,
  FaPlay,
  FaPause,
  FaExclamationTriangle,
  FaCheck
} from "react-icons/fa";
import "./VoiceField.css";

function getSupportedMimeType() {
  const types = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
    "audio/ogg"
  ];
  for (const t of types) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t)) return t;
  }
  return "";
}

function formatDuration(secs) {
  if (!isFinite(secs) || isNaN(secs) || secs < 0) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function VoiceField({
  label,
  value,
  onTextChange,
  audioBlob,
  audioDurationSec,
  onAudioChange,
  onAudioClear,
  placeholder = "",
  helpText,
  optional = false,
  rows = 4,
  maxLength = 4000
}) {
  const [recording, setRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);

  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const tickRef = useRef(null);
  const startedAtRef = useRef(0);
  const audioRef = useRef(null);
  const audioUrlRef = useRef(null);

  useEffect(() => {
    return () => {
      if (recorderRef.current && recorderRef.current.state === "recording") {
        try { recorderRef.current.stop(); } catch { /* ignore */ }
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  useEffect(() => {
    if (!audioBlob) {
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }
      setIsPlaying(false);
      setPlaybackTime(0);
      return;
    }
    const url = URL.createObjectURL(audioBlob);
    audioUrlRef.current = url;
    return () => URL.revokeObjectURL(url);
  }, [audioBlob]);

  const startRecording = async () => {
    setError("");
    if (typeof MediaRecorder === "undefined") {
      setError("Audio recording isn't supported in this browser. Please type your answer.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = getSupportedMimeType();
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        const elapsed = (Date.now() - startedAtRef.current) / 1000;
        onAudioChange(blob, Math.round(elapsed * 10) / 10);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
        if (tickRef.current) {
          clearInterval(tickRef.current);
          tickRef.current = null;
        }
      };
      recorder.onerror = (e) => {
        console.error("MediaRecorder error:", e);
        setError("Recording failed. Please try again.");
        setRecording(false);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
        if (tickRef.current) {
          clearInterval(tickRef.current);
          tickRef.current = null;
        }
      };
      startedAtRef.current = Date.now();
      setRecordTime(0);
      recorder.start();
      tickRef.current = setInterval(() => {
        setRecordTime((Date.now() - startedAtRef.current) / 1000);
      }, 200);
      setRecording(true);
    } catch (err) {
      console.error("getUserMedia error:", err);
      if (err && err.name === "NotAllowedError") {
        setError("Microphone permission denied. You can type your answer instead.");
      } else if (err && err.name === "NotFoundError") {
        setError("No microphone found. You can type your answer instead.");
      } else {
        setError("Couldn't access the microphone. You can type your answer instead.");
      }
    }
  };

  const stopRecording = () => {
    if (recorderRef.current && recorderRef.current.state === "recording") {
      recorderRef.current.stop();
    }
    setRecording(false);
  };

  const cancelRecording = () => {
    if (recorderRef.current && recorderRef.current.state === "recording") {
      chunksRef.current = [];
      recorderRef.current.onstop = null;
      try { recorderRef.current.stop(); } catch { /* ignore */ }
    }
    setRecording(false);
    setRecordTime(0);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  };

  const clearAudio = () => {
    onAudioClear();
  };

  const togglePlayback = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setIsPlaying(true);
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="vf-wrap">
      <div className="vf-textarea-row">
        <textarea
          className="bc-input bc-textarea vf-textarea"
          rows={rows}
          value={value || ""}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
        />
        <div className="vf-mic-stack">
          <button
            type="button"
            onClick={recording ? stopRecording : startRecording}
            className={`vf-mic-btn ${recording ? "recording" : ""} ${audioBlob ? "has-audio" : ""}`}
            title={recording ? "Stop recording" : "Record a voice note"}
            aria-label={recording ? "Stop recording" : "Record a voice note"}
          >
            {audioBlob && !recording ? <FaCheck /> : recording ? <FaStop /> : <FaMicrophone />}
          </button>
          <span className="vf-mic-hint">{recording ? "Tap to stop" : "Mic"}</span>
        </div>
      </div>

      <div className="vf-bottom">
        <AnimatePresence mode="wait">
          {recording && (
            <motion.div
              key="recording"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="vf-recording-bar"
            >
              <span className="vf-rec-dot" />
              <span className="vf-rec-label">Recording voice note</span>
              <span className="vf-rec-time">{formatDuration(recordTime)}</span>
              <button type="button" onClick={cancelRecording} className="vf-rec-cancel">Cancel</button>
            </motion.div>
          )}

          {!recording && audioBlob && (
            <motion.div
              key="audio"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="vf-audio-bar"
            >
              <button
                type="button"
                onClick={togglePlayback}
                className="vf-play-btn"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <div className="vf-audio-wave">
                <div className="vf-audio-meta">
                  <span className="vf-audio-tag">Voice note attached</span>
                  <span className="vf-audio-duration">{formatDuration(audioDurationSec || 0)}</span>
                </div>
                <div className="vf-audio-track">
                  <div
                    className="vf-audio-fill"
                    style={{
                      width: `${audioDurationSec > 0 ? Math.min(100, (playbackTime / audioDurationSec) * 100) : 0}%`
                    }}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={clearAudio}
                className="vf-audio-remove"
                aria-label="Remove voice note"
                title="Remove"
              >
                <FaTrash />
              </button>
              <audio
                ref={audioRef}
                src={audioUrlRef.current || ""}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => { setIsPlaying(false); setPlaybackTime(0); }}
                onTimeUpdate={(e) => setPlaybackTime(e.target.currentTime)}
                preload="metadata"
                style={{ display: "none" }}
              />
            </motion.div>
          )}

          {!recording && !audioBlob && helpText && (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="vf-hint"
            >
              {helpText}
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="vf-error">
            <FaExclamationTriangle /> {error}
          </div>
        )}
      </div>
    </div>
  );
}
