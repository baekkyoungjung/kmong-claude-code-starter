"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ConceptCard } from "@/components/content/ConceptCard";
import { BeforeAfter } from "@/components/interactive/BeforeAfter";
import { SkillCardBuilder } from "@/components/interactive/SkillCardBuilder";
import { MissionComplete } from "@/components/game/MissionComplete";
import { useGameStore } from "@/stores/useGameStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const beforeContent = `> "파일 읽고 에러 찾아줘. 근데 TypeScript 파일만.
> 그리고 에러 있으면 고쳐줘. 테스트도 돌려줘.
> 아 그리고 커밋 메시지는 conventional commit으로.
> 린트도 돌려줘. 포맷팅도."

... 매번 같은 말을 반복...

> "파일 읽고 에러 찾아줘. 근데 TypeScript 파일만.
> 그리고 에러 있으면 고쳐줘. 테스트도 돌려줘..."`;

const afterContent = `/code-review

→ TypeScript 파일 스캔 중...
→ 3개 이슈 발견, 자동 수정 완료
→ 테스트 통과 확인
→ 린트 + 포맷팅 적용
→ Conventional commit 생성 완료`;

export default function Mission21Page() {
  const { completeMission, isMissionCompleted } = useGameStore();
  const [beforeAfterDone, setBeforeAfterDone] = useState(false);
  const [skillCardDone, setSkillCardDone] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const alreadyCompleted = isMissionCompleted("2-1");
  const readyToComplete = beforeAfterDone && skillCardDone && !alreadyCompleted;

  function handleBeforeAfterComplete() {
    setBeforeAfterDone(true);
  }

  function handleSkillCardComplete() {
    setSkillCardDone(true);
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Skill = 레시피 카드</h1>
        <p className="mt-2 text-muted-foreground">
          반복 작업을 자동화하는 Skill의 개념을 배웁니다.
        </p>
      </motion.div>

      {/* Concept */}
      <ConceptCard title="Skill이란?" icon="⚡">
        Skill은 자주 반복하는 작업을 한 번 정의해두고 명령 하나로 실행하는 것입니다.
      </ConceptCard>

      <Card className="border-orange-500/20 bg-orange-500/5">
        <CardContent className="pt-6">
          <div className="space-y-4 text-sm">
            <p className="font-semibold text-orange-700 dark:text-orange-400">
              실화 기반 에피소드
            </p>
            <div className="space-y-3 leading-relaxed">
              <p>
                매주 금요일 4시. 배포 전 체크리스트를 슬랙에 올리는 게
                bk의 루틴이었다. 린트 돌리고, 테스트 확인하고, 스테이징 배포하고,
                QA 채널에 알리고... 매번 같은 10줄을 타이핑했다.
              </p>
              <p>
                어느 날 옆자리 동료가 물었다.
              </p>
              <blockquote className="border-l-2 border-primary pl-3 italic text-muted-foreground">
                &quot;그거 왜 매번 직접 쳐요? 한 번 만들어두면 안 돼요?&quot;
              </blockquote>
              <p>
                bk는 배포 체크리스트를 Skill로 만들었다.
                그 다음 금요일부터는 <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">/deploy-checklist</code> 한 줄로 끝났다.
              </p>
            </div>
            <div className="rounded-md bg-orange-500/10 p-3">
              <p className="font-medium">
                반복되는 건 자동화하세요.
              </p>
              <p className="mt-1 text-muted-foreground">
                매번 같은 프롬프트를 치고 있다면, 그게 바로 Skill로 만들 타이밍입니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Before / After */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Skill이 없으면 vs 있으면</h2>
        <p className="text-sm text-muted-foreground">
          두 가지 방식을 모두 확인해보세요.
        </p>
        <BeforeAfter
          beforeTitle="Skill 없이"
          beforeContent={beforeContent}
          afterTitle="Skill 사용"
          afterContent={afterContent}
          onComplete={handleBeforeAfterComplete}
        />
      </section>

      {/* Skill Card Builder */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">나만의 Skill 카드 만들기</h2>
        <p className="text-sm text-muted-foreground">
          아래 양식을 채워서 나만의 Skill 카드를 완성해보세요.
        </p>
        <SkillCardBuilder onComplete={handleSkillCardComplete} />
      </section>

      {/* Command mention */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="rounded-lg border border-border bg-muted/30 p-4"
      >
        <h3 className="mb-1 font-semibold">
          Command(/) — Skill의 바로가기
        </h3>
        <p className="text-sm text-muted-foreground">
          Skill을 만들었으면 <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">/skill-name</code>처럼
          슬래시 커맨드로 바로 실행할 수 있습니다. 매번 긴 프롬프트를 쓸 필요 없이,
          명령 하나로 실행!
        </p>
      </motion.div>

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
              completeMission("2-1", 3, 150);
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
          missionTitle="Skill = 레시피 카드"
          nextMissionHref="/level/2/2-2"
          nextMissionLabel="다음: Plan Mode"
          onClose={() => setShowComplete(false)}
        />
      )}
    </div>
  );
}
