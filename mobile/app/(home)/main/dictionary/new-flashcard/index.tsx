import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useController, useForm } from "react-hook-form";
import RegularInput from "@/components/ui/inputs/RegularInput";
import React, { useCallback, useContext, useMemo, useState } from "react";
import FlashcardColorPicker from "@/components/dictionary/FlashcardColorPicker";
import FlashcardWords from "@/components/dictionary/FlashcardWords";
import AppButton from "@/components/ui/AppButton";
import { NewFlashcardWordsContext } from "@/core/context/new-flashcard-words-context";
import { HttpClientContext } from "@/core/context/client-context";
import { useMutation } from "@tanstack/react-query";
import {
  CreateFlashcardRequest,
  CreateFlashcardResponse,
} from "@/core/api/models/flashcard";

interface FlashcardForm {
  flashcardName: string;
  flashcardColor: string;
}
export default function () {
  const { control, formState, handleSubmit } = useForm<FlashcardForm>();
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
  const { selectedWordsArr } = useContext(NewFlashcardWordsContext)!;
  const [showModal, setShowModal] = useState(false);
  const onSelectColor = (newColor?: string) => {
    if (newColor) {
      color.onChange(newColor);
    }
    setShowModal(false);
  };

  const isValid = useMemo(() => formState.isValid, [formState]);

  const onSubmitFlashcard = useCallback(
    (data: FlashcardForm) => {
      const request: CreateFlashcardRequest = {
        flashcardColor: data.flashcardColor,
        flashcardName: data.flashcardName,
        wordsIds: selectedWordsArr.map((selectedWord) => selectedWord.id),
      };
      mutate(request);
    },
    [selectedWordsArr],
  );

  const { createFlashcard } = useContext(HttpClientContext)!;
  const { mutate, isPending } = useMutation({
    mutationFn: createFlashcard,
    onSuccess: (data: CreateFlashcardResponse) => {
      console.log(data);
    },
  });
  return (
    <SafeAreaView className={"h-full"}>
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
      <View className={"bg-gray-100 p-4 rounded-3xl gap-4 flex-1"}>
        <FlashcardWords words={selectedWordsArr} />
      </View>
      <AppButton
        label={"Zapisz fiszke"}
        variant={"primary"}
        className={"mx-4"}
        disabled={!isValid}
        onPress={handleSubmit(onSubmitFlashcard)}
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
      {isPending ? (
        <View className=" bg-gray-100/50 absolute top-0 bottom-0 left-0 right-0  h-full w-full items-center justify-center gap-4">
          <ActivityIndicator size="small" color={"#22c55e"} />
        </View>
      ) : null}
    </SafeAreaView>
  );
}
