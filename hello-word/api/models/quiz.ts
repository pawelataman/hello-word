export interface QuizResponse {
  id: string;
  questions: QuizQuestion[];
  quizConfig: QuizConfig;
}

export interface QuizConfig {
  totalQuestions: number;
  timePerQuestion?: number;
}

export interface QuizQuestion {
  question: Word;
  answers: Word[];
}

export interface Word {
  id: number;
  categoryId: number;
  en: string;
  pl: string;
}
