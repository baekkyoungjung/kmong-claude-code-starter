import type { Achievement } from "@/lib/types";

export const achievements: Achievement[] = [
  {
    id: "cadet",
    title: "Cadet",
    description: "Level 1 '첫 항해' 완료",
    icon: "⚓",
    condition: (state) =>
      ["1-1", "1-2"].every((id) => state.missionProgress[id]?.completed),
  },
  {
    id: "specialist",
    title: "Specialist",
    description: "Level 2 '장비 장착' 완료",
    icon: "🛠️",
    condition: (state) =>
      ["2-1", "2-2"].every((id) => state.missionProgress[id]?.completed),
  },
  {
    id: "master",
    title: "Master",
    description: "Level 3 '마스터의 길' 완료",
    icon: "🎓",
    condition: (state) =>
      ["3-1", "3-2"].every((id) => state.missionProgress[id]?.completed),
  },
  {
    id: "context-king",
    title: "Context King",
    description: "컨텍스트 미터 100% 달성",
    icon: "👑",
    condition: (state) => {
      const m = state.missionProgress["3-1"];
      return m?.completed && m?.stars === 3;
    },
  },
  {
    id: "full-journey",
    title: "Full Journey",
    description: "모든 미션 완료",
    icon: "🏆",
    condition: (state) =>
      ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2"].every(
        (id) => state.missionProgress[id]?.completed
      ),
  },
];
