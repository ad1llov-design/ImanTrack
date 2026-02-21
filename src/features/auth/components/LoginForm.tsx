/**
 * @module features/auth/components/LoginForm
 *
 * Форма входа - Client Component
 */

"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@lib/supabase/client";

import { type LoginFormData, loginSchema } from "@features/auth/schemas/auth.schema";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlMessage = searchParams.get("message");
  const urlError = searchParams.get("error");

  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(urlError);
  const [successState, setSuccessState] = useState<string | null>(urlMessage);

  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorState(null);
    setSuccessState(null);

    try {
      // Запускаем валидацию react-hook-form
      const isValid = await trigger();
      if (!isValid) {
        setIsLoading(false);
        return;
      }

      const data = getValues();
      console.log("Submitting login", data);

      const supabase = createClient();
      console.log("Calling supabase.auth.signInWithPassword...");

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      console.log("Supabase response data:", authData);
      console.log("Supabase response error:", authError);

      if (authError) {
        throw authError; // Перехватит catch
      }

      if (authData.session) {
        setSuccessState("Вход выполнен успешно!");
        // Перенаправляем на дашборд или callback url
        const redirectUrl = callbackUrl || "/tracker";
        router.push(redirectUrl as any);
        router.refresh();
      } else {
        setErrorState("Сессия не получена. Попробуйте еще раз.");
      }
    } catch (err: any) {
      console.error("Login catch block error:", err);
      // Если это ошибка Supabase
      if (err?.message === "Invalid login credentials") {
        setErrorState("Неверный email или пароль");
      } else {
        setErrorState(err?.message || "Произошла неизвестная ошибка при входе");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Success message */}
      {successState && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300">
          ✓ {successState}
        </div>
      )}

      {/* Error message */}
      {errorState && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
          ✗ {errorState}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
            disabled={isLoading}
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
            disabled={isLoading}
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
          disabled={isLoading}
          className="relative h-11 w-full rounded-xl bg-primary-600 font-semibold text-white transition-all duration-200 hover:bg-primary-700 active:scale-[0.98] disabled:opacity-50 dark:bg-primary-500 dark:hover:bg-primary-600"
        >
          {isLoading ? (
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
