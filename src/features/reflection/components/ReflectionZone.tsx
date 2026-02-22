"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@shared/components/ui/GlassCard";
import { cn } from "@shared/lib/utils";
import { getReflection, upsertReflection, type ReflectionEntry } from "../services/reflection.persistence";
import { CircularProgress } from "@shared/components/ui/CircularProgress";

const MOCK_PROMPTS = [
  "За что вы сегодня больше всего благодарны Всевышнему?",
  "В чем вы проявили терпение (сабр) сегодня?",
  "Какая сура или аят сегодня откликнулись в вашем сердце?",
  "Какую свою слабость вы заметили сегодня и как планируете с ней работать?",
  "Повлиял ли сегодняшний день на вашу связь с Аллахом?",
];

export function ReflectionZone({ className }: { className?: string }) {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<string>("peaceful");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 mins
  const [focusDuration, setFocusDuration] = useState(0); // overall
  const [showPrompt, setShowPrompt] = useState(true);
  
  const [currentPrompt, setCurrentPrompt] = useState(MOCK_PROMPTS[0]);

  const todayStr = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    async function fetchRef() {
      const entry = await getReflection(todayStr);
      if (entry) {
        setContent(entry.content || "");
        setMood(entry.mood || "peaceful");
        setFocusDuration(entry.focus_duration_minutes || 0);
      }
    }
    fetchRef();
  }, [todayStr]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(t => t - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setFocusDuration(f => f + 5);
      handleSave(content, mood, focusDuration + 5);
    }
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerRunning, timeRemaining]);

  const toggleTimer = () => {
    if (timeRemaining === 0) setTimeRemaining(300);
    setIsTimerRunning(!isTimerRunning);
  };

  const formatTime = (sec: number) => {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSave = async (text: string = content, m: string = mood, dur: number = focusDuration) => {
    if (!text.trim() && dur === 0) return;
    await upsertReflection({
      date: todayStr,
      content: text,
      mood: m,
      focus_duration_minutes: dur,
    });
  };

  const refreshPrompt = () => {
    const idx = Math.floor(Math.random() * MOCK_PROMPTS.length);
    setCurrentPrompt(MOCK_PROMPTS[idx]);
  };

  return (
    <div className={cn("relative min-h-[85vh] flex flex-col items-center justify-center p-4 transition-all duration-700", className)}>
      
      {/* Background Deep Blur Effect */}
      <div className="absolute inset-0 z-0 bg-neutral-950/40 backdrop-blur-3xl" />
      
      <div className="relative z-10 w-full max-w-2xl space-y-8">
        
        {/* Header / Focus Timer */}
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <h2 className="text-sm font-semibold tracking-widest text-primary-400 uppercase">Зона Тафаккура</h2>
          <div className="relative cursor-pointer" onClick={toggleTimer}>
            <CircularProgress 
              value={(timeRemaining / 300) * 100} 
              size={120} 
              strokeWidth={4} 
              colorClass={isTimerRunning ? "text-primary-400" : "text-neutral-500"}
              trackColorClass="text-neutral-800"
            >
              <span className={cn("text-3xl font-mono font-bold transition-colors", isTimerRunning ? "text-white" : "text-neutral-400")}>
                {formatTime(timeRemaining)}
              </span>
            </CircularProgress>
            {!isTimerRunning && timeRemaining > 0 && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40 rounded-full backdrop-blur-sm">
                <span className="text-white font-bold text-sm tracking-widest uppercase">Start</span>
              </div>
            )}
          </div>
          <p className="text-xs text-neutral-500">
            {isTimerRunning ? "Сконцентрируйтесь на моменте..." : "Запустите таймер (5 мин) для полного фокуса"}
          </p>
        </div>

        {/* AI Prompt */}
        <AnimatePresence>
          {showPrompt && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="relative p-6 rounded-2xl border border-primary-500/20 bg-primary-950/20 backdrop-blur-xl text-center"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-surface-dark px-3 text-[0.6rem] font-bold tracking-widest text-primary-500 uppercase rounded-full border border-primary-500/20">
                Тема для размышлений
              </span>
              <p className="text-lg text-primary-100 italic leading-relaxed">
                &quot;{currentPrompt}&quot;
              </p>
              <button onClick={refreshPrompt} className="mt-4 text-xs tracking-wider text-primary-500 hover:text-primary-300 uppercase transition-colors">
                Сменить тему
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Journal Input */}
        <div className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => handleSave()}
            placeholder="Запишите свои мысли..."
            className="w-full min-h-[12rem] bg-transparent border-none text-xl md:text-2xl text-white placeholder-neutral-700 focus:ring-0 resize-none font-serif leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
