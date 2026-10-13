import { ANIMALS } from '@/constants/animals';
import type { AnimalCharacter, ChoiceId, QuizAnswer, Role, Track } from '@/types/quiz';

function isPositive(choiceId: ChoiceId): boolean {
  return choiceId === 'A' || choiceId === 'A1' || choiceId.endsWith('1');
}

function getTrack(answers: QuizAnswer[]): Track {
  return answers[0]?.choiceId === 'B' ? 'B' : 'A';
}

function positiveCount(answers: QuizAnswer[]): number {
  return answers.filter((a) => isPositive(a.choiceId)).length;
}

function resolveBoss(answers: QuizAnswer[]): string {
  const track = getTrack(answers);
  if (track === 'A') {
    const score = positiveCount(answers);
    if (score >= 5) return 'lion';
    if (score === 4) return 'bear';
    if (score === 3) return 'deer';
    return 'giraffe';
  }

  const q2 = answers[1]?.choiceId;
  const q3 = answers[2]?.choiceId;
  const q5 = answers[4]?.choiceId;

  if (q2 === 'B1' && q3 === 'B1') return 'parrot';
  if (q3 === 'B2') return 'hedgehog';
  if (q2 === 'B1') return 'chameleon';
  if (q2 === 'B2' && q5 === 'B2') return 'octopus';
  return q5 === 'B1' ? 'chameleon' : 'octopus';
}

function resolveEmployee(answers: QuizAnswer[]): string {
  const track = getTrack(answers);
  if (track === 'A') {
    const score = positiveCount(answers);
    if (score >= 5) return 'bee';
    if (score === 4) return 'dolphin';
    if (score === 3) return 'squirrel';
    return 'penguin';
  }

  const q2 = answers[1]?.choiceId;
  const q3 = answers[2]?.choiceId;
  const q4 = answers[3]?.choiceId;
  const q5 = answers[4]?.choiceId;

  if (q2 === 'B1') return 'sloth';
  if (q3 === 'B1') return 'meerkat';
  if (q4 === 'B1') return 'raccoon';
  if (q5 === 'B2') return 'cat';
  return q3 === 'B2' ? 'meerkat' : 'raccoon';
}

export function resolveAnimal(role: Role, answers: QuizAnswer[]): AnimalCharacter {
  const id = role === 'boss' ? resolveBoss(answers) : resolveEmployee(answers);
  return ANIMALS[id] ?? (role === 'boss' ? ANIMALS.lion : ANIMALS.bee);
}
