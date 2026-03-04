"use client";

import Link from "next/link";
import { useGameStore } from "@/stores/useGameStore";
import { TOTAL_XP } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function Header() {
  const xp = useGameStore((s) => s.xp);
  const totalStars = useGameStore((s) => s.getTotalStars());
  const percentage = Math.round((xp / TOTAL_XP) * 100);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="text-lg">Agent Starter</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-xs text-muted-foreground">진행도</span>
            <Progress value={percentage} className="w-24" />
            <span className="text-xs font-medium">{percentage}%</span>
          </div>

          <Badge variant="secondary" className="gap-1">
            <span className="text-amber-500">★</span> {totalStars}
          </Badge>

          <Badge variant="outline" className="gap-1 font-mono">
            {xp} XP
          </Badge>
        </div>
      </div>
    </header>
  );
}
