import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Коран — SIRAT",
  description: "Чтение Священного Корана.",
};

export default function QuranLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
