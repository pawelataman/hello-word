import { Text, View } from "react-native";
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
    <View
      style={{
        backgroundColor: `${flashcard.color}`,
      }}
      className={"m-2 flex-1 p-4  gap-2 rounded-xl"}
    >
      <Text className={` ${textColor} font-bold text-xl`}>
        {flashcard.name}
      </Text>
      <View className={"items-start "}>
        <Text className={`${textColor} text-m font-semibold`}>
          Słowa: {flashcard.wordQty}
        </Text>
      </View>
    </View>
  );
});
