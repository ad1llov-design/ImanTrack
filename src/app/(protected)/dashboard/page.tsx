/**
 * @page /dashboard (protected)
 *
 * Дашборд — главная защищённая страница.
 * 6 блоков: Приветствие, Намазы, Дневной прогресс, Коран, Зикр, Хадис дня.
 */

import { createClient } from "@lib/supabase/server";
import Link from "next/link";
import { PrayerWidget } from "@features/prayer/components/PrayerWidget";
import { HabitsWidget } from "@features/tracker/components/HabitsWidget";
import { DhikrQuickWidget } from "@features/dhikr/components/DhikrQuickWidget";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-8">
      {/* 1️⃣ Greeting Block */}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted mb-2">
          السلام عليكم
        </p>
        <h1 className="text-display text-4xl md:text-5xl font-bold text-main">
          Ассаламу алейкум{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""}
        </h1>
      </div>

      {/* 2️⃣ Prayer Progress Block */}
      <section>
        <PrayerWidget />
      </section>

      {/* 3️⃣ Daily Progress Summary */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-display text-xl font-semibold text-main">Ваш день</h2>
          <Link href="/stats" className="text-sm text-primary-500 hover:text-primary-600 transition-colors">Статистика →</Link>
        </div>
        <HabitsWidget />
      </section>

      {/* 4️⃣ Quran Block */}
      <section>
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-display font-bold text-main">📖 Коран</h3>
              <p className="text-sm text-muted mt-1">Продолжите чтение Корана</p>
            </div>
            <Link 
              href="/quran"
              className="px-4 py-2 rounded-xl bg-primary-500 text-white text-sm font-bold hover:bg-primary-600 transition-all active:scale-95"
            >
              Читать
            </Link>
          </div>
        </div>
      </section>

      {/* 5️⃣ Dhikr Block */}
      <section>
        <DhikrQuickWidget />
      </section>

      {/* 6️⃣ Quick Links */}
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

      {/* 7️⃣ Quote of the Day */}
      <section>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 text-center shadow-card">
          <div className="absolute -top-6 -right-6 text-9xl text-primary-50 opacity-50">&ldquo;</div>
          <p className="relative z-10 text-lg md:text-xl font-display text-main italic leading-relaxed">
            «Ищите милость Аллаха и поминайте Аллаха часто, — быть может, вы преуспеете.»
          </p>
          <p className="relative z-10 mt-4 text-sm font-medium text-muted uppercase tracking-widest">
            Сура Аль-Джумуа, Аят 10
          </p>
        </div>
      </section>
    </div>
  );
}
