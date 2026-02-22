"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { createClient } from "@lib/supabase/client";

export function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (password.length < 6) {
      setError("Пароль должен быть минимум 6 символов");
      return;
    }

    setIsLoading(true);

    console.log("Submitting register", { fullName, email });

    try {
      const supabase = createClient();

      const { data, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: fullName.trim() },
        },
      });

      console.log("Supabase response data:", data);
      console.log("Supabase response error:", authError);

      if (authError) {
        setError(authError.message);
        return;
      }

      setSuccess(true);
    } catch (err: any) {
      console.error("Register error:", err);
      setError(err?.message || "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/40">
          <span className="text-3xl">✉️</span>
        </div>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
          Проверьте почту
        </h3>
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          Мы отправили ссылку для подтверждения на {email}
        </p>
        <Link href="/auth/login" className="mt-6 inline-block text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400">
          ← Вернуться ко входу
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
          ✗ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Полное имя
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Иван Иванов"
            disabled={isLoading}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          />
        </div>

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            placeholder="Минимум 6 символов"
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Подтвердите пароль
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Повторите пароль"
            disabled={isLoading}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="h-11 w-full rounded-xl bg-primary-600 font-semibold text-white hover:bg-primary-700 active:scale-[0.98] disabled:opacity-50 dark:bg-primary-500 dark:hover:bg-primary-600"
        >
          {isLoading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>

      <div className="relative my-8 flex items-center">
        <div className="flex-1 border-t border-neutral-200 dark:border-neutral-700" />
        <span className="mx-4 text-xs text-neutral-400">или</span>
        <div className="flex-1 border-t border-neutral-200 dark:border-neutral-700" />
      </div>

      <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
        Уже есть аккаунт?{" "}
        <Link href="/auth/login" className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400">
          Войдите
        </Link>
      </p>
    </div>
  );
}
