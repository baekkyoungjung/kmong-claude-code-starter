export interface Mission {
  id: string;
  levelId: number;
  missionNumber: number;
  title: string;
  subtitle: string;
  description: string;
  xp: number;
  maxStars: number;
}

export interface Level {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  missions: Mission[];
  requiredLevel: number | null; // null = no prerequisite
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctId: string;
  explanation: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (state: GameState) => boolean;
}

export interface MissionProgress {
  completed: boolean;
  stars: number;
  xpEarned: number;
}

export interface GameState {
  xp: number;
  missionProgress: Record<string, MissionProgress>;
  unlockedBadges: string[];
}

export interface SpotProblemScenario {
  id: string;
  prompt: string;
  badResult: string;
  options: { id: string; text: string }[];
  correctId: string;
  missingContext: string;
}

export interface ContextItem {
  id: string;
  label: string;
  percentage: number;
}
