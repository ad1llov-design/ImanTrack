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
        "rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur-xl shadow-card",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
