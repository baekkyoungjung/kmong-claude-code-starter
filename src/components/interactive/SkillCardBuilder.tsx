"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SkillCardBuilder({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [skillName, setSkillName] = useState("");
  const [trigger, setTrigger] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [newStep, setNewStep] = useState("");
  const [completed, setCompleted] = useState(false);

  const isValid = skillName.trim() && trigger.trim() && steps.length > 0;

  function addStep() {
    if (!newStep.trim()) return;
    setSteps((prev) => [...prev, newStep.trim()]);
    setNewStep("");
  }

  function removeStep(index: number) {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      addStep();
    }
  }

  function handleComplete() {
    if (!isValid || completed) return;
    setCompleted(true);
    onComplete();
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">나만의 Skill 카드 만들기</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              스킬 이름
            </label>
            <input
              type="text"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="예: 코드 리뷰 자동화"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              트리거 조건
            </label>
            <input
              type="text"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              placeholder="예: PR이 올라왔을 때"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              실행 단계
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="단계를 입력하고 Enter"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={addStep}
                disabled={!newStep.trim()}
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <AnimatePresence mode="popLayout">
              {steps.map((step, i) => (
                <motion.div
                  key={`${i}-${step}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-2 text-sm"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {i + 1}.
                  </span>
                  <span className="flex-1">{step}</span>
                  <button
                    onClick={() => removeStep(i)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="size-3.5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Button
            onClick={handleComplete}
            disabled={!isValid || completed}
            className="w-full"
          >
            {completed ? "완성됨!" : "스킬 카드 완성하기"}
          </Button>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="border-b border-primary/20 pb-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary/60">
              Skill Card
            </div>
            <CardTitle className="text-xl">
              {skillName || (
                <span className="text-muted-foreground/50">스킬 이름</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                트리거
              </div>
              <p className="text-sm">
                {trigger || (
                  <span className="text-muted-foreground/50">
                    언제 실행되나요?
                  </span>
                )}
              </p>
            </div>

            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                실행 단계
              </div>
              {steps.length === 0 ? (
                <p className="text-sm text-muted-foreground/50">
                  단계를 추가해주세요
                </p>
              ) : (
                <ol className="space-y-1.5">
                  {steps.map((step, i) => (
                    <motion.li
                      key={`preview-${i}-${step}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      {step}
                    </motion.li>
                  ))}
                </ol>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
