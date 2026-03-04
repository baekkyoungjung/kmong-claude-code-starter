"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { Header } from "@/components/layout/Header";
import { useGameStore } from "@/stores/useGameStore";

export default function LevelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const missionProgress = useGameStore((s) => s.missionProgress);

  useEffect(() => {
    const completedCount = Object.values(missionProgress).filter(
      (p) => p.completed
    ).length;

    // /level/1 → level_view, /level/2/2-1 → mission_view
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 2) {
      track("level_view", { level: parts[1], completedMissions: completedCount });
    } else if (parts.length === 3) {
      track("mission_view", {
        level: parts[1],
        mission: parts[2],
        completedMissions: completedCount,
      });
    }
  }, [pathname, missionProgress]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
