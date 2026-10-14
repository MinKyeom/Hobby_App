import { ANIMALS } from '@/constants/animals';
import {
  abilitiesForRole,
  levelLabel,
  type AbilityScore,
} from '@/constants/abilities';
import { questionsByRole } from '@/constants/questions';
import type { QuizAnswer, Role } from '@/types/quiz';

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * 해당 문항의 선택(동물 점수)으로 ___력 수치를 산출합니다.
 * - harmony: 배려·안정·케어형 선택일수록 높게
 * - drive: 추진·배분·페이스 조율형 선택일수록 높게
 */
function scoreChoice(
  scores: Record<string, number>,
  mode: 'harmony' | 'drive',
  choiceId: string,
): number {
  let harmony = 0;
  let drive = 0;
  let total = 0;

  for (const [animalId, weight] of Object.entries(scores)) {
    total += weight;
    const animal = ANIMALS[animalId];
    if (!animal) continue;
    switch (animal.tier) {
      case 'best':
        harmony += weight * 1.2;
        break;
      case 'good':
        harmony += weight;
        drive += weight * 0.35;
        break;
      case 'mixed':
        harmony += weight * 0.45;
        drive += weight * 0.55;
        break;
      case 'bad':
        drive += weight * 1.1;
        harmony += weight * 0.15;
        break;
    }
  }

  if (total <= 0) return 52;

  const hRatio = harmony / (harmony + drive || 1);
  const dRatio = drive / (harmony + drive || 1);
  const base = mode === 'harmony' ? hRatio : dRatio;

  // 선택지 id에 따른 미세 보정 (같은 티어라도 문항 맥락 반영)
  const idBoost =
    /warm|care|host|pack|clear|honest|help|decide|focus/.test(choiceId)
      ? 4
      : /urgent|press|vague|dump|late|micro|hesitate/.test(choiceId)
        ? mode === 'drive'
          ? 6
          : -3
        : 0;

  const variance = (choiceId.length * 3 + total * 2) % 9;
  return Math.round(clamp(32 + base * 58 + idBoost + variance * 0.4, 28, 98));
}

export function computeAbilities(role: Role, answers: QuizAnswer[]): AbilityScore[] {
  const defs = abilitiesForRole(role);
  const questionMap = questionsByRole[role];

  return defs.map((def) => {
    const answer = answers.find((a) => {
      const q = questionMap[a.questionId];
      return q?.step === def.step;
    });

    const value = answer
      ? scoreChoice(answer.scores, def.mode, answer.choiceId)
      : 50;

    return {
      ...def,
      value,
      levelLabel: levelLabel(value),
    };
  });
}
