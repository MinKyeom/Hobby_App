import { create } from 'zustand';

import type { AbilityScore } from '@/constants/abilities';
import { questionsByRole, startQuestionId } from '@/constants/questions';
import type { AnimalCharacter, ChoiceId, Question, QuizAnswer, Role } from '@/types/quiz';
import { computeAbilities } from '@/utils/abilities';
import { resolveAnimal } from '@/utils/resolveResult';

interface QuizState {
  role: Role | null;
  currentQuestionId: string | null;
  answers: QuizAnswer[];
  result: AnimalCharacter | null;
  abilities: AbilityScore[];
  startQuiz: (role: Role) => void;
  selectChoice: (choiceId: ChoiceId, nextId?: string, scores?: Record<string, number>) => void;
  goBack: () => boolean;
  getCurrentQuestion: () => Question | null;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  role: null,
  currentQuestionId: null,
  answers: [],
  result: null,
  abilities: [],

  startQuiz: (role) => {
    set({
      role,
      currentQuestionId: startQuestionId[role],
      answers: [],
      result: null,
      abilities: [],
    });
  },

  selectChoice: (choiceId, nextId, scores = {}) => {
    const { role, currentQuestionId, answers } = get();
    if (!role || !currentQuestionId) return;

    const nextAnswers: QuizAnswer[] = [
      ...answers,
      { questionId: currentQuestionId, choiceId, scores },
    ];

    if (nextId) {
      set({ answers: nextAnswers, currentQuestionId: nextId });
      return;
    }

    const result = resolveAnimal(role, nextAnswers);
    const abilities = computeAbilities(role, nextAnswers);
    set({
      answers: nextAnswers,
      currentQuestionId: null,
      result,
      abilities,
    });
  },

  goBack: () => {
    const { answers } = get();
    if (answers.length === 0) return false;

    const previous = answers[answers.length - 1];
    set({
      answers: answers.slice(0, -1),
      currentQuestionId: previous.questionId,
      result: null,
      abilities: [],
    });
    return true;
  },

  getCurrentQuestion: () => {
    const { role, currentQuestionId } = get();
    if (!role || !currentQuestionId) return null;
    return questionsByRole[role][currentQuestionId] ?? null;
  },

  reset: () =>
    set({
      role: null,
      currentQuestionId: null,
      answers: [],
      result: null,
      abilities: [],
    }),
}));
