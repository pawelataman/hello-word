import { QuizQuestion, Word } from "@/api/models/quiz";

export interface Language {
  code: string;
  label: string;
}
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
