import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "assistant";
  content: string;
}

// ─── Hunger type tags ─────────────────────────────────────────────────────────
const HUNGER_TYPES = [
  { label: "I'm physically hungry", value: "I think I'm physically hungry — my stomach is empty." },
  { label: "I'm stressed or overwhelmed", value: "I'm feeling stressed or overwhelmed right now." },
  { label: "I'm bored or restless", value: "I'm feeling bored or restless and not sure what I need." },
  { label: "I'm tired", value: "I'm tired and running low on energy." },
  { label: "I need connection", value: "I'm feeling a bit lonely or disconnected." },
  { label: "Something else", value: "I'm not sure what I'm feeling — I just know something feels off." },
];

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-[oklch(0.72_0.10_75)]"
          style={{
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function CheckIn() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const chatMutation = trpc.checkin.chat.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      setIsTyping(false);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm here with you — something went quiet on my end. Would you like to try again?",
        },
      ]);
      setIsTyping(false);
    },
  });

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Start the conversation with an opening message from the agent
  const handleStart = () => {
    setStarted(true);
    setIsTyping(true);
    const openingMessages: Message[] = [];
    chatMutation.mutate({ messages: openingMessages });
  };

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMessage: Message = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);
    chatMutation.mutate({ messages: updatedMessages });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleQuickReply = (value: string) => {
    sendMessage(value);
  };

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.008_75)] flex flex-col">
      {/* ── Header ── */}
      <header className="py-5 px-6 flex items-center justify-between border-b border-[oklch(0.90_0.010_75)]">
        <Link href="/">
          <span className="font-display text-2xl text-[oklch(0.18_0.01_65)] tracking-wide cursor-pointer hover:text-[oklch(0.32_0.06_135)] transition-colors">
            Savour
          </span>
        </Link>
        <p className="font-body text-xs tracking-[0.15em] uppercase text-[oklch(0.55_0.02_65)]">
          Check-In
        </p>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col max-w-2xl w-full mx-auto px-4 py-8">
        {!started ? (
          /* ── Landing state ── */
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.10_75)] mb-4">
              A Savour Method Tool
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-[oklch(0.18_0.01_65)] leading-[1.1] mb-6">
              What am I <em>actually</em><br />hungry for?
            </h1>
            <p className="font-body text-base text-[oklch(0.50_0.02_65)] leading-relaxed max-w-md mb-4">
              A gentle 5-minute check-in to help you get curious about what you really need right now — no judgment, no advice, just a little more clarity.
            </p>
            <p className="font-body text-sm text-[oklch(0.65_0.02_65)] italic mb-10">
              Built on the Savour Method by Joanna Bourke Lawlor
            </p>

            {/* Quick-start prompts */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {HUNGER_TYPES.map((h) => (
                <button
                  key={h.value}
                  onClick={() => {
                    setStarted(true);
                    setIsTyping(true);
                    const userMessage: Message = { role: "user", content: h.value };
                    setMessages([userMessage]);
                    chatMutation.mutate({ messages: [userMessage] });
                  }}
                  className="font-body text-sm px-4 py-2 border border-[oklch(0.32_0.06_135/0.25)] text-[oklch(0.32_0.06_135)] rounded-full hover:bg-[oklch(0.32_0.06_135/0.08)] transition-colors"
                >
                  {h.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleStart}
              className="font-body text-sm tracking-[0.15em] uppercase bg-[oklch(0.32_0.06_135)] text-[oklch(0.97_0.005_75)] px-8 py-4 hover:bg-[oklch(0.28_0.06_135)] transition-colors"
            >
              Start my check-in
            </button>
          </div>
        ) : (
          /* ── Chat state ── */
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 pb-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-5 py-3 text-sm leading-relaxed font-body ${
                      msg.role === "user"
                        ? "bg-[oklch(0.32_0.06_135)] text-[oklch(0.97_0.005_75)]"
                        : "bg-white border border-[oklch(0.90_0.010_75)] text-[oklch(0.28_0.02_65)]"
                    }`}
                    style={{ borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px" }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className="bg-white border border-[oklch(0.90_0.010_75)]"
                    style={{ borderRadius: "18px 18px 18px 4px" }}
                  >
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="mt-4 flex gap-3 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What's going on for you right now…"
                rows={2}
                disabled={isTyping}
                className="flex-1 resize-none font-body text-sm text-[oklch(0.28_0.02_65)] bg-white border border-[oklch(0.90_0.010_75)] px-4 py-3 placeholder:text-[oklch(0.70_0.02_65)] focus:outline-none focus:border-[oklch(0.32_0.06_135/0.5)] transition-colors disabled:opacity-50"
                style={{ borderRadius: "12px" }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="font-body text-xs tracking-[0.12em] uppercase bg-[oklch(0.32_0.06_135)] text-[oklch(0.97_0.005_75)] px-5 py-3 hover:bg-[oklch(0.28_0.06_135)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed self-end"
                style={{ borderRadius: "12px", minHeight: "48px" }}
              >
                Send
              </button>
            </form>

            <p className="font-body text-xs text-[oklch(0.65_0.02_65)] text-center mt-4 italic">
              This is a reflective tool, not a substitute for professional support.
            </p>
          </div>
        )}
      </main>

      {/* Bounce animation */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
