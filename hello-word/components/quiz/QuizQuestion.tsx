import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { BOLD } from "@/constants/Typography";
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
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{getQuestionText()}</Text>
      {props.sourceLangCode === "en" && (
        <PlaybackWord word={props.question!.en} lang={"en"}></PlaybackWord>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  questionContainer: {
    margin: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: Colors.light.bgLight,
    height: "auto",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  questionText: {
    textAlign: "center",
    ...BOLD,
    fontSize: 36,
    color: Colors.light.textDark,
  },
});
