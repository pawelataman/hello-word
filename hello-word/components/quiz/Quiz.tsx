import { StyleSheet, View } from "react-native";
import AnswerButton from "@/components/ui/AnswerButton";
import { useQuiz } from "@/hooks/useQuiz";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getQuizQuestions } from "@/api/getQuizQuestions";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import { QuizContext } from "@/context/quiz-context";
import React from "react";
import QuizFinished from "./QuizFinished";

interface QuizProps {
  sourceLangCode: string;
  targetLangCode: string;
}

export default function (props: QuizProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["quizQuestions", 10],
    queryFn: () => getQuizQuestions({ amount: 10 }),
  });
  const quiz = useQuiz({
    ...props,
    questions: data.questions,
  });
  return (
    <QuizContext.Provider value={quiz}>
      {quiz.quizStatus === "ongoing" && (
        <>
          <QuizQuestion question={quiz.currentQuestion!} />
          <View style={styles.questionAnswersContainer}>
            {quiz.currentQuestion?.answers.map((ans) => {
              return (
                <AnswerButton
                  onPress={() => quiz.handleAnswer(ans)}
                  label={ans.value}
                  id={ans.id}
                  key={quiz.currentQuestion?.question.id + ans.id}
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
