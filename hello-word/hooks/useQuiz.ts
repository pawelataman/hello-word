import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { QuestionAnswer, QuizQuestion } from "@/api/models";
import { HighlightedAnswers, Quiz } from "@/models/models";
import { QUIZ_INITIAL } from "@/constants/quiz";

interface QuizHookProps {
  questions: QuizQuestion[];
  sourceLangCode: string;
  targetLangCode: string;
}

export function useQuiz(props: QuizHookProps): Quiz {
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [points, setPoints] = useState<{ current: number; total: number }>({
    current: 0,
    total: props.questions.length,
  });
  const [highlightedAnswers, setHighlightedAnswers] =
    useState<HighlightedAnswers>(QUIZ_INITIAL.highlightedAnswers);
  const currentQuestion = useMemo(() => {
    return props.questions[questionIndex];
  }, [questionIndex]);

  const quizStatus = useMemo(() => {
    return questionIndex > props.questions.length - 1 ? "finished" : "ongoing";
  }, [questionIndex]);

  const handleAnswer = (answer: QuestionAnswer) => {
    let correctAnswerId: string = "";
    let incorrectAnswerId: string = "";

    if (answer.id === currentQuestion?.correctAnswerId) {
      correctAnswerId = answer.id;
      setPoints((prev) => ({ ...prev, current: prev.current + 1 }));
    } else {
      incorrectAnswerId = answer.id;
      correctAnswerId = currentQuestion!.correctAnswerId;
    }
    setHighlightedAnswers({ incorrectAnswerId, correctAnswerId });

    setTimeout(() => {
      setHighlightedAnswers({ incorrectAnswerId: "", correctAnswerId: "" });
      setQuestionIndex((prev) => prev + 1);
    }, 1000);
  };

  const handleRestart = () => {
    router.replace({
      pathname: "/quiz",
      params: {
        sourceLangCode: props.sourceLangCode,
        targetLangCode: props.targetLangCode,
      },
    });
  };

  return {
    handleAnswer,
    handleRestart,
    currentQuestion,
    highlightedAnswers,
    points,
    quizStatus,
  };
}
