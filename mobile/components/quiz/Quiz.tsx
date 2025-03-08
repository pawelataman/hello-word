import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuiz } from "@/core/hooks/useQuiz";
import { useSuspenseQuery } from "@tanstack/react-query";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import React, { useContext, useEffect, useMemo } from "react";
import QuizFinished from "./QuizFinished";
import QuizProgress from "./QuizProgress";
import { HttpClientContext } from "@/core/context/client-context";
import {
  selectCurrentQuestion,
  selectQuizStatus,
  useQuizStore,
} from "@/core/state/quiz.state";
import { shuffle } from "@/utils/array";
import QuizWritableAnswer from "@/components/quiz/QuizWritableAnswer";
import Bulb from "@/assets/images/icons/bulb.svg";
import QuizChosenAnswer from "@/components/quiz/QuizChosenAnswer";

export default function () {
  const quizStatus = useQuizStore(selectQuizStatus);
  const currentQuestion = useQuizStore(selectCurrentQuestion);
  const { handleChooseAnswer, handleTypedAnswer } = useQuiz();
  const { initializeQuiz, quizMetadata, quizRunData } = useQuizStore();
  const { getQuiz, getQuizFromFlashcards } = useContext(HttpClientContext)!;

  const { data } = useSuspenseQuery({
    queryKey: ["quiz", quizMetadata.flashcardsIds],
    queryFn: ({ queryKey }) => {
      const [_, flashcardsIds] = queryKey;
      if (
        flashcardsIds &&
        Array.isArray(flashcardsIds) &&
        flashcardsIds.length
      ) {
        return getQuizFromFlashcards({ flashcardsIds: flashcardsIds });
      }
      return getQuiz();
    },
  });

  if (!data) return;

  //shuffled answers
  const answers = useMemo(() => {
    if (currentQuestion) {
      return shuffle(currentQuestion?.answers);
    }
    return [];
  }, [currentQuestion]);

  useEffect(() => {
    initializeQuiz(data);
  }, [data]);

  const isWriting = useMemo(
    () => quizMetadata.mode === "writing",
    [quizMetadata],
  );
  const isChoosing = useMemo(
    () => quizMetadata.mode !== "writing",
    [quizMetadata],
  );
  const isAnswered = useMemo(
    () => quizRunData.currentQuestionStatus === "answered",
    [quizRunData],
  );

  const giveUpAnswer = () => {
    handleTypedAnswer("Some random incorrect answer");
  };

  return (
    <>
      {quizStatus === "ongoing" && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
        >
          <View className="h-full px-4">
            <QuizProgress
              giveUpAnswer={
                isWriting && (
                  <TouchableOpacity
                    disabled={isAnswered}
                    onPress={giveUpAnswer}
                    className={`self-start px-2 py-1 rounded-xl justify-end items-center gap-2 flex-row border-2 ${isAnswered && "opacity-30"} border-gray-100`}
                  >
                    <Bulb
                      color={"#22c55e"}
                      fill={"white"}
                      width={24}
                      height={24}
                    />
                  </TouchableOpacity>
                )
              }
            />

            <View className="justify-between items-center flex-1">
              <View className={"w-full my-2 "}>
                <QuizQuestion
                  question={currentQuestion?.question}
                  mode={quizMetadata.mode}
                />
              </View>
              {isChoosing && (
                <View className="pb-2 w-full justify-between gap-y-3">
                  <QuizChosenAnswer
                    answers={answers}
                    submitAnswer={handleChooseAnswer}
                  />
                </View>
              )}
              {isWriting && (
                <View className={"flex-1 justify-center"}>
                  <QuizWritableAnswer
                    answer={currentQuestion!.question}
                    submitAnswer={handleTypedAnswer}
                  />
                </View>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
      {quizStatus === "finished" && (
        <View className={"flex-1 px-2"}>
          <QuizFinished />
        </View>
      )}
    </>
  );
}
