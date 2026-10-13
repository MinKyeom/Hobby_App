export type Role = 'boss' | 'employee';

export type Track = 'A' | 'B';

export type ChoiceId = 'A' | 'B' | 'A1' | 'A2' | 'B1' | 'B2';

export type AnimalTier = 'best' | 'good' | 'mixed' | 'bad';

export interface Choice {
  id: ChoiceId;
  label: string;
  nextId?: string;
}

export interface Question {
  id: string;
  step: number;
  prompt: string;
  choices: Choice[];
}

export interface AnimalCharacter {
  id: string;
  role: Role;
  tier: AnimalTier;
  emoji: string;
  title: string;
  animalName: string;
  tags: string[];
  traits: string;
  tip: string;
  pexelsQuery: string;
  /** Legacy/CDN reference (심사·오프라인은 localImage 우선) */
  imageUrl: string;
  /** Bundled Pexels animal photo (no human faces / trademarks) */
  localImage: number;
  photographer: string;
  photographerUrl: string;
}

export interface QuizAnswer {
  questionId: string;
  choiceId: ChoiceId;
}
