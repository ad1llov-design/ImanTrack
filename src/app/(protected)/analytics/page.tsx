import { Metadata } from "next";
import { ImanCalendar } from "@features/analytics/components/ImanCalendar";
import { AnalyticsStatsGrid } from "@features/analytics/components/AnalyticsStatsGrid";

export const metadata: Metadata = {
  title: "Аналитика Имана",
  description: "Анализ вашего духовного роста, намазов и сунны.",
};

export default function AnalyticsPage() {
  return (
    <main className="mx-auto max-w-lg px-4 pt-4 pb-24 sm:max-w-xl sm:px-6 md:max-w-4xl lg:px-8 xl:max-w-5xl">
      <div className="mb-8 mt-2 space-y-1">
        <h1 className="font-arabic text-h4 text-neutral-800 dark:text-neutral-100 md:text-h3">
          Анализ Имана
        </h1>
        <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
          Ваш тепловой график выполнения сунны, намазов и сопротивления грехам.
        </p>
      </div>

      <div className="space-y-6">
        <AnalyticsStatsGrid />
        <ImanCalendar />
      </div>
    </main>
  );
}
