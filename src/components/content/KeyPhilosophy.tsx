"use client";

import { motion } from "motion/react";

export function KeyPhilosophy({ children }: { children: React.ReactNode }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="my-8 rounded-xl border-2 border-primary/20 bg-primary/5 p-6 text-center text-lg font-medium leading-relaxed md:p-8 md:text-xl"
    >
      {children}
    </motion.blockquote>
  );
}
