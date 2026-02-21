/**
 * @module lib/env
 * Типизированные и валидированные переменные окружения
 */

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function getOptionalEnv(key: string, fallback: string = ""): string {
  return process.env[key] ?? fallback;
}

/**
 * Серверные переменные окружения (не экспортировать в client компонентах)
 */
export const serverEnv = {
  supabaseServiceRoleKey: getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
  authSecret: getRequiredEnv("AUTH_SECRET"),
  nodeEnv: getOptionalEnv("NODE_ENV", "development") as
    | "development"
    | "production"
    | "test",
} as const;

/**
 * Публичные переменные окружения (доступны на клиенте)
 */
export const clientEnv = {
  supabaseUrl: getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  appUrl: getOptionalEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  appName: getOptionalEnv("NEXT_PUBLIC_APP_NAME", "ImanTrack"),
  prayerApiUrl: getOptionalEnv(
    "NEXT_PUBLIC_PRAYER_API_URL",
    "https://api.aladhan.com/v1",
  ),
  enableAnalytics: getOptionalEnv("NEXT_PUBLIC_ENABLE_ANALYTICS", "false") === "true",
  enablePwa: getOptionalEnv("NEXT_PUBLIC_ENABLE_PWA", "true") === "true",
  maintenanceMode:
    getOptionalEnv("NEXT_PUBLIC_MAINTENANCE_MODE", "false") === "true",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
} as const;
