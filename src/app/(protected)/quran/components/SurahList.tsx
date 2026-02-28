"use client"

import { surahStartPage } from "../data/surahStartPage"

export default function SurahList({ onSelect }: { onSelect: (s: number) => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
      {Object.keys(surahStartPage).map((num) => (
        <button
          key={num}
          onClick={() => onSelect(Number(num))}
          className="flex items-center justify-between bg-surface hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-border p-3.5 rounded-xl transition-all active:scale-95 text-main font-semibold group hover:border-primary-500 shadow-sm"
        >
          <span className="text-sm font-bold opacity-80 group-hover:text-primary-600 transition-colors">
            Сура {num}
          </span>
          <span className="text-[10px] text-muted opacity-60">
            Стр {surahStartPage[Number(num)]}
          </span>
        </button>
      ))}
    </div>
  )
}
