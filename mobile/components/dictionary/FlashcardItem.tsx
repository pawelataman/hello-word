import { Text, View } from "react-native";
import React, { memo, useMemo } from "react";
import { FlashcardBrief } from "@/core/api/models/flashcard";
import { COLORS } from "@/core/constants/tailwind-colors";
import { isContrastLight } from "@/utils/color";

interface FlashcardItemProps {
  flashcard: FlashcardBrief;
  isSelected: boolean;
}

export default memo(function ({ flashcard, isSelected }: FlashcardItemProps) {
  const textLight = isContrastLight(flashcard.color);

  const textColor = useMemo(() => {
    if (isSelected) {
      return textLight ? COLORS.black : COLORS.white;
    }
    return COLORS.black;
  }, [textLight, isSelected]);

  const getDateFormatted = (date: Date) => {
    return new Date(date).toLocaleDateString("uk");
  };
  return (
    <View
      style={{
        borderColor: flashcard.color,
        backgroundColor: isSelected ? flashcard.color : COLORS.white,
      }}
      className={"m-2 flex-1 p-4 border-x-[6px] gap-2 rounded-xl"}
    >
      <Text style={{ color: textColor }} className={` font-bold text-xl`}>
        {flashcard.name}
      </Text>
      <View className={"items-start justify-between flex-row"}>
        <Text
          style={{
            color: textColor,
          }}
          className={"text-black text-m font-semibold"}
        >
          Słowa: {flashcard.wordQty}
        </Text>

        <Text
          style={{
            color: textColor,
          }}
        >
          {getDateFormatted(flashcard.createdAt)}
        </Text>
      </View>
    </View>
  );
});
