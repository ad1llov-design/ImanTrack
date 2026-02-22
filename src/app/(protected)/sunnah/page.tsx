import { Metadata } from "next";
import { GlassCard } from "@shared/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Сунна — ImanTrack",
  description: "Раздел Сунны в разработке.",
};

export default function SunnahPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Раздел в разработке
          </p>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
            📖 Сунна
          </h1>
        </div>
      </div>

      <GlassCard className="flex flex-col items-center justify-center p-12 text-center min-h-[40vh]">
        <span className="text-5xl mb-4">🚧</span>
        <h2 className="text-xl font-bold text-white mb-2">Страница скоро появится</h2>
        <p className="text-neutral-400 max-w-md mx-auto leading-relaxed">
          Этот раздел находится на стадии проектирования. ИншаАллах, здесь будут добавлены трекеры постов по Сунне и дополнительные материалы.
        </p>
      </GlassCard>
    </div>
  );
}
