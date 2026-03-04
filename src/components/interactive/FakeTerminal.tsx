"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface TerminalLine {
  type: "input" | "output" | "system";
  text: string;
}

export function FakeTerminal({
  lines,
  typingSpeed = 30,
}: {
  lines: TerminalLine[];
  typingSpeed?: number;
}) {
  const [visibleLines, setVisibleLines] = useState<
    { line: TerminalLine; displayText: string; done: boolean }[]
  >([]);

  useEffect(() => {
    setVisibleLines([]);
    let cancelled = false;

    async function animate() {
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return;
        const line = lines[i];

        // Add the line with empty text
        setVisibleLines((prev) => [
          ...prev,
          { line, displayText: "", done: false },
        ]);

        // Type out character by character
        const fullText = line.text;
        for (let j = 0; j <= fullText.length; j++) {
          if (cancelled) return;
          const charsSoFar = fullText.slice(0, j);
          setVisibleLines((prev) => {
            const updated = [...prev];
            updated[i] = { line, displayText: charsSoFar, done: false };
            return updated;
          });
          await new Promise((r) => setTimeout(r, line.type === "input" ? typingSpeed : typingSpeed / 3));
        }

        // Mark line as done
        setVisibleLines((prev) => {
          const updated = [...prev];
          updated[i] = { line, displayText: fullText, done: true };
          return updated;
        });

        // Pause between lines
        await new Promise((r) => setTimeout(r, 300));
      }
    }

    animate();
    return () => {
      cancelled = true;
    };
  }, [lines, typingSpeed]);

  function getLineColor(type: TerminalLine["type"]) {
    switch (type) {
      case "input":
        return "text-green-400";
      case "output":
        return "text-gray-200";
      case "system":
        return "text-yellow-400/70";
    }
  }

  return (
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
        <span className="ml-2 text-xs text-gray-400">Terminal</span>
      </div>

      {/* Terminal content */}
      <div className="min-h-[120px] p-4 space-y-1">
        {visibleLines.map((entry, i) => (
          <div key={i} className={getLineColor(entry.line.type)}>
            {entry.line.type === "input" && (
              <span className="text-green-500 font-bold">$ </span>
            )}
            <span>{entry.displayText}</span>
            {!entry.done && (
              <span className="inline-block w-2 h-4 ml-0.5 bg-gray-400 animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
