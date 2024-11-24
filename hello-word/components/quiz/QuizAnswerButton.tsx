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

  const getButtonClasses = () => {
    const baseClasses =
      "w-[45%] bg-gray-50 py-5 px-5 rounded-lg justify-center";

    if (highlighted === "correct") {
      return `${baseClasses} bg-green-500 border-b-0`;
    }
    if (highlighted === "incorrect") {
      return `${baseClasses} bg-red-500 border-b-0`;
    }

    return baseClasses;
  };

  const getTextClasses = () => {
    const baseClasses = "text-gray-900 text-base text-center font-mediumSy";

    if (highlighted === "correct" || highlighted === "incorrect") {
      return `${baseClasses} text-white`;
    }

    return baseClasses;
  };

  const disabled = useMemo(() => {
    return !!(
      quiz.highlightedAnswers.incorrectAnswerId ||
      quiz.highlightedAnswers.correctAnswerId
    );
  }, [quiz.highlightedAnswers]);

  return (
    <Pressable
      className={getButtonClasses()}
      onPress={props.onPress}
      disabled={disabled}
    >
      <Text className={getTextClasses()}>{props.label}</Text>
    </Pressable>
  );
}
