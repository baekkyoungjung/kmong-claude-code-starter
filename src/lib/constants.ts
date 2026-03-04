export const TOTAL_XP = 900;

export const LEVEL_XP: Record<number, number> = {
  1: 200,
  2: 300,
  3: 400,
};

export const MISSION_XP: Record<string, number> = {
  "1-1": 100,
  "1-2": 100,
  "2-1": 150,
  "2-2": 150,
  "3-1": 200,
  "3-2": 200,
};

export const CONTEXT_METER_LEVELS = [
  { min: 0, max: 30, color: "red", label: "기대에 안 맞을 확률 높음", emoji: "🔴" },
  { min: 31, max: 60, color: "yellow", label: "여러 번 수정이 필요할 수 있음", emoji: "🟡" },
  { min: 61, max: 80, color: "green", label: "괜찮은 첫 결과물 가능", emoji: "🟢" },
  { min: 81, max: 100, color: "gold", label: "거의 완벽한 결과물 기대", emoji: "🥇" },
] as const;
