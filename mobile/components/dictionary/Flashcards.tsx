import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useClient } from "@/core/hooks/useClient";
import { useQuery } from "@tanstack/react-query";
import AppButton from "@/components/ui/AppButton";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import Search from "@/components/ui/inputs/Search";
import { debounce } from "@/utils/timing";
import { useRefetchOnFocus } from "@/core/hooks/useRefetchOnFocus";
import FlashcardItem from "@/components/dictionary/FlashcardItem";
import { FlashcardBrief } from "@/core/api/models/flashcard";

export default function () {
  const { getFlashcards } = useClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["get-flashcards"],
    queryFn: () => getFlashcards(),
  });
  useRefetchOnFocus(refetch);
  const router = useRouter();
  const [search, setSearch] = useState("");

  const navigateAddFlashcards = () => {
    router.navigate("/(home)/main/dictionary/flashcard");
  };

  const onFlashcardPressed = (flashcard: FlashcardBrief) => {
    router.navigate({
      pathname: `/(home)/main/dictionary/flashcard/[id]`,
      params: {
        id: flashcard.id,
      },
    });
  };
  return (
    <View className={"flex-1 p-2 gap-2"}>
      <View className={"flex-row"}>
        <Search
          onChangeText={debounce(setSearch, 500)}
          placeholder={"Wyszukaj fiszki"}
        ></Search>
      </View>

      {data && data.length ? (
        <>
          <FlatList
            className={"py-2"}
            data={data}
            numColumns={1}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onFlashcardPressed(item)}>
                <FlashcardItem flashcard={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(flashcard, index) => flashcard.id.toString()}
            showsVerticalScrollIndicator={false}
          />
          <View>
            <AppButton
              variant={"primary"}
              label={"Dodaj fiszkę +"}
              onPress={navigateAddFlashcards}
            />
          </View>
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
    </View>
  );
}
