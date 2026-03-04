"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ConceptCard } from "@/components/content/ConceptCard";
import { KeyPhilosophy } from "@/components/content/KeyPhilosophy";
import { FakeTerminal } from "@/components/interactive/FakeTerminal";
import { StarRating } from "@/components/game/StarRating";
import { MissionComplete } from "@/components/game/MissionComplete";
import { useGameStore } from "@/stores/useGameStore";
import { promptExamples } from "@/data/quizzes";
import { MISSION_XP } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Mission12Page() {
  const [viewedLevels, setViewedLevels] = useState<Set<number>>(new Set());
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const completeMission = useGameStore((s) => s.completeMission);

  function handleSelectLevel(level: number) {
    setActiveLevel(level);
    const newViewed = new Set(viewedLevels);
    newViewed.add(level);
    setViewedLevels(newViewed);

    // If all 3 viewed, show comparison after a brief delay
    if (newViewed.size === 3) {
      setTimeout(() => {
        setShowComparison(true);
      }, 2000);
    }
  }

  const activeExample = promptExamples.find((e) => e.level === activeLevel);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">명령의 품질이 결과를 결정한다</h1>
        <p className="mt-2 text-muted-foreground">
          같은 요청이라도 구체성에 따라 결과가 천차만별입니다.
        </p>
      </div>

      {/* Section 1: Concept */}
      <ConceptCard title="핵심 개념: 인풋의 품질 = 아웃풋의 품질" icon="🎯">
        <p>
          AI는 마법이 아닙니다. 당신이 제공하는 정보의 양과 질에 따라 결과물이
          달라집니다. &ldquo;웹사이트 만들어줘&rdquo;와 상세한 요구사항을 제공하는
          것은 완전히 다른 결과를 만듭니다.
        </p>
      </ConceptCard>

      {/* Section 2: Prompt level buttons */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">프롬프트 수준별 결과 비교</h2>
        <p className="text-muted-foreground">
          각 버튼을 클릭해서 프롬프트 품질에 따른 결과 차이를 확인하세요.
          ({viewedLevels.size}/3 확인)
        </p>

        <div className="flex flex-wrap gap-3">
          {promptExamples.map((example) => (
            <Button
              key={example.level}
              variant={activeLevel === example.level ? "default" : "outline"}
              onClick={() => handleSelectLevel(example.level)}
              className="relative"
            >
              {example.label}
              {viewedLevels.has(example.level) && (
                <span className="ml-2 text-xs">✓</span>
              )}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeExample && (
            <motion.div
              key={activeExample.level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <FakeTerminal
                lines={[
                  { type: "input", text: activeExample.prompt },
                  { type: "system", text: "Claude Code가 작업 중..." },
                  { type: "output", text: activeExample.result },
                ]}
              />
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">결과 품질:</span>
                <StarRating stars={activeExample.stars} size="sm" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section 3: Side-by-side comparison */}
      <AnimatePresence>
        {showComparison && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold">한눈에 비교</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {promptExamples.map((example) => (
                <Card
                  key={example.level}
                  className={`${
                    example.stars === 3
                      ? "border-primary shadow-md"
                      : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-base">
                      {example.label}
                      <StarRating stars={example.stars} size="sm" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2 font-mono text-xs text-muted-foreground">
                      &ldquo;{example.prompt}&rdquo;
                    </p>
                    <p className="text-sm whitespace-pre-line">{example.result}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Key Philosophy */}
      {showComparison && (
        <KeyPhilosophy>
          AI 결과물의 품질 = 당신의 인풋 품질
        </KeyPhilosophy>
      )}

      {/* Mission Complete Button */}
      {showComparison && !showComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button
            size="lg"
            onClick={() => {
              completeMission("1-2", 3, MISSION_XP["1-2"]);
              setShowComplete(true);
            }}
          >
            미션 완료하기
          </Button>
        </motion.div>
      )}

      {/* Mission Complete */}
      {showComplete && (
        <MissionComplete
          stars={3}
          xp={MISSION_XP["1-2"]}
          missionTitle="명령의 품질이 결과를 결정한다"
          nextMissionHref="/level/2"
          nextMissionLabel="Level 2로 이동"
          onClose={() => setShowComplete(false)}
        />
      )}
    </div>
  );
}
