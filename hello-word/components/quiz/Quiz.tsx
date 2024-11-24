import { StyleSheet, View } from "react-native";
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
          <View style={styles.questionAnswersContainer}>
            {quiz.currentQuestion?.answers.map((ans) => {
              return (
                <AnswerButton
                  onPress={() => quiz.handleAnswer(ans)}
                  label={getAnswerLabel(ans)}
                  id={ans.id}
                  key={ans.id}
                ></AnswerButton>
              );
            })}
          </View>
        </>
      )}
      {quiz.quizStatus === "finished" && <QuizFinished />}
    </QuizContext.Provider>
  );
}

const styles = StyleSheet.create({
  questionAnswersContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 20,
  },
});
