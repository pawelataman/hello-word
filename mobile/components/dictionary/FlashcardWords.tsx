import React from "react";
import { DictionaryWord } from "@/core/api/models/dictionary";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import DictionaryItem from "@/components/dictionary/DictionaryItem";
import AppButton from "@/components/ui/AppButton";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "@/core/constants/tailwind-colors";

interface FlashcardWordsProps {
  words: DictionaryWord[];
}

export default function ({ words }: FlashcardWordsProps) {
  const router = useRouter();
  const navigateAddFlashcardWords = () => {
    router.navigate("/(home)/main/dictionary/flashcard/add-flashcards-words");
  };

  return (
    <View className={"flex-1"}>
      {words.length ? (
        <View className={"gap-2 flex-1"}>
          <View className={"flex-row items-center justify-between"}>
            <Text className={"text-center font-semibold text-xl"}>
              Słówka ({words.length})
            </Text>
            <TouchableOpacity
              onPress={navigateAddFlashcardWords}
              className={
                "bg-white px-4 py-2 rounded-full flex-row gap-2 items-center"
              }
            >
              <Text>Edytuj</Text>
              <AntDesign
                name={"edit"}
                color={COLORS.green["500"]}
                size={18}
              ></AntDesign>
            </TouchableOpacity>
          </View>

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
        </View>
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
    </View>
  );
}
