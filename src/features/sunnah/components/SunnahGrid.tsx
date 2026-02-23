"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@shared/lib/utils";

const SUNNAH_CATEGORIES = [
  { id: "morning", title: "🌅 Утренние Сунны" },
  { id: "prayer", title: "🕌 Сунны Намаза" },
  { id: "night", title: "🌙 Сунны Перед Сном" },
  { id: "character", title: "💎 Сунны Характера" },
];

const SUNNAH_ACTIONS = [
  { id: "miswak", category: "morning", label: "Мисвак", icon: "🪥", description: "Использование мисвака при пробуждении и перед намазом.", source: "«Мисвак очищает рот и радует Господа»", narrator: "Аиша (р.а.)", collection: "Ан-Насаи" },
  { id: "morning_dua", category: "morning", label: "Утренний ду'а", icon: "🤲", description: "Чтение дуа при пробуждении: «Альхамдулиллях...»", source: "«Хвала Аллаху, Который оживил нас после того, как умертвил»", narrator: "Хузайфа (р.а.)", collection: "Аль-Бухари" },
  { id: "fajr_sunnah", category: "morning", label: "Два ракаата Фаджр", icon: "🕋", description: "Два ракаата сунны перед Фаджром — лучше мира и всего в нём.", source: "«Два ракаата перед Фаджром лучше, чем мир и всё, что в нём»", narrator: "Аиша (р.а.)", collection: "Муслим" },
  { id: "rawatib", category: "prayer", label: "Раватиб", icon: "📿", description: "12 ракаатов суннан-раватиб: 2 перед Фаджром, 4+2 Зухр, 2 Магриб, 2 Иша.", source: "«Кто выполняет 12 ракаатов в день... Аллах построит ему дом в Раю»", narrator: "Умм Хабиба (р.а.)", collection: "Муслим" },
  { id: "mosque", category: "prayer", label: "Идти в мечеть", icon: "🕌", description: "Идти в мечеть пешком для совершения джамаат-намаза.", source: "«Каждый шаг в мечеть стирает грех и поднимает степень»", narrator: "Абу Хурайра (р.а.)", collection: "Муслим" },
  { id: "post_prayer_dhikr", category: "prayer", label: "Зикр после намаза", icon: "✨", description: "СубханАллах 33, Альхамдулиллях 33, Аллаху Акбар 34 после каждого намаза.", source: "«Кто славит Аллаха после каждого намаза 33 раза...»", narrator: "Абу Хурайра (р.а.)", collection: "Муслим" },
  { id: "wudu_sleep", category: "night", label: "Вуду перед сном", icon: "💧", description: "Совершить омовение (вуду) перед сном.", source: "«Когда ты ложишься спать, соверши вуду»", narrator: "Аль-Бара ибн Азиб (р.а.)", collection: "Аль-Бухари" },
  { id: "ayat_kursi", category: "night", label: "Аят аль-Курси", icon: "📖", description: "Чтение Аят аль-Курси (2:255) перед сном для защиты.", source: "«Кто читает Аят аль-Курси перед сном... его охраняет ангел»", narrator: "Абу Хурайра (р.а.)", collection: "Аль-Бухари" },
  { id: "right_side", category: "night", label: "Спать на правом боку", icon: "🛏️", description: "Ложиться на правый бок, подложив руку под щеку.", source: "«Когда ложишься — ложись на правый бок»", narrator: "Аль-Бара ибн Азиб (р.а.)", collection: "Аль-Бухари" },
  { id: "smile", category: "character", label: "Улыбка", icon: "😊", description: "Дарить улыбку брату по вере — это тоже садака.", source: "«Улыбка в лицо брату — садака»", narrator: "Абу Зарр (р.а.)", collection: "Ат-Тирмизи" },
  { id: "patience", category: "character", label: "Сабр", icon: "🙏", description: "Проявлять терпение при трудностях и невзгодах.", source: "«Как удивительно положение верующего... всё для него — благо»", narrator: "Сухайб (р.а.)", collection: "Муслим" },
  { id: "kindness", category: "character", label: "Доброта к соседям", icon: "🏠", description: "Проявлять доброту и уважение к своим соседям.", source: "«Джибриль не переставал мне завещать хорошее отношение к соседу»", narrator: "Аиша (р.а.)", collection: "Аль-Бухари" },
];

/**
 * Sunnah Grid — static inspirational content.
 * No auth, no database, no tracking. Reading-focused.
 */
export function SunnahGrid({ className }: { className?: string }) {
  const [selectedAction, setSelectedAction] = useState<typeof SUNNAH_ACTIONS[0] | null>(null);

  return (
    <>
      <div className={cn("flex flex-col gap-8", className)}>
        {SUNNAH_CATEGORIES.map((cat) => {
          const categoryActions = SUNNAH_ACTIONS.filter((a) => a.category === cat.id);
          if (categoryActions.length === 0) return null;

          return (
            <div key={cat.id} className="space-y-4">
              <h2 className="text-sm font-bold tracking-wider text-muted uppercase px-1">{cat.title}</h2>
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                {categoryActions.map((action) => (
                  <motion.button
                    key={action.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAction(action)}
                    className="group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-surface hover:border-primary-300 shadow-sm transition-all duration-300"
                  >
                    <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                      {action.icon}
                    </span>
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider text-center px-1 leading-tight text-muted group-hover:text-main">
                      {action.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Detail Modal */}
      <AnimatePresence>
        {selectedAction && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-surface border border-border rounded-3xl p-6 shadow-card"
            >
              <div className="text-center mb-6">
                <span className="text-6xl drop-shadow-md mb-4 block">
                  {selectedAction.icon}
                </span>
                <h3 className="text-2xl font-bold text-main mb-2">
                  {selectedAction.label}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {selectedAction.description}
                </p>
                {selectedAction.source && (
                  <div className="bg-primary-50/50 dark:bg-primary-950/30 py-3 px-4 rounded-xl border border-primary-100/50 dark:border-primary-900/50 space-y-1.5">
                    <p className="text-xs text-primary-700 dark:text-primary-300 font-medium italic leading-relaxed">
                      {selectedAction.source}
                    </p>
                    {selectedAction.narrator && (
                      <p className="text-[10px] text-muted">
                        📜 {selectedAction.narrator} — <span className="font-bold">{selectedAction.collection}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedAction(null)}
                className="w-full py-3 text-sm font-bold text-muted hover:text-main transition-colors rounded-xl border border-border hover:border-primary-300"
              >
                Закрыть
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
