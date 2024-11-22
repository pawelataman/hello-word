import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useContext, useMemo } from "react";
import { QuizContext } from "@/context/quiz-context";

interface AnswerButtonProps {
  onPress: (ev: GestureResponderEvent) => void;
  label: string;
  id: string;
}

export default function (props: AnswerButtonProps) {
  const quiz = useContext(QuizContext);
  const highlighted = useMemo(() => {
    if (props.id === quiz.highlightedAnswers.correctAnswerId) return "good";
    if (props.id === quiz.highlightedAnswers.incorrectAnswerId) return "wrong";
    return null;
  }, [quiz.highlightedAnswers]);
  const getButtonStyle = () => {
    return [
      styles.button,

      highlighted === "good" ? styles.buttonCorrect : {},
      highlighted === "wrong" ? styles.buttonWrong : {},
    ];
  };

  const getTextStyle = () => {
    return [
      styles.text,
      highlighted === "good" ? styles.textCorrect : {},
      highlighted === "wrong" ? styles.textWrong : {},
    ];
  };

  const disabled = useMemo(() => {
    return !!(
      quiz.highlightedAnswers.incorrectAnswerId ||
      quiz.highlightedAnswers.correctAnswerId
    );
  }, [quiz.highlightedAnswers]);

  return (
    <Pressable
      style={getButtonStyle()}
      onPress={props.onPress}
      disabled={disabled}
    >
      <Text style={getTextStyle()}>{props.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "45%",
    backgroundColor: Colors.light.bgLight,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 8,
  },

  buttonCorrect: {
    backgroundColor: Colors.light.green,
    borderBottomWidth: 0,
  },
  buttonWrong: {
    backgroundColor: Colors.light.red,
    borderBottomWidth: 0,
  },
  textCorrect: {
    color: Colors.light.white,
  },
  textWrong: {
    color: Colors.light.white,
  },
  text: {
    color: Colors.light.textLight,
    fontSize: 24,
    textAlign: "center",
  },
});
