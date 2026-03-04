"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { claudeQuestions } from "@/data/quizzes";

interface Line {
  type: "user" | "claude" | "system";
  text: string;
}

export function ClaudeQuestionsSimulator({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [visibleLines, setVisibleLines] = useState<
    { line: Line; displayText: string; done: boolean }[]
  >([]);
  const [animationDone, setAnimationDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const allLines: Line[] = [
      { type: "user", text: "시작하기 전에 나에게 5가지 질문해줘" },
      {
        type: "claude",
        text: "네, 더 좋은 결과를 위해 몇 가지 질문드리겠습니다:",
      },
      ...claudeQuestions.map(
        (q, i) => ({ type: "claude" as const, text: `${i + 1}. ${q}` })
      ),
      {
        type: "system",
        text: "Tip: Linear/Slack/Google Docs를 직접 연결하면 맥락을 자동으로 가져올 수 있습니다 (MCP)",
      },
    ];

    async function animate() {
      for (let i = 0; i < allLines.length; i++) {
        if (cancelled) return;
        const line = allLines[i];

        setVisibleLines((prev) => [
          ...prev,
          { line, displayText: "", done: false },
        ]);

        const fullText = line.text;
        const speed = line.type === "user" ? 40 : 15;

        for (let j = 0; j <= fullText.length; j++) {
          if (cancelled) return;
          const charsSoFar = fullText.slice(0, j);
          setVisibleLines((prev) => {
            const updated = [...prev];
            updated[i] = { line, displayText: charsSoFar, done: false };
            return updated;
          });
          await new Promise((r) => setTimeout(r, speed));
        }

        setVisibleLines((prev) => {
          const updated = [...prev];
          updated[i] = { line, displayText: fullText, done: true };
          return updated;
        });

        await new Promise((r) => setTimeout(r, 400));
      }

      if (!cancelled) {
        setAnimationDone(true);
      }
    }

    animate();
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  function getLineColor(type: Line["type"]) {
    switch (type) {
      case "user":
        return "text-green-400";
      case "claude":
        return "text-gray-200";
      case "system":
        return "text-yellow-400/70";
    }
  }

  function getPrefix(type: Line["type"]) {
    switch (type) {
      case "user":
        return <span className="font-bold text-green-500">You &gt; </span>;
      case "claude":
        return <span className="font-bold text-blue-400">Claude &gt; </span>;
      case "system":
        return <span className="font-bold text-yellow-500">[MCP] </span>;
    }
  }

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-lg bg-gray-900 font-mono text-sm shadow-lg"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 bg-gray-800 px-4 py-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-gray-400">Claude Code</span>
        </div>

        {/* Terminal content */}
        <div
          ref={containerRef}
          className="max-h-[400px] min-h-[200px] space-y-2 overflow-y-auto p-4"
        >
          {visibleLines.map((entry, i) => (
            <div key={i} className={`${getLineColor(entry.line.type)}`}>
              {getPrefix(entry.line.type)}
              <span>{entry.displayText}</span>
              {!entry.done && (
                <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-gray-400" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {animationDone && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <button
            onClick={onComplete}
            className="cursor-pointer rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            이해했습니다
          </button>
        </motion.div>
      )}
    </div>
  );
}
