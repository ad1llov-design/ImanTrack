/**
 * @module features/tracker/data/achievements
 *
 * Achievement definitions for the gamification system.
 */

import { Achievement } from "../types/tracker.types";

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_prayer",
    title: "Первый шаг",
    description: "Отметь свой первый намаз в приложении",
    icon: "🌱",
    status: "locked",
    progress: 0,
    target: 1,
    currentValue: 0,
    category: "prayer",
  },
  {
    id: "prayer_streak_3",
    title: "Постоянство",
    description: "Выполняй все намазы 3 дня подряд",
    icon: "🔥",
    status: "locked",
    progress: 0,
    target: 3,
    currentValue: 0,
    category: "consistency",
  },
  {
    id: "prayer_streak_7",
    title: "На пути к свету",
    description: "Выполняй все намазы 7 дней подряд",
    icon: "✨",
    status: "locked",
    progress: 0,
    target: 7,
    currentValue: 0,
    category: "consistency",
  },
  {
    id: "adhkar_master",
    title: "Мастер зикра",
    description: "Заверши 100 категорий азкаров",
    icon: "📿",
    status: "locked",
    progress: 0,
    target: 100,
    currentValue: 0,
    category: "adhkar",
  },
  {
    id: "knowledge_seeker",
    title: "Ищущий знания",
    description: "Прочитай 40 хадисов",
    icon: "📚",
    status: "locked",
    progress: 0,
    target: 40,
    currentValue: 0,
    category: "knowledge",
  },
  {
    id: "on_time_warrior",
    title: "Пунктуальность",
    description: "Выполни 50 намазов вовремя",
    icon: "🎯",
    status: "locked",
    progress: 0,
    target: 50,
    currentValue: 0,
    category: "prayer",
  },
];
