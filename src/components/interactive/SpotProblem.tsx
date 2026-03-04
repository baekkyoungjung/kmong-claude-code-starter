"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { SpotProblemScenario } from "@/lib/types";

export function SpotProblem({
  scenarios,
  onComplete,
}: {
  scenarios: SpotProblemScenario[];
  onComplete: (score: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [firstTryCorrect, setFirstTryCorrect] = useState<boolean[]>([]);
  const [hasWrongAttempt, setHasWrongAttempt] = useState(false);

  const scenario = scenarios[currentIndex];
  const isLast = currentIndex === scenarios.length - 1;
  const answered = selectedId === scenario.correctId;

  function handleSelect(optionId: string) {
    if (answered) return;

    if (optionId === scenario.correctId) {
      setSelectedId(optionId);
      setFirstTryCorrect((prev) => [...prev, !hasWrongAttempt]);
    } else {
      setHasWrongAttempt(true);
      setSelectedId(optionId);
      // Reset after a brief flash
      setTimeout(() => setSelectedId(null), 600);
    }
  }

  function handleNext() {
    if (isLast) {
      const score = firstTryCorrect.filter(Boolean).length;
      onComplete(score);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedId(null);
    setHasWrongAttempt(false);
  }

  function getButtonStyle(optionId: string) {
    if (selectedId === null) {
      return "border-border bg-card hover:border-primary hover:bg-primary/5";
    }
    if (optionId === scenario.correctId && answered) {
      return "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
    }
    if (optionId === selectedId && !answered) {
      return "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
    }
    if (answered) {
      return "border-border bg-card opacity-50";
    }
    return "border-border bg-card hover:border-primary hover:bg-primary/5";
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        {scenarios.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i < currentIndex
                ? "bg-green-500"
                : i === currentIndex
                  ? "bg-primary"
                  : "bg-muted"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="space-y-5"
        >
          {/* Scenario number */}
          <div className="text-sm font-medium text-muted-foreground">
            시나리오 {currentIndex + 1} / {scenarios.length}
          </div>

          {/* The prompt */}
          <div className="rounded-lg bg-gray-900 p-4 font-mono text-sm text-gray-200">
            <div className="mb-1 text-xs text-gray-500">사용자 프롬프트:</div>
            <span className="text-green-400">&gt; </span>
            {scenario.prompt}
          </div>

          {/* Bad result */}
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <div className="mb-1 text-sm font-medium text-red-500">
              실망스러운 결과:
            </div>
            <p className="text-sm text-muted-foreground">
              {scenario.badResult}
            </p>
          </div>

          {/* Question */}
          <h3 className="text-lg font-semibold">
            이 결과의 진짜 원인은 무엇일까요?
          </h3>

          {/* Options */}
          <div className="grid gap-3">
            {scenario.options.map((option) => (
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

          {/* Feedback */}
          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-lg bg-green-500/10 p-4">
                  <p className="font-medium text-green-700 dark:text-green-400">
                    {hasWrongAttempt
                      ? "정답! (재시도 후 맞춤)"
                      : "정답! 첫 번째 시도에 맞추셨습니다!"}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="font-medium">빠뜨린 맥락: </span>
                    {scenario.missingContext}
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-center"
                >
                  <button
                    onClick={handleNext}
                    className="cursor-pointer rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    {isLast ? "결과 확인" : "다음 시나리오"}
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Wrong answer nudge */}
          <AnimatePresence>
            {selectedId !== null && !answered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-lg bg-amber-500/10 p-3 text-center text-sm text-amber-700 dark:text-amber-400"
              >
                다시 한번 생각해보세요. 힌트: 지시한 사람의 관점에서 보세요.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
