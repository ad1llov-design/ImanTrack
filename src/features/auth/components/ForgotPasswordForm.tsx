/**
 * @module features/auth/components/ForgotPasswordForm
 *
 * Форма восстановления пароля.
 * Отправляет email со ссылкой для сброса пароля.
 */

"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { forgotPasswordAction } from "@features/auth/actions/auth.actions";
import {
  type ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@features/auth/schemas/auth.schema";

export function ForgotPasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(data: ForgotPasswordFormData) {
    setServerError(null);
    startTransition(async () => {
      const result = await forgotPasswordAction(data);
      if (result.success) {
        setIsSent(true);
      } else {
        setServerError(result.error ?? "Ошибка");
      }
    });
  }

  if (isSent) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-950/40">
          <svg className="h-8 w-8 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
          Письмо отправлено ✉️
        </h3>
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          Проверьте почту. Мы отправили ссылку для сброса пароля.
        </p>
        <Link
          href="/auth/login"
          className="mt-6 inline-block text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400"
        >
          ← Вернуться ко входу
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
        Введите email и мы отправим ссылку для сброса пароля.
      </p>

      {serverError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
          ✗ {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            disabled={isPending}
            className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-400 transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="relative h-11 w-full rounded-xl bg-primary-600 font-semibold text-white transition-all duration-200 hover:bg-primary-700 active:scale-[0.98] disabled:opacity-50 dark:bg-primary-500 dark:hover:bg-primary-600"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Отправка...
            </span>
          ) : (
            "Отправить ссылку"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
        <Link
          href="/auth/login"
          className="font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400"
        >
          ← Вернуться ко входу
        </Link>
      </p>
    </div>
  );
}
