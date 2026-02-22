import { Metadata } from "next";
import { AssistantChat } from "@features/assistant/components/AssistantChat";

export const metadata: Metadata = {
  title: "AI Ментор",
  description: "Ваш персональный духовный помощник на базе ИИ.",
};

export default function AssistantPage() {
  return (
    <main className="min-h-screen pt-4 pb-20 px-4 flex items-center justify-center bg-surface-dark">
      <AssistantChat />
    </main>
  );
}
