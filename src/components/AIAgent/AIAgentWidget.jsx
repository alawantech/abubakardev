import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import useGeminiLive from "./useGeminiLive";
import "./AIAgentWidget.css";

const AGENT_NAME = "AbubakarDev AI";
const AGENT_INITIALS = "AD";

const STATUS_LABELS = {
  idle: "Online",
  thinking: "AI Thinking...",
  speaking: "AI Speaking...",
  listening: "Listening...",
};

function AIAgentWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();

  const {
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
  } = useGeminiLive();

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-connect when widget opens
  useEffect(() => {
    if (isOpen && connectionState === "disconnected") {
      startSession();
    }
  }, [isOpen, connectionState, startSession]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isVoiceMode) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isVoiceMode]);

  // Hide on certain pages
  if (location.pathname === "/dashboard" || location.pathname.includes("/learn")) {
    return null;
  }

  function handleSend() {
    if (!inputText.trim()) return;
    sendText(inputText);
    setInputText("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleToggleVoiceCall() {
    if (isVoiceMode) {
      endVoiceCall();
    } else {
      startVoiceCall();
    }
  }

  // --- Closed state: floating trigger button ---
  if (!isOpen) {
    return (
      <button
        className={`ai-agent-trigger ${aiState !== "idle" ? "active" : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
          <path d="M9 22v1" />
          <path d="M15 22v1" />
          <path d="M10 9h4" />
          <path d="M12 9v4" />
        </svg>
      </button>
    );
  }

  // --- Open state: full widget ---
  return (
    <div className="ai-agent-widget">
      {/* Header */}
      <div className="ai-agent-header">
        <div className="ai-agent-header-left">
          <div className="ai-agent-avatar">{AGENT_INITIALS}</div>
          <div className="ai-agent-header-info">
            <h3>{AGENT_NAME}</h3>
            <p>Software Development Consultant</p>
          </div>
        </div>
        <button
          className="ai-agent-close"
          onClick={() => {
            endSession();
            setIsOpen(false);
          }}
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Status bar */}
      <div className="ai-agent-status">
        <div className={`ai-status-dot ${connectionState === "connected" ? "connected" : ""} ${aiState}`} />
        <span>
          {connectionState === "connecting"
            ? "Connecting..."
            : STATUS_LABELS[aiState] || "Online"}
        </span>
      </div>

      {/* Voice call overlay */}
      {isVoiceMode && (
        <div className="ai-agent-voice-overlay">
          <div className={`ai-voice-avatar ${aiState}`}>
            {AGENT_INITIALS}
          </div>
          <div className="ai-voice-state">{STATUS_LABELS[aiState]}</div>
          {messages.length > 0 && (
            <div className="ai-voice-transcript">
              {messages[messages.length - 1]?.text || ""}
            </div>
          )}
          <div className="ai-voice-controls">
            <button
              className="ai-voice-btn end-call"
              onClick={handleToggleVoiceCall}
              aria-label="End call"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.956.956 0 0 1-.29-.7c0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28a11.27 11.27 0 0 0-2.67-1.85.996.996 0 0 1-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="ai-agent-messages">
        {connectionState === "connecting" && (
          <div className="ai-agent-connecting">
            <div className="ai-agent-spinner" />
            <span>Connecting to AI...</span>
          </div>
        )}

        {messages.length === 0 && connectionState === "connected" && !isVoiceMode && (
          <div className="ai-agent-welcome">
            <h4>Sannu! Welcome to {AGENT_NAME}</h4>
            <p>
              I&apos;m your software development consultant. I can help you plan
              and build web apps, mobile apps, and custom software solutions.
              <br /><br />
              Tell me about your project, or ask me anything!
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`ai-msg ${msg.role}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Error */}
      {error && <div className="ai-agent-error">{error}</div>}

      {/* Input area */}
      {!isVoiceMode && (
        <div className="ai-agent-input-area">
          <button
            className={`ai-agent-mic-btn ${isRecording ? "recording" : ""}`}
            onClick={toggleRecording}
            aria-label={isRecording ? "Stop recording" : "Voice note"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              {isRecording ? (
                <rect x="6" y="6" width="12" height="12" rx="2" />
              ) : (
                <>
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                </>
              )}
            </svg>
          </button>

          <input
            ref={inputRef}
            className="ai-agent-text-input"
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={connectionState !== "connected"}
          />

          <button
            className="ai-agent-send-btn"
            onClick={handleSend}
            disabled={!inputText.trim() || connectionState !== "connected"}
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>

          <button
            className="ai-agent-call-btn"
            onClick={handleToggleVoiceCall}
            aria-label="Start voice call"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default AIAgentWidget;
