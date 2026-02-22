"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@shared/components/ui/GlassCard";
import { cn } from "@shared/lib/utils";
import type { PrayerLog } from "../services/prayer.persistence";
import type { PrayerTime } from "../types/prayer.types";
import type { PrayerStatus as DBPrayerStatus } from "@shared/types/supabase";

interface PrayerLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  prayer: PrayerTime | null;
  onSave: (log: Partial<PrayerLog>) => void;
  existingLog?: PrayerLog;
}

export function PrayerLogModal({ isOpen, onClose, prayer, onSave, existingLog }: PrayerLogModalProps) {
  const [status, setStatus] = useState<DBPrayerStatus>((existingLog?.status as DBPrayerStatus) || "completed");
  const [concentration, setConcentration] = useState<number>(existingLog?.concentrationLevel || 3);
  const [location, setLocation] = useState<"mosque" | "home" | "travel">(existingLog?.location || "home");
  const [emotionalState, setEmotionalState] = useState<string>(existingLog?.emotionalState || "");

  if (!prayer) return null;

  const handleSave = () => {
    onSave({
      status,
      concentrationLevel: concentration,
      location,
      emotionalState,
      onTime: status === "completed", // Simplification
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="relative w-full max-w-md pb-safe-bottom sm:rounded-3xl"
          >
            <GlassCard className="rounded-b-none sm:rounded-b-3xl border-b-0 sm:border-b p-6 bg-surface-dark-secondary/90 backdrop-blur-2xl">
              <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-white/20 sm:hidden" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/20 text-2xl text-primary-400">
                  {prayer.info.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{prayer.info.nameRu}</h3>
                  <p className="font-arabic text-primary-400">{prayer.info.nameAr}</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Status Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold tracking-wider text-neutral-400">СТАТУС (ОТМЕТКА)</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setStatus("completed")}
                      className={cn("flex-1 py-2 rounded-xl text-sm font-medium transition-all", status === "completed" ? "bg-primary-500 text-white shadow-glow" : "bg-white/5 text-neutral-400")}
                    >Вовремя</button>
                    <button 
                      onClick={() => setStatus("qada")}
                      className={cn("flex-1 py-2 rounded-xl text-sm font-medium transition-all", status === "qada" ? "bg-yellow-500 text-white shadow-[0_0_15px_rgba(234,179,8,0.3)]" : "bg-white/5 text-neutral-400")}
                    >Каза (Опоздал)</button>
                    <button 
                      onClick={() => setStatus("missed")}
                      className={cn("flex-1 py-2 rounded-xl text-sm font-medium transition-all", status === "missed" ? "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]" : "bg-white/5 text-neutral-400")}
                    >Пропустил</button>
                  </div>
                </div>

                {/* Additional deep tracking only if completed or skipped */}
                {status !== "missed" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-6">
                    {/* Location */}
                    <div className="space-y-3">
                      <label className="text-xs font-semibold tracking-wider text-neutral-400">ГДЕ ЧИТАЛИ?</label>
                      <div className="flex gap-2">
                        {[
                          { val: "mosque", label: "🕌 Мечеть" },
                          { val: "home", label: "🏠 Дома" },
                          { val: "travel", label: "🚗 В пути" }
                        ].map(opt => (
                          <button
                            key={opt.val}
                            onClick={() => setLocation(opt.val as any)}
                            className={cn("flex-1 py-2 rounded-xl text-sm font-medium transition-all border border-white/5", location === opt.val ? "bg-white/20 text-white border-white/20" : "bg-white/5 text-neutral-400")}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Concentration */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold tracking-wider text-neutral-400">ХУШУ (КОНЦЕНТРАЦИЯ)</label>
                        <span className="text-xs text-primary-400">{concentration} / 5</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" max="5" 
                        value={concentration} 
                        onChange={(e) => setConcentration(parseInt(e.target.value))}
                        className="w-full accent-primary-500"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-500">
                        <span>Много мыслей</span>
                        <span>Полный фокус</span>
                      </div>
                    </div>

                    {/* Emotional Reflection */}
                    <div className="space-y-3">
                      <label className="text-xs font-semibold tracking-wider text-neutral-400">ЭМОЦИОНАЛЬНОЕ СОСТОЯНИЕ</label>
                      <textarea 
                        placeholder="Что вы чувствуете после намаза? Был ли покой?"
                        value={emotionalState}
                        onChange={(e) => setEmotionalState(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none resize-none h-20"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Save Button */}
                <button 
                  onClick={handleSave}
                  className="w-full rounded-2xl bg-primary-600 py-3.5 text-sm font-bold text-white transition-all hover:bg-primary-500 active:scale-95 mt-4"
                >
                  Сохранить запись
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
