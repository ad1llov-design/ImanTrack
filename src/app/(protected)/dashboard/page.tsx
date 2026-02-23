/**
 * @page /dashboard
 *
 * Main page — Prayer times + Hadith about prayer.
 * No auth dependency. Fully static + client-side prayer API.
 */

import Link from "next/link";
import { PrayerWidget } from "@features/prayer/components/PrayerWidget";
import { BookOpen, Sparkles, BookMarked, MoonStar } from "lucide-react";

const PRAYER_HADITHS = [
  {
    id: 1,
    arabic: "مَفْتَاحُ الْجَنَّةِ الصَّلَاةُ",
    translation: "Ключ от Рая — это намаз.",
    reference: "Ат-Тирмизи, 4",
  },
  {
    id: 2,
    arabic: "إِنَّ أَوَّلَ مَا يُحَاسَبُ بِهِ الْعَبْدُ يَوْمَ الْقِيَامَةِ مِنْ عَمَلِهِ صَلَاتُهُ",
    translation: "Первое, за что будет спрошен раб в День Суда — это его намаз.",
    reference: "Ат-Тирмизи, 413",
  },
  {
    id: 3,
    arabic: "الْعَهْدُ الَّذِي بَيْنَنَا وَبَيْنَهُمُ الصَّلَاةُ فَمَنْ تَرَكَهَا فَقَدْ كَفَرَ",
    translation: "Между нами и ими — намаз. Кто оставил его — впал в неверие.",
    reference: "Ат-Тирмизи, 2621",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-8">
      {/* 1️⃣ Greeting Block */}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted mb-2">
          السلام عليكم
        </p>
        <h1 className="text-display text-4xl md:text-5xl font-bold text-main">
          Ассаламу алейкум
        </h1>
      </div>

      {/* 2️⃣ Prayer Times Widget */}
      <section>
        <PrayerWidget />
      </section>

      {/* 3️⃣ Hadiths about Prayer */}
      <section className="space-y-4">
        <h2 className="text-display text-xl font-semibold text-main flex items-center gap-2">
          <BookMarked className="h-5 w-5 text-primary-500" />
          Хадисы о Намазе
        </h2>
        <div className="space-y-3">
          {PRAYER_HADITHS.map((hadith) => (
            <div
              key={hadith.id}
              className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
            >
              <p
                className="text-right text-xl md:text-2xl text-main leading-[2] mb-3"
                style={{ direction: "rtl", fontFamily: "var(--font-amiri, 'Amiri'), serif" }}
              >
                {hadith.arabic}
              </p>
              <p className="text-sm text-main leading-relaxed">
                {hadith.translation}
              </p>
              <p className="mt-2 text-xs text-muted font-medium">
                📜 {hadith.reference}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4️⃣ Quick Links */}
      <section className="grid grid-cols-2 gap-4">
        <Link href="/quran" className="flex items-center justify-between rounded-2xl bg-surface p-4 shadow-sm border border-border hover:border-primary-500 transition-colors group">
          <span className="font-semibold text-main group-hover:text-primary-500 transition-colors">Коран</span>
          <BookOpen className="h-5 w-5 text-muted group-hover:text-primary-500 transition-colors" />
        </Link>
        <Link href="/hadith" className="flex items-center justify-between rounded-2xl bg-surface p-4 shadow-sm border border-border hover:border-primary-500 transition-colors group">
          <span className="font-semibold text-main group-hover:text-primary-500 transition-colors">Хадисы</span>
          <BookMarked className="h-5 w-5 text-muted group-hover:text-primary-500 transition-colors" />
        </Link>
        <Link href="/adhkar" className="flex items-center justify-between rounded-2xl bg-surface p-4 shadow-sm border border-border hover:border-primary-500 transition-colors group">
          <span className="font-semibold text-main group-hover:text-primary-500 transition-colors">Зикр</span>
          <Sparkles className="h-5 w-5 text-muted group-hover:text-primary-500 transition-colors" />
        </Link>
        <Link href="/sunnah" className="flex items-center justify-between rounded-2xl bg-surface p-4 shadow-sm border border-border hover:border-primary-500 transition-colors group">
          <span className="font-semibold text-main group-hover:text-primary-500 transition-colors">Сунна</span>
          <MoonStar className="h-5 w-5 text-muted group-hover:text-primary-500 transition-colors" />
        </Link>
      </section>

      {/* 5️⃣ Quote of the Day */}
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
