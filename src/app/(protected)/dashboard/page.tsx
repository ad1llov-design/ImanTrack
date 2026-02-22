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
        <p className="text-xs uppercase tracking-[0.2em] text-muted mb-2">
          السلام عليكم
        </p>
        <h1 className="text-display text-4xl md:text-5xl font-bold text-main">
          Ассаламу алейкум{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""}
        </h1>
      </div>

      <div className="grid gap-8">
        {/* Core Progress Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-display text-2xl font-semibold text-main">Ваш день</h2>
            <Link href="/stats" className="text-sm text-primary-500 hover:text-primary-600 transition-colors">Статистика →</Link>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <PrayerWidget />
            <HabitsWidget />
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="grid grid-cols-2 gap-4">
          <Link href="/dhikr" className="flex items-center justify-between rounded-2xl bg-surface p-4 shadow-sm border border-border hover:border-primary-500 transition-colors group">
            <span className="font-semibold text-main group-hover:text-primary-500 transition-colors">Свободный Тасбих</span>
            <span className="text-xl">📿</span>
          </Link>
          <Link href="/hadith" className="flex items-center justify-between rounded-2xl bg-surface p-4 shadow-sm border border-border hover:border-primary-500 transition-colors group">
            <span className="font-semibold text-main group-hover:text-primary-500 transition-colors">Хадис Дня</span>
            <span className="text-xl">📖</span>
          </Link>
        </section>

        {/* Quote of the Day Section */}
        <section className="mt-4">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 text-center shadow-card">
            <div className="absolute -top-6 -right-6 text-9xl text-primary-50 opacity-50">”</div>
            <p className="relative z-10 text-lg md:text-xl font-display text-main italic leading-relaxed">
              «Ищите милость Аллаха и поминайте Аллаха часто, — быть может, вы преуспеете.»
            </p>
            <p className="relative z-10 mt-4 text-sm font-medium text-muted uppercase tracking-widest">
              Сура Аль-Джумуа, Аят 10
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
