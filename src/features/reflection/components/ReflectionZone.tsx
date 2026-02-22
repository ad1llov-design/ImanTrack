"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@shared/lib/utils";
import { getReflection, upsertReflection } from "../services/reflection.persistence";

const REFLECTIONS_PROMPTS = [
  "За что вы сегодня больше всего благодарны Всевышнему?",
  "В чем вы проявили терпение (сабр) сегодня?",
  "Какая сура или аят сегодня откликнулись в вашем сердце?",
  "Какую свою слабость вы заметили сегодня и как планируете с ней работать?",
  "Повлиял ли сегодняшний день на вашу связь с Аллахом?",
];

export function ReflectionZone() {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<string | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [isSaving, setIsSaving] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(REFLECTIONS_PROMPTS[0]);

  useEffect(() => {
    async function loadToday() {
      const todayString = format(new Date(), "yyyy-MM-dd");
      try {
        const log = await getReflection(todayString);
        if (log) {
          setContent(log.content || "");
          setMood(log.mood);
        }
      } catch (e) {
        console.error("Failed to load reflection:", e);
      }
    }
    loadToday();
    setCurrentPrompt(REFLECTIONS_PROMPTS[Math.floor(Math.random() * REFLECTIONS_PROMPTS.length)]);
  }, []);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await upsertReflection({
        date: format(new Date(), "yyyy-MM-dd"),
        content,
        mood,
        focus_duration_minutes: isTimerRunning ? Math.floor((300 - timeRemaining) / 60) : 5,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-16">
      <div className="mb-12 flex flex-col items-center justify-center text-center">
        <h1 className="text-display text-4xl md:text-5xl font-bold text-neutral-100 mb-4">Тафаккур</h1>
        <p className="text-neutral-500 italic max-w-lg leading-relaxed">
          &quot;Размышление в течение часа лучше, чем целая ночь поклонения.&quot;
        </p>
      </div>

      <div className="grid gap-12">
        {/* Prompt Card */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center ring-1 ring-white/10">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-400 mb-4">Тема для размышления</p>
          <p className="text-display text-xl md:text-2xl text-neutral-100 leading-relaxed">
            {currentPrompt}
          </p>
        </div>

        {/* Focus Timer Mini */}
        <div className="flex items-center justify-center gap-6 py-4">
           <div className="text-3xl font-mono text-neutral-100 tracking-tighter">
             {formatTime(timeRemaining)}
           </div>
           <button 
             onClick={() => setIsTimerRunning(!isTimerRunning)}
             className={cn(
               "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
               isTimerRunning ? "border border-red-500/30 text-red-400 bg-red-500/5" : "border border-primary/30 text-primary-400 bg-primary/5"
             )}
           >
             {isTimerRunning ? "Пауза" : "Тихий режим"}
           </button>
        </div>

        {/* Text Area - Large & Deep */}
        <div className="relative group">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="О чем вы думаете прямо сейчас? Запишите свои мысли..."
            className="h-[40vh] w-full resize-none border-none bg-transparent p-0 text-xl md:text-2xl text-neutral-200 placeholder-neutral-700 outline-none focus:ring-0 leading-relaxed"
          />
          <div className="absolute -bottom-4 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-8">
           <div className="flex gap-4">
              {["🌙", "🌱", "⚖️", "✨"].map(m => (
                <button 
                  key={m} 
                  onClick={() => setMood(m)}
                  className={cn(
                    "h-10 w-10 rounded-xl transition-all border",
                    mood === m ? "border-primary-500 bg-primary/20 scale-110" : "border-white/5 bg-white/5 opacity-40 hover:opacity-100"
                  )}
                >
                  {m}
                </button>
              ))}
           </div>
           <button
             onClick={handleSave}
             disabled={isSaving || !content}
             className="px-8 py-3 rounded-xl bg-primary text-white font-bold text-sm tracking-wide disabled:opacity-30 hover:shadow-glow transition-all active:scale-95"
           >
             {isSaving ? "Сохранение..." : "Сохранить мысли"}
           </button>
        </div>
      </div>
    </div>
  );
}
