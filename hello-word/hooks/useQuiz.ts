import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { HighlightedAnswers, Quiz, QuizStatus } from "@/models/models";
import { QUIZ_INITIAL } from "@/constants/quiz";
import { QuizQuestion, QuizResponse, Word } from "@/core/api/models/quiz";
import { shuffle } from "@/utils/array";
import { useQuizStore } from "@/state/quiz.state";

interface QuizHookProps {
  quiz: QuizResponse;
}

export function useQuiz(props: QuizHookProps): Quiz {
  const router = useRouter();
  const quizStore = useQuizStore();
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
      timeout = 1500;
      addPoint(1);
      quizStore.addAnsweredQuestion(true);
    } else {
      incorrectAnswerId = answer.id;
      correctAnswerId = currentQuestion.question.id;
      quizStore.addAnsweredQuestion(false);
    }

    setHighlightedAnswers({ incorrectAnswerId, correctAnswerId });
    setTimeout(() => {
      setHighlightedAnswers({ incorrectAnswerId: null, correctAnswerId: null });
      setQuestionIndex((prev) => prev + 1);
    }, timeout);
  };

  const handleRestart = () => {
    quizStore.reset();
    router.replace({
      pathname: "/quiz",
      params: {
        sourceLangCode: quizStore.quizLanguages.source?.code,
        targetLangCode: quizStore.quizLanguages.target?.code,
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
//https://dictionaryapi.dev/?ref=freepublicapis.com
