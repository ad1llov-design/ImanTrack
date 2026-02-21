/**
 * @page /auth/register
 * Страница регистрации
 */

import type { Metadata } from "next";

import { RegisterForm } from "@features/auth/components/RegisterForm";

export const metadata: Metadata = {
  title: "Регистрация — ImanTrack",
  description: "Создайте аккаунт ImanTrack и начните свой духовный путь",
};

export default function RegisterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        Создайте аккаунт 🌙
      </h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        Начните отслеживать свой духовный рост
      </p>

      <div className="mt-8">
        <RegisterForm />
      </div>
    </div>
  );
}
