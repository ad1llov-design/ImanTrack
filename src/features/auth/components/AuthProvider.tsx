/**
 * @module features/auth/components/AuthProvider
 *
 * Client-side провайдер для инициализации auth-сессии.
 * Оборачивает приложение и инициализирует useAuth хук.
 * Показывает loading state пока сессия загружается.
 */

"use client";

import { useAuth } from "@features/auth/hooks/useAuth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Инициализирует подписку на Supabase auth state
  useAuth();
  return <>{children}</>;
}
