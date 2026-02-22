"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@shared/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Ас-саляму алейкум! Я ваш персональный духовный ассистент. Чем я могу помочь вам сегодня?",
    timestamp: new Date(),
  },
];

export function AssistantChat({ className }: { className?: string }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Бисмиллях. Я анализирую ваш прогресс... (Эта функция будет доступна после интеграции API)",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={cn("mx-auto max-w-2xl px-4 py-8 md:py-16 flex flex-col h-[85vh]", className)}>
      <div className="mb-8 text-center">
        <h1 className="text-display text-4xl font-bold text-neutral-100">Иман Помощник</h1>
        <p className="text-neutral-500 text-sm mt-2">Духовные советы на основе вашего прогресса</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-4 [&::-webkit-scrollbar]:w-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex flex-col max-w-[85%]",
              msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            <div
              className={cn(
                "rounded-2xl px-6 py-4 text-sm leading-relaxed",
                msg.role === "user"
                  ? "bg-primary text-white"
                  : "bg-surface-card border border-white/5 text-neutral-200"
              )}
            >
              {msg.content}
            </div>
            <span className="mt-1 text-[10px] text-neutral-600 uppercase tracking-tighter px-2">
              {msg.timestamp.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-neutral-500 bg-surface-card border border-white/5 rounded-2xl px-6 py-3 mr-auto max-w-fit">
            <span className="flex h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
            <span className="flex h-1.5 w-1.5 animate-bounce rounded-full bg-primary delay-75" />
            <span className="flex h-1.5 w-1.5 animate-bounce rounded-full bg-primary delay-150" />
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="mt-8 relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Спросите о прогрессе или аятах..."
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-neutral-100 placeholder-neutral-600 focus:border-primary/50 focus:ring-0 outline-none transition-all"
        />
        <button
          onClick={handleSend}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-white active:scale-90 transition-transform"
        >
          →
        </button>
      </div>
    </div>
  );
}
