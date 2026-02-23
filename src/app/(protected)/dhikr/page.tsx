import { DhikrTasbih } from "@features/dhikr/components/DhikrTasbih";

export const metadata = {
  title: "Зикр | MAZI",
  description: "Электронный тасбих и учет поминания Аллаха.",
};

export default function DhikrPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-display text-3xl font-bold text-main mb-2">Зикр</h1>
        <p className="text-sm tracking-wider text-muted">Успокоение сердец</p>
      </div>
      
      <DhikrTasbih />
    </div>
  );
}
