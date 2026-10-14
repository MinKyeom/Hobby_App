import { ANIMALS, BOSS_ANIMAL_IDS, EMPLOYEE_ANIMAL_IDS } from '@/constants/animals';
import type { AnimalCharacter, QuizAnswer, Role } from '@/types/quiz';

function sumScores(answers: QuizAnswer[]): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const answer of answers) {
    for (const [animalId, value] of Object.entries(answer.scores)) {
      if (!ANIMALS[animalId]) continue; // 정의되지 않은 id는 무시
      totals[animalId] = (totals[animalId] ?? 0) + value;
    }
  }
  return totals;
}

/** 동점일 때 마지막 문항에서 더 높은 점수를 받은 동물을 우선 */
function pickTop(
  ids: string[],
  totals: Record<string, number>,
  answers: QuizAnswer[],
  fallback: string,
): string {
  let bestId = fallback;
  let bestScore = -1;

  for (const id of ids) {
    const score = totals[id] ?? 0;
    if (score > bestScore) {
      bestScore = score;
      bestId = id;
      continue;
    }
    if (score === bestScore && score > 0) {
      const last = answers[answers.length - 1]?.scores ?? {};
      const prevBest = last[bestId] ?? 0;
      const challenger = last[id] ?? 0;
      if (challenger > prevBest) {
        bestId = id;
      }
    }
  }

  return bestId;
}

export function resolveAnimal(role: Role, answers: QuizAnswer[]): AnimalCharacter {
  const totals = sumScores(answers);
  const pool = role === 'boss' ? BOSS_ANIMAL_IDS : EMPLOYEE_ANIMAL_IDS;
  const fallback = role === 'boss' ? 'lion' : 'bee';
  const id = pickTop(pool, totals, answers, fallback);
  const animal = ANIMALS[id] ?? ANIMALS[fallback];

  // 안전장치: id/이름/이미지 키가 항상 동일 객체에서 나오도록 보장
  if (animal.id !== id && ANIMALS[fallback]) {
    return ANIMALS[fallback];
  }
  return animal;
}
