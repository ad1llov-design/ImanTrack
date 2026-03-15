/**
 * @page /auth/forgot-password
 * Страница восстановления пароля
 */

import type { Metadata } from "next";

import { ForgotPasswordForm } from "@features/auth/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Восстановление пароля — SIRAT",
  description: "Сбросьте пароль для вашего аккаунта SIRAT",
};

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        Забыли пароль? 🔐
      </h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        Не переживайте, мы поможем восстановить доступ
      </p>

      <div className="mt-8">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
