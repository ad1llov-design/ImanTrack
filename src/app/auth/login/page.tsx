/**
 * @page /auth/login
 * Страница входа
 */

import { Suspense } from "react";
import type { Metadata } from "next";

import { LoginForm } from "@features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Вход — ImanTrack",
  description: "Войдите в свой аккаунт ImanTrack",
};

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        С возвращением! 👋
      </h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        Войдите, чтобы продолжить свой духовный путь
      </p>

      <div className="mt-8">
        <Suspense fallback={
          <div className="space-y-5">
            <div className="h-11 w-full animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-11 w-full animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-11 w-full animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-800" />
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
