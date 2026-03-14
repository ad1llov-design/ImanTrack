"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useLanguage } from "@shared/i18n/LanguageContext";
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

const TOTAL_PAGES = 604;

// ─── Calibration for standard 15-line Madani Mushaf (quranPNG scans) ───────
// Text content area: starts at ~9% from top, ends at ~87% from top.
// 15 lines are evenly distributed in that 78% content window.
// Each line occupies 78/15 ≈ 5.2% of image height.
const TEXT_TOP_PCT    = 9.0;   // top edge of line 1
const LINE_HEIGHT_PCT = 5.15;  // height of each line in % of full image
const LINE_GAP_PCT    = 0.2;   // small gap between lines

// Returns the TOP % position of a given line (1-indexed)
function lineTopPct(line: number): number {
  return TEXT_TOP_PCT + (line - 1) * (LINE_HEIGHT_PCT + LINE_GAP_PCT);
}

interface VerseLineInfo {
  surah: number;
  ayah: number;
  minLine: number;
  maxLine: number;
}

interface MushafReaderProps {
  initialPage: number;
  externalPage?: number;
  activeVerseKey?: string | null; // e.g. "2:5"
}

export default function MushafReader({ initialPage, externalPage, activeVerseKey }: MushafReaderProps) {
  const [page, setPage] = useState(initialPage);
  const { t } = useLanguage();
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);
  const [pageLayout, setPageLayout] = useState<VerseLineInfo[]>([]);

  const resetZoom = useCallback(() => {
    transformRef.current?.resetTransform(0.2);
  }, []);

  useEffect(() => { resetZoom(); }, [page, resetZoom]);

  useEffect(() => {
    if (externalPage && externalPage !== page) setPage(externalPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalPage]);

  // Fetch per-verse line positions for the current page from quran.com API
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(
          `https://api.quran.com/api/v4/verses/by_page/${page}?words=true&word_fields=line_number`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        const layout: VerseLineInfo[] = (data.verses ?? []).map((v: any) => {
          const lines: number[] = (v.words ?? [])
            .filter((w: any) => w.char_type_name === "word")
            .map((w: any) => Number(w.line_number))
            .filter((n: number) => n > 0);
          const [surah, ayah] = (v.verse_key as string).split(":").map(Number);
          return {
            surah, ayah,
            minLine: lines.length ? Math.min(...lines) : 0,
            maxLine: lines.length ? Math.max(...lines) : 0,
          };
        });
        setPageLayout(layout);
      } catch { /* silent fail */ }
    }
    load();
    return () => { cancelled = true; };
  }, [page]);

  const nextPage = () => { if (page < TOTAL_PAGES) setPage((p) => p + 1); };
  const prevPage = () => { if (page > 1) setPage((p) => p - 1); };

  // Determine highlight block for the active ayah:
  // Instead of per-line strips → one unified rectangle from top-of-minLine to bottom-of-maxLine
  let highlightBlock: { top: number; height: number } | null = null;
  if (activeVerseKey) {
    const [hS, hA] = activeVerseKey.split(":").map(Number);
    const entry = pageLayout.find((e) => e.surah === hS && e.ayah === hA);
    if (entry && entry.minLine > 0) {
      const top    = lineTopPct(entry.minLine);
      const bottom = lineTopPct(entry.maxLine) + LINE_HEIGHT_PCT;
      highlightBlock = { top, height: bottom - top };
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-primary-600 dark:text-primary-400 mb-4 text-sm font-semibold">
        {t("quran.page_number").replace("{number}", String(page))} / {TOTAL_PAGES}
      </div>

      <div className="w-full max-w-3xl bg-white dark:bg-black rounded-xl overflow-hidden shadow-card border border-border">
        <TransformWrapper
          ref={transformRef}
          initialScale={1}
          minScale={1}
          maxScale={3}
          doubleClick={{ mode: "toggle", step: 1 }}
          wheel={{ step: 0.1 }}
          panning={{ velocityDisabled: true }}
          alignmentAnimation={{ sizeX: 0, sizeY: 0 }}
        >
          <TransformComponent
            wrapperStyle={{ width: "100%", overflow: "hidden" }}
            contentStyle={{ width: "100%", willChange: "transform", position: "relative", display: "block" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://raw.githubusercontent.com/arman088/quranPNG/main/png/${page}.png`}
              alt={`Quran Page ${page}`}
              className="w-full h-auto object-contain select-none block"
              draggable={false}
            />

            {/* ─── SINGLE UNIFIED AYAH HIGHLIGHT BLOCK ─── */}
            {highlightBlock && (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: `${highlightBlock.top}%`,
                  left: "11%",
                  width: "78%",
                  height: `${highlightBlock.height}%`,
                  background: "rgba(34, 197, 94, 0.22)",
                  borderRadius: "6px",
                  pointerEvents: "none",
                  transition: "top 0.4s ease, height 0.4s ease, opacity 0.3s ease",
                  border: "1.5px solid rgba(34,197,94,0.50)",
                  boxShadow: "0 0 10px rgba(34,197,94,0.18)",
                }}
              />
            )}
          </TransformComponent>
        </TransformWrapper>
      </div>

      <div className="flex gap-3 mt-6 w-full max-w-3xl">
        <button onClick={prevPage} disabled={page <= 1}
          className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-xl font-medium transition-colors active:scale-95 disabled:opacity-50">
          <ChevronLeft className="w-5 h-5" />
          {t("quran.prev_page")}
        </button>

        <button onClick={resetZoom}
          className="flex items-center justify-center gap-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 px-5 p-4 rounded-xl font-medium transition-colors active:scale-95"
          title={t("quran.reset_zoom")}>
          <RotateCcw className="w-5 h-5" />
        </button>

        <button onClick={nextPage} disabled={page >= TOTAL_PAGES}
          className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-xl font-medium transition-colors active:scale-95 disabled:opacity-50">
          {t("quran.next_page")}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
