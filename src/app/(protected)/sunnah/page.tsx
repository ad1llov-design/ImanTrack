import { Metadata } from "next";
import { SunnahPageClient } from "./client";

// Note: Metadata cannot use react hooks directly, but we let it be for now
export const metadata: Metadata = {
  title: "Сунна — SIRAT",
  description: "Оживление Сунны через благие дела.",
};

export default function SunnahPage() {
  return <SunnahPageClient />;
}
