"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameState, MissionProgress } from "@/lib/types";
import { achievements } from "@/data/achievements";
import { track } from "@vercel/analytics";

interface GameActions {
  completeMission: (missionId: string, stars: number, xp: number) => void;
  isLevelUnlocked: (levelId: number) => boolean;
  isMissionCompleted: (missionId: string) => boolean;
  getMissionProgress: (missionId: string) => MissionProgress | undefined;
  getTotalStars: () => number;
  resetProgress: () => void;
}

const initialState: GameState = {
  xp: 0,
  missionProgress: {},
  unlockedBadges: [],
};

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      completeMission: (missionId: string, stars: number, xp: number) => {
        const state = get();
        const existing = state.missionProgress[missionId];

        // Only update if new score is better
        if (existing && existing.stars >= stars) return;

        const xpDiff = existing ? xp - existing.xpEarned : xp;

        const newProgress: MissionProgress = {
          completed: true,
          stars,
          xpEarned: xp,
        };

        const newMissionProgress = {
          ...state.missionProgress,
          [missionId]: newProgress,
        };

        const newXp = state.xp + xpDiff;

        // Check for new badges
        const newState: GameState = {
          xp: newXp,
          missionProgress: newMissionProgress,
          unlockedBadges: state.unlockedBadges,
        };

        const newBadges = achievements
          .filter(
            (a) =>
              !state.unlockedBadges.includes(a.id) && a.condition(newState)
          )
          .map((a) => a.id);

        set({
          xp: newXp,
          missionProgress: newMissionProgress,
          unlockedBadges: [...state.unlockedBadges, ...newBadges],
        });

        track("mission_complete", {
          missionId,
          stars,
          xp,
          totalXp: newXp,
          totalCompleted: Object.values(newMissionProgress).filter(
            (p) => p.completed
          ).length,
        });

        if (newBadges.length > 0) {
          track("badge_unlocked", {
            badges: newBadges.join(","),
            totalBadges: state.unlockedBadges.length + newBadges.length,
          });
        }
      },

      isLevelUnlocked: (levelId: number) => {
        if (levelId === 1) return true;
        const state = get();
        const prevLevelMissions =
          levelId === 2 ? ["1-1", "1-2"] : ["2-1", "2-2"];
        return prevLevelMissions.every(
          (id) => state.missionProgress[id]?.completed
        );
      },

      isMissionCompleted: (missionId: string) => {
        return get().missionProgress[missionId]?.completed ?? false;
      },

      getMissionProgress: (missionId: string) => {
        return get().missionProgress[missionId];
      },

      getTotalStars: () => {
        return Object.values(get().missionProgress).reduce(
          (sum, p) => sum + p.stars,
          0
        );
      },

      resetProgress: () => set(initialState),
    }),
    {
      name: "ai-navigator-quest",
    }
  )
);
