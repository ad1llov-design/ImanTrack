import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Утилита для объединения Tailwind классов без конфликтов
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Форматирует дату в локализованный строке
 */
export function formatDate(
  date: Date | string,
  locale = "ru-RU",
  options?: Intl.DateTimeFormatOptions,
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

/**
 * Возвращает исламское приветствие в зависимости от времени суток
 */
export function getIslamicGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "صباح الخير — Доброе утро";
  if (hour >= 12 && hour < 17) return "مرحباً — Добрый день";
  if (hour >= 17 && hour < 21) return "مساء الخير — Добрый вечер";
  return "تصبح على خير — Спокойной ночи";
}

/**
 * Определяет процент выполнения
 */
export function calcPercentage(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

/**
 * Задержка — Promise-based sleep
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Type-safe Object.entries
 */
export function typedEntries<T extends object>(
  obj: T,
): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

/**
 * Проверяет, является ли значение определённым
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
