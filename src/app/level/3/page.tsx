"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/game/StarRating";
import { useGameStore } from "@/stores/useGameStore";

const missions = [
  {
    id: "3-1",
    number: 1,
    title: "사전 인터뷰 - 맥락이 전부다",
    subtitle: "충분한 맥락 제공하기",
    href: "/level/3/3-1",
    xp: 200,
  },
  {
    id: "3-2",
    number: 2,
    title: "내 잘못이다 - 사장님 마인드셋",
    subtitle: "책임감 있는 AI 활용",
    href: "/level/3/3-2",
    xp: 200,
  },
];

export default function Level3Page() {
  const isLevelUnlocked = useGameStore((s) => s.isLevelUnlocked);
  const getMissionProgress = useGameStore((s) => s.getMissionProgress);
  const unlocked = isLevelUnlocked(3);

  if (!unlocked) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-6xl"
        >
          🔒
        </motion.div>
        <h1 className="text-2xl font-bold">Level 3: 마스터의 길</h1>
        <p className="max-w-md text-muted-foreground">
          Level 2의 모든 미션을 완료하면 잠금이 해제됩니다.
          먼저 Level 2를 완료해주세요.
        </p>
        <Link
          href="/level/2"
          className="mt-4 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Level 2로 이동
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Badge variant="secondary" className="mb-2">
          고급
        </Badge>
        <h1 className="text-3xl font-bold">Level 3: 마스터의 길</h1>
        <p className="mt-2 text-muted-foreground">
          맥락 제공과 사장님 마인드셋으로 진정한 AI 마스터가 됩니다.
        </p>
      </motion.div>

      {/* Mission cards */}
      <div className="grid gap-4">
        {missions.map((mission, i) => {
          const progress = getMissionProgress(mission.id);
          const completed = progress?.completed ?? false;

          return (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={mission.href}>
                <Card className="transition-colors hover:border-primary/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          미션 {mission.number}
                        </p>
                        <CardTitle className="mt-1 text-lg">
                          {mission.title}
                        </CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {mission.subtitle}
                        </p>
                      </div>
                      <div className="text-right">
                        {completed ? (
                          <StarRating
                            stars={progress!.stars}
                            size="sm"
                          />
                        ) : (
                          <Badge variant="outline">
                            {mission.xp} XP
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  {completed && (
                    <CardContent className="pt-0">
                      <Badge variant="secondary" className="text-green-600 dark:text-green-400">
                        완료
                      </Badge>
                    </CardContent>
                  )}
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
