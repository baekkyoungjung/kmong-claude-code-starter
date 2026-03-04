"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGameStore } from "@/stores/useGameStore";
import type { Level } from "@/lib/types";
import { StarRating } from "./StarRating";

export function LevelCard({
  level,
  index,
}: {
  level: Level;
  index: number;
}) {
  const isUnlocked = useGameStore((s) => s.isLevelUnlocked(level.id));
  const missionProgress = useGameStore((s) => s.missionProgress);

  const completedMissions = level.missions.filter(
    (m) => missionProgress[m.id]?.completed
  ).length;
  const totalStars = level.missions.reduce(
    (sum, m) => sum + (missionProgress[m.id]?.stars ?? 0),
    0
  );
  const isComplete = completedMissions === level.missions.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.4 }}
    >
      {isUnlocked ? (
        <Link href={`/level/${level.id}`}>
          <Card
            className={`cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${
              isComplete ? "border-green-500/50 bg-green-50/50" : ""
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant={isComplete ? "default" : "secondary"}>
                  {level.subtitle}
                </Badge>
                {isComplete && <span className="text-green-500">✓</span>}
              </div>
              <CardTitle className="text-xl">
                Level {level.id}: {level.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                {level.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {completedMissions}/{level.missions.length} 미션
                </span>
                {totalStars > 0 && (
                  <StarRating stars={totalStars} maxStars={level.missions.length * 3} size="sm" />
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <Card className="opacity-60">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline">{level.subtitle}</Badge>
              <span className="text-xl">🔒</span>
            </div>
            <CardTitle className="text-xl">
              Level {level.id}: {level.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{level.description}</p>
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              Level {level.id - 1}을 먼저 완료해주세요
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
