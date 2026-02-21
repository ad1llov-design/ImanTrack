/**
 * @module shared/components/ui/Footer
 *
 * Минималистичный футер с исламским стилем.
 * Содержит лого, навигацию, социальные ссылки и Bismillah.
 */

import Link from "next/link";

import { cn } from "@shared/lib/utils";

/* ── Types ──────────────────────────────────────────────────────────── */

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  className?: string;
}

/* ── Data ───────────────────────────────────────────────────────────── */

const navLinks: FooterLink[] = [
  { label: "Дашборд",   href: "/dashboard" },
  { label: "Привычки",  href: "/habits" },
  { label: "Коран",     href: "/quran" },
  { label: "Настройки", href: "/settings" },
];

const resourceLinks: FooterLink[] = [
  { label: "О проекте", href: "/about" },
  { label: "Поддержка", href: "/support" },
  { label: "Приватность", href: "/privacy" },
];

/* ── Component ──────────────────────────────────────────────────────── */

export function Footer({ className }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-neutral-200 bg-surface-secondary dark:border-neutral-800 dark:bg-surface-dark",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Main footer ─────────────────────── */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-sm text-white">
                ☪
              </span>
              <span className="text-h4 text-neutral-900 dark:text-neutral-50">
                Iman<span className="text-primary-600 dark:text-primary-400">Track</span>
              </span>
            </div>
            <p className="mt-3 text-body-sm text-neutral-500 dark:text-neutral-400">
              Трекер духовного роста. Отслеживайте намазы, читайте Коран и формируйте полезные привычки.
            </p>
            {/* Bismillah */}
            <p className="mt-4 font-arabic text-lg text-gold-500">
              بسم الله الرحمن الرحيم
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-overline uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Навигация
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as any}
                    className="text-body-sm text-neutral-600 transition-colors duration-250 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-overline uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Ресурсы
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as any}
                    className="text-body-sm text-neutral-600 transition-colors duration-250 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dua */}
          <div>
            <h4 className="mb-4 text-overline uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Дуа
            </h4>
            <div className="rounded-2xl border border-neutral-200 bg-white/50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
              <p className="text-right font-arabic text-body leading-loose text-neutral-800 dark:text-neutral-200">
                رَبِّ زِدْنِي عِلْمًا
              </p>
              <p className="mt-2 text-caption text-neutral-500 dark:text-neutral-400">
                «Господь мой, приумножь мне знание» (20:114)
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────── */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-200 py-6 dark:border-neutral-800 sm:flex-row">
          <p className="text-caption text-neutral-400">
            © {year} ImanTrack. Все права защищены.
          </p>
          <p className="text-caption text-neutral-400">
            Сделано с ❤️ и بسم الله
          </p>
        </div>
      </div>
    </footer>
  );
}
