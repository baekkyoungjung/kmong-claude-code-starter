"use client";

import { motion } from "motion/react";

export function StarRating({
  stars,
  maxStars = 3,
  size = "md",
}: {
  stars: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  }[size];

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxStars }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 300 }}
          className={sizeClass}
        >
          {i < stars ? "⭐" : "☆"}
        </motion.span>
      ))}
    </div>
  );
}
