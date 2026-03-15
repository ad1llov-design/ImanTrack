import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Тафаккур — SIRAT",
  description: "Пространство для размышлений.",
};

export default function ReflectionPage() {
  return (
    <main className="mx-auto max-w-lg px-4 pt-8 pb-24">
      <div className="mb-8 mt-2 space-y-1 text-center">
        <h1 className="text-display text-3xl font-bold text-main">
          🧘 Тафаккур
        </h1>
        <p className="text-sm text-muted">
          Пространство для размышлений — скоро.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-surface p-8 text-center shadow-card">
        <div className="text-6xl mb-4">🌿</div>
        <h2 className="text-xl font-bold text-main mb-2">Скоро</h2>
        <p className="text-sm text-muted leading-relaxed">
          В будущих обновлениях здесь появится дневник размышлений
          и зона тафаккура для духовного самоанализа.
        </p>
      </div>
    </main>
  );
}
