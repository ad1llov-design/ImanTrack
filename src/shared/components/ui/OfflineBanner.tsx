/**
 * @module shared/components/ui/OfflineBanner
 * 
 * Banner that shows when the app is offline.
 */

"use client";

import { usePWA } from "@shared/hooks/usePWA";
import { motion, AnimatePresence } from "framer-motion";

export function OfflineBanner() {
  const { isOffline } = usePWA();

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed inset-x-0 top-0 z-[110] bg-amber-500 py-1.5 text-center text-[0.7rem] font-bold uppercase tracking-widest text-white shadow-md"
        >
          Вы работаете в автономном режиме 📴
        </motion.div>
      )}
    </AnimatePresence>
  );
}
