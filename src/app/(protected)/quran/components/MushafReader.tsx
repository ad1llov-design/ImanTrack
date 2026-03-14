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

export default function MushafReader({ initialPage, externalPage }: { initialPage: number, externalPage?: number }) {
  const [page, setPage] = useState(initialPage);
  const { t } = useLanguage();
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);

  const resetZoom = useCallback(() => {
    transformRef.current?.resetTransform(0.2);
  }, []);

  useEffect(() => {
    resetZoom();
  }, [page, resetZoom]);

  useEffect(() => {
    if (externalPage && externalPage !== page) {
      setPage(externalPage);
    }
  }, [externalPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const nextPage = () => {
    if (page < TOTAL_PAGES) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-primary-600 dark:text-primary-400 mb-4 text-sm font-semibold">
        {t("quran.page_number").replace("{number}", String(page))} / {TOTAL_PAGES}
      </div>

      <div className="w-full max-w-3xl bg-neutral-100 dark:bg-black rounded-xl overflow-hidden shadow-card border border-border">
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
            contentStyle={{ width: "100%", willChange: "transform" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://raw.githubusercontent.com/arman088/quranPNG/main/png/${page}.png`}
              alt={`Quran Page ${page}`}
              className="w-full h-auto object-contain bg-white select-none"
              draggable={false}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>

      <div className="flex gap-3 mt-6 w-full max-w-3xl">
        <button
          onClick={prevPage}
          className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-xl font-medium transition-colors active:scale-95 disabled:opacity-50"
          disabled={page <= 1}
        >
          <ChevronLeft className="w-5 h-5" />
          {t("quran.prev_page")}
        </button>

        <button
          onClick={resetZoom}
          className="flex items-center justify-center gap-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 px-5 p-4 rounded-xl font-medium transition-colors active:scale-95"
          title={t("quran.reset_zoom")}
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={nextPage}
          className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-xl font-medium transition-colors active:scale-95 disabled:opacity-50"
          disabled={page >= TOTAL_PAGES}
        >
          {t("quran.next_page")}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
