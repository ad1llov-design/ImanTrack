import { DhikrTasbih } from "@features/dhikr/components/DhikrTasbih";

export const metadata = {
  title: "Зикр | MAZI",
  description: "Электронный тасбих и учет поминания Аллаха.",
};

export default function DhikrPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <DhikrTasbih />
    </div>
  );
}
