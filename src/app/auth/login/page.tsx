/**
 * @page /auth/login
 * Страница входа
 */

import type { Metadata } from "next";

import { LoginForm } from "@features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Вход — MAZI",
  description: "Войдите в MAZI и продолжите свой духовный путь",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-main">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-sm dark:bg-neutral-900">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          Вход в MAZI
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Войдите, чтобы продолжить ваш духовный путь
        </p>

        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
