/**
 * @page /tracker
 * Страница прогресса и достижений.
 */

import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Прогресс — ImanTrack",
  description: "Статистика твоих благих дел, серия дней и достижения",
};

const TrackerPageContent = dynamic(
  () => import("@features/tracker/components/TrackerPageContent").then((m) => m.TrackerPageContent),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12">
        <div className="mx-auto h-40 w-full max-w-xl animate-pulse rounded-3xl bg-neutral-100 dark:bg-neutral-800" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="h-64 animate-pulse rounded-3xl bg-neutral-100 dark:bg-neutral-800 md:col-span-2" />
          <div className="h-64 animate-pulse rounded-3xl bg-neutral-100 dark:bg-neutral-800" />
        </div>
      </div>
    ),
  },
);

export default function TrackerPage() {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
      <TrackerPageContent />
    </div>
  );
}
