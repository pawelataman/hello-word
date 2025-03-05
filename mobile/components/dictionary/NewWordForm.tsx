import ReanimatedSwipeable from "react-native-gesture-handler/src/components/ReanimatedSwipeable";
import { Keyboard, TouchableOpacity, View } from "react-native";
import RegularInput from "@/components/ui/inputs/RegularInput";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import RightAction from "@/components/dictionary/NewWordRightAction";
import { useController, useForm } from "react-hook-form";
import { LanguageCode } from "@/core/constants/common";
import { CreateWord } from "@/core/models/models";

interface NewWordFormProps {
  onDelete: (word: CreateWord) => void;
  word: CreateWord;
  onSubmit: (word: CreateWord) => void;
}

export default function ({ onDelete, word, onSubmit }: NewWordFormProps) {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<{ en: string; pl: string }>({
    mode: "onChange",
  });

  const { field: enField } = useController({
    name: "en",
    rules: {
      minLength: 1,
      required: true,
    },
    control,
    defaultValue: word.en,
  });

  const { field: plField } = useController({
    name: "pl",
    control,
    rules: {
      minLength: 1,
      required: true,
    },
    defaultValue: word.pl,
  });

  const submitWord = () => {
    if (isValid) {
      Keyboard.dismiss();
      onSubmit({
        ...word,
        [LanguageCode.EN]: enField.value.trim(),
        [LanguageCode.PL]: plField.value.trim(),
      });
    }
  };

  return (
    <ReanimatedSwipeable
      containerStyle={{ width: "100%" }}
      friction={2}
      renderRightActions={(prog, drag, swipeable) => (
        <RightAction drag={drag} onAction={() => onDelete(word)} />
      )}
    >
      <View className={"flex-row gap-4 mx-4 items-center"}>
        <RegularInput
          value={enField.value}
          onChangeText={enField.onChange}
          autoFocus={true}
          className={"flex-1 font-normal text-xl placeholder:text-gray-300"}
          placeholder={"Angielski"}
        />
        <RegularInput
          value={plField.value}
          onChangeText={plField.onChange}
          className={"flex-1 font-normal text-xl placeholder:text-gray-300"}
          placeholder={"Polski"}
        />
        <TouchableOpacity
          onPress={handleSubmit(submitWord)}
          className={`bg-green-500 p-2 rounded-xl ${!isValid && "opacity-20"}`}
          disabled={!isValid}
        >
          <AntDesign
            name={"check"}
            style={{ fontSize: 24, color: "#ffffff" }}
          />
        </TouchableOpacity>
      </View>
    </ReanimatedSwipeable>
  );
}
