"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { QuizQuestion as QuizQuestionType } from "@/lib/types";

export function QuizQuestion({
  question,
  onAnswer,
}: {
  question: QuizQuestionType;
  onAnswer: (correct: boolean) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const answered = selectedId !== null;

  function handleSelect(optionId: string) {
    if (answered) return;
    setSelectedId(optionId);
    onAnswer(optionId === question.correctId);
  }

  function getButtonStyle(optionId: string) {
    if (!answered) {
      return "border-border bg-card hover:border-primary hover:bg-primary/5";
    }
    if (optionId === question.correctId) {
      return "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
    }
    if (optionId === selectedId) {
      return "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
    }
    return "border-border bg-card opacity-50";
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{question.question}</h3>

      <div className="grid gap-3">
        {question.options.map((option) => (
          <motion.button
            key={option.id}
            whileHover={!answered ? { scale: 1.01 } : undefined}
            whileTap={!answered ? { scale: 0.99 } : undefined}
            onClick={() => handleSelect(option.id)}
            disabled={answered}
            className={`w-full cursor-pointer rounded-lg border-2 px-4 py-3 text-left transition-colors ${getButtonStyle(option.id)}`}
          >
            <span className="mr-2 font-mono text-sm text-muted-foreground">
              {option.id.toUpperCase()}.
            </span>
            {option.text}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className={`mt-2 rounded-lg p-4 ${
                selectedId === question.correctId
                  ? "bg-green-500/10 text-green-700 dark:text-green-400"
                  : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
              }`}
            >
              <p className="font-medium">
                {selectedId === question.correctId ? "정답!" : "오답!"}
              </p>
              <p className="mt-1 text-sm">{question.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
