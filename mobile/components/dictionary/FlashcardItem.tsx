import { Text, TouchableOpacity, View } from "react-native";
import { isContrastLight } from "@/utils/color";
import React, { memo, useMemo } from "react";
import { FlashcardBrief } from "@/core/api/models/flashcard";

interface FlashcardItemProps {
  flashcard: FlashcardBrief;
}

export default memo(function ({ flashcard }: FlashcardItemProps) {
  const textColor = useMemo(
    () => (isContrastLight(flashcard.color) ? "text-black" : "text-white"),
    [flashcard],
  );

  return (
    <TouchableOpacity
      style={{ backgroundColor: flashcard.color }}
      className={"m-2 h-36 flex-1 p-4 rounded-lg mb-4 justify-between"}
    >
      <Text className={` ${textColor} font-bold text-m`}>{flashcard.name}</Text>
      <View className={"items-end"}>
        <Text className={`${textColor} text-lg font-semibold`}>
          {Math.round(Math.random() * 100)} słów
        </Text>
      </View>
    </TouchableOpacity>
  );
});
