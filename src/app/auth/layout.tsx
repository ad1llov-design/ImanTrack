/**
 * @layout Auth Layout
 *
 * Лейаут для страниц авторизации (login, register, forgot-password).
 * Красивый двух-колоночный дизайн: слева — форма, справа — декоративная панель.
 * На мобильных — только форма.
 */

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Авторизация — ImanTrack",
  description: "Войдите или зарегистрируйтесь в ImanTrack",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* ── Left: Form ───────────────────────── */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        {/* Logo */}
        <div className="mb-10">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 text-lg text-white shadow-glow">
              ☪
            </span>
            <span className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
              Iman<span className="text-primary-600 dark:text-primary-400">Track</span>
            </span>
          </Link>
        </div>

        {/* Form content */}
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>

      {/* ── Right: Decorative panel ──────────── */}
      <div className="hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:bg-gradient-to-br lg:from-primary-700 lg:via-primary-600 lg:to-primary-800">
        <div className="max-w-md px-12 text-center">
          {/* Islamic geometric pattern */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm">
            <span className="text-5xl">🕌</span>
          </div>

          {/* Arabic Bismillah */}
          <p className="font-arabic text-3xl leading-relaxed text-gold-300">
            بسم الله الرحمن الرحيم
          </p>

          {/* Tagline */}
          <h2 className="mt-6 text-2xl font-bold text-white">
            Отслеживайте свой духовный путь
          </h2>
          <p className="mt-3 text-primary-200">
            Намазы, Коран, привычки — всё в одном месте. <br />
            Укрепляйте свой иман каждый день.
          </p>

          {/* Stats */}
          <div className="mt-10 flex items-center justify-center gap-8">
            <div>
              <p className="text-3xl font-bold text-white">5</p>
              <p className="text-xs text-primary-200">намазов в день</p>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <p className="text-3xl font-bold text-white">30</p>
              <p className="text-xs text-primary-200">джузов Корана</p>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <p className="text-3xl font-bold text-white">∞</p>
              <p className="text-xs text-primary-200">добрых дел</p>
            </div>
          </div>

          {/* Quran quote */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="font-arabic text-lg leading-loose text-white/90">
              إِنَّ اللّهَ مَعَ الصَّابِرِينَ
            </p>
            <p className="mt-2 text-xs text-primary-200">
              «Воистину, Аллах — с терпеливыми» (2:153)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
