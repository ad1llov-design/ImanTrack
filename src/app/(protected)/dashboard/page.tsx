/**
 * @page /dashboard (protected)
 *
 * Дашборд — защищённая страница. Показывает данные пользователя.
 * Демо: server-side получение user + logout button.
 */

import { createClient } from "@lib/supabase/server";
import Link from "next/link";
import { LogoutButton } from "@features/auth/components/LogoutButton";
import { PrayerWidget } from "@features/prayer/components/PrayerWidget";
import { HabitsWidget } from "@features/tracker/components/HabitsWidget";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
          السلام عليكم
        </p>
        <h1 className="text-display text-4xl md:text-5xl font-bold text-neutral-100">
          Добро пожаловать{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""}
        </h1>
      </div>

      <div className="grid gap-8">
        {/* Core Progress Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-display text-2xl font-semibold text-white">Текущий прогресс</h2>
            <Link href="/stats" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">Подробная статистика →</Link>
          </div>
          
          <div className="grid gap-6">
            <PrayerWidget />
            <HabitsWidget />
          </div>
        </section>

        {/* Quick Actions / Deep Work Links */}
        <section className="space-y-6">
          <h2 className="text-display text-2xl font-semibold text-white">Духовные практики</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Link href="/reflection" className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-card p-8 transition-all hover:border-primary-500/50 hover:bg-white/[0.02]">
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-neutral-100 mb-2">🌿 Зона Тафаккура</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">Глубокие размышления в тишине и поиск внутреннего покоя.</p>
              </div>
              <div className="absolute -right-4 -bottom-4 text-6xl opacity-[0.03] transition-transform group-hover:scale-110">🌿</div>
            </Link>
            
            <Link href="/quran" className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-card p-8 transition-all hover:border-primary-500/50 hover:bg-white/[0.02]">
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-neutral-100 mb-2">📖 Коран Трекер</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">Следите за своим прогрессом чтения и изучения Священного Писания.</p>
              </div>
              <div className="absolute -right-4 -bottom-4 text-6xl opacity-[0.03] transition-transform group-hover:scale-110">📖</div>
            </Link>

            <Link href="/sunnah" className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-card p-8 transition-all hover:border-primary-500/50 hover:bg-white/[0.02]">
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-neutral-100 mb-2">⚡ Сунна Действия</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">9 благих дел на каждый день для оживления Сунны.</p>
              </div>
              <div className="absolute -right-4 -bottom-4 text-6xl opacity-[0.03] transition-transform group-hover:scale-110">⚡</div>
            </Link>

            <Link href="/assistant" className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-card p-8 transition-all hover:border-primary-500/50 hover:bg-white/[0.02]">
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-neutral-100 mb-2">🤖 AI Ассистент</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">Ваш персональный духовный наставник для анализа прогресса.</p>
              </div>
              <div className="absolute -right-4 -bottom-4 text-6xl opacity-[0.03] transition-transform group-hover:scale-110">🤖</div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
