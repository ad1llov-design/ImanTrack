/**
 * @module entities/prayer
 * Доменная модель намаза (намаз = prayer)
 */

import type { PrayerName, PrayerStatus } from "@shared/types/supabase";

export interface Prayer {
  id: string;
  userId: string;
  prayerName: PrayerName;
  date: string; // ISO date string YYYY-MM-DD
  status: PrayerStatus;
  onTime: boolean;
  notes: string | null;
  createdAt: Date;
}

/** Арабские и русские названия намазов */
export const PRAYER_NAMES: Record<PrayerName, { arabic: string; russian: string; time: string }> = {
  fajr: { arabic: "الفجر", russian: "Фаджр", time: "На рассвете" },
  dhuhr: { arabic: "الظهر", russian: "Зухр", time: "Полдень" },
  asr: { arabic: "العصر", russian: "Аср", time: "После полудня" },
  maghrib: { arabic: "المغرب", russian: "Магриб", time: "Закат" },
  isha: { arabic: "العشاء", russian: "Иша", time: "Ночь" },
};

export const PRAYER_ORDER: PrayerName[] = [
  "fajr",
  "dhuhr",
  "asr",
  "maghrib",
  "isha",
];

/** Статусы намаза с иконками */
export const PRAYER_STATUS_CONFIG: Record<
  PrayerStatus,
  { label: string; color: string; icon: string }
> = {
  completed: { label: "Выполнен", color: "text-primary-600", icon: "✓" },
  missed: { label: "Пропущен", color: "text-red-500", icon: "✗" },
  qada: { label: "Каза", color: "text-secondary-500", icon: "↩" },
  skipped: { label: "Пропущен", color: "text-neutral-400", icon: "—" },
};
