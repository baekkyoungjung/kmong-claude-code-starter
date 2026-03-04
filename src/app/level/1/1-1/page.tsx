"use client";

import { useState } from "react";
import { ConceptCard } from "@/components/content/ConceptCard";
import { LoopDiagram } from "@/components/interactive/LoopDiagram";
import { QuizQuestion } from "@/components/interactive/QuizQuestion";
import { motion } from "motion/react";
import { MissionComplete } from "@/components/game/MissionComplete";
import { useGameStore } from "@/stores/useGameStore";
import { mission11Quizzes } from "@/data/quizzes";
import { MISSION_XP } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function Mission11Page() {
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const completeMission = useGameStore((s) => s.completeMission);

  function handleAnswer(correct: boolean) {
    const newCorrect = correct ? correctCount + 1 : correctCount;
    const newAnswered = answeredCount + 1;

    if (correct) setCorrectCount(newCorrect);
    setAnsweredCount(newAnswered);

    // Mission completion is now handled by the explicit button
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Claude Code는 어떻게 동작하나?</h1>
        <p className="mt-2 text-muted-foreground">
          작동 원리를 이해하면 더 효과적으로 사용할 수 있습니다.
        </p>
      </div>

      {/* Section 1: Concept */}
      <ConceptCard title="핵심 개념: 단일 스레드 조건부 무한 루프" icon="🧠">
        <div className="space-y-3">
          <p>
            Claude Code는 단 하나의 루프로 동작합니다. 사용자의 요청을 받으면
            작업이 완료될 때까지 스스로 반복합니다.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-muted p-3">
              <p className="font-semibold">LLM = 두뇌</p>
              <p className="text-sm">
                사용자의 요청을 이해하고, 어떤 도구를 사용할지 판단합니다.
              </p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="font-semibold">도구 = 손</p>
              <p className="text-sm">
                파일 읽기/쓰기, 명령 실행 등 실제 작업을 수행합니다.
              </p>
            </div>
          </div>
        </div>
      </ConceptCard>

      {/* Section 2: Interactive Loop Diagram */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">동작 루프 다이어그램</h2>
        <p className="text-muted-foreground">
          &ldquo;시작하기&rdquo; 버튼을 눌러 각 단계를 확인하세요.
        </p>
        <LoopDiagram />
      </div>

      {/* Section 3: Quiz */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold">
          이해도 확인 ({answeredCount}/{mission11Quizzes.length})
        </h2>
        {mission11Quizzes.map((q) => (
          <QuizQuestion key={q.id} question={q} onAnswer={handleAnswer} />
        ))}
      </div>

      {/* Mission Complete Button */}
      {answeredCount === mission11Quizzes.length && !showComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button
            size="lg"
            onClick={() => {
              const stars = Math.max(1, correctCount);
              const xp = Math.round((correctCount / mission11Quizzes.length) * MISSION_XP["1-1"]);
              completeMission("1-1", stars, xp);
              setShowComplete(true);
            }}
          >
            미션 완료하기
          </Button>
        </motion.div>
      )}

      {/* Mission Complete Overlay */}
      {showComplete && (
        <MissionComplete
          stars={Math.max(1, correctCount)}
          xp={Math.round((correctCount / mission11Quizzes.length) * MISSION_XP["1-1"])}
          missionTitle="Claude Code는 어떻게 동작하나?"
          nextMissionHref="/level/1/1-2"
          nextMissionLabel="다음 미션: 명령의 품질"
          onClose={() => setShowComplete(false)}
        />
      )}
    </div>
  );
}
