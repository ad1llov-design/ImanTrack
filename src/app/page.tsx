import Link from "next/link";
import { ThemeToggle } from "@shared/components/ui/ThemeToggle";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background text-main">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        {/* Arabic Bismillah */}
        <p className="mb-8 font-arabic text-4xl text-primary-600 dark:text-primary-400">
          بسم الله الرحمن الرحيم
        </p>

        <h1 className="mb-4 text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Iman<span className="text-primary-500">Track</span>
        </h1>

        <p className="mb-10 text-xl text-neutral-500 dark:text-neutral-400">
          Трекер вашего духовного роста
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="rounded-2xl bg-primary-600 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-primary-700 active:scale-95"
          >
            Начать путь →
          </Link>
          <Link
            href="/auth/login"
            className="rounded-2xl border border-neutral-200 px-8 py-3.5 text-base font-semibold text-neutral-700 transition-all hover:border-primary-400 hover:text-primary-600 dark:border-neutral-700 dark:text-neutral-300"
          >
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
}
