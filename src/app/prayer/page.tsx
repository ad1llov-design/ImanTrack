/**
 * @page /prayer
 *
 * РЎС‚СЂР°РЅРёС†Р° РІСЂРµРјС‘РЅ РЅР°РјР°Р·РѕРІ.
 * РСЃРїРѕР»СЊР·СѓРµС‚ PrayerTimesList (client component) РґР»СЏ РІСЃРµР№ Р»РѕРіРёРєРё.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Р’СЂРµРјСЏ РЅР°РјР°Р·РѕРІ вЂ” ImanTrack",
  description: "РўРѕС‡РЅРѕРµ РІСЂРµРјСЏ РІСЃРµС… РїСЏС‚Рё РЅР°РјР°Р·РѕРІ РґР»СЏ РІР°С€РµРіРѕ РјРµСЃС‚РѕРїРѕР»РѕР¶РµРЅРёСЏ",
};

// РРјРїРѕСЂС‚РёСЂСѓРµРј РґРёРЅР°РјРёС‡РµСЃРєРё С‡С‚РѕР±С‹ РѕС‚РєР»СЋС‡РёС‚СЊ SSR (geolocation С‚РѕР»СЊРєРѕ РІ Р±СЂР°СѓР·РµСЂРµ)
import dynamic from "next/dynamic";

const PrayerTimesList = dynamic(
  () => import("@features/prayer/components/PrayerTimesList").then((m) => m.PrayerTimesList),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-lg space-y-4 px-4 pt-16">
        <div className="h-6 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="h-40 w-full animate-pulse rounded-3xl bg-neutral-100 dark:bg-neutral-800" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 w-full animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
        ))}
      </div>
    ),
  },
);

export default function PrayerPage() {
  return (
    <div className="min-h-screen bg-background text-main">
      <div className="mx-auto max-w-lg px-4 py-8 sm:py-12">
        {/* Page header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
            рџ•Њ Р’СЂРµРјСЏ РЅР°РјР°Р·РѕРІ
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            РўРѕС‡РЅРѕРµ РІСЂРµРјСЏ РґР»СЏ РІР°С€РµРіРѕ СЂРµРіРёРѕРЅР°
          </p>
        </div>

        <PrayerTimesList />

        {/* Dua footer */}
        <div className="mt-12 rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 to-white p-6 text-center dark:border-gold-800 dark:from-gold-950/20 dark:to-surface-dark">
          <p className="font-arabic text-xl leading-loose text-gold-700 dark:text-gold-300">
            ШҐЩђЩ†ЩЋЩ‘ Ш§Щ„ШµЩЋЩ‘Щ„ЩЋШ§Ш©ЩЋ ЩѓЩЋШ§Щ†ЩЋШЄЩ’ Ш№ЩЋЩ„ЩЋЩ‰ Ш§Щ„Щ’Щ…ЩЏШ¤Щ’Щ…ЩђЩ†ЩђЩЉЩ†ЩЋ ЩѓЩђШЄЩЋШ§ШЁЩ‹Ш§ Щ…ЩЋЩ‘Щ€Щ’Щ‚ЩЏЩ€ШЄЩ‹Ш§
          </p>
          <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
            В«Р’РѕРёСЃС‚РёРЅСѓ, РЅР°РјР°Р· РїСЂРµРґРїРёСЃР°РЅ РІРµСЂСѓСЋС‰РёРј РІ РѕРїСЂРµРґРµР»С‘РЅРЅРѕРµ РІСЂРµРјСЏВ» (4:103)
          </p>
        </div>
      </div>
    </div>
  );
}
