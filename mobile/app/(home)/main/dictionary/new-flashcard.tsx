import {
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useController, useForm } from "react-hook-form";
import RegularInput from "@/components/ui/inputs/RegularInput";
import React, { useState } from "react";
import FlashcardColorPicker from "@/components/dictionary/FlashcardColorPicker";
import FlashcardWords from "@/components/dictionary/FlashcardWords";
import { DictionaryWord } from "@/core/api/models/dictionary";
import AppButton from "@/components/ui/AppButton";

export default function () {
  const { control } = useForm();
  const { field: flashcardName } = useController({
    name: "flashcardName",
    control,
    rules: {
      required: true,
      minLength: 1,
    },
  });

  const { field: color } = useController({
    name: "flashcardColor",
    control,
    rules: {
      required: true,
    },
    defaultValue: "#22c55e",
  });
  const [flashcardWords, setFlashcardWord] = useState<DictionaryWord[]>([]);
  const [showModal, setShowModal] = useState(false);
  const onSelectColor = (newColor?: string) => {
    if (newColor) {
      color.onChange(newColor);
    }
    setShowModal(false);
  };

  return (
    <SafeAreaView className={"gap-4"}>
      <View className={"gap-4 p-4"}>
        <RegularInput
          value={flashcardName.value}
          onChangeText={flashcardName.onChange}
          autoFocus={true}
          className={"font-normal text-xl placeholder:text-gray-300"}
          placeholder={"Nazwa fiszki"}
        />
        <View className={"flex-row items-center gap-4"}>
          <Text className={"font-semibold text-lg"}>Kolor fiszki: </Text>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={{ backgroundColor: color.value }}
            className={"w-14 h-10 rounded-md border-2 border-gray-200"}
          />
        </View>
      </View>
      <View className={"bg-white p-4 m-4 rounded-3xl gap-8"}>
        <Text className={"text-center font-semibold text-xl"}>
          Słówka ({flashcardWords.length})
        </Text>
        <FlashcardWords words={flashcardWords} />
      </View>
      <AppButton
        label={"Dodaj fiszke"}
        variant={"primary"}
        className={"mx-4"}
        onPress={() => {}}
      ></AppButton>

      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle={"pageSheet"}
      >
        <FlashcardColorPicker
          currentColor={color.value}
          onSelectColor={onSelectColor}
        />
      </Modal>
    </SafeAreaView>
  );
}
