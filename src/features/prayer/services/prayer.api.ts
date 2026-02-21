/**
 * @module features/prayer/services/prayer.api
 *
 * Сервис для получения времён намазов с Aladhan API.
 * API: https://aladhan.com/prayer-times-api
 *
 * Архитектура:
 * 1. fetchPrayerTimes() — запрос к API по координатам
 * 2. parsePrayerTimes() — парсинг ответа в PrayerTime[]
 * 3. calculatePrayerStatuses() — определение current/next/passed
 */

import {
  type AladhanResponse,
  type CountdownTime,
  type GeoCoordinates,
  type PrayerName,
  type PrayerStatus,
  type PrayerTime,
  PRAYER_LIST,
} from "../types/prayer.types";

/* ── Constants ──────────────────────────────────────────────────────── */

const ALADHAN_BASE_URL = "https://api.aladhan.com/v1";

/** Метод расчёта (2 = ISNA, 3 = Muslim World League, etc.) */
const DEFAULT_METHOD = 2;

/** Названия намазов для извлечения из API */
const PRAYER_KEYS: PrayerName[] = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

/* ── API Fetch ──────────────────────────────────────────────────────── */

/**
 * Получает времена намазов с Aladhan API
 * @param coords - координаты (latitude, longitude)
 * @param date - дата (по умолчанию сегодня)
 * @param method - метод расчёта (по умолчанию ISNA)
 */
export async function fetchPrayerTimes(
  coords: GeoCoordinates,
  date?: Date,
  method: number = DEFAULT_METHOD,
): Promise<AladhanResponse> {
  const d = date ?? new Date();
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  const url = `${ALADHAN_BASE_URL}/timings/${day}-${month}-${year}?latitude=${coords.latitude}&longitude=${coords.longitude}&method=${method}`;

  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Ошибка API: ${response.status} ${response.statusText}`);
  }

  const data: AladhanResponse = await response.json();

  if (data.code !== 200) {
    throw new Error(`Aladhan API error: ${data.status}`);
  }

  return data;
}

/* ── Parse ──────────────────────────────────────────────────────────── */

/**
 * Парсит строковое время "HH:mm (TZ)" в Date объект для текущего дня
 */
function parseTimeString(timeStr: string, baseDate?: Date): Date {
  // API возвращает "05:30 (EET)" — убираем timezone
  const cleanTime = timeStr.replace(/\s*\(.*\)/, "").trim();
  const [hours, minutes] = cleanTime.split(":").map(Number);

  const date = baseDate ? new Date(baseDate) : new Date();
  date.setHours(hours ?? 0, minutes ?? 0, 0, 0);
  return date;
}

/**
 * Парсит ответ Aladhan API в массив PrayerTime с текущими статусами
 */
export function parsePrayerTimes(
  apiResponse: AladhanResponse,
  now?: Date,
): PrayerTime[] {
  const currentTime = now ?? new Date();
  const timings = apiResponse.data.timings;

  // Создаём массив PrayerTime
  const prayers: PrayerTime[] = PRAYER_KEYS.map((key) => {
    const timeStr = timings[key];
    const dateTime = parseTimeString(timeStr);
    const info = PRAYER_LIST.find((p) => p.name === key)!;

    return {
      name: key,
      time: timeStr.replace(/\s*\(.*\)/, "").trim(),
      dateTime,
      status: "upcoming" as PrayerStatus,
      info,
    };
  });

  // Рассчитываем статусы
  return calculatePrayerStatuses(prayers, currentTime);
}

/* ── Status Calculation ─────────────────────────────────────────────── */

/**
 * Определяет статус каждого намаза (passed, current, upcoming)
 *
 * Логика:
 * - passed: время намаза прошло И следующий намаз уже начался
 * - current: время намаза прошло, но следующий ещё не начался
 * - upcoming: время намаза ещё не наступило
 */
export function calculatePrayerStatuses(
  prayers: PrayerTime[],
  now: Date,
): PrayerTime[] {
  const nowMs = now.getTime();

  return prayers.map((prayer, index) => {
    const prayerMs = prayer.dateTime.getTime();
    const nextPrayer = prayers[index + 1];
    const nextPrayerMs = nextPrayer?.dateTime.getTime();

    let status: PrayerStatus;

    if (prayerMs > nowMs) {
      // Намаз ещё не начался
      status = "upcoming";
    } else if (nextPrayerMs && nowMs < nextPrayerMs) {
      // Текущее время между этим намазом и следующим — это ТЕКУЩИЙ
      status = "current";
    } else if (!nextPrayerMs && prayerMs <= nowMs) {
      // Последний намаз дня (Isha) — текущий если уже наступил
      status = "current";
    } else {
      // Время прошло
      status = "passed";
    }

    return { ...prayer, status };
  });
}

/* ── Current & Next ─────────────────────────────────────────────────── */

/**
 * Возвращает текущий намаз (status === "current")
 */
export function getCurrentPrayer(prayers: PrayerTime[]): PrayerTime | null {
  return prayers.find((p) => p.status === "current") ?? null;
}

/**
 * Возвращает следующий намаз (первый со статусом "upcoming")
 */
export function getNextPrayer(prayers: PrayerTime[]): PrayerTime | null {
  return prayers.find((p) => p.status === "upcoming") ?? null;
}

/* ── Countdown ──────────────────────────────────────────────────────── */

/**
 * Рассчитывает обратный отсчёт до целевого времени
 */
export function calculateCountdown(target: Date, now?: Date): CountdownTime {
  const currentTime = now ?? new Date();
  const diff = Math.max(0, target.getTime() - currentTime.getTime());

  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds, totalSeconds };
}

/* ── Formatting ─────────────────────────────────────────────────────── */

/**
 * Форматирует countdown в строку "HH:MM:SS"
 */
export function formatCountdown(countdown: CountdownTime): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(countdown.hours)}:${pad(countdown.minutes)}:${pad(countdown.seconds)}`;
}

/**
 * Форматирует время в 24h формат
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
