"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ContextItem } from "@/lib/types";
import { CONTEXT_METER_LEVELS } from "@/lib/constants";

function getLevel(percentage: number) {
  return (
    CONTEXT_METER_LEVELS.find(
      (l) => percentage >= l.min && percentage <= l.max
    ) ?? CONTEXT_METER_LEVELS[0]
  );
}

function getGaugeColor(percentage: number) {
  const level = getLevel(percentage);
  switch (level.color) {
    case "red":
      return "bg-red-500";
    case "yellow":
      return "bg-yellow-500";
    case "green":
      return "bg-green-500";
    case "gold":
      return "bg-amber-400";
    default:
      return "bg-gray-400";
  }
}

function getBorderColor(percentage: number) {
  const level = getLevel(percentage);
  switch (level.color) {
    case "red":
      return "border-red-500/30";
    case "yellow":
      return "border-yellow-500/30";
    case "green":
      return "border-green-500/30";
    case "gold":
      return "border-amber-400/30";
    default:
      return "border-gray-400/30";
  }
}

export function ContextMeter({
  items,
  onComplete,
}: {
  items: ContextItem[];
  onComplete: (percentage: number) => void;
}) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const percentage = items
    .filter((item) => selectedIds.has(item.id))
    .reduce((sum, item) => sum + item.percentage, 0);

  const level = getLevel(percentage);

  const toggleItem = useCallback(
    (id: string) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    []
  );

  const allSelected = selectedIds.size === items.length;

  return (
    <div className="space-y-6">
      {/* Gauge and level display */}
      <div className="flex items-start gap-6">
        {/* Vertical gauge */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={`relative h-64 w-10 overflow-hidden rounded-full border-2 bg-muted ${getBorderColor(percentage)}`}
          >
            <motion.div
              className={`absolute bottom-0 left-0 right-0 ${getGaugeColor(percentage)}`}
              initial={{ height: "0%" }}
              animate={{ height: `${percentage}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            />
            {/* Level markers */}
            {[30, 60, 80].map((mark) => (
              <div
                key={mark}
                className="absolute left-0 right-0 border-t border-dashed border-foreground/20"
                style={{ bottom: `${mark}%` }}
              />
            ))}
          </div>
          <motion.span
            key={percentage}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="text-lg font-bold tabular-nums"
          >
            {percentage}%
          </motion.span>
        </div>

        {/* Level label */}
        <div className="flex-1 space-y-3 pt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={level.label}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2"
            >
              <span className="text-2xl">{level.emoji}</span>
              <span className="text-sm font-medium text-muted-foreground">
                {level.label}
              </span>
            </motion.div>
          </AnimatePresence>

          <p className="text-sm text-muted-foreground">
            항목을 클릭하여 맥락을 추가하세요. 제공하는 맥락이 많을수록 AI의
            결과물이 좋아집니다.
          </p>
        </div>
      </div>

      {/* Context item cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((item) => {
          const isSelected = selectedIds.has(item.id);
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleItem(item.id)}
              className={`cursor-pointer rounded-xl border-2 px-3 py-4 text-center transition-colors ${
                isSelected
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="text-sm font-medium">{item.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                +{item.percentage}%
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-1 text-xs text-primary"
                >
                  ✓ 추가됨
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Complete button */}
      {allSelected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onComplete(percentage)}
            className="cursor-pointer rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground"
          >
            맥락 제출 완료
          </motion.button>
        </motion.div>
      )}

      {!allSelected && selectedIds.size > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onComplete(percentage)}
            className="cursor-pointer rounded-lg border border-border px-8 py-3 text-sm text-muted-foreground hover:bg-muted"
          >
            이 정도면 충분하다고 생각하면 제출하기
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
