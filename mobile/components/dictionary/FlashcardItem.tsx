import { Text, TouchableOpacity, View } from "react-native";
import { isContrastLight } from "@/utils/color";
import React, { memo, useEffect, useMemo } from "react";
import { FlashcardBrief } from "@/core/api/models/flashcard";

interface FlashcardItemProps {
  flashcard: FlashcardBrief;
}

export default memo(function ({ flashcard }: FlashcardItemProps) {
  const textColor = useMemo(
    () => (isContrastLight(flashcard.color) ? "text-black" : "text-white"),
    [flashcard],
  );

  useEffect(() => {
    console.log(textColor);
  }, [textColor]);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: `${flashcard.color}`,
      }}
      className={
        "m-2 h-36 max-w-[30%] flex-1 p-4 rounded-lg mb-4 justify-between"
      }
    >
      <Text className={` ${textColor} font-bold text-lg`}>
        {flashcard.name}
      </Text>
      <View className={"items-end"}>
        <Text className={`${textColor} text-sm font-semibold`}>
          Słowa: {flashcard.wordQty}
        </Text>
      </View>
    </TouchableOpacity>
  );
});
