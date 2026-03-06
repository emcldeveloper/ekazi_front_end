import { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────
//  CONFIGURATION — Edit this to match Ekazi
// ─────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the official Ekazi Assistant — a friendly, helpful support bot for the Ekazi job and recruitment platform based in Tanzania.

You help users with:
- Searching and applying for jobs on Ekazi
- Posting job vacancies (for employers/companies)
- Account registration, login, and profile setup
- How the platform works: filters, job alerts, notifications
- Application tracking and status updates
- Pricing, subscription plans, and premium features
- Troubleshooting common issues

Tone: Warm, concise, and professional. Use simple language.
Language: Respond in the same language the user writes in — support both English and Swahili.

If you don't know a specific Ekazi detail (e.g. exact pricing), say so honestly and suggest visiting ekazi.co.tz or contacting Ekazi support.`;

const QUICK_REPLIES = [
  "How do I post a job?",
  "How do I apply for jobs?",
  "How do I create an account?",
  "Is Ekazi free to use?",
  "How do I reset my password?",
];

// ─────────────────────────────────────────────
//  TYPING INDICATOR
// ─────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        EK
      </div>
      <div className="bg-slate-800 border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-green-400 animate-bounce"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: "0.9s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  MESSAGE BUBBLE
// ─────────────────────────────────────────────
function MessageBubble({ role, text }) {
  const isBot = role === "bot";
  return (
    <div
      className={`flex items-end gap-2 ${isBot ? "" : "flex-row-reverse"} animate-fade-in`}
    >
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
          isBot
            ? "bg-gradient-to-br from-green-600 to-green-400"
            : "bg-gradient-to-br from-blue-600 to-blue-400"
        }`}
      >
        {isBot ? "EK" : "ME"}
      </div>
      <div
        className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isBot
            ? "bg-slate-800 border border-white/5 text-slate-300 rounded-bl-sm"
            : "bg-gradient-to-br from-green-600 to-green-700 text-white rounded-br-sm"
        }`}
        dangerouslySetInnerHTML={{
          __html: text
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br/>"),
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
//  MAIN CHATBOT COMPONENT
// ─────────────────────────────────────────────
export default function EkaziChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Hi! I'm the **Ekazi Assistant**.\n\nI can help you find jobs, post vacancies, set up your account, and anything else about the Ekazi platform.\n\nWhat can I help you with today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || isLoading) return;

    setShowQuickReplies(false);
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    const newHistory = [...history, { role: "user", content: userText }];
    setHistory(newHistory);
    setInput("");
    setIsLoading(true);

    try {
      // ── BACKEND CALL ──────────────────────────────────
      // In production, replace this URL with your own API route:
      //   const res = await fetch("/api/chat", { ... })
      //
      // For now this calls Claude directly (dev/testing only).
      // NEVER ship an API key in frontend code to production!
      // ──────────────────────────────────────────────────
      const res = await fetch(
        "https://api.restaurant.faharii.com/api/v1/chatbot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newHistory }),
        },
      );

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      const reply = data.reply;

      setHistory((prev) => [...prev, { role: "assistant", content: reply }]);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `❌ Something went wrong: ${err.message}. Please try again.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── CHAT WINDOW ─────────────────────────────── */}
      <div
        className={`fixed bottom-24 right-6 w-[370px] h-[560px] bg-gray-950 rounded-2xl border border-white/8 shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{
          boxShadow:
            "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(22,163,74,0.12)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-green-900 to-green-800 border-b border-white/5 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-300 flex items-center justify-center text-white font-black text-base flex-shrink-0">
            EK
          </div>
          <div>
            <h3 className="text-white font-bold text-sm leading-tight">
              Ekazi Assistant
            </h3>
            <p className="text-green-300 text-xs flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
              Online · Ready to help
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="ml-auto text-green-300 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-white/10">
          {messages.map((msg, i) => (
            <MessageBubble key={i} role={msg.role} text={msg.text} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        {showQuickReplies && (
          <div className="flex flex-wrap gap-1.5 px-4 pb-2 flex-shrink-0">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs px-3 py-1.5 rounded-full bg-green-950 border border-green-800 text-green-400 hover:bg-green-900 hover:text-green-300 transition-all hover:-translate-y-0.5 whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex items-end gap-2 px-3 pb-4 pt-2 border-t border-white/5 bg-gray-900 flex-shrink-0">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about Ekazi..."
            rows={1}
            className="flex-1 bg-gray-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-green-700 resize-none max-h-24 leading-relaxed transition-colors"
            style={{ scrollbarWidth: "none" }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-900/40"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        <p className="text-center text-xs text-gray-700 pb-2.5 flex-shrink-0">
          Powered by Claude AI · Ekazi Support
        </p>
      </div>

      {/* ── LAUNCHER BUTTON ─────────────────────────── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 shadow-xl shadow-green-900/50 flex items-center justify-center z-50 transition-all hover:scale-110 active:scale-95"
        aria-label="Open Ekazi chat support"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full border-2 border-green-500/40 animate-ping" />
        {isOpen ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
