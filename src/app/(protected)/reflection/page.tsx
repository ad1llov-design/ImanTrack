import { Metadata } from "next";
import { ReflectionZone } from "@features/reflection/components/ReflectionZone";

export const metadata: Metadata = {
  title: "Зона Тафаккура",
  description: "Изолированное пространство для глубоких размышлений и дневника.",
};

export default function ReflectionPage() {
  return (
    <main className="min-h-screen bg-surface-dark bg-geometric-pattern mix-blend-overlay opacity-90 mx-auto w-full">
      <ReflectionZone />
    </main>
  );
}
