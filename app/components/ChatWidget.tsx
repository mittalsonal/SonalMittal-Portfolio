"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { profile } from "@/app/data/profile";
import type { ChatMessage } from "@/app/utils/assistant";

const welcomeMessage: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I'm Sonal's AI assistant. Ask me about her projects, tech stack, experience, or availability."
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const suggestions = useMemo(() => profile.suggestedQuestions, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!open) {
        return;
      }

      if (panelRef.current?.contains(event.target as Node)) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  const submitMessage = async (value?: string) => {
    const content = (value ?? input).trim();

    if (!content || loading) {
      return;
    }

    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: content,
          history: nextMessages.slice(-6)
        })
      });

      const data = (await response.json()) as { reply?: string };
      const reply =
        data.reply ??
        "I can still help with Sonal's background, projects, and availability. Please try again.";

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: reply
        }
      ]);
    } catch (error) {
      console.error("Chat widget error:", error);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "The live assistant is unavailable right now, but Sonal is a full-stack engineer focused on AI-powered systems, Next.js, Node.js, Django, MongoDB, LangChain, and LLM products."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[80] sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 flex h-[min(72vh,500px)] w-[min(88vw,350px)] origin-bottom-right flex-col overflow-hidden rounded-[26px] border border-line/70 bg-[#f7f1e8]/94 shadow-[0_24px_60px_rgba(26,22,18,0.16)] backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line/70 bg-deep px-4 py-3 text-background">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-walnut font-display text-base italic">
                SM
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">Sonal AI Assistant</p>
                {/* <p className="truncate text-xs text-background/50">
                  Recruiter-friendly portfolio guide
                </p> */}
              </div>
              <a
                href={profile.resumePath}
                download
                className="hidden rounded-full border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-background/70 transition-colors duration-300 hover:border-white/40 hover:text-background sm:inline-flex"
                data-cursor="interactive"
              >
                Resume
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-background/60 transition-colors duration-300 hover:text-background"
                aria-label="Close chat"
                data-cursor="interactive"
              >
                &times;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3.5 py-3.5">
              <div className="flex flex-col gap-3">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`max-w-[84%] rounded-[18px] px-3.5 py-3 text-sm leading-6 ${
                      message.role === "assistant"
                        ? "self-start rounded-bl-md border border-line/70 bg-white/72 text-foreground"
                        : "self-end rounded-br-md bg-foreground text-background"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}

                {loading ? (
                  <div className="self-start rounded-[18px] rounded-bl-md border border-line/70 bg-white/72 px-3.5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:-0.2s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:-0.1s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted" />
                    </div>
                  </div>
                ) : null}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-line/70 bg-white/45 px-3.5 py-3">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => submitMessage(suggestion)}
                    className="whitespace-nowrap rounded-full border border-line/80 bg-background/70 px-3 py-2 text-xs text-muted transition-colors duration-300 hover:bg-foreground hover:text-background"
                    data-cursor="interactive"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      void submitMessage();
                    }
                  }}
                  placeholder="Ask about projects, stack, or hiring..."
                  className="min-w-0 flex-1 rounded-full border border-line/80 bg-[#efe7da] px-4 py-3 text-sm outline-none transition-colors duration-300 placeholder:text-muted focus:border-walnut"
                />
                <button
                  type="button"
                  onClick={() => void submitMessage()}
                  disabled={loading}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-colors duration-300 hover:bg-walnut disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="Send message"
                  data-cursor="interactive"
                >
                  -&gt;
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
  type="button"
  whileHover={{ y: -4, scale: 1.04 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => setOpen((current) => !current)}
  className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-deep text-background shadow-glow"
  aria-label="Open chat assistant"
  data-cursor="interactive"
>
  <Image
    src="/images/chatbot.png"
    alt="Chatbot"
    width={32}
    height={32}
    className="object-contain invert"
  />
</motion.button>
    </div>
  );
}
