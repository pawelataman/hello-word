import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { HttpClientContext } from "@/core/context/client-context";
import { useQuery } from "@tanstack/react-query";
import DictionaryItem from "@/components/dictionary/DictionaryItem";
import AppButton from "@/components/ui/AppButton";
import { MIN_WORDS_QTY } from "@/core/constants/quiz";
import { PencilSimple, SpeakerHigh } from "phosphor-react-native";
import { COLORS } from "@/core/constants/tailwind-colors";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { bottomSheetBackdrop } from "@/components/ui/BottomSheetBackDrop";
import { Portal } from "@gorhom/portal";
import QuizStarter from "@/components/quiz/QuizStarter.";
import { LanguageCode } from "@/core/constants/common";
import { QuizMode } from "@/core/models/models";
import { useQuizStore } from "@/core/state/quiz.state";
import * as Speech from "expo-speech";
import { useRefetchOnFocus } from "@/core/hooks/useRefetchOnFocus";

export default function () {
  const [quizStarterKey, setQuizStarterKey] = useState(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { setQuizMetadata } = useQuizStore();
  const { getFlashcardDetails } = useContext(HttpClientContext)!;
  const { data, isPending, isRefetching, refetch } = useQuery({
    queryKey: [id, "get-flashcard-details"],
    queryFn: ({ queryKey }) => getFlashcardDetails(parseInt(queryKey[0])),
  });

  useRefetchOnFocus(refetch);

  const getDate = useCallback((date: Date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("uk");
  }, []);

  const navigateToEdit = useCallback(() => {
    router.navigate({
      pathname: "/(home)/main/flashcard/flashcard-brief",
      params: { flashcardId: data!.id },
    });
  }, [data]);

  const canStartQuiz = useMemo(() => {
    return data && data.wordQty > MIN_WORDS_QTY;
  }, [data]);

  const onInvokeQuizStarter = useCallback(() => {
    if (!canStartQuiz) return;
    setQuizStarterKey((prev) => prev + 1);
    bottomSheetRef.current?.expand();
  }, [data, canStartQuiz]);

  const withOpacity = (colorHex: string) => `${colorHex}55`;

  const onStartQuiz = (mode: QuizMode, language: LanguageCode) => {
    bottomSheetRef.current?.close();
    setQuizMetadata({
      mode,
      language,
      flashcardsIds: [data!.id],
    });
    router.push({
      pathname: "/quiz",
    });
  };

  const playbackWord = async (word: string) => {
    if (await Speech.isSpeakingAsync()) return;

    Speech.speak(word, {
      language: LanguageCode.EN,
      rate: 0.5,
      onDone: () => {},
    });
  };
  return (
    <>
      <SafeAreaView className="h-full">
        <Stack.Screen options={{ title: "Fiszka" }} />
        {!isPending && (
          <>
            <Stack.Screen options={{ title: data?.name }} />
            <View className="bg-gray-100 p-4 rounded-3xl gap-4 flex-1">
              <View
                className={"bg-white gap-2 p-4 rounded-xl"}
                style={{ backgroundColor: withOpacity(data!.color) }}
              >
                <View className={"mb-4 flex-row justify-between items-center"}>
                  <Text className={"font-semibold text-xl"}>{data!.name}</Text>
                  <TouchableOpacity
                    onPress={navigateToEdit}
                    className={
                      "bg-white/30 text-white rounded-xl p-2 flex-row justify-center"
                    }
                  >
                    <PencilSimple
                      color={COLORS.white}
                      weight="bold"
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
                <Text className={"text-m"}>
                  <Text className={"text-gray-500"}>Autor:</Text> {data!.author}
                </Text>
                <Text className={"text-m"}>
                  <Text className={"text-gray-500"}>Data utworzenia: </Text>{" "}
                  {getDate(data!.createdAt)}
                </Text>
                <Text className={"text-m"}>
                  <Text className={"text-gray-500"}>
                    Ostatnia aktualizacja:{" "}
                  </Text>
                  {getDate(data!.createdAt)}
                </Text>
              </View>

              <View>
                <AppButton
                  variant={"primary"}
                  label={"Zacznij quiz!"}
                  onPress={onInvokeQuizStarter}
                  disabled={!canStartQuiz}
                />
                {!canStartQuiz ? (
                  <Text className={"text-center text-xs text-gray-500"}>
                    Nie wystarczająca ilość słowek aby rozpoczać quiz.
                  </Text>
                ) : null}
              </View>

              <View>
                <Text className={"mt-4 text-lg font-bold"}>
                  Słówka ({data!.wordQty}):{" "}
                </Text>
              </View>
              {data!.words.length ? (
                <FlatList
                  data={data!.words}
                  renderItem={({ item, index }) => (
                    <View
                      key={item.id}
                      className={"my-1.5 flex-row gap-2 items-center"}
                    >
                      <View className={"flex-1"}>
                        <DictionaryItem isSelected={false}>
                          <Text className={"text-xl font-bold"}>
                            {item["pl"]}
                          </Text>
                          <Text className={"text-lg text-gray-500"}>
                            {item["en"]}
                          </Text>
                        </DictionaryItem>
                      </View>
                      <TouchableOpacity
                        onPress={() => playbackWord(item["en"])}
                        className={"bg-white p-1.5 rounded-xl"}
                      >
                        <SpeakerHigh color={COLORS["green"]["500"]} />
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(word, index) => word.id.toString()}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <>
                  <Text
                    className={
                      "text-center font-semibold text-lg text-gray-500"
                    }
                  >
                    Edytuj aby dodać słówka do fiszki.
                  </Text>
                </>
              )}
            </View>
          </>
        )}

        {(isPending || isRefetching) && (
          <View className="bg-gray-100/50 absolute top-0 bottom-0 left-0 right-0 h-full w-full items-center justify-center gap-4">
            <ActivityIndicator size="small" color="#22c55e" />
          </View>
        )}
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
      </SafeAreaView>
    </>
  );
}
