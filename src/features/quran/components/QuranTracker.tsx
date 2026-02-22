"use client";

import { useState } from "react";
import { SurahList } from "./SurahList";
import { QuranReader } from "./QuranReader";
import { cn } from "@shared/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function QuranTracker({ className }: { className?: string }) {
  const [selectedSurahId, setSelectedSurahId] = useState<number | null>(null);

  return (
    <div className={cn("w-full", className)}>
      <AnimatePresence mode="wait">
        {!selectedSurahId ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-display text-2xl font-bold text-neutral-100">Выберите Суру</h2>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500">114 глав</span>
            </div>
            <SurahList onSelect={(id) => setSelectedSurahId(id)} />
          </motion.div>
        ) : (
          <motion.div
            key="reader"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <QuranReader 
              surahId={selectedSurahId} 
              onBack={() => setSelectedSurahId(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
