import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useContext, useMemo } from "react";
import { QuizContext } from "@/context/quiz-context";
import { HighlightMode } from "@/models/models";

interface AnswerButtonProps {
  onPress: (ev: GestureResponderEvent) => void;
  label: string;
  id: number;
}

export default function (props: AnswerButtonProps) {
  const quiz = useContext(QuizContext);
  const highlighted = useMemo<HighlightMode | null>(() => {
    if (props.id === quiz.highlightedAnswers.correctAnswerId) return "correct";
    if (props.id === quiz.highlightedAnswers.incorrectAnswerId) {
      return "incorrect";
    }
    return null;
  }, [quiz.highlightedAnswers]);
  const getButtonStyle = () => {
    return [
      styles.button,

      highlighted === "correct" ? styles.buttonCorrect : {},
      highlighted === "incorrect" ? styles.buttonWrong : {},
    ];
  };

  const getTextStyle = () => {
    return [
      styles.text,
      highlighted === "correct" ? styles.textCorrect : {},
      highlighted === "incorrect" ? styles.textWrong : {},
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
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
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
    color: Colors.light.textDark,
    fontSize: 16,
    textAlign: "center",
  },
});
