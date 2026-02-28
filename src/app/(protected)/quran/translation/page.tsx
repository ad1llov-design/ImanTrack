import { Metadata } from "next";
import { TranslationClient } from "@/features/quran/components/TranslationClient";

export const metadata: Metadata = {
  title: "Коран с переводом — SIRAT",
  description: "Чтение Священного Корана с переводом на русский язык.",
};

export default function TranslationPage() {
  return <TranslationClient />;
}
