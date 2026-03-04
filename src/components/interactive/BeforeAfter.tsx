"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BeforeAfter({
  beforeTitle,
  beforeContent,
  afterTitle,
  afterContent,
  onComplete,
}: {
  beforeTitle: string;
  beforeContent: string;
  afterTitle: string;
  afterContent: string;
  onComplete: () => void;
}) {
  const [view, setView] = useState<"before" | "after">("before");
  const [beforeTyped, setBeforeTyped] = useState("");
  const [afterTyped, setAfterTyped] = useState("");
  const [beforeDone, setBeforeDone] = useState(false);
  const [afterDone, setAfterDone] = useState(false);
  const completedRef = useRef(false);

  // Slow typing for "before" — tedious
  useEffect(() => {
    if (view !== "before" || beforeDone) return;
    let i = 0;
    setBeforeTyped("");
    const interval = setInterval(() => {
      i++;
      setBeforeTyped(beforeContent.slice(0, i));
      if (i >= beforeContent.length) {
        clearInterval(interval);
        setBeforeDone(true);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [view, beforeContent, beforeDone]);

  // Fast typing for "after" — clean
  useEffect(() => {
    if (view !== "after" || afterDone) return;
    let i = 0;
    setAfterTyped("");
    const interval = setInterval(() => {
      i++;
      setAfterTyped(afterContent.slice(0, i));
      if (i >= afterContent.length) {
        clearInterval(interval);
        setAfterDone(true);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [view, afterContent, afterDone]);

  // Fire onComplete when both sides are viewed
  useEffect(() => {
    if (beforeDone && afterDone && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  }, [beforeDone, afterDone, onComplete]);

  const isBefore = view === "before";

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div className="flex justify-center gap-2">
        <Button
          variant={isBefore ? "default" : "outline"}
          size="sm"
          onClick={() => setView("before")}
        >
          {beforeTitle}
        </Button>
        <Button
          variant={!isBefore ? "default" : "outline"}
          size="sm"
          onClick={() => setView("after")}
        >
          {afterTitle}
        </Button>
      </div>

      {/* Content */}
      <motion.div
        key={view}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card
          className={
            isBefore
              ? "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/30"
              : "border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/30"
          }
        >
          <CardHeader className="pb-3">
            <CardTitle
              className={`text-base ${isBefore ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
            >
              {isBefore ? beforeTitle : afterTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {isBefore ? beforeTyped : afterTyped}
              {((isBefore && !beforeDone) || (!isBefore && !afterDone)) && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.7 }}
                  className="inline-block"
                >
                  |
                </motion.span>
              )}
            </pre>
          </CardContent>
        </Card>
      </motion.div>

      {/* Status */}
      {beforeDone && afterDone && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-green-600 dark:text-green-400"
        >
          두 방식의 차이를 확인했습니다!
        </motion.p>
      )}
    </div>
  );
}
