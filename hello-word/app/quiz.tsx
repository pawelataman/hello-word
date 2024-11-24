import { StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { Suspense, useCallback, useMemo } from "react";
import { QUIZ_LANGUAGES } from "@/constants/common";
import { Colors } from "@/constants/Colors";
import Quiz from "@/components/quiz/Quiz";
import QuizLoading from "@/components/quiz/QuizLoading";
import { ErrorBoundary } from "react-error-boundary";

export default function () {
  const { sourceLangCode, targetLangCode } = useLocalSearchParams<{
    sourceLangCode: string;
    targetLangCode: string;
  }>();

  const headerTitle = useMemo(() => {
    const fromLanguage = QUIZ_LANGUAGES.find(
      (lang) => sourceLangCode === lang.code,
    );
    const toLanguage = QUIZ_LANGUAGES.find(
      (lang) => targetLangCode === lang.code,
    );
    return `Quiz ${fromLanguage?.label} - ${toLanguage?.label}`;
  }, [sourceLangCode, targetLangCode]);

  const ErrorComponent = useCallback(
    () => (
      <View>
        <Text>There was an error</Text>
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ headerTitleAlign: "center", title: headerTitle }}
      ></Stack.Screen>

      <Suspense fallback={<QuizLoading />}>
        <ErrorBoundary fallback={<ErrorComponent />}>
          <Quiz
            sourceLangCode={sourceLangCode}
            targetLangCode={targetLangCode}
          ></Quiz>
        </ErrorBoundary>
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.light.white,
  },
});