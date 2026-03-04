"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PlanBuilder({ onComplete }: { onComplete: () => void }) {
  const [goal, setGoal] = useState("");
  const [requirements, setRequirements] = useState("");
  const [constraints, setConstraints] = useState("");
  const [references, setReferences] = useState("");
  const [copied, setCopied] = useState(false);
  const completedRef = useRef(false);

  const hasGoal = goal.trim().length > 0;
  const hasOther =
    requirements.trim().length > 0 ||
    constraints.trim().length > 0 ||
    references.trim().length > 0;
  const isValid = hasGoal && hasOther;

  useEffect(() => {
    if (isValid && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  }, [isValid, onComplete]);

  const markdown = `# Plan: ${goal || "(목표를 입력하세요)"}

## 요구사항
${requirements || "(요구사항을 입력하세요)"}

## 제약사항
${constraints || "(제약사항을 입력하세요)"}

## 참고자료
${references || "(참고자료를 입력하세요)"}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      toast.success("복사됨!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("복사에 실패했습니다");
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Plan 문서 작성기</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              목표 (Goal) *
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="예: 사용자 대시보드 리디자인"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              요구사항 (Requirements)
            </label>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="예: 실시간 데이터 표시, 차트 3종류 포함"
              rows={3}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              제약사항 (Constraints)
            </label>
            <textarea
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              placeholder="예: 외부 라이브러리 사용 최소화, IE 미지원"
              rows={3}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              참고자료 (References)
            </label>
            <textarea
              value={references}
              onChange={(e) => setReferences(e.target.value)}
              placeholder="예: 디자인 시안 링크, 기존 API 문서"
              rows={3}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="relative">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">Markdown 미리보기</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5"
            >
              {copied ? (
                <Check className="size-3.5" />
              ) : (
                <Copy className="size-3.5" />
              )}
              {copied ? "복사됨" : "복사"}
            </Button>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded-lg bg-muted/50 p-4 font-mono text-xs leading-relaxed">
              {markdown}
            </pre>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
