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
import { useRefetchOnFocus } from "@/core/hooks/useRefetchOnFocus";
import AppButton from "@/components/ui/AppButton";
import { MIN_WORDS_QTY } from "@/core/constants/quiz";
import { PencilSimple } from "phosphor-react-native";
import { COLORS } from "@/core/constants/tailwind-colors";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { bottomSheetBackdrop } from "@/components/ui/BottomSheetBackDrop";
import { Portal } from "@gorhom/portal";
import QuizStarter from "@/components/quiz/QuizStarter.";

export default function () {
  const [quizStarterKey, setQuizStarterKey] = useState(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getFlashcardDetails } = useContext(HttpClientContext)!;
  const { data, isPending, refetch, isRefetching } = useQuery({
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
      pathname: "/(home)/main/dictionary/flashcard",
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

  // Function to reset QuizStarter when bottom sheet is closed
  const handleSheetClose = useCallback(() => {
    // We can increment the key when the sheet is closed to reset for next time
    setQuizStarterKey((prev) => prev + 1);
  }, []);

  return (
    <>
      <SafeAreaView className="h-full">
        <Stack.Screen options={{ title: "Fiszka" }} />
        {!isPending && (
          <>
            <Stack.Screen options={{ title: data?.name }} />
            <View className="bg-gray-100 p-4 rounded-3xl gap-4 flex-1">
              <View className={"bg-white gap-2 p-4 rounded-xl"}>
                <View className={"mb-4 flex-row justify-between items-center"}>
                  <Text className={"font-semibold text-xl"}>
                    Szczegóły fiszki
                  </Text>
                  <TouchableOpacity
                    onPress={navigateToEdit}
                    className={
                      "bg-green-500 text-white rounded-xl p-2 flex-row justify-center"
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
                  <Text className={"text-gray-500"}>Nazwa: </Text>
                  <Text>{data!.name}</Text>
                </Text>
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
                    <View key={item.id}>
                      <DictionaryItem isSelected={false}>
                        <Text className={"text-xl font-bold"}>
                          {item["pl"]}
                        </Text>
                        <Text className={"text-lg text-gray-500"}>
                          {item["en"]}
                        </Text>
                      </DictionaryItem>
                    </View>
                  )}
                  keyExtractor={(word, index) => word.id.toString()}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <Text
                  className={"text-center font-semibold text-lg text-gray-500"}
                >
                  Nie dodano żadnych słowek
                </Text>
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
              <QuizStarter key={quizStarterKey} />
            </BottomSheetView>
          </BottomSheet>
        </Portal>
      </SafeAreaView>
    </>
  );
}
