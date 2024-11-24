import { Text, View } from "react-native";
import { Word } from "@/api/models/quiz";
import PlaybackWord from "@/components/ui/PlaybackWord";

interface QuizQuestionProps {
  question?: Word;
  sourceLangCode: string;
}

export default function (props: QuizQuestionProps) {
  const getQuestionText = () => {
    return props.sourceLangCode === "en"
      ? props.question?.en
      : props.question?.pl;
  };

  return (
    <View className="m-5 py-5 px-2.5 rounded-lg bg-gray-50 h-auto gap-5 items-center justify-evenly">
      <Text className="text-center font-bold text-4xl text-gray-900">
        {getQuestionText()}
      </Text>

      {props.sourceLangCode === "en" && (
        <PlaybackWord word={props.question!.en} lang="en" />
      )}
    </View>
  );
}
