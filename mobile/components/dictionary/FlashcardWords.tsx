import React from "react";
import { DictionaryWord } from "@/core/api/models/dictionary";
import { FlatList, Text, View } from "react-native";
import DictionaryItem from "@/components/dictionary/DictionaryItem";
import AppButton from "@/components/ui/AppButton";
import { useRouter } from "expo-router";

interface FlashcardWordsProps {
  words: DictionaryWord[];
}

export default function ({ words }: FlashcardWordsProps) {
  const router = useRouter();
  const navigateAddFlashcardWords = () => {
    router.navigate(
      "/(home)/main/dictionary/new-flashcard/add-flashcards-words",
    );
  };

  return (
    <>
      {words.length ? (
        <FlatList
          data={words}
          renderItem={({ item, index }) => (
            <View key={item.id}>
              <DictionaryItem isSelected={false}>
                <Text className={"text-xl font-bold"}>{item["pl"]}</Text>
                <Text className={"text-lg text-gray-500"}>{item["en"]}</Text>
              </DictionaryItem>
            </View>
          )}
          keyExtractor={(word, index) => word.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : null}
      {!words.length && (
        <View className={"items-center justify-center"}>
          <Text className={"text-gray-500 font-semibold mb-4"}>
            Nie dodano żadnych słówek do fiszki
          </Text>
          <AppButton
            variant={"tertiary"}
            label={"Dodaj słówka +"}
            onPress={navigateAddFlashcardWords}
          />
        </View>
      )}
    </>
  );
}
