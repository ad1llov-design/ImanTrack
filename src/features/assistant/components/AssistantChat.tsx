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

  const [dailyProgress, setDailyProgress] = useState<any>(null);

  useEffect(() => {
    async function fetchProgress() {
      const { getDailyProgress } = await import("../../tracker/services/daily_progress.service");
      const todayStr = new Date().toISOString().split('T')[0] as string;
      const data = await getDailyProgress(todayStr);
      if (data) setDailyProgress(data);
    }
    fetchProgress();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, context: dailyProgress }),
      });
      const data = await res.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "Извините, произошла ошибка.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e) {
      console.error(e);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Произошла ошибка при соединении с помощником.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={cn("mx-auto max-w-2xl px-4 py-8 md:py-16 flex flex-col h-[85vh]", className)}>
      <div className="mb-8 text-center">
        <h1 className="text-display text-4xl font-bold text-main">Иман Помощник</h1>
        <p className="text-muted text-sm mt-2">Ваш контекстный духовный наставник</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-border">
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
                "rounded-2xl px-6 py-4 text-sm leading-relaxed shadow-sm",
                msg.role === "user"
                  ? "bg-primary-500 text-white"
                  : "bg-surface border border-border text-main"
              )}
            >
              {msg.content}
            </div>
            <span className="mt-1 text-[10px] text-muted uppercase tracking-tighter px-2">
              {msg.timestamp.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-muted bg-surface border border-border rounded-2xl px-6 py-3 mr-auto max-w-fit shadow-sm">
            <span className="flex h-1.5 w-1.5 animate-bounce rounded-full bg-primary-400" />
            <span className="flex h-1.5 w-1.5 animate-bounce rounded-full bg-primary-400 delay-75" />
            <span className="flex h-1.5 w-1.5 animate-bounce rounded-full bg-primary-400 delay-150" />
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
          className="w-full rounded-2xl border border-border bg-surface px-6 py-4 text-main placeholder-muted focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 outline-none transition-all shadow-sm"
        />
        <button
          onClick={handleSend}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-xl bg-primary-500 text-white shadow-md active:scale-95 transition-transform hover:bg-primary-600"
        >
          →
        </button>
      </div>
    </div>
  );
}
