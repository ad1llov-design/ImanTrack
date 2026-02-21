/**
 * @module features/auth/components/RegisterForm
 *
 * Форма регистрации - Client Component
 */

"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@lib/supabase/client";

import { type RegisterFormData, registerSchema } from "@features/auth/schemas/auth.schema";

export function RegisterForm() {
  const [errorState, setErrorState] = useState<string | null>(null);
  const [successState, setSuccessState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
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
      console.log("Submitting register", data);

      const supabase = createClient();
      console.log("Calling supabase.auth.signUp...");

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      });

      console.log("Supabase response data:", authData);
      console.log("Supabase response error:", authError);

      if (authError) {
        throw authError; // Перехватит catch
      }

      setSuccessState("Проверьте email для подтверждения регистрации!");
    } catch (err: any) {
      console.error("Register catch block error:", err);
      setErrorState(err?.message || "Ошибка при регистрации. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  // Показываем success-экран после регистрации
  if (successState) {
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
          {successState}
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
      {errorState && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
          ✗ {errorState}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
            disabled={isLoading}
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
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Минимум 8 символов"
            disabled={isLoading}
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
            disabled={isLoading}
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
          disabled={isLoading}
          className="relative h-11 w-full rounded-xl bg-primary-600 font-semibold text-white transition-all duration-200 hover:bg-primary-700 active:scale-[0.98] disabled:opacity-50 dark:bg-primary-500 dark:hover:bg-primary-600"
        >
          {isLoading ? (
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
