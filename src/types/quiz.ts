export type Role = 'boss' | 'employee';

export type ChoiceId = string;

export type AnimalTier = 'best' | 'good' | 'mixed' | 'bad';

export interface Choice {
  id: ChoiceId;
  label: string;
  emoji?: string;
  nextId?: string;
  /** 선택 시 동물 점수 가산 (결과 매칭용) */
  scores: Record<string, number>;
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
  /** Bundled commercial-free animal photo */
  localImage: number;
  photographer: string;
  photographerUrl: string;
  creditSource: 'Pexels' | 'Pixabay' | 'Wikimedia' | 'OpenMoji';
}

export interface QuizAnswer {
  questionId: string;
  choiceId: ChoiceId;
  scores: Record<string, number>;
}
