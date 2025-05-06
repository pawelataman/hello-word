import { Alert, Pressable, TouchableOpacity, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import React, { Suspense, useCallback, useMemo, useRef } from "react";
import QuizLoading from "@/components/quiz/QuizLoading";
import { ErrorBoundary } from "react-error-boundary";
import Quiz from "@/components/quiz/Quiz";
import ArrowLeft from "@/assets/images/icons/arrow_left.svg";
import { Portal } from "@gorhom/portal";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { bottomSheetBackdrop } from "@/components/ui/BottomSheetBackDrop";
import SettingsIcon from "@/components/ui/svg/SettingsIcon";
import QuizSettings from "@/components/quiz/QuizSettings";
import {
  selectNumOfQuestions,
  selectQuizStatus,
  useQuizStore,
} from "@/core/state/quiz.state";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import QuizErrorFallback from "@/components/quiz/QuizErrorFallback";

export default function () {
  const router = useRouter();
  const quizStatus = useQuizStore(selectQuizStatus);
  const { reset } = useQueryErrorResetBoundary();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const beforeNavigateBack = useCallback(() => {
    Alert.alert("", "Zakończyć quiz ?", [
      {
        text: "Anuluj",
        style: "cancel",
      },
      { text: "Zakończ", onPress: () => router.back() },
    ]);
  }, [router]);
  const { quizRunData } = useQuizStore();
  const numOfQuestions = useQuizStore(selectNumOfQuestions);

  const quizHeaderTitle = useMemo(() => {
    if (quizStatus === "ongoing") {
      return `${quizRunData.questionIndex + 1} / ${numOfQuestions}`;
    } else return "Koniec";
  }, [quizStatus, quizRunData]);

  return (
    <View className="bg-white">
      <View className="h-full bg-white">
        <Stack.Screen
          options={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackTitle: "",
            title: quizHeaderTitle,
            headerTintColor: "black",
            headerLeft: (props) => (
              <TouchableOpacity
                onPressOut={beforeNavigateBack}
                className={"pt-2"}
              >
                <ArrowLeft width={36} height={36} color={props.tintColor} />
              </TouchableOpacity>
            ),
            headerRight: (props) => (
              <Pressable
                onPressIn={() => {
                  console.log("Expamd");
                  bottomSheetRef.current?.expand();
                }}
                className="pr-4"
              >
                <SettingsIcon width={28} height={28} fill={props.tintColor} />
              </Pressable>
            ),
          }}
        ></Stack.Screen>
        <ErrorBoundary onReset={reset} FallbackComponent={QuizErrorFallback}>
          <Suspense fallback={<QuizLoading />}>
            <Quiz />

            <Portal>
              <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                backdropComponent={bottomSheetBackdrop}
                handleComponent={null}
              >
                <BottomSheetView>
                  <QuizSettings />
                </BottomSheetView>
              </BottomSheet>
            </Portal>
          </Suspense>
        </ErrorBoundary>
      </View>
    </View>
  );
}
