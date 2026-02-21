/**
 * @module features/tracker/components/AchievementGrid
 *
 * Сетка бейджей достижений.
 */

"use client";

import { motion } from "framer-motion";
import { Achievement } from "../types/tracker.types";
import { cn } from "@shared/lib/utils";

interface AchievementGridProps {
  achievements: Achievement[];
}

export function AchievementGrid({ achievements }: AchievementGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {achievements.map((achievement, index) => (
        <AchievementCard 
          key={achievement.id} 
          achievement={achievement} 
          index={index}
        />
      ))}
    </div>
  );
}

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const isUnlocked = achievement.status === "unlocked";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className={cn(
        "relative flex flex-col items-center rounded-3xl border p-5 text-center transition-all",
        isUnlocked 
          ? "border-gold-200 bg-gradient-to-br from-gold-50/50 to-white dark:border-gold-800/40 dark:from-gold-950/10 dark:to-surface-dark-secondary" 
          : "border-neutral-100 bg-white opacity-60 grayscale dark:border-neutral-800 dark:bg-neutral-900/40"
      )}
    >
      {/* Icon Container */}
      <div className={cn(
        "mb-3 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl shadow-sm",
        isUnlocked ? "bg-white dark:bg-neutral-800" : "bg-neutral-100 dark:bg-neutral-800"
      )}>
        {achievement.icon}
      </div>

      <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1">
        {achievement.title}
      </h4>
      <p className="mt-1 text-[0.65rem] leading-tight text-neutral-500 dark:text-neutral-500 line-clamp-2">
        {achievement.description}
      </p>

      {/* Progress mini bar */}
      {!isUnlocked && (
        <div className="mt-4 w-full">
          <div className="mb-1 flex justify-between text-[0.6rem] text-neutral-400">
            <span>{achievement.currentValue} / {achievement.target}</span>
            <span>{Math.round(achievement.progress)}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
             <div 
               className="h-full bg-primary-500 transition-all duration-500" 
               style={{ width: `${achievement.progress}%` }}
             />
          </div>
        </div>
      )}

      {/* Unlock glow */}
      {isUnlocked && (
        <div className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-gold-400" />
      )}
    </motion.div>
  );
}
