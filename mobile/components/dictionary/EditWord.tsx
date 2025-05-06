import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import React, { useCallback } from "react";
import {
  DictionaryWord,
  UpdateWordRequest,
} from "@/core/api/models/dictionary";
import { TextInput } from "react-native-gesture-handler";
import NewWordForm from "./NewWordForm";
import { useController, useForm } from "react-hook-form";
import { LanguageCode } from "@/core/constants/common";
import RegularInput from "../ui/inputs/RegularInput";
import AppButton from "../ui/AppButton";

import EN from "@/assets/images/icons/GB.svg";
import PL from "@/assets/images/icons/PL.svg";
import { Trash } from "phosphor-react-native";
import { COLORS } from "@/core/constants/tailwind-colors";
import { useMutation } from "@tanstack/react-query";
import { useClient } from "@/core/hooks/useClient";
import { useToast } from "@/core/hooks/useToast";

interface EditWordProps {
  word: DictionaryWord;
  onSuccess: () => void;
}

export default function EditWord({ word, onSuccess }: EditWordProps) {
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
  const { showToast } = useToast();
  const { deleteWord, updateWord } = useClient();

  const {
    mutateAsync: deleteWordMutation,
    isPending: deleteWordMutationPending,
  } = useMutation({
    mutationFn: deleteWord,
    onSuccess: () => {
      onSuccess();
    },
    onError: () => {
      showToast("Nie udało się usunąć słówka", "error");
    },
  });

  const {
    mutateAsync: updateWordMutation,
    isPending: updateWordMutationPending,
  } = useMutation({
    mutationFn: (variables: { id: number; word: UpdateWordRequest }) =>
      updateWord(variables.id, variables.word),
    onSuccess: () => {
      onSuccess();
    },
    onError: () => {
      showToast("Nie udało się edytować słówka", "error");
    },
  });

  const submitWord = () => {
    if (isValid) {
      Alert.alert("Edytuj słówko", "Czy na pewno chcesz edytować słówko?", [
        {
          text: "Anuluj",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Edytuj",
          onPress: () => {
            Keyboard.dismiss();
            updateWordMutation({
              id: word.id,
              word: {
                pl: plField.value.trim().toLowerCase(),
                en: enField.value.trim().toLowerCase(),
              },
            });
          },
        },
      ]);
    }
  };

  const onDeleteWord = () => {
    Alert.alert("Usuń słówko", "Czy na pewno chcesz usunąć słówko?", [
      {
        text: "Anuluj",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Usuń",
        onPress: () => {
          Keyboard.dismiss();
          deleteWordMutation(word.id);
        },
      },
    ]);
  };
  return (
    <View className="p-4 gap-8 rounded-t-xl">
      <View className="flex-row justify-between items-center">
        <Text className="font-bold text-lg">Edytuj słowo</Text>
        <Pressable onPressIn={onDeleteWord}>
          <Text className="text-red-500 font-bold">Usuń</Text>
        </Pressable>
      </View>
      <View
        className={"flex-row gap-4  items-center bg-gray-100 p-4 rounded-xl"}
      >
        <View className="flex-1 gap-2">
          <View className="flex-row gap-2">
            <EN />
            <Text>Agielski</Text>
          </View>
          <RegularInput
            value={enField.value}
            onChangeText={enField.onChange}
            autoFocus={true}
            className={
              "bg-gray-100 font-normal text-xl placeholder:text-gray-300"
            }
            placeholder={"Angielski"}
          />
        </View>
        <View className="flex-1 gap-2">
          <View className="flex-row gap-2">
            <PL />
            <Text>Polski</Text>
          </View>
          <RegularInput
            value={plField.value}
            onChangeText={plField.onChange}
            className={"font-normal text-xl placeholder:text-gray-300"}
            placeholder={"Polski"}
          />
        </View>
      </View>
      <AppButton
        disabled={!isValid}
        label="Zapisz"
        onPress={handleSubmit(submitWord)}
        variant="primary"
      />
    </View>
  );
}
