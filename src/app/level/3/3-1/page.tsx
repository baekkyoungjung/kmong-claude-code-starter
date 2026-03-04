"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ConceptCard } from "@/components/content/ConceptCard";
import { ContextMeter } from "@/components/interactive/ContextMeter";
import { ClaudeQuestionsSimulator } from "@/components/interactive/ClaudeQuestionsSimulator";
import { MissionComplete } from "@/components/game/MissionComplete";
import { useGameStore } from "@/stores/useGameStore";
import { contextItems } from "@/data/quizzes";
import { Card, CardContent } from "@/components/ui/card";

type Phase = "intro" | "meter" | "simulator" | "complete";

export default function Mission31Page() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [stars, setStars] = useState(0);
  const completeMission = useGameStore((s) => s.completeMission);

  function handleMeterComplete(percentage: number) {
    let earned: number;
    if (percentage >= 90) earned = 3;
    else if (percentage >= 60) earned = 2;
    else earned = 1;

    setStars(earned);
    setPhase("simulator");
  }

  function handleSimulatorComplete() {
    completeMission("3-1", stars, 200);
    setPhase("complete");
  }

  if (phase === "complete") {
    return (
      <MissionComplete
        stars={stars}
        xp={200}
        missionTitle="사전 인터뷰 - 맥락이 전부다"
        nextMissionHref="/level/3/3-2"
        nextMissionLabel="미션 3-2: 네비게이터 마인드셋"
        onClose={() => setPhase("simulator")}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-sm font-medium text-primary">Level 3 - 미션 1</p>
        <h1 className="mt-1 text-3xl font-bold">
          사전 인터뷰 - 맥락이 전부다
        </h1>
      </motion.div>

      {phase === "intro" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <ConceptCard title="왜 맥락이 중요할까?" icon="🧩">
            <div className="space-y-3">
              <p>
                Claude Code는 여러분이 제공하는 맥락만큼만 똑똑합니다.
                같은 &quot;그거 만들어줘&quot;라는 요청도, 어떤 맥락을
                함께 주느냐에 따라 결과가 완전히 달라집니다.
              </p>
            </div>
          </ConceptCard>

          <Card className="border-orange-500/20 bg-orange-500/5">
            <CardContent className="pt-6">
              <div className="space-y-4 text-sm">
                <p className="font-semibold text-orange-700 dark:text-orange-400">
                  실화 기반 에피소드
                </p>
                <div className="space-y-3 leading-relaxed">
                  <p>
                    어느 날 Alex가 bk에게 슬랙을 보냈다.
                  </p>
                  <blockquote className="border-l-2 border-orange-300 pl-3 italic text-muted-foreground">
                    &quot;bk, 그거 해줘. 그거 알지?&quot;
                  </blockquote>
                  <blockquote className="border-l-2 border-primary pl-3 italic text-muted-foreground">
                    &quot;아 네~ 그거요. 알죠. 바로 하겠습니다.&quot;
                  </blockquote>
                  <p className="font-medium">
                    1주일 뒤 —
                  </p>
                  <p>
                    bk가 만든 &quot;그것&quot;과 Alex가 생각했던
                    &quot;그것&quot;은 상당히 달랐다.
                  </p>
                  <p>
                    Alex는 기존 API 응답 구조를 바꿔달라는 거였고,
                    bk는 새 API 엔드포인트를 추가한 거였다.
                    둘 다 &quot;그거&quot;가 뭔지 안다고 생각했지만,
                    서로 다른 &quot;그거&quot;를 떠올리고 있었다.
                  </p>
                </div>
                <div className="rounded-md bg-orange-500/10 p-3">
                  <p className="font-medium">
                    사람 사이에서도 이런데, AI는 더합니다.
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Claude Code는 눈치도, 경험도, 지난 회의 기억도 없습니다.
                    여러분이 제공한 텍스트가 세계의 전부입니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPhase("meter")}
              className="cursor-pointer rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground"
            >
              맥락 미터 체험하기
            </motion.button>
          </div>
        </motion.div>
      )}

      {phase === "meter" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold">
            맥락 미터를 채워보세요
          </h2>
          <p className="text-muted-foreground">
            아래 항목들은 AI에게 작업을 요청할 때 제공할 수 있는 맥락입니다.
            각 항목을 클릭하여 맥락 미터를 채워보세요.
          </p>

          <ContextMeter items={contextItems} onComplete={handleMeterComplete} />
        </motion.div>
      )}

      {phase === "simulator" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold">
            보너스: Claude에게 질문 시키기
          </h2>
          <p className="text-muted-foreground">
            맥락을 다 기억하기 어렵다면? Claude에게 먼저 질문을 시키세요.
            어떤 맥락이 필요한지 Claude가 알려줍니다.
          </p>

          <ClaudeQuestionsSimulator onComplete={handleSimulatorComplete} />

          {/* MCP mention card */}
          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔌</span>
                <div>
                  <h3 className="font-semibold text-blue-700 dark:text-blue-400">
                    MCP로 맥락 자동화
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Linear, Slack, Google Docs 등을 Claude Code에 연결하면 매번
                    맥락을 수동으로 입력하지 않아도 됩니다. MCP(Model Context
                    Protocol)가 이를 가능하게 합니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
