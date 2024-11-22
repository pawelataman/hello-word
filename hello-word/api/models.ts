export interface GetQuizQuestionsRequest {
  amount: number;
}

export interface GetQuizQuestionsResponse {
  questions: QuizQuestion[];
}
export interface Question {
  id: string;
  value: string;
}

export interface QuestionAnswer {
  id: string;
  value: string;
}

export interface QuizQuestion {
  question: Question;
  answers: QuestionAnswer[];
  correctAnswerId: QuestionAnswer["id"];
}
