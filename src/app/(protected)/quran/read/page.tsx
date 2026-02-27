import { Metadata } from "next";
import { Suspense } from "react";
import { QuranPageReader } from "@/components/quran/QuranPageReader";

export const metadata: Metadata = {
  title: "Мусхаф — SIRAT",
  description: "Чтение Священного Корана на арабском языке.",
};

export default function MushafPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    }>
      <QuranPageReader />
    </Suspense>
  );
}
