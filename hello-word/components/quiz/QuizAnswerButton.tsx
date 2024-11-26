import { GestureResponderEvent, Pressable, Text } from "react-native";
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
    if (props.id === quiz.highlightedAnswers.incorrectAnswerId)
      return "incorrect";
    return null;
  }, [quiz.highlightedAnswers]);

  const getHighlightColor = () => {
    if (highlighted === "correct") {
      return `bg-green-500`;
    }
    if (highlighted === "incorrect") {
      return `bg-red-500`;
    }
    return "bg-gray-100";
  };

  const getTextColor = () => {
    if (highlighted === "correct" || highlighted === "incorrect") {
      return `text-white`;
    }
    return "text-gray-900";
  };

  const disabled = useMemo(() => {
    return !!(
      quiz.highlightedAnswers.incorrectAnswerId ||
      quiz.highlightedAnswers.correctAnswerId
    );
  }, [quiz.highlightedAnswers]);

  return (
    <Pressable
      className={`${getHighlightColor()} w-[45%] h-32 py-5 px-5 rounded-lg justify-center }`}
      onPress={props.onPress}
      disabled={disabled}
    >
      <Text className={`${getTextColor()} text-xl text-center font-medium`}>
        {props.label}
      </Text>
    </Pressable>
  );
}
