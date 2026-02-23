/**
 * @page /profile
 * 
 * Profile page — works with or without authentication.
 * Shows user info if logged in, otherwise shows app info.
 */

import Link from "next/link";
import { GlassCard } from "@shared/components/ui/GlassCard";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-display text-4xl font-bold text-main">Профиль</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard className="space-y-6">
          <h2 className="text-xl font-bold text-main">О приложении</h2>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">Название</span>
              <span className="text-lg text-main">MAZI</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">Версия</span>
              <span className="text-lg text-main">1.0.0 MVP</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">Описание</span>
              <span className="text-sm text-muted leading-relaxed">
                Исламское приложение для чтения Корана, хадисов,
                отслеживания намазов и поминания Аллаха.
              </span>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <h2 className="text-xl font-bold text-main mb-4">Разделы</h2>
            <div className="space-y-2">
              {[
                { name: "Главная", href: "/", icon: "🏠" },
                { name: "Коран", href: "/quran", icon: "📖" },
                { name: "Хадисы", href: "/hadith", icon: "📚" },
                { name: "Зикр", href: "/dhikr", icon: "📿" },
                { name: "Сунна", href: "/sunnah", icon: "🌙" },
                { name: "Азкары", href: "/adhkar", icon: "🤲" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl p-3 text-sm font-medium text-main hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-bold text-main mb-4">Контакты</h2>
            <p className="text-muted text-sm leading-relaxed">
              Есть предложения или нашли ошибку? Свяжитесь с нами через Telegram.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
