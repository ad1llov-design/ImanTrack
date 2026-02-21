/**
 * @module features/prayer/types
 *
 * Все типы для модуля намазов.
 * Используем Aladhan API (https://aladhan.com/prayer-times-api)
 */

/* ── Prayer Names ───────────────────────────────────────────────────── */

/** 5 обязательных намазов + Sunrise (для расчётов) */
export type PrayerName = "Fajr" | "Sunrise" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

/** Информация о намазе: русское/арабское названия, иконка */
export interface PrayerInfo {
  name: PrayerName;
  nameRu: string;
  nameAr: string;
  icon: string;
  /** Является ли обязательным намазом (Sunrise — нет) */
  isFard: boolean;
}

/** Справочник всех намазов */
export const PRAYER_LIST: PrayerInfo[] = [
  { name: "Fajr",    nameRu: "Фаджр",   nameAr: "الفجر",    icon: "🌅", isFard: true },
  { name: "Sunrise", nameRu: "Восход",   nameAr: "الشروق",   icon: "☀️", isFard: false },
  { name: "Dhuhr",   nameRu: "Зухр",     nameAr: "الظهر",    icon: "🕐", isFard: true },
  { name: "Asr",     nameRu: "Аср",      nameAr: "العصر",    icon: "🌤️", isFard: true },
  { name: "Maghrib", nameRu: "Магриб",   nameAr: "المغرب",   icon: "🌅", isFard: true },
  { name: "Isha",    nameRu: "Иша",      nameAr: "العشاء",   icon: "🌙", isFard: true },
];

/* ── Prayer Status ──────────────────────────────────────────────────── */

export type PrayerStatus = "upcoming" | "current" | "passed";

/* ── Prayer Time ────────────────────────────────────────────────────── */

export interface PrayerTime {
  name: PrayerName;
  time: string;        // "HH:mm"
  dateTime: Date;       // Full Date object for calculations
  status: PrayerStatus;
  info: PrayerInfo;
}

/* ── Geolocation ────────────────────────────────────────────────────── */

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationInfo {
  coords: GeoCoordinates;
  city?: string;
  country?: string;
  timezone?: string;
}

/* ── Aladhan API Response ───────────────────────────────────────────── */

export interface AladhanTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}

export interface AladhanDate {
  readable: string;
  timestamp: string;
  hijri: {
    date: string;
    month: { number: number; en: string; ar: string };
    year: string;
    designation: { abbreviated: string; expanded: string };
    day: string;
  };
  gregorian: {
    date: string;
    day: string;
    month: { number: number; en: string };
    year: string;
  };
}

export interface AladhanMeta {
  latitude: number;
  longitude: number;
  timezone: string;
  method: { id: number; name: string };
}

export interface AladhanResponse {
  code: number;
  status: string;
  data: {
    timings: AladhanTimings;
    date: AladhanDate;
    meta: AladhanMeta;
  };
}

/* ── Countdown ──────────────────────────────────────────────────────── */

export interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

/* ── Prayer Module State ────────────────────────────────────────────── */

export interface PrayerState {
  prayers: PrayerTime[];
  currentPrayer: PrayerTime | null;
  nextPrayer: PrayerTime | null;
  hijriDate: string;
  gregorianDate: string;
  location: LocationInfo | null;
  isLoading: boolean;
  error: string | null;
}
