import { Text, View } from "react-native";
import { Word } from "@/core/api/models/quiz";
import PlaybackWord from "@/components/ui/PlaybackWord";
import { useQuizStore } from "@/core/state/quiz.state";
import { useQuizTranslation } from "@/core/hooks/useQuizTranslation";
import { LanguageCode } from "@/core/constants/common";
import { QuizMode } from "@/core/models/models";
import { useCallback, useEffect } from "react";

interface QuizQuestionProps {
  question?: Word;
  mode: QuizMode;
}

export default function ({ question, mode }: QuizQuestionProps) {
  const { quizMetadata, quizRunData, setAnsweringEnabled } = useQuizStore();
  const { getQuestionLabel } = useQuizTranslation();

  useEffect(() => {
    setAnsweringEnabled(!(mode === "hearing"));
  }, [question, mode]);

  const showPlayback: boolean = quizMetadata.language === LanguageCode.PL;
  const showQuestion: boolean = mode !== "hearing";
  const questionAnswered: boolean =
    quizRunData.currentQuestionStatus === "answered";

  const enableAnswering = () => setAnsweringEnabled(true);

  const WritingModeQuestion = useCallback(
    () => (
      <View className="justify-around">
        <Text className={`text-center font-bold text-2xl text-gray-900`}>
          {getQuestionLabel(question!)}
        </Text>
      </View>
    ),
    [quizRunData],
  );

  return (
    <View className="p-2 rounded-lg bg-gray-100 h-36 gap-5 items-center justify-evenly">
      {quizMetadata.mode !== "writing" &&
        (showQuestion || questionAnswered) && (
          <Text className="text-center font-bold text-2xl text-gray-900">
            {getQuestionLabel(question!)}
          </Text>
        )}
      {quizMetadata.mode === "writing" && <WritingModeQuestion />}
      {!questionAnswered && showPlayback && (
        <PlaybackWord word={question!.en} lang="en" onDone={enableAnswering} />
      )}
    </View>
  );
}
