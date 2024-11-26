import { create } from "zustand/react";
import { Language } from "@/models/models";

type State = {
  quizLanguages: {
    source: Language | null;
    target: Language | null;
  };
  questionsTotal: number;
  answeredQuestions: boolean[];
};
type Actions = {
  setQuizLanguages: (source: Language, target: Language) => void;
  addAnsweredQuestion: (correct: boolean) => void;
  setQuestionsTotal: (total: number) => void;
  reset: () => void;
};

type QuizState = State & Actions;

const INITIAL_STATE: State = {
  quizLanguages: {
    source: null,
    target: null,
  },
  questionsTotal: 0,
  answeredQuestions: [],
};

export const useQuizStore = create<QuizState>((set) => ({
  ...INITIAL_STATE,
  setQuizLanguages: (source: Language, target: Language) =>
    set((state) => ({
      ...state,
      quizLanguages: {
        source,
        target,
      },
    })),
  addAnsweredQuestion: (correct: boolean) =>
    set((state) => ({
      ...state,
      answeredQuestions: [...state.answeredQuestions, correct],
    })),
  setQuestionsTotal: (total: number) =>
    set((state) => ({ ...state, questionsTotal: total })),
  reset: () => {
    console.log("rseet");
    return set({ ...INITIAL_STATE });
  },
}));
