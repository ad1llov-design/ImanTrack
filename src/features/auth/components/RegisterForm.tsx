/**
 * @module features/auth/components/RegisterForm
 *
 * Форма регистрации:
 * - Имя + Email + Пароль + Подтверждение пароля
 * - Валидация: Zod + react-hook-form
 * - Server Action: registerAction
 * - Показ success-сообщения (проверьте email)
 */

"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerAction } from "@features/auth/actions/auth.actions";
import { type RegisterFormData, registerSchema } from "@features/auth/schemas/auth.schema";

export function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  function onSubmit(data: RegisterFormData) {
    setServerError(null);
    setSuccessMessage(null);

    startTransition(async () => {
      const result = await registerAction(data);
      if (result.success) {
        setSuccessMessage(result.message ?? "Проверьте email!");
      } else {
        setServerError(result.error ?? "Ошибка регистрации");
      }
    });
  }

  // Показываем success-экран после регистрации
  if (successMessage) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-950/40">
          <svg className="h-8 w-8 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
          Проверьте почту ✉️
        </h3>
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          {successMessage}
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
      {/* Server error */}
      {serverError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
          ✗ {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Полное имя
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Иван Иванов"
            disabled={isPending}
            className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-400 transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
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

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Минимум 8 символов"
            disabled={isPending}
            className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-400 transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
          <p className="text-xs text-neutral-400">
            Заглавная + строчная буква + цифра
          </p>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Подтвердите пароль
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Повторите пароль"
            disabled={isPending}
            className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-400 transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit */}
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
              Регистрация...
            </span>
          ) : (
            "Зарегистрироваться"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8 flex items-center">
        <div className="flex-1 border-t border-neutral-200 dark:border-neutral-700" />
        <span className="mx-4 text-xs text-neutral-400">или</span>
        <div className="flex-1 border-t border-neutral-200 dark:border-neutral-700" />
      </div>

      {/* Login link */}
      <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
        Уже есть аккаунт?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400"
        >
          Войдите
        </Link>
      </p>
    </div>
  );
}
