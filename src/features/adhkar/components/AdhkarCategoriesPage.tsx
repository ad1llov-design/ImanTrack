/**
 * @module features/adhkar/components/AdhkarCategoriesPage
 *
 * Client component: список категорий + прогресс дня.
 */

"use client";

import { ADHKAR_CATEGORIES } from "../data/adhkar.data";
import { useAdhkar } from "../hooks/useAdhkar";
import { CategoryCard } from "./CategoryCard";
import { useLanguage } from "@shared/i18n/LanguageContext";

export function AdhkarCategoriesPage() {
  const { t } = useLanguage();
  // Инициализируем прогресс
  useAdhkar();

  return (
    <div className="mx-auto max-w-2xl px-4 pt-8 pb-[calc(4rem+env(safe-area-inset-bottom)+2rem)] sm:pt-12 md:pb-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          {t("adhkar.title" as any) || "📿 Азкары и Зикры"}
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {t("adhkar.subtitle" as any) || "Поминание Аллаха — покой для сердца"}
        </p>
        <p className="mt-2 font-arabic text-base text-gold-600 dark:text-gold-400">
          أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ
        </p>
        <p className="mt-0.5 text-xs text-neutral-400">
          {t("adhkar.quran_quote" as any) || "«Поистине, поминанием Аллаха утешаются сердца» (13:28)"}
        </p>
      </div>

      {/* Categories grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {ADHKAR_CATEGORIES.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            index={index}
          />
        ))}
      </div>

      {/* Footer dua */}
      <div className="mt-12 rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-6 text-center dark:border-primary-800 dark:from-primary-950/20 dark:to-surface-dark">
        <p className="font-arabic text-lg leading-loose text-primary-700 dark:text-primary-300">
          رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ
        </p>
        <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          {t("adhkar.dua_quote" as any) || "«Господь наш! Прими от нас, ведь Ты — Слышащий, Знающий» (2:127)"}
        </p>
      </div>
    </div>
  );
}
