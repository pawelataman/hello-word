import { View } from "react-native";
import AnswerButton from "@/components/quiz/QuizAnswerButton";
import { useQuiz } from "@/core/hooks/useQuiz";
import { useSuspenseQuery } from "@tanstack/react-query";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import { QuizContext } from "@/core/context/quiz-context";
import React, { useEffect } from "react";
import QuizFinished from "./QuizFinished";
import { getQuiz } from "@/core/api/getQuiz";
import { useQuizTranslation } from "@/core/hooks/useQuizTranslation";
import { useQuizStore } from "@/core/state/quiz.state";
import QuizProgress from "./QuizProgress";

const TOTAL_QUESTIONS_REQUEST = 10;
export default function () {
  const { getAnswerLabel } = useQuizTranslation();
  const { setQuestionsTotal } = useQuizStore();
  const { data } = useSuspenseQuery({
    queryKey: ["quiz"],
    queryFn: () => getQuiz(TOTAL_QUESTIONS_REQUEST),
  });

  if (!data) return;
  console.log("data", data);
  const quiz = useQuiz({
    quiz: data,
  });

  useEffect(() => {
    setQuestionsTotal(data.questions.length);
  }, [data.questions.length]);

  return (
    <QuizContext.Provider value={quiz}>
      {quiz.quizStatus === "ongoing" && (
        <View className="h-full justify-around">
          <QuizProgress></QuizProgress>
          <QuizQuestion question={quiz.currentQuestion?.question} />
          <View className="px-5 flex-row flex-wrap justify-between gap-y-5">
            {quiz.currentQuestion?.answers.map((ans) => (
              <AnswerButton
                onPress={() => quiz.handleAnswer(ans)}
                label={getAnswerLabel(ans)}
                id={ans.id}
                key={ans.id}
              />
            ))}
          </View>
        </View>
      )}
      {quiz.quizStatus === "finished" && <QuizFinished />}
    </QuizContext.Provider>
  );
}
