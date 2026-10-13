import { create } from 'zustand';

import { questionsByRole, startQuestionId } from '@/constants/questions';
import type { ChoiceId, Question, QuizAnswer, Role } from '@/types/quiz';
import { resolveAnimal } from '@/utils/resolveResult';
import type { AnimalCharacter } from '@/types/quiz';

interface QuizState {
  role: Role | null;
  currentQuestionId: string | null;
  answers: QuizAnswer[];
  result: AnimalCharacter | null;
  startQuiz: (role: Role) => void;
  selectChoice: (choiceId: ChoiceId, nextId?: string) => void;
  getCurrentQuestion: () => Question | null;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  role: null,
  currentQuestionId: null,
  answers: [],
  result: null,

  startQuiz: (role) => {
    set({
      role,
      currentQuestionId: startQuestionId[role],
      answers: [],
      result: null,
    });
  },

  selectChoice: (choiceId, nextId) => {
    const { role, currentQuestionId, answers } = get();
    if (!role || !currentQuestionId) return;

    const nextAnswers: QuizAnswer[] = [
      ...answers,
      { questionId: currentQuestionId, choiceId },
    ];

    if (nextId) {
      set({ answers: nextAnswers, currentQuestionId: nextId });
      return;
    }

    const result = resolveAnimal(role, nextAnswers);
    set({
      answers: nextAnswers,
      currentQuestionId: null,
      result,
    });
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
    }),
}));
