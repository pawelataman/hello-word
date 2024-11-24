import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { HighlightedAnswers, Quiz, QuizStatus } from "@/models/models";
import { QUIZ_INITIAL } from "@/constants/quiz";
import { QuizQuestion, QuizResponse, Word } from "@/api/models/quiz";
import { shuffle } from "@/utils/array";

interface QuizHookProps {
  quiz: QuizResponse;
  sourceLangCode: string;
  targetLangCode: string;
}

export function useQuiz(props: QuizHookProps): Quiz {
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [highlightedAnswers, setHighlightedAnswers] =
    useState<HighlightedAnswers>(QUIZ_INITIAL.highlightedAnswers);
  const points = useRef<{ current: number; total: number }>({
    current: 0,
    total: props.quiz.questions.length,
  });
  const currentQuestion = useMemo<QuizQuestion | null>(() => {
    const current = props.quiz.questions[questionIndex];
    if (current) {
      return { ...current, answers: shuffle(current.answers) };
    }
    return null;
  }, [questionIndex]);

  const quizStatus = useMemo<QuizStatus>(() => {
    return questionIndex > props.quiz.questions.length - 1
      ? "finished"
      : "ongoing";
  }, [questionIndex]);

  const addPoint = (pointsToAdd: number) => {
    points.current = {
      ...points.current,
      current: points.current.current + pointsToAdd,
    };
  };

  const handleAnswer = (answer: Word) => {
    if (!currentQuestion) return;

    let correctAnswerId: number | null = null;
    let incorrectAnswerId: number | null = null;
    let timeout = 2000;

    if (answer.id === currentQuestion.question.id) {
      correctAnswerId = answer.id;
      addPoint(1);
      timeout = 1500;
    } else {
      incorrectAnswerId = answer.id;
      correctAnswerId = currentQuestion.question.id;
    }
    setHighlightedAnswers({ incorrectAnswerId, correctAnswerId });

    setTimeout(() => {
      setHighlightedAnswers({ incorrectAnswerId: null, correctAnswerId: null });
      setQuestionIndex((prev) => prev + 1);
    }, timeout);
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
    points: points.current,
    quizStatus,
  };
}
