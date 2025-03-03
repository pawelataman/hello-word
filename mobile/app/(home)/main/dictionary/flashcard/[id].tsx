import React, { useCallback, useContext } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { HttpClientContext } from "@/core/context/client-context";
import { useQuery } from "@tanstack/react-query";
import DictionaryItem from "@/components/dictionary/DictionaryItem";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "@/core/constants/tailwind-colors";
import { useRefetchOnFocus } from "@/core/hooks/useRefetchOnFocus";

export default function () {
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
                      "bg-green-500 text-white rounded-xl px-2 py-1 flex-row justify-center"
                    }
                  >
                    <Text className={"text-white font-bold"}>Edytuj </Text>
                    <Feather name={"edit"} size={16} color={COLORS.white} />
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
                  </Text>{" "}
                  {getDate(data!.createdAt)}
                </Text>
              </View>
              <Text className={"mt-4 text-lg font-bold"}>
                Słówka ({data!.wordQty}):{" "}
              </Text>
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
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
