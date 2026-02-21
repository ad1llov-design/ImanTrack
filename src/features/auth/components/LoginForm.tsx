/**
 * @module features/auth/components/LoginForm
 *
 * Форма входа с react-hook-form + Zod валидацией.
 * Поддержка:
 * - Email/Password вход через Server Action
 * - Показ ошибок по полям
 * - Глобальная ошибка от сервера
 * - Loading state с блокировкой формы
 * - Ссылки на регистрацию и восстановление пароля
 */

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginAction } from "@features/auth/actions/auth.actions";
import { type LoginFormData, loginSchema } from "@features/auth/schemas/auth.schema";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlMessage = searchParams.get("message");
  const urlError = searchParams.get("error");

  const [serverError, setServerError] = useState<string | null>(urlError);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(data: LoginFormData) {
    setServerError(null);
    startTransition(async () => {
      const result = await loginAction(data);
      if (!result.success && result.error) {
        setServerError(result.error);
      }
      // При успехе — redirect происходит внутри loginAction
    });
  }

  return (
    <div className="w-full">
      {/* Success message */}
      {urlMessage && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300">
          ✓ {urlMessage}
        </div>
      )}

      {/* Server error */}
      {serverError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
          ✗ {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
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
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Пароль
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400"
            >
              Забыли пароль?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            disabled={isPending}
            className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-400 transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
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
              Вход...
            </span>
          ) : (
            "Войти"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8 flex items-center">
        <div className="flex-1 border-t border-neutral-200 dark:border-neutral-700" />
        <span className="mx-4 text-xs text-neutral-400">или</span>
        <div className="flex-1 border-t border-neutral-200 dark:border-neutral-700" />
      </div>

      {/* Register link */}
      <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
        Нет аккаунта?{" "}
        <Link
          href={callbackUrl ? `/auth/register?callbackUrl=${callbackUrl}` : "/auth/register"}
          className="font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400"
        >
          Зарегистрируйтесь
        </Link>
      </p>
    </div>
  );
}
