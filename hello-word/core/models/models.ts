import { QuizQuestion, Word } from "@/core/api/models/quiz";
import { LANG_CODE } from "@/core/constants/common";

export interface Language {
  code: LANG_CODE;
  label: string;
}

export interface QuizState {}
export type QuizStatus = "finished" | "ongoing";
export type HighlightMode = "correct" | "incorrect";

export interface HighlightedAnswers {
  correctAnswerId: number | null;
  incorrectAnswerId: number | null;
}

export interface Quiz {
  handleAnswer: (answer: Word) => void;
  handleRestart: () => void;
  currentQuestion: QuizQuestion | null;
  highlightedAnswers: HighlightedAnswers;
  points: { current: number; total: number };
  quizStatus: QuizStatus;
}
