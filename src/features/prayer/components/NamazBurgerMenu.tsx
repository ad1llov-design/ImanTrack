"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import dynamic from "next/dynamic";

const PrayerStructure = dynamic(() => import("./PrayerStructure"), { ssr: false });
const SalahSteps = dynamic(() => import("./SalahSteps"), { ssr: false });
const VideoTutorial = dynamic(() => import("./VideoTutorial"), { ssr: false });

export function NamazBurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 -mr-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
        aria-label="Open Namaz Guide"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-white dark:bg-neutral-950 h-full overflow-y-auto shadow-2xl animate-fade-in flex flex-col transform">
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-border">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50">О Намазе</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 -mr-2 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </button>
            </div>
            
            <div className="p-6 space-y-12">
              <div className="-mt-6">
                <PrayerStructure />
              </div>
              <div className="-mt-6">
                <SalahSteps />
              </div>
              <div className="-mt-6">
                <VideoTutorial />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
