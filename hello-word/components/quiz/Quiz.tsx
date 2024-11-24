import { View } from "react-native";
import AnswerButton from "@/components/quiz/QuizAnswerButton";
import { useQuiz } from "@/hooks/useQuiz";
import { useSuspenseQuery } from "@tanstack/react-query";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import { QuizContext } from "@/context/quiz-context";
import React from "react";
import QuizFinished from "./QuizFinished";
import { getQuiz } from "@/api/getQuiz";
import { Word } from "@/api/models/quiz";

interface QuizProps {
  sourceLangCode: string;
  targetLangCode: string;
}

export default function (props: QuizProps) {
  const numOfQuestions = 10;
  const { data } = useSuspenseQuery({
    queryKey: ["quiz"],
    queryFn: () => getQuiz(numOfQuestions),
    retry: false,
  });

  const quiz = useQuiz({
    ...props,
    quiz: data,
  });

  const getAnswerLabel = (word: Word): string => {
    return props.targetLangCode === "en" ? word.en : word.pl;
  };

  return (
    <QuizContext.Provider value={quiz}>
      {quiz.quizStatus === "ongoing" && (
        <>
          <QuizQuestion
            question={quiz.currentQuestion?.question}
            sourceLangCode={props.sourceLangCode}
          />
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
