"use client";

import { cn } from "@shared/lib/utils";

const DHIKR_LIST = [
  {
    id: "subhanallah",
    arabic: "سُبْحَانَ ٱللَّٰهِ",
    translation: "Субханаллах — Пречист Аллах",
    description: "Произносится для прославления Аллаха и очищения Его от всего, что Ему не подобает. Рекомендуется произносить 33 раза после каждого намаза.",
    reference: "Муслим, 597",
  },
  {
    id: "alhamdulillah",
    arabic: "ٱلْحَمْدُ لِلَّٰهِ",
    translation: "Альхамдулиллах — Хвала Аллаху",
    description: "Выражение благодарности Аллаху за все блага. Произносится 33 раза после каждого намаза. «Альхамдулиллах наполняет Весы».",
    reference: "Муслим, 223",
  },
  {
    id: "allahuakbar",
    arabic: "ٱللَّٰهُ أَكْبَرُ",
    translation: "Аллаху Акбар — Аллах Велик",
    description: "Возвеличивание Аллаха. Произносится 34 раза после каждого намаза, завершая последовательность зикра (33+33+34 = 100).",
    reference: "Муслим, 597",
  },
  {
    id: "istighfar",
    arabic: "أَسْتَغْفِرُ ٱللَّٰهَ",
    translation: "Астагфируллах — Прошу прощения у Аллаха",
    description: "Мольба о прощении грехов. Пророк ﷺ произносил истигфар более 70 раз в день. Рекомендуется произносить после каждого намаза.",
    reference: "Бухари, 6307",
  },
  {
    id: "lailaha",
    arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ",
    translation: "Ля иляха илля Ллах — Нет божества, кроме Аллаха",
    description: "Слово единобожия (тавхид). Лучший зикр по хадису Пророка ﷺ. Основа веры мусульманина.",
    reference: "Тирмизи, 3383",
  },
  {
    id: "hawqala",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰهِ",
    translation: "Ля хавля ва ля куввата илля биЛлах",
    description: "Нет мощи и силы ни у кого, кроме Аллаха. Это сокровище из сокровищ Рая. Произносится при затруднениях.",
    reference: "Бухари, 4205",
  },
  {
    id: "salawat",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
    translation: "Аллахумма салли аля Мухаммад — Саляват на Пророка ﷺ",
    description: "Благословение Пророка ﷺ. Кто помолится за Пророка ﷺ один раз, за того Аллах помолится десять раз. Рекомендуется особенно в пятницу.",
    reference: "Муслим, 384",
  },
  {
    id: "subhanallahi_wabihamdihi",
    arabic: "سُبْحَانَ ٱللَّٰهِ وَبِحَمْدِهِ",
    translation: "Субханаллахи ва бихамдихи — Пречист Аллах и хвала Ему",
    description: "Кто произнесёт эти слова 100 раз в день, тому будут прощены грехи, даже если их будет столько, сколько пены морской.",
    reference: "Муслим, 2691",
  },
  {
    id: "subhanallahi_azim",
    arabic: "سُبْحَانَ ٱللَّٰهِ وَبِحَمْدِهِ سُبْحَانَ ٱللَّٰهِ ٱلْعَظِيمِ",
    translation: "Субханаллахи ва бихамдихи, Субханаллахиль-Азым",
    description: "Два слова, лёгкие на языке, тяжёлые на Весах и любимые Милостивым (ар-Рахман).",
    reference: "Бухари, 6406",
  },
  {
    id: "bismillah",
    arabic: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    translation: "Бисмиллахи Ррахмани Ррахим — Во имя Аллаха Милостивого, Милосердного",
    description: "Произносится перед началом любого дела: едой, питьём, одеванием, входом в дом. Защищает от зла и привлекает благословение.",
    reference: "Тирмизи, 3388",
  },
];

/**
 * DhikrTasbih — reading-focused dhikr cards.
 * No counters, no backend, no tracking.
 * Styled exactly like hadith cards.
 */
export function DhikrTasbih({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      {DHIKR_LIST.map((dhikr) => (
        <div
          key={dhikr.id}
          className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
        >
          <p className="font-arabic text-2xl leading-loose text-main text-right mb-3" dir="rtl">
            {dhikr.arabic}
          </p>
          <h3 className="text-base font-bold text-main mb-2">
            {dhikr.translation}
          </h3>
          <p className="text-sm text-muted leading-relaxed mb-3">
            {dhikr.description}
          </p>
          <span className="text-[10px] font-bold text-primary-500 bg-primary-500/10 px-2 py-0.5 rounded-md inline-block uppercase tracking-wider">
            {dhikr.reference}
          </span>
        </div>
      ))}
    </div>
  );
}
