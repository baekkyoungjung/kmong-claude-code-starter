"use client";

import { motion } from "motion/react";
import { useGameStore } from "@/stores/useGameStore";
import { achievements } from "@/data/achievements";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function BadgeDisplay() {
  const unlockedBadges = useGameStore((s) => s.unlockedBadges);

  return (
    <div className="flex flex-wrap gap-3">
      {achievements.map((achievement) => {
        const isUnlocked = unlockedBadges.includes(achievement.id);
        return (
          <Tooltip key={achievement.id}>
            <TooltipTrigger>
              <motion.div
                initial={false}
                animate={{
                  scale: isUnlocked ? 1 : 0.9,
                  opacity: isUnlocked ? 1 : 0.3,
                }}
                whileHover={{ scale: isUnlocked ? 1.1 : 0.95 }}
                className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
                  isUnlocked
                    ? "bg-primary/10 shadow-md"
                    : "bg-muted grayscale"
                }`}
              >
                {achievement.icon}
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">{achievement.title}</p>
              <p className="text-xs">{achievement.description}</p>
              {!isUnlocked && (
                <p className="mt-1 text-xs text-muted-foreground">🔒 미해금</p>
              )}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
