"use client"

import { useState } from "react"
import { useLanguage } from "@shared/i18n/LanguageContext"

export default function AudioPlayer({ surah }: { surah: number }) {
  const [reciter, setReciter] = useState("ar.alafasy")
  const { t } = useLanguage()

  const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/${reciter}/${surah}.mp3`

  return (
    <div className="w-full max-w-3xl mt-6">
      <div className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-muted">
         {t("quran.select_reciter")}
      </div>
      <div className="relative mb-4 shrink-0">
        <select
          value={reciter}
          onChange={(e) => setReciter(e.target.value)}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-main outline-none focus:border-primary-500 transition-all appearance-none cursor-pointer"
        >
          <option value="ar.alafasy">Mishary Alafasy</option>
          <option value="ar.abdulbasitmurattal">Abdul Basit</option>
          <option value="ar.minshawi">Minshawi</option>
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
          ▼
        </div>
      </div>

      <audio controls className="w-full rounded-2xl bg-surface border border-border outline-none [&::-webkit-media-controls-panel]:bg-surface shadow-sm" key={audioUrl}>
        <source src={audioUrl} type="audio/mpeg" />
      </audio>
    </div>
  )
}
