"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@shared/lib/utils";

interface HabitItem {
  id: string;
  title: string;
  icon: string;
  current: number;
  target: number;
  unit: string;
  colorClass: string;
  bgClass: string;
  incrementBase: number;
}

const initialHabits: HabitItem[] = [
  { id: "quran", title: "Коран", icon: "📖", current: 8, target: 20, unit: "стр", colorClass: "text-gold-400", bgClass: "hover:bg-gold-500/10 hover:border-gold-500/30", incrementBase: 2 },
  { id: "nawafil", title: "Навафиль", icon: "🕌", current: 2, target: 12, unit: "ракаат", colorClass: "text-primary-400", bgClass: "hover:bg-primary-500/10 hover:border-primary-500/30", incrementBase: 2 },
  { id: "dhikr", title: "Азкар", icon: "📿", current: 33, target: 100, unit: "раз", colorClass: "text-blue-400", bgClass: "hover:bg-blue-500/10 hover:border-blue-500/30", incrementBase: 33 },
  { id: "sadaqah", title: "Садака", icon: "🤲", current: 0, target: 1, unit: "раз", colorClass: "text-emerald-400", bgClass: "hover:bg-emerald-500/10 hover:border-emerald-500/30", incrementBase: 1 },
];

export function HabitsWidget({ className }: { className?: string }) {
  const [habits, setHabits] = useState(initialHabits);

  const handleIncrement = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setHabits(prev => prev.map(h => {
      if (h.id === id && h.current < h.target) {
        return { ...h, current: Math.min(h.current + h.incrementBase, h.target) };
      }
      return h;
    }));
  };

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold tracking-wider text-neutral-300">КОРАН И СУННА</h2>
        <span className="text-[0.65rem] text-primary-500 uppercase cursor-pointer hover:text-primary-400 transition-colors">Изменить</span>
      </div>
      
      {/* Scrollable Container */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {habits.map((habit) => {
          const isComplete = habit.current === habit.target;
          const progress = (habit.current / habit.target) * 100;
          
          return (
            <motion.button
              key={habit.id}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleIncrement(habit.id, e)}
              className={cn(
                "group relative flex min-w-[140px] flex-col items-start gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-left transition-all duration-300 backdrop-blur-md snap-start shrink-0 overflow-hidden",
                isComplete && "border-primary-500/30 bg-primary-500/10",
                habit.bgClass
              )}
            >
              {/* Background Progress Fill Layer */}
              <div 
                className="absolute inset-y-0 left-0 z-0 bg-white/5 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
              
              <div className="z-10 flex w-full items-start justify-between">
                <span className="text-2xl drop-shadow-md transition-transform group-hover:scale-110">{habit.icon}</span>
                {isComplete && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] text-white"
                  >
                    ✓
                  </motion.span>
                )}
              </div>
              
              <div className="z-10 mt-1">
                <h3 className="text-sm font-medium text-white drop-shadow-md">{habit.title}</h3>
                <p className={cn("mt-1 flex items-baseline gap-1 font-mono text-lg font-bold drop-shadow-md", habit.colorClass)}>
                  {habit.current} <span className="text-[0.6rem] font-medium text-neutral-400">/ {habit.target} {habit.unit}</span>
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
