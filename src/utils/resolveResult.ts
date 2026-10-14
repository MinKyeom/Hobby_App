import { ANIMALS, BOSS_ANIMAL_IDS, EMPLOYEE_ANIMAL_IDS } from '@/constants/animals';
import type { AnimalCharacter, QuizAnswer, Role } from '@/types/quiz';

function sumScores(answers: QuizAnswer[]): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const answer of answers) {
    for (const [animalId, value] of Object.entries(answer.scores)) {
      totals[animalId] = (totals[animalId] ?? 0) + value;
    }
  }
  return totals;
}

function pickTop(ids: string[], totals: Record<string, number>, fallback: string): string {
  let bestId = fallback;
  let bestScore = -1;
  for (const id of ids) {
    const score = totals[id] ?? 0;
    if (score > bestScore) {
      bestScore = score;
      bestId = id;
    }
  }
  return bestId;
}

export function resolveAnimal(role: Role, answers: QuizAnswer[]): AnimalCharacter {
  const totals = sumScores(answers);
  const pool = role === 'boss' ? BOSS_ANIMAL_IDS : EMPLOYEE_ANIMAL_IDS;
  const fallback = role === 'boss' ? 'lion' : 'bee';
  const id = pickTop(pool, totals, fallback);
  return ANIMALS[id] ?? ANIMALS[fallback];
}
