import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FaCommentDots, FaPhoneAlt, FaTimes, FaCalendarAlt } from "react-icons/fa";
import useChatAgent from "./useChatAgent";
import { services } from "../../data/services";
import { useUserTimezone } from "../../hooks/useUserTimezone";
import "./AIAgentWidget.css";

const AGENT_NAME = "ZedroTech AI";
const AGENT_INITIALS = "Z";
const WHATSAPP_URL = "https://wa.me/2348156853636";
const CONTACT_EMAIL = "info@zedrotech.com";
export const OPEN_CHAT_EVENT = "open-chat-widget";

function formatDuration(secs) {
  if (!isFinite(secs) || isNaN(secs)) return "0:00";
  const safe = Math.max(0, Math.floor(secs));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function AIAgentWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [intent, setIntent] = useState(null);
  const [showTip, setShowTip] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();
  const userTimezone = useUserTimezone();

  const {
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
    setIntent: setAgentIntent,
    requestAutoPlay,
    setPlayingMessage,
  } = useChatAgent();

  useEffect(() => {
    setAgentIntent(intent);
  }, [intent, setAgentIntent]);

  useEffect(() => {
    requestAutoPlay((id) => {
      const el = document.querySelector(`audio[data-msg-id="${id}"]`);
      if (el && typeof el.play === "function") {
        el.play().catch(() => {});
        setPlayingMessage(id);
      }
    });
    return () => requestAutoPlay(null);
  }, [requestAutoPlay, setPlayingMessage, messages]);

  useEffect(() => {
    if (isOpen) return;
    setPlayingMessage(null);
  }, [isOpen, setPlayingMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending, isTranscribing, recordingState]);

  useEffect(() => {
    if (isOpen && !isSending && !isTranscribing && recordingState === "idle") {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, isSending, isTranscribing, recordingState]);

  useEffect(() => {
    function openHandler(e) {
      const detail = (e && e.detail) || {};
      setIntent(detail.intent || null);
      setIsOpen(true);
    }
    window.addEventListener(OPEN_CHAT_EVENT, openHandler);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, openHandler);
  }, []);

  useEffect(() => {
    if (isOpen) return;
    const t = setTimeout(() => setShowTip(true), 2500);
    const h = setTimeout(() => setShowTip(false), 8500);
    return () => {
      clearTimeout(t);
      clearTimeout(h);
    };
  }, [isOpen]);

  if (location.pathname === "/dashboard" || location.pathname.includes("/learn")) {
    return null;
  }

  function handleSend() {
    if (!inputText.trim() || isSending) return;
    sendText(inputText);
    setInputText("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleMicDown(e) {
    e.preventDefault();
    if (recordingState === "idle") startRecording();
  }

  function handleServiceChip(serviceId, serviceTitle) {
    if (isSending) return;
    sendText(`I'd like to discuss a ${serviceTitle} project.`);
  }

  function handleResetChat() {
    if (recordingState !== "idle") cancelRecording();
    reset();
    setIntent(null);
  }

  function handleClose() {
    if (recordingState !== "idle") cancelRecording();
    setIsOpen(false);
    setIntent(null);
  }

  if (!isOpen) {
    return (
      <div className="ai-floating-host">
        {showTip && (
          <div className="ai-floating-tip" role="status">
            <span className="ai-floating-tip-dot" />
            <div>
              <strong>Hi there 👋</strong>
              <p>Have a project in mind? Chat with us — we reply in seconds.</p>
            </div>
            <button
              className="ai-floating-tip-close"
              onClick={() => setShowTip(false)}
              aria-label="Dismiss"
            >
              <FaTimes size={10} />
            </button>
          </div>
        )}
        <button
          className="ai-agent-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat with ZedroTech"
        >
          <span className="ai-trigger-pulse" aria-hidden="true" />
          <span className="ai-trigger-pulse delay" aria-hidden="true" />
          <span className="ai-trigger-icon">
            <FaCommentDots />
          </span>
          <span className="ai-trigger-online" aria-hidden="true" />
        </button>
      </div>
    );
  }

  const isRecording = recordingState !== "idle";
  const isPaused = recordingState === "paused";
  const showWelcome = messages.length === 0 && !isSending;
  const showQuickReplies = messages.length === 0;

  return (
    <div className="ai-agent-widget">
      {intent === "book_call" && (
        <div className="ai-intent-banner">
          <FaPhoneAlt className="ai-intent-banner-icon" />
          <div className="ai-intent-banner-text">
            <strong>Booking a free 15-min call</strong>
            <span>Tell us a bit about your project, then pick a time.</span>
          </div>
        </div>
      )}

      <div className="ai-agent-header">
        <div className="ai-agent-header-left">
          <div className="ai-agent-avatar">
            {AGENT_INITIALS}
            <span className="ai-agent-avatar-dot" />
          </div>
          <div className="ai-agent-header-info">
            <h3>{AGENT_NAME}</h3>
            <p>
              {isRecording
                ? isPaused
                  ? "Recording paused"
                  : "Listening to voice note…"
                : isSending
                ? "Typing…"
                : "Software Development Consultant"}
            </p>
          </div>
        </div>
        <div className="ai-agent-header-actions">
          {messages.length > 0 && (
            <button
              className="ai-agent-icon-btn"
              onClick={handleResetChat}
              aria-label="Start a new conversation"
              title="New chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
          )}
          <button
            className="ai-agent-close"
            onClick={handleClose}
            aria-label="Close chat"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      <div className={`ai-agent-status ${isRecording ? "recording" : ""} ${isSending || isTranscribing ? "thinking" : ""}`}>
        <div className="ai-status-dot" />
        <span>
          {isTranscribing
            ? "Transcribing your voice note…"
            : isRecording
            ? isPaused
              ? "Recording paused"
              : "Recording…"
            : isSending
            ? "ZedroTech AI is typing…"
            : "Online • replies in seconds"}
        </span>
      </div>

      <div className="ai-agent-messages">
        {showWelcome && (
          <div className="ai-agent-welcome">
            <h4>
              {intent === "book_call"
                ? "Let's book your free call"
                : `Sannu! Welcome to ${AGENT_NAME}`}
            </h4>
            <p>
              {intent === "book_call"
                ? "Tell us about your project so we can prep the call. You can also send a quick voice note — just tap the mic."
                : "I'm your software development consultant. Tell me about your project, or pick a service to get started. You can also send a voice note — just tap the mic."}
            </p>
            {showQuickReplies && (
              <div className="ai-quick-replies">
                {services.map((s) => (
                  <button
                    key={s.id}
                    className="ai-quick-reply"
                    onClick={() => handleServiceChip(s.id, s.shortTitle)}
                    style={{ "--chip-accent": s.accent }}
                  >
                    {s.shortTitle}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {messages.map((msg, i) => {
          if (msg.kind === "book_meeting_cta") {
            return (
              <BookMeetingCard
                key={i}
                userTimezone={userTimezone}
                intent={intent}
              />
            );
          }
          return (
            <UserOrAgentMessage
              key={msg.id || i}
              msg={msg}
              playingId={playingId}
              onPlayingChange={setPlayingMessage}
              onRetry={retryMessage}
              onRemove={removeMessage}
            />
          );
        })}

        {isSending && (
          <div className="ai-msg agent ai-msg-typing" aria-label="AI is typing">
            <span className="ai-typing-dot" />
            <span className="ai-typing-dot" />
            <span className="ai-typing-dot" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {error && <div className="ai-agent-error">{error}</div>}

      {isRecording ? (
        <VoiceRecorder
          duration={recordingDuration}
          audioLevel={audioLevel}
          isPaused={isPaused}
          onCancel={cancelRecording}
          onPause={pauseRecording}
          onResume={resumeRecording}
          onSend={sendVoiceNote}
        />
      ) : (
        <div className="ai-agent-input-area">
          <input
            ref={inputRef}
            className="ai-agent-text-input"
            type="text"
            placeholder={
              isSending || isTranscribing
                ? "Please wait…"
                : intent === "book_call"
                ? "Tell us about your project…"
                : leadCaptured
                ? "Anything else?"
                : "Type a message or tap the mic…"
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSending || isTranscribing}
          />

          {inputText.trim() ? (
            <button
              className="ai-agent-send-btn"
              onClick={handleSend}
              disabled={isSending || isTranscribing}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          ) : (
            <button
              className="ai-agent-mic-btn"
              onClick={handleMicDown}
              disabled={isSending || isTranscribing}
              aria-label="Record a voice note"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function VoiceRecorder({ duration, audioLevel, isPaused, onCancel, onPause, onResume, onSend }) {
  const bars = 24;
  return (
    <div className="ai-voice-recorder">
      <button
        className="ai-voice-rec-btn cancel"
        onClick={onCancel}
        aria-label="Cancel recording"
        title="Cancel"
      >
        <FaTimes />
      </button>

      <div className="ai-voice-rec-center">
        <div className={`ai-voice-rec-indicator ${isPaused ? "paused" : ""}`} />
        <div className="ai-voice-bars" aria-hidden="true">
          {Array.from({ length: bars }).map((_, i) => {
            const phase = (i / bars) * Math.PI * 2;
            const base = 0.25 + audioLevel * 0.75;
            const height = isPaused
              ? 0.25
              : Math.max(0.12, Math.min(1, base * (0.6 + 0.4 * Math.sin(phase + performance.now() / 200))));
            return (
              <span
                key={i}
                className="ai-voice-bar"
                style={{ height: `${height * 100}%` }}
              />
            );
          })}
        </div>
        <div className="ai-voice-rec-time">{formatDuration(duration)}</div>
      </div>

      <button
        className="ai-voice-rec-btn pause"
        onClick={isPaused ? onResume : onPause}
        aria-label={isPaused ? "Resume recording" : "Pause recording"}
        title={isPaused ? "Resume" : "Pause"}
      >
        {isPaused ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        )}
      </button>

      <button
        className="ai-voice-rec-btn send"
        onClick={onSend}
        aria-label="Send voice note"
        title="Send"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </div>
  );
}

function UserOrAgentMessage({ msg, playingId, onPlayingChange, onRetry, onRemove }) {
  const isUser = msg.role === "user";
  const status = msg.status || (isUser ? "sent" : undefined);
  const isError = status === "error";
  const isTranscribing = status === "transcribing";
  const isSending = status === "sending";

  return (
    <div
      className={`ai-msg ${msg.role} ${msg.kind === "voice" ? "voice-msg" : ""} ${isError ? "msg-error" : ""} ${isTranscribing ? "msg-pending" : ""} ${isSending ? "msg-pending" : ""}`}
    >
      {msg.kind === "voice" && isUser && msg.status !== "transcribing" && (
        <UserVoicePlayer
          src={msg.audioBlobUrl}
          durationMs={msg.durationMs}
          status={status}
        />
      )}

      {msg.kind === "voice" && isUser && msg.status === "transcribing" && (
        <div className="ai-user-voice-skeleton" aria-hidden="true">
          <div className="ai-msg-voice-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
            <span>Voice note</span>
          </div>
        </div>
      )}

      <div className="ai-msg-text">
        {isTranscribing && (
          <span className="ai-msg-pending-row">
            <span className="ai-msg-spinner" aria-hidden="true" />
            <span>{msg.text || "Transcribing your voice note…"}</span>
          </span>
        )}
        {isSending && !isTranscribing && (
          <span className="ai-msg-pending-row">
            <span className="ai-msg-spinner" aria-hidden="true" />
            <span>{msg.text}</span>
          </span>
        )}
        {!isTranscribing && !isSending && <span>{msg.text}</span>}
      </div>

      {!isUser && msg.audio && (
        <AudioPlayer
          msgId={msg.id}
          src={`data:${msg.audioMimeType || "audio/wav"};base64,${msg.audio}`}
          playingId={playingId}
          onPlayingChange={onPlayingChange}
        />
      )}

      {isError && (
        <div className="ai-msg-error-row">
          <span className="ai-msg-error-text">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            {msg.error || "Something went wrong"}
          </span>
          <div className="ai-msg-error-actions">
            <button
              type="button"
              className="ai-msg-retry-btn"
              onClick={() => onRetry(msg.id)}
              disabled={isSending || isTranscribing}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.65 6.35A7.95 7.95 0 0 0 12 4a8 8 0 1 0 7.45 11h-2.1A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
              </svg>
              <span>{msg.kind === "voice" ? "Retry transcription" : "Retry"}</span>
            </button>
            <button
              type="button"
              className="ai-msg-remove-btn"
              onClick={() => onRemove(msg.id)}
              aria-label="Remove message"
              title="Remove"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function UserVoicePlayer({ src, durationMs, status }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState((durationMs || 0) / 1000);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const knownSecs = (durationMs || 0) / 1000;
    function onTime() {
      if (isFinite(el.duration) && el.duration > 0 && !isNaN(el.duration)) {
        setDuration(el.duration);
        setProgress(el.currentTime / el.duration);
      } else if (knownSecs > 0) {
        setProgress(el.currentTime / knownSecs);
      }
    }
    function onLoaded() {
      // Prefer our measured durationMs over the browser's metadata —
      // some WebM recordings report Infinity until fully buffered.
      if (knownSecs > 0) {
        setDuration(knownSecs);
      } else if (isFinite(el.duration) && el.duration > 0 && !isNaN(el.duration)) {
        setDuration(el.duration);
      }
    }
    function onEnd() {
      setIsPlaying(false);
      setProgress(0);
    }
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("ended", onEnd);
    };
  }, [durationMs]);

  function togglePlay() {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      el.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }

  return (
    <div className={`ai-user-voice-player ${isPlaying ? "playing" : ""}`}>
      <div className="ai-msg-voice-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
        </svg>
        <span>Voice note</span>
      </div>
      <div className="ai-user-voice-controls">
        <button
          type="button"
          className="ai-user-voice-play"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="ai-user-voice-bar">
          <div className="ai-user-voice-bar-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <span className="ai-user-voice-time">
          {formatDuration(Math.floor(duration))}
        </span>
        <audio ref={audioRef} src={src} preload="metadata" />
      </div>
    </div>
  );
}

function AudioPlayer({ msgId, src, playingId, onPlayingChange }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (playingId !== msgId && isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [playingId, msgId, isPlaying]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    function onTime() {
      if (isFinite(el.duration) && el.duration > 0 && !isNaN(el.duration)) {
        setDuration(el.duration);
        setProgress(el.currentTime / el.duration);
      }
    }
    function onLoaded() {
      if (isFinite(el.duration) && el.duration > 0 && !isNaN(el.duration)) {
        setDuration(el.duration);
      }
    }
    function onEnd() {
      setIsPlaying(false);
      setProgress(0);
      onPlayingChange(null);
    }
    function onPause() {
      setIsPlaying(false);
    }
    function onPlay() {
      setIsPlaying(true);
      onPlayingChange(msgId);
    }
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("ended", onEnd);
    el.addEventListener("pause", onPause);
    el.addEventListener("play", onPlay);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("ended", onEnd);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("play", onPlay);
    };
  }, [msgId, onPlayingChange]);

  function togglePlay() {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
    } else {
      el.play().catch(() => {});
    }
  }

  function seekTo(e) {
    const el = audioRef.current;
    if (!el || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    el.currentTime = ratio * duration;
    setProgress(ratio);
  }

  const elapsed = duration > 0 ? progress * duration : 0;
  const isThisPlaying = isPlaying;

  return (
    <div className={`ai-audio-player ${isThisPlaying ? "playing" : ""}`}>
      <button
        type="button"
        className="ai-audio-play"
        onClick={togglePlay}
        aria-label={isThisPlaying ? "Pause" : "Play"}
      >
        {isThisPlaying ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <div className="ai-audio-track" onClick={seekTo}>
        <div className="ai-audio-bar">
          <div className="ai-audio-bar-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <span className="ai-audio-time">
          {formatDuration(Math.floor(elapsed))} / {formatDuration(Math.floor(duration))}
        </span>
      </div>
      <audio ref={audioRef} src={src} data-msg-id={msgId} preload="metadata" />
    </div>
  );
}

function BookMeetingCard({ userTimezone, intent }) {
  return (
    <div className="ai-msg agent ai-book-cta">
      <div className="ai-book-cta-icon">
        <FaCalendarAlt />
      </div>
      <div className="ai-book-cta-title">
        {intent === "book_call" ? "Pick your free call" : "Book a free 15-min discovery call"}
      </div>
      <div className="ai-book-cta-sub">
        We&apos;ve got your details. Pick whichever channel is easiest for you —
        our team will reply within 24 hours.
        {userTimezone && (
          <>
            <br />
            <span className="ai-book-cta-tz">
              Your time zone: <strong>{userTimezone}</strong>
            </span>
          </>
        )}
      </div>
      <div className="ai-book-cta-actions">
        <a
          className="ai-book-cta-btn primary"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12a11.94 11.94 0 0 0 1.64 6L0 24l6.18-1.62A12 12 0 0 0 24 12c0-3.2-1.25-6.2-3.48-8.52zM12 22a10 10 0 0 1-5.1-1.4l-.36-.22-3.66.96.98-3.57-.24-.37A10 10 0 1 1 22 12 10 10 0 0 1 12 22zm5.46-7.46c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17-.35.22-.65.07a8.27 8.27 0 0 1-2.43-1.5 9.12 9.12 0 0 1-1.68-2.09c-.18-.3 0-.47.13-.62.13-.13.3-.35.45-.52a2.06 2.06 0 0 0 .3-.5.55.55 0 0 0 0-.52c-.07-.15-.67-1.62-.92-2.21s-.49-.5-.67-.5h-.57a1.1 1.1 0 0 0-.8.37 3.36 3.36 0 0 0-1.05 2.5 5.83 5.83 0 0 0 1.22 3.1 13.36 13.36 0 0 0 5.1 4.5c.71.3 1.27.49 1.7.62a4.1 4.1 0 0 0 1.87.12 3.06 3.06 0 0 0 2-1.42 2.5 2.5 0 0 0 .17-1.42c-.07-.12-.27-.2-.57-.35z" />
          </svg>
          <span>WhatsApp call</span>
        </a>
        <a
          className="ai-book-cta-btn secondary"
          href={`https://meet.google.com/new`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM10 16.5v-9l6 4.5-6 4.5z" />
          </svg>
          <span>Google Meet</span>
        </a>
        <a
          className="ai-book-cta-btn tertiary"
          href={`mailto:${CONTACT_EMAIL}?subject=Free%20discovery%20call%20request`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span>Email</span>
        </a>
      </div>
    </div>
  );
}

export default AIAgentWidget;
