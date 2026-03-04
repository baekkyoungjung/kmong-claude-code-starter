"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { useGameStore } from "@/stores/useGameStore";
import { getLevelById } from "@/data/levels";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Level2Page() {
  const { isLevelUnlocked, isMissionCompleted, getMissionProgress } =
    useGameStore();
  const level = getLevelById(2)!;
  const unlocked = isLevelUnlocked(2);

  if (!unlocked) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex size-20 items-center justify-center rounded-full bg-muted"
        >
          <Lock className="size-10 text-muted-foreground" />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold">잠겨 있음</h2>
          <p className="mt-2 text-muted-foreground">
            Level 1을 먼저 완료해주세요
          </p>
        </div>
        <Button asChild>
          <Link href="/level/1">Level 1으로 이동</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Badge variant="secondary" className="mb-2">
          {level.subtitle}
        </Badge>
        <h1 className="text-3xl font-bold">Level 2: {level.title}</h1>
        <p className="mt-2 text-muted-foreground">{level.description}</p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {level.missions.map((mission, i) => {
          const completed = isMissionCompleted(mission.id);
          const progress = getMissionProgress(mission.id);

          return (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="h-full"
            >
              <Link href={`/level/2/${mission.id}`} className="block h-full">
                <Card
                  className={`h-full cursor-pointer transition-all hover:shadow-md ${
                    completed
                      ? "border-green-300 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30"
                      : "hover:border-primary/50"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={completed ? "default" : "outline"}
                        className="text-xs"
                      >
                        미션 {mission.missionNumber}
                      </Badge>
                      {completed && (
                        <span className="text-sm text-green-600 dark:text-green-400">
                          {progress?.stars
                            ? "⭐".repeat(progress.stars)
                            : "완료"}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-lg">{mission.title}</CardTitle>
                    <CardDescription>{mission.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {mission.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span>+{mission.xp} XP</span>
                      {completed ? (
                        <span className="font-medium text-green-600 dark:text-green-400">
                          완료
                        </span>
                      ) : (
                        <span>미완료</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
