import { QuestionAnswer, QuizQuestion } from "@/api/models";

export interface Language {
  code: string;
  label: string;
}

export type HighlightMode = "correct" | "incorrect";

export interface HighlightedAnswers {
  correctAnswerId: string;
  incorrectAnswerId: string;
}

export interface Quiz {
  handleAnswer: (answer: QuestionAnswer) => void;
  handleRestart: () => void;
  currentQuestion: QuizQuestion | null;
  highlightedAnswers: HighlightedAnswers;
  points: { current: number; total: number };
  quizStatus: string;
}
