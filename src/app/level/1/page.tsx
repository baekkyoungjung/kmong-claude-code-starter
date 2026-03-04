"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/game/StarRating";
import { useGameStore } from "@/stores/useGameStore";
import { getLevelById } from "@/data/levels";

export default function Level1Page() {
  const level = getLevelById(1)!;
  const getMissionProgress = useGameStore((s) => s.getMissionProgress);
  const isMissionCompleted = useGameStore((s) => s.isMissionCompleted);

  function getMissionStatus(missionId: string, index: number) {
    if (isMissionCompleted(missionId)) return "completed";
    // First mission is always available; subsequent missions require previous completion
    if (index === 0) return "available";
    const prevMission = level.missions[index - 1];
    if (isMissionCompleted(prevMission.id)) return "available";
    return "locked";
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Level 1: {level.title}</h1>
        <p className="mt-2 text-muted-foreground">{level.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {level.missions.map((mission, index) => {
          const status = getMissionStatus(mission.id, index);
          const progress = getMissionProgress(mission.id);

          return (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {status === "locked" ? (
                <Card className="opacity-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <span className="text-muted-foreground">🔒</span>
                      {mission.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      이전 미션을 완료하면 잠금이 해제됩니다.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Link href={`/level/1/${mission.id}`}>
                  <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <span>
                          {status === "completed" ? "✅" : "📖"}
                        </span>
                        {mission.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {mission.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-amber-500">
                          +{mission.xp} XP
                        </span>
                        {progress && (
                          <StarRating stars={progress.stars} size="sm" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
