import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { BOLD } from "@/constants/Typography";
import { QuizQuestion } from "@/api/models";

interface QuizQuestionProps {
  question: QuizQuestion;
}
export default function (props: QuizQuestionProps) {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{props.question.question.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  questionContainer: {
    margin: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    backgroundColor: Colors.light.bgLight,
    height: "auto",
  },
  questionText: {
    textAlign: "center",
    ...BOLD,
    fontSize: 36,
    color: Colors.light.textDark,
  },
});
