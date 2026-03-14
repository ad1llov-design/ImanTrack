import { Metadata } from "next";
import { StoriesPageClient } from "./client";

export const metadata: Metadata = {
  title: "Истории Пророков — SIRAT",
  description: "Поучительные истории из жизни Пророка Мухаммада ﷺ.",
};

export default function StoriesPage() {
  return <StoriesPageClient />;
}
