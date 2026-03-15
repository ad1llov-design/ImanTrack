/**
 * @page /tracker
 * Placeholder — tracking removed in MVP refactor.
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Прогресс — SIRAT",
  description: "Статистика духовного роста",
};

export default function TrackerPage() {
  return (
    <div className="min-h-screen bg-background text-main pb-20">
      <div className="mx-auto max-w-lg px-4 py-8 text-center">
        <h1 className="text-display text-3xl font-bold text-main mb-4">
          📊 Прогресс
        </h1>
        <p className="text-sm text-muted mb-8">
          Раздел статистики появится в следующих обновлениях.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-2xl bg-primary-500 text-white font-bold text-sm hover:bg-primary-600 transition-colors"
        >
          ← На главную
        </Link>
      </div>
    </div>
  );
}
