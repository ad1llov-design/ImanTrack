import { Metadata } from "next";
import { SunnahGrid } from "@features/sunnah/components/SunnahGrid";

export const metadata: Metadata = {
  title: "Сунна — MAZI",
  description: "Оживление Сунны через благие дела.",
};

export default function SunnahPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-8 md:py-16">
      <div className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted mb-2">
          Оживление Сунны
        </p>
        <h1 className="text-display text-4xl font-bold text-main">
          Благие Дела
        </h1>
        <p className="mt-4 text-sm text-muted leading-relaxed">
          Простые действия Пророка (мир ему и благословение), которые меняют сердце и мир вокруг.
        </p>
      </div>

      <SunnahGrid />
    </div>
  );
}
