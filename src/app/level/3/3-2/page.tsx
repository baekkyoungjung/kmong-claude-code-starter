"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ConceptCard } from "@/components/content/ConceptCard";
import { KeyPhilosophy } from "@/components/content/KeyPhilosophy";
import { SpotProblem } from "@/components/interactive/SpotProblem";
import { MissionComplete } from "@/components/game/MissionComplete";
import { useGameStore } from "@/stores/useGameStore";
import { spotProblemScenarios } from "@/data/quizzes";
import { Card, CardContent } from "@/components/ui/card";

type Phase = "intro" | "game" | "philosophy" | "complete";

export default function Mission32Page() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [stars, setStars] = useState(0);
  const [score, setScore] = useState(0);
  const completeMission = useGameStore((s) => s.completeMission);

  function handleGameComplete(finalScore: number) {
    setScore(finalScore);

    let earned: number;
    if (finalScore === 4) earned = 3;
    else if (finalScore >= 2) earned = 2;
    else earned = 1;

    setStars(earned);
    setPhase("philosophy");
  }

  function handlePhilosophyDone() {
    completeMission("3-2", stars, 200);
    setPhase("complete");
  }

  if (phase === "complete") {
    return (
      <MissionComplete
        stars={stars}
        xp={200}
        missionTitle="내 잘못이다 - 사장님 마인드셋"
        nextMissionHref="/level/3"
        nextMissionLabel="Level 3 허브로 돌아가기"
        onClose={() => setPhase("philosophy")}
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
        <p className="text-sm font-medium text-primary">Level 3 - 미션 2</p>
        <h1 className="mt-1 text-3xl font-bold">
          내 잘못이다 - 사장님 마인드셋
        </h1>
      </motion.div>

      {phase === "intro" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <ConceptCard title="사장님의 책임" icon="🎯">
            <div className="space-y-3">
              <p>
                AI가 기대에 못 미치는 결과를 내놓으면, 우리는 본능적으로
                &quot;AI가 멍청하다&quot;고 생각합니다. 하지만 진짜 원인은
                대부분 <strong>우리가 충분한 맥락을 제공하지 않았기
                때문</strong>입니다.
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
                    코드 리뷰 시간. 시니어가 주니어의 PR을 보고 있었다.
                  </p>
                  <blockquote className="border-l-2 border-orange-300 pl-3 italic text-muted-foreground">
                    &quot;이 코드 왜 이래? Claude한테 시켰는데 이상하게 짰네요.&quot;
                  </blockquote>
                  <p>
                    시니어가 물었다.
                  </p>
                  <blockquote className="border-l-2 border-primary pl-3 italic text-muted-foreground">
                    &quot;프롬프트 뭐라고 했어?&quot;
                  </blockquote>
                  <blockquote className="border-l-2 border-orange-300 pl-3 italic text-muted-foreground">
                    &quot;그냥... &apos;이거 고쳐줘&apos; 했는데요.&quot;
                  </blockquote>
                  <p>
                    시니어가 웃으며 말했다.
                  </p>
                  <blockquote className="border-l-2 border-primary pl-3 italic text-muted-foreground">
                    &quot;그건 Claude 문제가 아니라 네 인풋 문제야.
                    뭘 고쳐야 하는지, 왜 문제인지, 어떤 방향으로 고쳐야 하는지
                    하나도 안 알려줬잖아.&quot;
                  </blockquote>
                </div>
                <div className="rounded-md bg-orange-500/10 p-3">
                  <p className="font-medium">
                    &quot;AI가 구리다&quot;가 아니라 &quot;내가 뭘 빠뜨렸지?&quot;
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    결과의 책임은 항상 지시한 사람에게 있습니다.
                    지시가 부정확하면 아무리 좋은 AI도
                    엉뚱한 결과를 냅니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPhase("game")}
              className="cursor-pointer rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground"
            >
              문제 찾기 게임 시작
            </motion.button>
          </div>
        </motion.div>
      )}

      {phase === "game" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold">
            실망스러운 결과의 진짜 원인을 찾아보세요
          </h2>
          <p className="text-muted-foreground">
            각 시나리오에서 AI가 기대에 못 미치는 결과를 낸 이유를 찾으세요.
            첫 번째 시도에 맞추면 점수를 획득합니다.
          </p>

          <SpotProblem
            scenarios={spotProblemScenarios}
            onComplete={handleGameComplete}
          />
        </motion.div>
      )}

      {phase === "philosophy" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className="text-center">
            <p className="text-lg text-muted-foreground">
              {score}/4 시나리오를 첫 시도에 맞추셨습니다
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <KeyPhilosophy>
              <p>
                결과가 마음에 안 들 때 질문은
                <br />
                절대 &quot;왜 이렇게 구려?&quot;가 아닙니다.
              </p>
              <p className="mt-4 text-primary">
                항상 &quot;내가 뭘 빠뜨렸지?&quot;입니다.
              </p>
            </KeyPhilosophy>
          </motion.div>

          <div className="text-center">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePhilosophyDone}
              className="cursor-pointer rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground"
            >
              미션 완료
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
