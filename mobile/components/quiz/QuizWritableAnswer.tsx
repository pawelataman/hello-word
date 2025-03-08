import { Text, View } from "react-native";
import { Word } from "@/core/api/models/quiz";
import { useSegmentAnswer } from "@/core/hooks/useSegmentAnswer";
import { useMemo, useState } from "react";
import { useQuizStore } from "@/core/state/quiz.state";
import QuizWritableAnswerSegment from "@/components/quiz/QuizWritableAnswerSegment";
import AppButton from "@/components/ui/AppButton";
import { useMMKVBoolean } from "react-native-mmkv";
import { CONFIG_AUTO_NEXT_QUESTION, storage } from "@/core/constants/storage";
import { useQuizTranslation } from "@/core/hooks/useQuizTranslation";

interface QuizWritableAnswerProps {
  answer: Word;
  submitAnswer: (answer: string) => void;
}

export default function ({ answer, submitAnswer }: QuizWritableAnswerProps) {
  const { getAnswerLabel } = useQuizTranslation();
  const { nextQuestion, quizRunData } = useQuizStore();
  const isAnswered = useMemo(
    () => quizRunData.currentQuestionStatus === "answered",
    [quizRunData],
  );
  const { segments, checkIsFilled } = useSegmentAnswer(answer);
  const [valid, setIsValid] = useState<boolean>(false);
  const [autoNextQuestion] = useMMKVBoolean(CONFIG_AUTO_NEXT_QUESTION, storage);
  const segmentAnswers = useMemo(() => segments.map(() => ""), [segments]);
  const onSegmentChange = (value: string, index: number) => {
    segmentAnswers[index] = value;
    setIsValid(checkIsFilled(segmentAnswers));
  };
  const handleAnswer = () => submitAnswer(segmentAnswers.join(" "));
  const currentQuestion = useMemo(
    () => quizRunData.answeredQuestions.at(-1),
    [quizRunData],
  );
  const isCorrect = useMemo(
    () => isAnswered && currentQuestion?.isCorrect,
    [isAnswered && currentQuestion],
  );

  return (
    <View className="gap-6 items-center">
      {!isAnswered && (
        <View className="gap-x-4 flex-row flex-wrap justify-center">
          {segments.map((segment, index) => (
            <View className="flex-row" key={index}>
              <QuizWritableAnswerSegment
                index={index}
                segment={segment}
                onChange={onSegmentChange}
              />
            </View>
          ))}
        </View>
      )}
      {isAnswered && (
        <Text
          className={`${isCorrect ? "color-green-500" : "color-black"} text-2xl font-bold text-center`}
        >
          {segmentAnswers.map((segAns) => segAns + " ")}
        </Text>
      )}
      {isAnswered && !isCorrect && (
        <Text className={"text-4xl color-red-500 font-bold text-center"}>
          {getAnswerLabel(currentQuestion?.question.question)}
        </Text>
      )}

      <View className="w-full items-center justify-center">
        {!isAnswered && (
          <AppButton
            disabled={!valid || isAnswered}
            variant={"primary"}
            label={"Odpowiedz"}
            onPress={handleAnswer}
          />
        )}
        {isAnswered && !autoNextQuestion && (
          <AppButton
            variant={"tertiary"}
            label={"Następne pytanie"}
            onPress={nextQuestion}
          />
        )}
      </View>
    </View>
  );
}
