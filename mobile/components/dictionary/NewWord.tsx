import ReanimatedSwipeable from "react-native-gesture-handler/src/components/ReanimatedSwipeable";
import { Text, View } from "react-native";
import EN from "@/assets/images/icons/GB.svg";
import PL from "@/assets/images/icons/PL.svg";
import React from "react";
import RightAction from "@/components/dictionary/NewWordRightAction";
import LeftAction from "@/components/dictionary/NewWordLeftAction";
import { LANG_CODE } from "@/core/constants/common";
import { CreateWord } from "@/core/models/models";

interface NewWordProps {
  onDelete: (word: CreateWord) => void;
  onEdit: (word: CreateWord) => void;
  word: CreateWord;
}

export default function ({ onDelete, word, onEdit }: NewWordProps) {
  return (
    <ReanimatedSwipeable
      containerStyle={{ width: "100%" }}
      friction={2}
      shouldCancelWhenOutside={true}
      renderRightActions={(prog, drag, swipeable) => (
        <RightAction drag={drag} onAction={() => onDelete(word)} />
      )}
      renderLeftActions={(prog, drag, swipeable) => (
        <LeftAction drag={drag} onAction={() => onEdit(word)} />
      )}
    >
      <View
        className={
          "flex-row flex-wrap gap-4 p-4 mx-4  items-center rounded-xl justify-between bg-white "
        }
      >
        <View className={"flex-row gap-4 items-center"}>
          <EN width={24} height={16} />
          <Text className={"text-lg font-bold"}>{word[LANG_CODE.EN]}</Text>
        </View>

        <View className={"flex-row gap-4 items-center"}>
          <PL width={24} height={16} />
          <Text className={"text-xl font-bold"}>{word[LANG_CODE.PL]}</Text>
        </View>
      </View>
    </ReanimatedSwipeable>
  );
}
