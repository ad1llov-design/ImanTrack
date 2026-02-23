/**
 * @module shared/components/ui/SWUpdatePrompt
 * 
 * Shows a toast/banner when a new Service Worker version is available.
 * Prompts the user to reload and get the latest version of the app.
 */

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SWUpdatePrompt() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    const handleSWUpdate = async () => {
      try {
        const reg = await navigator.serviceWorker.getRegistration();
        if (!reg) return;

        setRegistration(reg);

        // Listen for new service worker installing
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // New version available
              setShowUpdate(true);
            }
          });
        });

        // Check for updates immediately
        void reg.update();
      } catch (err) {
        console.warn("SW update check failed:", err);
      }
    };

    // Also listen for controller change (means new SW took over)
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });

    void handleSWUpdate();

    // Check for updates every 60 seconds
    const interval = setInterval(() => {
      if (registration) {
        void registration.update();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [registration]);

  const handleUpdate = () => {
    if (registration?.waiting) {
      // Tell the waiting SW to skip waiting and become active
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
    setShowUpdate(false);
  };

  const handleDismiss = () => {
    setShowUpdate(false);
  };

  return (
    <AnimatePresence>
      {showUpdate && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-1/2 z-[200] -translate-x-1/2 w-[calc(100%-2rem)] max-w-md"
        >
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-primary-200 bg-white/95 p-4 shadow-2xl backdrop-blur-xl dark:border-primary-800/40 dark:bg-neutral-900/95">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-950/40">
                <svg className="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
                  Новая версия!
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Обновите для получения исправлений
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDismiss}
                className="rounded-lg px-2 py-1 text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
              >
                Позже
              </button>
              <button
                onClick={handleUpdate}
                className="rounded-xl bg-primary-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-primary-700 active:scale-95"
              >
                Обновить
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
