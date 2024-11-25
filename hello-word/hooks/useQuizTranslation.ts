import { useQuizStore } from "@/state/quiz.state";
import { Word } from "@/api/models/quiz";

export function useQuizTranslation() {
  const { quizLanguages } = useQuizStore();

  const getQuestionLabel = (word: Word): string => {
    if (quizLanguages.source) {
      return word[quizLanguages.source.code];
    }
    return "Unknown translation";
  };

  const getAnswerLabel = (word: Word): string => {
    if (quizLanguages.target) {
      return word[quizLanguages.target.code];
    }
    return "Unknown translation";
  };

  return {
    getQuestionLabel,
    getAnswerLabel,
  };
}
