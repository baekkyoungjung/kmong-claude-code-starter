"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ConceptCard } from "@/components/content/ConceptCard";
import { PlanBuilder } from "@/components/interactive/PlanBuilder";
import { MissionComplete } from "@/components/game/MissionComplete";
import { useGameStore } from "@/stores/useGameStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const directPath = [
  { label: "바로 코드 작성 시작", icon: "💻", status: "warning" as const },
  { label: "중간에 요구사항 변경 발견", icon: "😰", status: "danger" as const },
  { label: "코드 절반 삭제 후 재작성", icon: "🗑️", status: "danger" as const },
  { label: "또 수정... 혼란 가중", icon: "😵", status: "danger" as const },
  { label: "결과: 60% 완성도", icon: "📉", status: "danger" as const },
];

const planPath = [
  { label: "계획 문서 작성", icon: "📋", status: "success" as const },
  { label: "요구사항 검토 및 확인", icon: "✅", status: "success" as const },
  { label: "계획 승인 후 구현 시작", icon: "🚀", status: "success" as const },
  { label: "순탄한 구현 진행", icon: "⚡", status: "success" as const },
  { label: "결과: 95% 완성도", icon: "📈", status: "success" as const },
];

type PathStatus = "warning" | "danger" | "success";

function PathStep({
  label,
  icon,
  status,
  index,
  visible,
}: {
  label: string;
  icon: string;
  status: PathStatus;
  index: number;
  visible: boolean;
}) {
  const colors: Record<PathStatus, string> = {
    warning: "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30",
    danger: "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30",
    success: "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950/30",
  };

  if (!visible) return <div className="h-14" />;

  return (
    <motion.div
      initial={{ opacity: 0, x: status === "success" ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.4, duration: 0.3 }}
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${colors[status]}`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </motion.div>
  );
}

export default function Mission22Page() {
  const { completeMission, isMissionCompleted } = useGameStore();
  const [selectedPath, setSelectedPath] = useState<"direct" | "plan" | null>(null);
  const [pathAnimating, setPathAnimating] = useState(false);
  const [pathViewedDirect, setPathViewedDirect] = useState(false);
  const [pathViewedPlan, setPathViewedPlan] = useState(false);
  const [planBuilderDone, setPlanBuilderDone] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const alreadyCompleted = isMissionCompleted("2-2");

  function selectPath(path: "direct" | "plan") {
    if (pathAnimating) return;
    setSelectedPath(path);
    setPathAnimating(true);

    const steps = path === "direct" ? directPath : planPath;
    setTimeout(() => {
      setPathAnimating(false);
      if (path === "direct") setPathViewedDirect(true);
      if (path === "plan") setPathViewedPlan(true);
    }, steps.length * 400 + 500);
  }

  function handlePlanComplete() {
    setPlanBuilderDone(true);
  }

  const bothPathsViewed = pathViewedDirect && pathViewedPlan;
  const readyToComplete = bothPathsViewed && planBuilderDone && !alreadyCompleted;

  return (
    <div className="space-y-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Plan Mode — 스펙 없이 개발 시작?</h1>
        <p className="mt-2 text-muted-foreground">
          계획의 중요성을 체험합니다.
        </p>
      </motion.div>

      {/* Concept */}
      <ConceptCard title="Plan Mode란?" icon="📋">
        Plan mode는 코드를 쓰기 전에 먼저 계획을 세우는 것입니다.
        Claude Code가 &quot;이렇게 하려는데 괜찮나요?&quot;라고 먼저 물어보고,
        여러분이 검토하고 승인한 뒤에야 실행합니다.
      </ConceptCard>

      <Card className="border-orange-500/20 bg-orange-500/5">
        <CardContent className="pt-6">
          <div className="space-y-4 text-sm">
            <p className="font-semibold text-orange-700 dark:text-orange-400">
              실화 기반 에피소드
            </p>
            <div className="space-y-3 leading-relaxed">
              <p>
                PM이 슬랙에 올렸다.
              </p>
              <blockquote className="border-l-2 border-orange-300 pl-3 italic text-muted-foreground">
                &quot;회원가입 페이지 리뉴얼 부탁드려요.&quot;
              </blockquote>
              <p>
                주니어 개발자 C는 바로 코딩을 시작했다.
                소셜 로그인을 추가하고, 이메일 인증 플로우를 넣고,
                비밀번호 규칙도 강화했다.
              </p>
              <p className="font-medium">
                3일 뒤 —
              </p>
              <p>
                PM이 결과물을 보더니 말했다.
              </p>
              <blockquote className="border-l-2 border-orange-300 pl-3 italic text-muted-foreground">
                &quot;아... 디자인만 바꾸는 거였는데요. 기능은 그대로요.&quot;
              </blockquote>
              <p>
                C가 3일 동안 만든 기능의 절반이 필요 없었다.
                시작 전에 5분만 확인했으면 될 일이었다.
              </p>
            </div>
            <div className="rounded-md bg-orange-500/10 p-3">
              <p className="font-medium">
                Plan mode는 이 5분을 강제하는 장치입니다.
              </p>
              <p className="mt-1 text-muted-foreground">
                Claude가 먼저 계획을 보여주고, 여러분이 &quot;맞아, 진행해&quot;
                또는 &quot;아니, 그게 아니라...&quot;라고 말할 기회를 줍니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Simulation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">두 가지 경로 체험하기</h2>
        <p className="text-sm text-muted-foreground">
          경로를 선택하면 결과를 확인할 수 있습니다.
          {!bothPathsViewed && " 두 경로 모두 확인해보세요."}
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Direct Path */}
          <Card
            className={`cursor-pointer transition-all ${
              selectedPath === "direct"
                ? "ring-2 ring-red-400"
                : pathViewedDirect
                  ? "opacity-80"
                  : "hover:border-red-300"
            }`}
            onClick={() => selectPath("direct")}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-red-600 dark:text-red-400">
                <span>🔥</span>
                &quot;바로 만들어&quot; 경로
                {pathViewedDirect && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    확인됨
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {directPath.map((step, i) => (
                <PathStep
                  key={step.label}
                  {...step}
                  index={i}
                  visible={selectedPath === "direct"}
                />
              ))}
              {selectedPath !== "direct" && (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  클릭하여 경로 확인
                </p>
              )}
            </CardContent>
          </Card>

          {/* Plan Path */}
          <Card
            className={`cursor-pointer transition-all ${
              selectedPath === "plan"
                ? "ring-2 ring-green-400"
                : pathViewedPlan
                  ? "opacity-80"
                  : "hover:border-green-300"
            }`}
            onClick={() => selectPath("plan")}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-green-600 dark:text-green-400">
                <span>📋</span>
                &quot;먼저 계획&quot; 경로
                {pathViewedPlan && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    확인됨
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {planPath.map((step, i) => (
                <PathStep
                  key={step.label}
                  {...step}
                  index={i}
                  visible={selectedPath === "plan"}
                />
              ))}
              {selectedPath !== "plan" && (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  클릭하여 경로 확인
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {bothPathsViewed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center"
          >
            <p className="text-sm font-medium">
              계획을 먼저 세우면 결과 완성도가 <strong>60% → 95%</strong>로 올라갑니다.
            </p>
          </motion.div>
        )}
      </section>

      {/* Plan Builder */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">직접 Plan 문서 만들어보기</h2>
        <p className="text-sm text-muted-foreground">
          목표와 최소 하나의 추가 항목을 작성하면 완성됩니다. 완성된 마크다운은
          복사해서 바로 사용할 수 있습니다.
        </p>
        <PlanBuilder onComplete={handlePlanComplete} />
      </section>

      {/* Mission Complete Button */}
      {readyToComplete && !showComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button
            size="lg"
            onClick={() => {
              completeMission("2-2", 3, 150);
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
          xp={150}
          missionTitle="Plan Mode — 스펙 없이 개발 시작?"
          nextMissionHref="/level/3"
          nextMissionLabel="Level 3로 이동"
          onClose={() => setShowComplete(false)}
        />
      )}
    </div>
  );
}
