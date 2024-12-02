import { SafeAreaView, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { Suspense, useCallback, useEffect, useMemo } from "react";
import { LANG_EN, LANG_PL, QUIZ_LANGUAGES } from "@/constants/common";
import QuizLoading from "@/components/quiz/QuizLoading";
import { useQuizStore } from "@/state/quiz.state";
import { ErrorBoundary } from "react-error-boundary";
import Quiz from "@/components/quiz/Quiz";

export default function () {
  const { setQuizLanguages, reset } = useQuizStore();
  const searchParams = useLocalSearchParams<{
    sourceLangCode: string;
    targetLangCode: string;
  }>();

  const headerTitle = useMemo(() => {
    const fromLanguage = QUIZ_LANGUAGES.find(
      (lang) => searchParams.sourceLangCode === lang.code,
    );
    const toLanguage = QUIZ_LANGUAGES.find(
      (lang) => searchParams.targetLangCode === lang.code,
    );
    return `Quiz ${fromLanguage?.label} - ${toLanguage?.label}`;
  }, [searchParams.targetLangCode, searchParams.sourceLangCode]);

  useEffect(() => {
    const sourceLangByCode = QUIZ_LANGUAGES.find(
      (lang) => lang.code === searchParams.sourceLangCode,
    );
    const targetLangByCode = QUIZ_LANGUAGES.find(
      (lang) => lang.code === searchParams.targetLangCode,
    );
    setQuizLanguages(sourceLangByCode || LANG_PL, targetLangByCode || LANG_EN);
  }, [searchParams.targetLangCode, searchParams.sourceLangCode]);

  const ErrorComponent = useCallback(
    () => (
      <View>
        <Text className={"text-center text-red-500"}>There was an error</Text>
      </View>
    ),
    [],
  );

  return (
    <View className="bg-white">
      <SafeAreaView>
        <View className="h-full bg-white">
          <Stack.Screen
            options={{ headerTitleAlign: "center", title: headerTitle }}
          ></Stack.Screen>
          <ErrorBoundary
            fallback={<ErrorComponent />}
            onError={(error, info) => console.log("error", error, info)}
          >
            <Suspense fallback={<QuizLoading />}>
              <Quiz />
            </Suspense>
          </ErrorBoundary>
        </View>
      </SafeAreaView>
    </View>
  );
}
