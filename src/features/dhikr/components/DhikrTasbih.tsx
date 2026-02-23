"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { logDhikrSession } from "../services/dhikr.service";
import { cn } from "@shared/lib/utils";

const DHIKR_TYPES = [
  { id: "subhanallah", arabic: "سُبْحَانَ ٱللَّٰهِ", russian: "Субханаллах" },
  { id: "alhamdulillah", arabic: "ٱلْحَمْدُ لِلَّٰهِ", russian: "Альхамдулиллах" },
  { id: "allahuakbar", arabic: "ٱللَّٰهُ أَكْبَرُ", russian: "Аллаху Акбар" },
  { id: "istighfar", arabic: "أَسْتَغْفِرُ ٱللَّٰهَ", russian: "Астагфируллах" },
];

export function DhikrTasbih({ className }: { className?: string }) {
  const [activeDhikr, setActiveDhikr] = useState(DHIKR_TYPES[0]!);
  const [count, setCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  const triggerVibration = useCallback(() => {
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      // 33 and 99 intervals often have stronger feedback
      if ((count + 1) % 33 === 0) {
        window.navigator.vibrate([100, 50, 100]); // double pulse
      } else {
        window.navigator.vibrate(50); // tiny haptic tap
      }
    }
  }, [count]);

  const handleTap = useCallback(() => {
    triggerVibration();
    setCount((c) => c + 1);
    setSessionCount((c) => c + 1);
  }, [triggerVibration]);

  const handleEndSession = async () => {
    if (sessionCount > 0) {
      await logDhikrSession(activeDhikr.id, sessionCount);
      setSessionCount(0);
    }
  };

  const handleReset = () => {
    handleEndSession();
    setCount(0);
  };

  return (
    <div className={cn("flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-12", className)}>
      
      {/* Dhikr Selector */}
      <div className="flex w-full overflow-x-auto gap-3 pb-2 [&::-webkit-scrollbar]:hidden px-2">
        {DHIKR_TYPES.map((dhikr) => (
          <button
            key={dhikr.id}
            onClick={() => {
              handleEndSession();
              setActiveDhikr(dhikr);
              setCount(0);
            }}
            className={cn(
              "px-5 py-2.5 rounded-2xl whitespace-nowrap text-sm font-bold transition-all whitespace-nowrap",
              activeDhikr.id === dhikr.id
                ? "bg-primary-500 text-white shadow-md shadow-primary-500/20"
                : "bg-surface border border-border text-muted hover:text-main"
            )}
          >
            {dhikr.russian}
          </button>
        ))}
      </div>

      {/* Main Tasbih Area */}
      <div className="flex flex-col items-center justify-center w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDhikr.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center mb-10 text-center"
          >
            <h2 className="text-display-arabic text-5xl md:text-6xl text-primary-500 mb-4">{activeDhikr.arabic}</h2>
            <p className="text-lg font-medium text-muted uppercase tracking-widest">{activeDhikr.russian}</p>
          </motion.div>
        </AnimatePresence>

        {/* The Giant Button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleTap}
          className="relative flex items-center justify-center w-64 h-64 rounded-full bg-surface border-4 border-border shadow-card overflow-hidden group outline-none"
        >
          {/* Inner ripple active state */}
          <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-active:opacity-100 transition-opacity duration-300 rounded-full" />
          
          <span className="text-7xl font-display font-bold text-main tabular-nums tracking-tighter drop-shadow-sm">
            {count}
          </span>

          <svg className="absolute inset-0 w-full h-full -rotate-90">
             <circle 
                cx="128" 
                cy="128" 
                r="124" 
                stroke="currentColor" 
                strokeWidth="8" 
                fill="transparent"
                className="text-primary-500/20"
             />
             <motion.circle 
                cx="128" 
                cy="128" 
                r="124" 
                stroke="currentColor" 
                strokeWidth="8" 
                fill="transparent"
                className="text-primary-500"
                strokeLinecap="round"
                initial={{ strokeDasharray: 2 * Math.PI * 124, strokeDashoffset: 2 * Math.PI * 124 }}
                animate={{ strokeDashoffset: (2 * Math.PI * 124) * (1 - ((count % 33) / 33)) }}
                transition={{ duration: 0.3, ease: "easeOut" }}
             />
          </svg>
        </motion.button>
      </div>

      {/* Actions */}
      <div className="flex w-full max-w-xs items-center justify-between px-6 pt-4 border-t border-border">
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-widest text-muted">Сессия</span>
          <span className="text-xl font-bold text-primary-500">+{sessionCount}</span>
        </div>
        <button
          onClick={handleReset}
          className="px-6 py-2 rounded-xl border border-border bg-surface text-sm font-bold text-muted hover:text-red-400 hover:border-red-400/50 transition-colors"
        >
          Сбросить
        </button>
      </div>
    </div>
  );
}
