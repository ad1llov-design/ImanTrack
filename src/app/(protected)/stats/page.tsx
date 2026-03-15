import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Статистика — SIRAT",
  description: "Статистика вашей духовной практики.",
};

export default function StatsPage() {
  return (
    <main className="mx-auto max-w-lg px-4 pt-8 pb-24">
      <div className="mb-8 mt-2 space-y-1 text-center">
        <h1 className="text-display text-3xl font-bold text-main">
          📊 Статистика
        </h1>
        <p className="text-sm text-muted">
          Раздел статистики в разработке. Скоро здесь появится
          аналитика вашего духовного прогресса.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-surface p-8 text-center shadow-card">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-xl font-bold text-main mb-2">Скоро</h2>
        <p className="text-sm text-muted leading-relaxed">
          В будущих обновлениях здесь появятся графики намазов,
          прогресс чтения Корана и статистика зикра.
        </p>
      </div>
    </main>
  );
}
