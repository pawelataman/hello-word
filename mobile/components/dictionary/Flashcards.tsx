import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useClient } from "@/core/hooks/useClient";
import { useQuery } from "@tanstack/react-query";
import AppButton from "@/components/ui/AppButton";
import { useRouter } from "expo-router";
import React, { memo, useCallback, useRef, useState } from "react";
import FlashcardItem from "@/components/dictionary/FlashcardItem";
import { FlashcardBrief } from "@/core/api/models/flashcard";
import { Portal } from "@gorhom/portal";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { bottomSheetBackdrop } from "@/components/ui/BottomSheetBackDrop";
import QuizStarter from "@/components/quiz/QuizStarter.";
import { QuizMode } from "@/core/models/models";
import { LanguageCode } from "@/core/constants/common";
import { useQuizStore } from "@/core/state/quiz.state";
import { useRefetchOnFocus } from "@/core/hooks/useRefetchOnFocus";

export default memo(function () {
  const [quizStarterKey, setQuizStarterKey] = useState(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { getFlashcards } = useClient();
  const { data, refetch, isLoading, isRefetching } = useQuery({
    queryKey: ["get-flashcards"],
    queryFn: () => getFlashcards(),
  });
  const router = useRouter();
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [selectedFlashcards, setSelectedFlashcards] = useState<{
    [key: number]: FlashcardBrief;
  }>({});
  const { setQuizMetadata } = useQuizStore();
  const navigateAddFlashcards = () => {
    router.navigate("/(home)/main/flashcard/flashcard-brief");
  };

  useRefetchOnFocus(refetch);

  const onFlashcardPressed = (flashcard: FlashcardBrief) => {
    if (selectMode) {
      selectFlashcard(flashcard);
    } else {
      router.navigate({
        pathname: `/(home)/main/flashcard/[id]`,
        params: {
          id: flashcard.id,
        },
      });
    }
  };

  const selectFlashcard = useCallback(
    (flashcard: FlashcardBrief) => {
      const newSelectedFlashcards = { ...selectedFlashcards };
      if (newSelectedFlashcards[flashcard.id]) {
        delete newSelectedFlashcards[flashcard.id];
      } else {
        newSelectedFlashcards[flashcard.id] = flashcard;
      }
      setSelectedFlashcards(newSelectedFlashcards);
    },
    [selectedFlashcards, setSelectedFlashcards]
  );

  const onLongPressFlashcard = useCallback(
    (flashcard: FlashcardBrief) => {
      setSelectMode(true);
      selectFlashcard(flashcard);
    },
    [setSelectMode, selectFlashcard]
  );

  const isFlashcardSelected = useCallback(
    (flashcard: FlashcardBrief): boolean => {
      return Boolean(selectedFlashcards[flashcard.id]);
    },
    [selectedFlashcards]
  );

  const onResetSelection = useCallback(() => {
    setSelectMode(false);
    setSelectedFlashcards({});
  }, []);

  const onStartQuiz = (mode: QuizMode, language: LanguageCode) => {
    bottomSheetRef.current?.forceClose();

    setQuizMetadata({
      mode,
      language,
      flashcardsIds: Object.keys(selectedFlashcards).map((key) =>
        parseInt(key)
      ),
    });

    onResetSelection();
    router.navigate("/(home)/quiz");
  };

  const showQuizStarter = () => {
    setQuizStarterKey((prev) => prev + 1);

    bottomSheetRef.current?.expand();
  };

  return (
    <View className={"flex-1  py-6 gap-2"}>
      {data && data.length ? (
        <>
          <FlatList
            className={""}
            data={data}
            numColumns={1}
            refreshing={isRefetching}
            onRefresh={refetch}
            renderItem={({ item }) => (
              <TouchableOpacity
                onLongPress={() => onLongPressFlashcard(item)}
                onPress={() => onFlashcardPressed(item)}
              >
                <FlashcardItem
                  flashcard={item}
                  isSelected={isFlashcardSelected(item)}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(flashcard, index) => flashcard.id.toString()}
            showsVerticalScrollIndicator={false}
          />
          <Portal>
            <BottomSheet
              ref={bottomSheetRef}
              index={-1}
              backdropComponent={bottomSheetBackdrop}
              handleComponent={null}
            >
              <BottomSheetView>
                <QuizStarter key={quizStarterKey} onStartQuiz={onStartQuiz} />
              </BottomSheetView>
            </BottomSheet>
          </Portal>
          {!selectMode ? (
            <View className="px-2">
              <AppButton
                variant={"primary"}
                label={"Dodaj fiszkę +"}
                onPress={navigateAddFlashcards}
              />
            </View>
          ) : (
            <View className={"flex-row gap-2 justify-center px-2"}>
              <AppButton
                className={"flex-1"}
                variant={"tertiary"}
                label={"Anuluj"}
                onPress={onResetSelection}
              />
              <AppButton
                className={"flex-1"}
                variant={"primary"}
                label={"Rozpocznij quiz"}
                onPress={showQuizStarter}
              />
            </View>
          )}
        </>
      ) : (
        <View className={"items-center justify-center h-4/5"}>
          <Text className={"text-gray-500 font-semibold mb-4"}>
            Nie znaleziono żadnych fiszek
          </Text>
          <AppButton
            variant={"primary"}
            label={"Dodaj nowe fiszki +"}
            onPress={navigateAddFlashcards}
          />
        </View>
      )}
      {isLoading || isRefetching ? (
        <View className=" bg-gray-100/50 absolute top-0 bottom-0 left-0 right-0  h-full w-full items-center justify-center gap-4">
          <ActivityIndicator size="small" color={"#22c55e"} />
        </View>
      ) : null}
    </View>
  );
});
