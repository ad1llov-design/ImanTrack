"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { createClient } from "@lib/supabase/client";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const supabase = createClient();

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        if (authError.message === "Invalid login credentials") {
          setError("Неверный email или пароль");
        } else {
          setError(authError.message);
        }
        return;
      }

      if (data.session) {
        router.refresh();
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Произошла ошибка";
      setError(message);
    } finally {
      setIsLoading(false);
    }
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
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Пароль
            </label>
            <Link href="/auth/forgot-password" className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400">
              Забыли пароль?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="h-11 w-full rounded-xl bg-primary-600 font-semibold text-white hover:bg-primary-700 active:scale-[0.98] disabled:opacity-50 dark:bg-primary-500 dark:hover:bg-primary-600"
        >
          {isLoading ? "Вход..." : "Войти"}
        </button>
      </form>

      <div className="relative my-8 flex items-center">
        <div className="flex-1 border-t border-neutral-200 dark:border-neutral-700" />
        <span className="mx-4 text-xs text-neutral-400">или</span>
        <div className="flex-1 border-t border-neutral-200 dark:border-neutral-700" />
      </div>

      <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
        Нет аккаунта?{" "}
        <Link href="/auth/register" className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400">
          Зарегистрируйтесь
        </Link>
      </p>
    </div>
  );
}
