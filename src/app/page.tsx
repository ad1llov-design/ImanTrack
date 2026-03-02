"use client";

import dynamic from "next/dynamic";

const PrayerWidget = dynamic(
  () => import("@features/prayer/components/PrayerWidget").then((m) => m.PrayerWidget),
  { ssr: false, loading: () => <div className="h-48 animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-800" /> }
);

const PrayerStructure = dynamic(
  () => import("@features/prayer/components/PrayerStructure"),
  { ssr: false }
);

const SalahSteps = dynamic(
  () => import("@features/prayer/components/SalahSteps"),
  { ssr: false }
);

const VideoTutorial = dynamic(
  () => import("@features/prayer/components/VideoTutorial"),
  { ssr: false }
);

export default function SiratPage() {
  return (
    <main className="mx-auto w-full max-w-lg px-4 pt-8 pb-32 md:px-0 flex flex-col space-y-10">
      {/* 1. Namaz Hero */}
      <section className="text-center pt-4 flex flex-col items-center justify-center">
        <div className="relative inline-block mb-3">
          <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
            Namaz
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-primary-500 rounded-full"></div>
        </div>
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-4 max-w-xs mx-auto">
          Complete guide according to Hanafi madhab
        </p>
      </section>

      {/* 2. Prayer Times */}
      <section>
        <PrayerWidget />
      </section>

      {/* 3. Prayer Structure */}
      <PrayerStructure />

      {/* 4. Step-by-step Salah Guide */}
      <SalahSteps />

      {/* 5. Video Tutorial */}
      <VideoTutorial />
    </main>
  );
}

