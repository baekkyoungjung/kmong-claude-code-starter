import type { Level } from "@/lib/types";

export const levels: Level[] = [
  {
    id: 1,
    title: "첫 걸음",
    subtitle: "초급",
    description: "Claude Code의 기본 작동 원리와 프롬프트의 힘을 이해합니다.",
    requiredLevel: null,
    missions: [
      {
        id: "1-1",
        levelId: 1,
        missionNumber: 1,
        title: "Claude Code는 어떻게 동작하나?",
        subtitle: "작동 원리 이해하기",
        description:
          "단일 스레드 조건부 무한 루프. LLM은 두뇌, 도구는 손. 애니메이션 루프 다이어그램으로 이해하세요.",
        xp: 100,
        maxStars: 3,
      },
      {
        id: "1-2",
        levelId: 1,
        missionNumber: 2,
        title: "명령의 품질이 결과를 결정한다",
        subtitle: "프롬프트 품질의 차이",
        description:
          "같은 요청이라도 얼마나 구체적으로 하느냐에 따라 결과가 천차만별입니다.",
        xp: 100,
        maxStars: 3,
      },
    ],
  },
  {
    id: 2,
    title: "장비 장착",
    subtitle: "중급",
    description: "Skill과 Plan Mode로 효율을 높이는 방법을 배웁니다.",
    requiredLevel: 1,
    missions: [
      {
        id: "2-1",
        levelId: 2,
        missionNumber: 1,
        title: "Skill = 레시피 카드",
        subtitle: "반복 작업 자동화",
        description:
          "매번 설명하는 대신 레시피 카드를 건네세요. Skill의 개념을 이해합니다.",
        xp: 150,
        maxStars: 3,
      },
      {
        id: "2-2",
        levelId: 2,
        missionNumber: 2,
        title: "Plan Mode — 스펙 없이 개발 시작?",
        subtitle: "계획의 중요성",
        description:
          "Plan mode는 코딩 전에 계획을 먼저 세우는 것. 계획 없는 실행의 위험을 체험하세요.",
        xp: 150,
        maxStars: 3,
      },
    ],
  },
  {
    id: 3,
    title: "마스터의 길",
    subtitle: "고급",
    description: "맥락 제공과 사장님 마인드셋으로 진정한 AI 마스터가 됩니다.",
    requiredLevel: 2,
    missions: [
      {
        id: "3-1",
        levelId: 3,
        missionNumber: 1,
        title: "사전 인터뷰 — 맥락이 전부다",
        subtitle: "충분한 맥락 제공하기",
        description:
          "작업 전 충분한 맥락을 제공하면 결과물의 품질이 달라집니다. 컨텍스트 완성도를 체험하세요.",
        xp: 200,
        maxStars: 3,
      },
      {
        id: "3-2",
        levelId: 3,
        missionNumber: 2,
        title: "내 잘못이다 — 사장님 마인드셋",
        subtitle: "책임감 있는 AI 활용",
        description:
          "AI 결과가 구리면 AI가 멍청해서가 아니라 내가 맥락을 빠뜨려서입니다.",
        xp: 200,
        maxStars: 3,
      },
    ],
  },
];

export function getLevelById(id: number): Level | undefined {
  return levels.find((l) => l.id === id);
}

export function getMissionById(id: string) {
  for (const level of levels) {
    const mission = level.missions.find((m) => m.id === id);
    if (mission) return { mission, level };
  }
  return undefined;
}
