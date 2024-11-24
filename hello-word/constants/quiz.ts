import { Quiz } from "@/models/models";

export const QUIZ_INITIAL: Quiz = {
  highlightedAnswers: { correctAnswerId: null, incorrectAnswerId: null },
  quizStatus: "ongoing",
  points: {
    current: 0,
    total: 0,
  },
  currentQuestion: null,
  handleAnswer: (ans) => {},
  handleRestart: () => {},
};
