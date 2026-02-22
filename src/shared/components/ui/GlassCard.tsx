"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@shared/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function GlassCard({ children, className, delay = 0, ...props }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1],
        delay 
      }}
      className={cn(
        "rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
