"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { levels } from "@/data/levels";
import { useGameStore } from "@/stores/useGameStore";
import { LevelCard } from "@/components/game/LevelCard";
import { BadgeDisplay } from "@/components/game/BadgeDisplay";
import { TOTAL_XP } from "@/lib/constants";
import Link from "next/link";
import { track } from "@vercel/analytics";

const INITIAL_PROMPT = `비개발자 (특히 PO/PM/기획자/디자이너) 입장에서의 claude code 를 무작정 쓰는것이 아니라 정말 쉽게 가이드 해줄수있도록 페이지를 하나 만들어줘. vercel 배포 하고 싶어. 초급>중급>고급 정도로 3단계가 있고, 이게 뭔지 claude code가 어떤 원리인지 간략 초간략해서 설명하고, 그 다음은 skill, command 기능에 대한 설명 특히 skill 에 대해선 정말 이해하기 쉽게 비유방식으로 설명이 필요해. 그리고 고급 과정으로 mcp와 또 필요한 것들에 대해 가이드를 만들어줘. plan 모드의 중요성(claude code기능), plan md 문서의 중요성 (prd 를 기초로 기록용 plan md), 사전인터뷰를 통해 agent 가작업을 시작하기전에 정해진 기획, 디자인 가이드 사항들을 충분히 주는것이 얼마나 중요한지, 그리고 역으로 agent가 인간에게 질문하게 유도해야하는것이 중요한것.. 정말 중요한건 한번 딸깍 후 뭐야 왜이래? 왜이렇게 구려? 가 아니라 내 잘못이구나 내가 제대로 가이드를 못했구나 라고 생각하는 작업 방식이 정말 중요하다라는거.. 그리고 이걸 html 으로 만들거라서 단순히 그냥 알려주는게 아니라 게임처럼 했으면 좋겠어. 인터렉티브하게. 예를들어 옛날에 css flex 를 개구리 연못 게임으로 쉽게 이해하기 위한 사이트가 있었던것처럼.. 이런 게임 형태가 아니라 내 말은 뭔가 스크롤만 쭉쭉 내리는걸로 끝나는 교육자료로는 남고 싶지가 않아 대충 이해되? 지금 현재 우리 비개발자들은 어느상황이냐면 각자 claude code 를 깔았고, 대부분은 랜딩페이지나 static 페이지를 만들 수 있거나 자료조사, 리서치, 기획서 작성, 디자인 에셋 생성 정도는 충분히 사용할 줄 알아. 한번 어떤 식으로 하면 좋을지 계획 한번 잡아바줘`;

function InitialPromptSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full cursor-pointer items-center justify-between text-left"
        >
          <div>
            <h2 className="text-lg font-bold">이 서비스를 만든 초기 프롬프트</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Claude Code에게 보낸 단 하나의 메시지로 이 사이트가 시작되었습니다.
            </p>
          </div>
          <span className="shrink-0 text-xl text-muted-foreground">
            {open ? "▲" : "▼"}
          </span>
        </button>

        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-6 overflow-hidden"
          >
            <div className="rounded-lg border bg-muted/30 p-6">
              <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-muted-foreground">
                {INITIAL_PROMPT}
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default function LandingPage() {
  const xp = useGameStore((s) => s.xp);
  const missionProgress = useGameStore((s) => s.missionProgress);
  const totalMissions = 6;
  const completedMissions = Object.values(missionProgress).filter(
    (p) => p.completed
  ).length;
  const percentage = Math.round((xp / TOTAL_XP) * 100);

  const hasStarted = completedMissions > 0;

  const getResumeHref = () => {
    const level1Done = ["1-1", "1-2"].every(
      (id) => missionProgress[id]?.completed
    );
    const level2Done = ["2-1", "2-2"].every(
      (id) => missionProgress[id]?.completed
    );
    if (!level1Done) return "/level/1";
    if (!level2Done) return "/level/2";
    return "/level/3";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-4">
              비개발자를 위한 인터랙티브 가이드
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Kmong Agent Navigator
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              더이상 agent를 chatbot으로 쓰지마세요.
              <br />
              <strong>부려먹으세요. 시급 0원입니다.</strong>
            </p>

            {hasStarted ? (
              <div className="mx-auto max-w-xs space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">전체 진행도</span>
                  <span className="font-mono font-medium">
                    {xp}/{TOTAL_XP} XP
                  </span>
                </div>
                <Progress value={percentage} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {completedMissions}/{totalMissions} 미션 완료
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full"
                  onClick={() =>
                    track("cta_click", {
                      action: "resume",
                      completedMissions,
                      xp,
                    })
                  }
                >
                  <Link href={getResumeHref()}>이어서 하기</Link>
                </Button>
              </div>
            ) : (
              <Button
                asChild
                size="lg"
                onClick={() => track("cta_click", { action: "start" })}
              >
                <Link href="/level/1">항해 시작하기</Link>
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Key Philosophy */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-lg font-medium leading-relaxed md:text-xl"
          >
            &ldquo;AI 결과물의 품질 = 당신의 인풋 품질.
            <br />
            <span className="text-muted-foreground">
              결과가 구리면 내 가이드가 부족했던 것.&rdquo;
            </span>
          </motion.blockquote>
        </div>
      </section>

      {/* Levels */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-2xl font-bold"
        >
          3개 레벨 × 2개 미션
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-3">
          {levels.map((level, i) => (
            <LevelCard key={level.id} level={level} index={i} />
          ))}
        </div>
      </section>

      {/* Badges */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <h2 className="mb-6 text-2xl font-bold">뱃지</h2>
          <BadgeDisplay />
        </div>
      </section>

      {/* Game Info */}
      <section className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-2 font-bold">XP 시스템</h3>
              <p className="text-sm text-muted-foreground">
                미션을 완료하면 XP를 획득합니다. 총 900 XP를 모아 마스터가
                되세요.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-bold">레벨 해금</h3>
              <p className="text-sm text-muted-foreground">
                이전 레벨의 모든 미션을 완료해야 다음 레벨이 열립니다.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-bold">별점</h3>
              <p className="text-sm text-muted-foreground">
                미션당 최대 3개의 별을 획득할 수 있습니다. 실력에 따라 결과가
                달라집니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Initial Prompt */}
      <InitialPromptSection />

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>AI Native Team — 크몽</p>
      </footer>
    </div>
  );
}
