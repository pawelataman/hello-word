import { useQuizStore } from "@/core/state/quiz.state";
import { Word } from "@/core/api/models/quiz";
import { LANG_EN, LANG_PL, LanguageCode } from "@/core/constants/common";

export function useQuizTranslation() {
  const { quizMetadata } = useQuizStore();

  const getQuestionLabel = (word: Word): string => {
    if (quizMetadata.language === LANG_EN.code) {
      return word[LANG_PL.code];
    } else if (quizMetadata.language === LanguageCode.PL) {
      return word[LANG_EN.code];
    }
    return "Unknown translation";
  };

  const getAnswerLabel = (word: Word | undefined): string => {
    return word?.[quizMetadata.language] || "Unknown translation";
  };

  return {
    getQuestionLabel,
    getAnswerLabel,
  };
}
