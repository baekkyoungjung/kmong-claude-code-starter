"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGameStore } from "@/stores/useGameStore";
import type { Mission } from "@/lib/types";
import { StarRating } from "./StarRating";

export function MissionCard({
  mission,
  index,
}: {
  mission: Mission;
  index: number;
}) {
  const progress = useGameStore((s) => s.getMissionProgress(mission.id));
  const isCompleted = progress?.completed ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Link href={`/level/${mission.levelId}/${mission.id}`}>
        <Card
          className={`cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 ${
            isCompleted ? "border-green-500/50 bg-green-50/30" : ""
          }`}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                미션 {mission.missionNumber}
              </Badge>
              <span className="text-sm font-mono text-muted-foreground">
                {mission.xp} XP
              </span>
            </div>
            <CardTitle className="text-lg">{mission.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm text-muted-foreground">
              {mission.subtitle}
            </p>
            {isCompleted && progress ? (
              <div className="flex items-center justify-between">
                <StarRating stars={progress.stars} size="sm" />
                <span className="text-sm text-green-600 font-medium">완료</span>
              </div>
            ) : (
              <span className="text-sm text-primary font-medium">
                시작하기 →
              </span>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
