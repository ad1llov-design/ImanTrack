"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@shared/components/ui/GlassCard";
import { cn } from "@shared/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Ассаляму алейкум! Я ваш духовный наставник и помощник. Я вижу ваши успехи в трекере. Чем я могу помочь вам сегодня в вашем духовном росте?",
  }
];

export function AssistantChat({ className }: { className?: string }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Mock API response
    setTimeout(() => {
      const gptMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: "assistant", 
        content: "ИншаАллах, это отличный план. Помните слова Пророка (мир ему и благословение): «Самые любимые дела для Аллаха — это те, которые совершаются постоянно, даже если они малы». Не усердствуйте сверх меры, чтобы не выгореть, двигайтесь маленькими, но стабильными шагами."
      };
      setMessages((prev) => [...prev, gptMsg]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className={cn("flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] w-full max-w-3xl mx-auto", className)}>
      
      {/* Header Info */}
      <GlassCard className="p-4 mb-4 flex items-center gap-4 bg-primary-950/20 border-primary-500/20 shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/20 text-2xl shadow-glow">
          🤖
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Духовный Ментор (AI)</h2>
          <p className="text-xs text-primary-400">Глубокий анализ данных трекера (Demo)</p>
        </div>
      </GlassCard>

      {/* Chat Messages */}
      <GlassCard className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 space-y-2 !rounded-b-none border-b-0">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex w-full",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div 
              className={cn(
                "max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed",
                msg.role === "user" 
                  ? "bg-primary-600 text-white rounded-tr-sm" 
                  : "bg-surface-dark-secondary/80 border border-white/5 text-neutral-200 rounded-tl-sm shadow-card"
              )}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex w-full justify-start">
            <div className="max-w-[85%] rounded-2xl p-4 bg-surface-dark-secondary/80 border border-white/5 rounded-tl-sm flex gap-1 items-center">
              <span className="h-2 w-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="h-2 w-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="h-2 w-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </motion.div>
        )}
      </GlassCard>

      {/* Input Area */}
      <div className="shrink-0 p-4 border-t border-white/10 bg-surface-dark-secondary/50 backdrop-blur-3xl rounded-b-3xl sm:rounded-b-[2rem]">
        <div className="relative flex items-center w-full max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Спросите совета, поделитесь мыслями..."
            className="w-full bg-neutral-900/50 border border-white/10 text-white rounded-full py-4 pl-6 pr-14 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-medium placeholder-neutral-500"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 flex items-center justify-center h-10 w-10 bg-primary-500 rounded-full text-white hover:bg-primary-400 transition-all disabled:opacity-50 disabled:hover:bg-primary-500 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -ml-0.5">
              <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
