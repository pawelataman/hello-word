import { View } from "react-native";
import AnswerButton from "@/components/quiz/QuizAnswerButton";
import { useQuiz } from "@/hooks/useQuiz";
import { useSuspenseQuery } from "@tanstack/react-query";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import { QuizContext } from "@/context/quiz-context";
import React from "react";
import QuizFinished from "./QuizFinished";
import { getQuiz } from "@/api/getQuiz";
import QuizProgress from "./QuizProgress";
import { useQuizStore } from "@/state/quiz.state";
import { useQuizTranslation } from "@/hooks/useQuizTranslation";

export default function () {
  const { numOfQuestions } = useQuizStore();
  const { getAnswerLabel } = useQuizTranslation();
  const { data } = useSuspenseQuery({
    queryKey: ["quiz"],
    queryFn: () => getQuiz(numOfQuestions),
    retry: false,
  });

  const quiz = useQuiz({
    quiz: data,
  });

  return (
    <QuizContext.Provider value={quiz}>
      {quiz.quizStatus === "ongoing" && (
        <>
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
        </>
      )}
      {quiz.quizStatus === "finished" && <QuizFinished />}
    </QuizContext.Provider>
  );
}
