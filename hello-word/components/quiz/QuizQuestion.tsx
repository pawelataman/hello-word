import { Text, View } from "react-native";
import { Word } from "@/core/api/models/quiz";
import PlaybackWord from "@/components/ui/PlaybackWord";
import { useQuizStore } from "@/core/state/quiz.state";
import { useQuizTranslation } from "@/core/hooks/useQuizTranslation";
import { LANG_CODE } from "@/core/constants/common";

interface QuizQuestionProps {
  question?: Word;
}

export default function (props: QuizQuestionProps) {
  const { quizLanguages } = useQuizStore();
  const { getQuestionLabel } = useQuizTranslation();

  const showPlayback: boolean = quizLanguages.source?.code === LANG_CODE.EN;
  return (
    <View className="m-5 py-16 px-2.5 rounded-lg bg-gray-100 h-auto gap-5 items-center justify-evenly">
      <Text className="text-center font-bold text-4xl text-gray-900">
        {getQuestionLabel(props.question!)}
      </Text>

      {showPlayback && <PlaybackWord word={props.question!.en} lang="en" />}
    </View>
  );
}
