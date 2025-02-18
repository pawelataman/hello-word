import React from "react";
import { DictionaryWord } from "@/core/api/models/dictionary";
import { FlatList, Text, View } from "react-native";
import DictionaryItem from "@/components/dictionary/DictionaryItem";
import AppButton from "@/components/ui/AppButton";

interface FlashcardWordsProps {
  words: DictionaryWord[];
}

export default function ({ words }: FlashcardWordsProps) {
  const navigateAddFlashcardWords = () => {};

  return (
    <>
      {words.length && (
        <FlatList
          data={words}
          renderItem={({ item, index }) => (
            <View key={item.id}>
              <DictionaryItem>
                <Text className={"text-xl font-bold"}>{item["pl"]}</Text>
                <Text className={"text-lg text-gray-500"}>{item["en"]}</Text>
              </DictionaryItem>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
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
