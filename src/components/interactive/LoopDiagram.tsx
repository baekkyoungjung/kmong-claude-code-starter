"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SimStep {
  phase: "input" | "think" | "branch" | "tool" | "result" | "think2" | "tool2" | "result2" | "done";
  label: string;
  icon: string;
  color: string;
  terminal?: { type: "user" | "claude" | "tool" | "result"; text: string }[];
  description: string;
  detail?: string;
}

const simulation: SimStep[] = [
  {
    phase: "input",
    label: "유저 입력",
    icon: "👤",
    color: "border-blue-500 bg-blue-50 dark:bg-blue-950/30",
    terminal: [
      { type: "user", text: '$ claude "회원가입 폼에 비밀번호 확인 필드 추가해줘"' },
    ],
    description: "사용자가 Claude Code에 자연어로 요청합니다.",
  },
  {
    phase: "think",
    label: "LLM 판단 (1회차)",
    icon: "🧠",
    color: "border-purple-500 bg-purple-50 dark:bg-purple-950/30",
    terminal: [
      { type: "claude", text: "🧠 생각 중..." },
      { type: "claude", text: '"회원가입 폼을 먼저 찾아야 해. 어떤 파일에 있을까?"' },
      { type: "claude", text: '"→ Grep 도구로 코드를 검색하자"' },
    ],
    description: "LLM(두뇌)이 요청을 분석하고, 어떤 행동이 필요한지 판단합니다.",
    detail: "LLM은 코드를 직접 볼 수 없습니다. 먼저 \"어디에 있는지\" 찾아야 합니다.",
  },
  {
    phase: "branch",
    label: "도구 필요? → Yes!",
    icon: "🔀",
    color: "border-amber-500 bg-amber-50 dark:bg-amber-950/30",
    description: "LLM이 \"파일을 찾으려면 도구가 필요하다\"고 판단했습니다.",
    detail: "도구(Tool)란? Claude Code가 실제 세상에 영향을 미치는 수단입니다.\n\n• Read — 파일 내용 읽기\n• Edit / Write — 코드 수정·생성\n• Bash — 터미널 명령 실행 (npm install, git 등)\n• Grep / Glob — 코드 검색·파일 찾기\n• WebFetch — 웹 페이지 가져오기\n• MCP 도구 — Linear, Slack, Google Docs 등 외부 서비스 연동\n\nLLM은 두뇌(판단), 도구는 손(실행)입니다.",
  },
  {
    phase: "tool",
    label: "도구 호출: Grep",
    icon: "🔧",
    color: "border-green-500 bg-green-50 dark:bg-green-950/30",
    terminal: [
      { type: "tool", text: '🔧 Grep("회원가입", "**/*.tsx")' },
    ],
    description: "Grep 도구를 사용해 \"회원가입\" 키워드가 포함된 파일을 검색합니다.",
  },
  {
    phase: "result",
    label: "결과 확인",
    icon: "📋",
    color: "border-teal-500 bg-teal-50 dark:bg-teal-950/30",
    terminal: [
      { type: "result", text: "→ src/components/SignupForm.tsx (3 matches)" },
      { type: "result", text: "→ src/pages/signup.tsx (1 match)" },
    ],
    description: "도구 실행 결과를 LLM이 다시 받아서 확인합니다.",
    detail: "파일을 찾았으니, 이제 그 파일 내용을 읽어야 합니다. 루프가 다시 돌아갑니다!",
  },
  {
    phase: "think2",
    label: "LLM 판단 (2회차)",
    icon: "🧠",
    color: "border-purple-500 bg-purple-50 dark:bg-purple-950/30",
    terminal: [
      { type: "claude", text: "🧠 생각 중..." },
      { type: "claude", text: '"SignupForm.tsx를 읽어서 코드를 파악하고,"' },
      { type: "claude", text: '"비밀번호 확인 필드를 추가하는 코드를 작성하자"' },
      { type: "claude", text: '"→ Read 도구로 파일을 읽고, Edit 도구로 수정하자"' },
    ],
    description: "LLM이 결과를 보고 다음 행동을 결정합니다 — 파일을 읽고 수정!",
    detail: "이것이 \"루프\"입니다. 한 번에 끝나지 않고, 여러 단계를 거칩니다.",
  },
  {
    phase: "tool2",
    label: "도구 호출: Read → Edit",
    icon: "🔧",
    color: "border-green-500 bg-green-50 dark:bg-green-950/30",
    terminal: [
      { type: "tool", text: '🔧 Read("src/components/SignupForm.tsx")' },
      { type: "result", text: "→ 파일 내용 확인 완료 (비밀번호 필드 발견)" },
      { type: "tool", text: '🔧 Edit("src/components/SignupForm.tsx")' },
      { type: "result", text: "→ 비밀번호 확인 필드 추가 + 일치 검증 로직 삽입" },
    ],
    description: "Read로 파일을 읽고, Edit로 코드를 수정합니다. 도구를 연달아 사용할 수 있습니다.",
  },
  {
    phase: "result2",
    label: "결과 확인 → 완료!",
    icon: "📋",
    color: "border-teal-500 bg-teal-50 dark:bg-teal-950/30",
    terminal: [
      { type: "result", text: "→ 수정 완료. 더 이상 할 작업이 없음." },
    ],
    description: "LLM이 \"작업이 완료됐다\"고 판단하면, 도구를 더 호출하지 않고 텍스트로 응답합니다.",
    detail: "이 순간 루프가 종료됩니다. 도구 호출 없이 텍스트만 응답 = 루프 끝!",
  },
  {
    phase: "done",
    label: "응답 출력",
    icon: "✅",
    color: "border-primary bg-primary/5",
    terminal: [
      { type: "claude", text: "✅ 회원가입 폼에 비밀번호 확인 필드를 추가했습니다." },
      { type: "claude", text: "• 비밀번호 확인 input 추가" },
      { type: "claude", text: "• 비밀번호 불일치 시 에러 메시지 표시" },
      { type: "claude", text: "• 일치할 때만 제출 버튼 활성화" },
    ],
    description: "최종 결과를 사용자에게 보여줍니다.",
  },
];

const phaseLabels: Record<string, string> = {
  input: "입력",
  think: "판단",
  branch: "분기",
  tool: "실행",
  result: "확인",
  think2: "판단",
  tool2: "실행",
  result2: "확인",
  done: "완료",
};

export function LoopDiagram() {
  const [activeStep, setActiveStep] = useState(-1);

  const isCompleted = activeStep >= simulation.length;
  const currentStep = activeStep >= 0 && activeStep < simulation.length ? simulation[activeStep] : null;

  // Determine which "round" we're in for the progress indicator
  const round = activeStep <= 4 ? 1 : activeStep <= 7 ? 2 : 3;

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      {activeStep >= 0 && !isCompleted && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className={round === 1 ? "font-bold text-foreground" : ""}>1회차 루프</span>
          <span>→</span>
          <span className={round === 2 ? "font-bold text-foreground" : ""}>2회차 루프</span>
          <span>→</span>
          <span className={round === 3 ? "font-bold text-foreground" : ""}>완료</span>
        </div>
      )}

      {/* Step dots */}
      <div className="flex items-center justify-center gap-1.5">
        {simulation.map((step, i) => (
          <motion.button
            key={step.phase}
            onClick={() => i <= activeStep && setActiveStep(i)}
            animate={{
              scale: i === activeStep ? 1.4 : 1,
              opacity: activeStep < 0 ? 0.3 : i <= activeStep ? 1 : 0.3,
            }}
            className={`h-3 w-3 rounded-full transition-colors ${
              i === activeStep
                ? "bg-primary"
                : i < activeStep
                  ? "bg-primary/60 cursor-pointer"
                  : "bg-muted-foreground/30"
            }`}
            title={step.label}
          />
        ))}
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {activeStep < 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border-2 border-dashed border-muted-foreground/20 p-8 text-center"
          >
            <p className="text-lg font-medium">실제 예시로 보는 Claude Code 동작 원리</p>
            <p className="mt-2 text-sm text-muted-foreground">
              &ldquo;회원가입 폼에 비밀번호 확인 필드 추가해줘&rdquo; 라는 프롬프트가
              <br />어떤 과정을 거쳐 실행되는지 단계별로 살펴보세요.
            </p>
          </motion.div>
        )}

        {currentStep && (
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`overflow-hidden border-2 ${currentStep.color}`}>
              {/* Header */}
              <div className="flex items-center gap-3 border-b px-5 py-3">
                <span className="text-2xl">{currentStep.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{currentStep.label}</span>
                    <Badge variant="outline" className="text-xs">
                      {phaseLabels[currentStep.phase]}
                    </Badge>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {activeStep + 1} / {simulation.length}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{currentStep.description}</p>
                </div>
              </div>

              {/* Terminal simulation */}
              {currentStep.terminal && (
                <div className="bg-zinc-900 p-4 font-mono text-sm">
                  {currentStep.terminal.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className={`py-0.5 ${
                        line.type === "user"
                          ? "text-green-400"
                          : line.type === "claude"
                            ? "text-blue-300"
                            : line.type === "tool"
                              ? "text-yellow-300"
                              : "text-zinc-400"
                      }`}
                    >
                      {line.text}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Detail explanation */}
              {currentStep.detail && (
                <div className="border-t bg-muted/50 px-5 py-3">
                  <p className="whitespace-pre-line text-sm leading-relaxed">
                    {currentStep.detail}
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {isCompleted && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 text-center"
          >
            <p className="text-lg font-bold">이것이 Claude Code의 동작 원리입니다!</p>
            <div className="mx-auto mt-4 max-w-md space-y-2 text-left text-sm">
              <p><strong>1.</strong> 사용자가 자연어로 요청</p>
              <p><strong>2.</strong> LLM(두뇌)이 분석 → 도구가 필요한지 판단</p>
              <p><strong>3.</strong> 도구(손)로 실제 작업 수행 (파일 읽기/수정/명령 실행)</p>
              <p><strong>4.</strong> 결과 확인 → 더 할 일이 있으면 2번으로 돌아감</p>
              <p><strong>5.</strong> 다 끝나면 텍스트로 응답하고 루프 종료</p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              이 예시에서는 2번의 루프(검색 → 수정)를 거쳐 작업을 완료했습니다.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        {isCompleted ? (
          <Button
            onClick={() => setActiveStep(-1)}
            variant="outline"
            size="lg"
          >
            다시 보기
          </Button>
        ) : (
          <>
            {activeStep > 0 && (
              <Button
                onClick={() => setActiveStep((prev) => prev - 1)}
                variant="outline"
                size="lg"
              >
                이전
              </Button>
            )}
            <Button
              onClick={() => setActiveStep((prev) => prev + 1)}
              size="lg"
            >
              {activeStep < 0 ? "시작하기" : activeStep === simulation.length - 1 ? "완료" : "다음"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
