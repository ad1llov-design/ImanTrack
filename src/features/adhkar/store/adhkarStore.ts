/**
 * @module features/adhkar/store/adhkarStore
 *
 * Zustand store для модуля Adhkar.
 * Управляет: активная категория, текущий зикр, прогресс, навигация.
 */

"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type {
  AdhkarCategory,
  AdhkarState,
  DhikrProgress,
} from "../types/adhkar.types";

/* ── Actions ────────────────────────────────────────────────────────── */

interface AdhkarActions {
  setActiveCategory: (category: AdhkarCategory | null) => void;
  setActiveDhikrIndex: (index: number) => void;
  nextDhikr: (totalInCategory: number) => void;
  prevDhikr: () => void;
  setProgress: (progress: Record<string, DhikrProgress>) => void;
  updateDhikrProgress: (dhikrId: string, progress: DhikrProgress) => void;
  incrementCount: (dhikrId: string, targetCount: number) => void;
  resetDhikr: (dhikrId: string, targetCount: number) => void;
  resetCategory: (dhikrIds: string[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

/* ── Initial state ──────────────────────────────────────────────────── */

const initialState: AdhkarState = {
  activeCategory: null,
  activeDhikrIndex: 0,
  progress: {},
  isLoading: false,
  error: null,
};

/* ── Store ──────────────────────────────────────────────────────────── */

export const useAdhkarStore = create<AdhkarState & AdhkarActions>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setActiveCategory: (activeCategory) =>
        set({ activeCategory, activeDhikrIndex: 0 }, false, "adhkar/setCategory"),

      setActiveDhikrIndex: (activeDhikrIndex) =>
        set({ activeDhikrIndex }, false, "adhkar/setDhikrIndex"),

      nextDhikr: (totalInCategory) => {
        const { activeDhikrIndex } = get();
        if (activeDhikrIndex < totalInCategory - 1) {
          set({ activeDhikrIndex: activeDhikrIndex + 1 }, false, "adhkar/nextDhikr");
        }
      },

      prevDhikr: () => {
        const { activeDhikrIndex } = get();
        if (activeDhikrIndex > 0) {
          set({ activeDhikrIndex: activeDhikrIndex - 1 }, false, "adhkar/prevDhikr");
        }
      },

      setProgress: (progress) =>
        set({ progress }, false, "adhkar/setProgress"),

      updateDhikrProgress: (dhikrId, progress) =>
        set(
          (state) => ({
            progress: { ...state.progress, [dhikrId]: progress },
          }),
          false,
          "adhkar/updateProgress",
        ),

      incrementCount: (dhikrId, targetCount) => {
        const { progress } = get();
        const current = progress[dhikrId];
        const currentCount = (current?.currentCount ?? 0) + 1;
        const isCompleted = currentCount >= targetCount;

        set(
          (state) => ({
            progress: {
              ...state.progress,
              [dhikrId]: {
                dhikrId,
                currentCount: Math.min(currentCount, targetCount),
                targetCount,
                isCompleted,
                completedAt: isCompleted ? new Date() : undefined,
              },
            },
          }),
          false,
          "adhkar/increment",
        );
      },

      resetDhikr: (dhikrId, targetCount) =>
        set(
          (state) => ({
            progress: {
              ...state.progress,
              [dhikrId]: {
                dhikrId,
                currentCount: 0,
                targetCount,
                isCompleted: false,
              },
            },
          }),
          false,
          "adhkar/resetDhikr",
        ),

      resetCategory: (dhikrIds) =>
        set(
          (state) => {
            const newProgress = { ...state.progress };
            for (const id of dhikrIds) {
              delete newProgress[id];
            }
            return { progress: newProgress };
          },
          false,
          "adhkar/resetCategory",
        ),

      setLoading: (isLoading) =>
        set({ isLoading }, false, "adhkar/setLoading"),

      setError: (error) =>
        set({ error, isLoading: false }, false, "adhkar/setError"),
    }),
    { name: "AdhkarStore" },
  ),
);
