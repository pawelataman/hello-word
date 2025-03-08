import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import RegularInput from "@/components/ui/inputs/RegularInput";
import FlashcardColorPicker from "@/components/dictionary/FlashcardColorPicker";
import FlashcardWords from "@/components/dictionary/FlashcardWords";
import AppButton from "@/components/ui/AppButton";
import { NewFlashcardWordsContext } from "@/core/context/new-flashcard-words-context";
import { HttpClientContext } from "@/core/context/client-context";
import { useExistingFlashcard } from "@/core/hooks/useExistingFlashcard";
import {
  CreateFlashcardRequest,
  CreateFlashcardResponse,
} from "@/core/api/models/flashcard";
import { useToast } from "@/core/hooks/useToast";
import { COLORS } from "@/core/constants/tailwind-colors";
import { Trash } from "phosphor-react-native";
import { extractApiErrorMessage } from "@/core/constants/api-errors";
import { ApiErrorCodes } from "@/core/models/error";

export default function FlashcardEditor() {
  const { showToast } = useToast();
  const { data: existingFlashcard, isPending: isLoadExisingPending } =
    useExistingFlashcard();
  const initialMode = existingFlashcard ? "edit" : "create";
  const [mode, setMode] = useState<"edit" | "create">(initialMode);
  const [flashcardData, setFlashcardData] = useState<{
    name: string;
    color: string;
  }>({ name: "", color: "#22c55e" });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const router = useRouter();
  const { selectedWordsArr, setSelectedWordsArr } = useContext(
    NewFlashcardWordsContext,
  )!;
  const { createFlashcard, updateFlashcard, deleteFlashcard } =
    useContext(HttpClientContext)!;

  const { refetch } = useQuery({
    queryKey: ["get-flashcards"],
    enabled: false,
  });

  useEffect(() => {
    if (existingFlashcard) {
      setMode("edit");
      setFlashcardData({
        name: existingFlashcard.name || "",
        color: existingFlashcard.color || "#22c55e",
      });

      if (
        existingFlashcard.words &&
        existingFlashcard.words.length > 0 &&
        setSelectedWordsArr
      ) {
        setSelectedWordsArr(existingFlashcard.words);
      } else {
        setSelectedWordsArr([]);
      }
    }
  }, [existingFlashcard]);

  const handleColorSelect = useCallback(
    (newColor?: string) => {
      if (newColor) {
        setFlashcardData({ ...flashcardData, color: newColor });
      }
      setShowColorPicker(false);
    },
    [flashcardData],
  );

  const handleNameChange = useCallback(
    (name: string) => {
      setFlashcardData({ ...flashcardData, name });
    },
    [flashcardData],
  );

  const createMutation = useMutation({
    mutationFn: createFlashcard,
    onSuccess: (_data: CreateFlashcardResponse) => {
      refetch();
      router.navigate({
        pathname: "/(home)/main/dictionary",
        params: {
          tabName: "flashcards",
        },
      });
    },
    onError: (error) => {
      showToast(
        extractApiErrorMessage(error.message as ApiErrorCodes),
        "error",
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateFlashcard,
    onSuccess: (_data: CreateFlashcardResponse) => {
      refetch();
      router.back();
    },
    onError: (error) => {
      showToast("Nie udało sie zaktualizować fiszki", "error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFlashcard,
    onSuccess: () => {
      refetch();
      router.navigate({
        pathname: "/(home)/main/dictionary",
        params: {
          tabName: "flashcards",
        },
      });
    },
    onError: (error) => {
      showToast("Nie udało się usunać fiszki", "error");
    },
  });

  const isPending =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending ||
    isLoadExisingPending;

  const handleSubmitFlashcard = useCallback(() => {
    const { name, color } = flashcardData;

    if (!name.trim()) {
      console.warn("Flashcard name is required");
      return;
    }

    const request: CreateFlashcardRequest = {
      flashcardColor: color,
      flashcardName: name,
      wordsIds: selectedWordsArr.map((selectedWord) => selectedWord.id),
    };

    if (mode === "edit" && existingFlashcard?.id) {
      updateMutation.mutate({ ...request, id: existingFlashcard!.id });
    } else {
      createMutation.mutate(request);
    }
  }, [
    selectedWordsArr,
    flashcardData,
    createMutation,
    updateMutation,
    mode,
    existingFlashcard?.id,
  ]);

  const submitButtonLabel =
    mode === "create" ? "Zapisz fiszke" : "Zapisz edycję";
  const isFormValid = flashcardData.name.trim().length > 0;

  if (!createFlashcard) {
    return (
      <SafeAreaView className="h-full items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const onDeleteFlashcard = useCallback(() => {
    Alert.alert("Usuń fiszkę", "Czy na pewno chcesz usunąć tę fiszkę?", [
      {
        text: "Anuluj",
        style: "cancel",
      },
      {
        text: "Usuń",
        onPress: () => deleteMutation.mutate(existingFlashcard!.id),
      },
    ]);
  }, [existingFlashcard]);

  return (
    <SafeAreaView className="h-full">
      {mode === "edit" ? (
        <>
          <Stack.Screen
            options={{
              headerRight: (params) => (
                <TouchableOpacity onPress={onDeleteFlashcard}>
                  <Trash weight={"bold"} size={24} color={COLORS.gray["500"]} />
                </TouchableOpacity>
              ),
            }}
          />
        </>
      ) : null}
      <View className="gap-4 p-4">
        <RegularInput
          value={flashcardData.name}
          onChangeText={handleNameChange}
          autoFocus={mode === "create"}
          className="font-normal text-xl placeholder:text-gray-300"
          placeholder="Nazwa fiszki"
        />
        <View className="flex-row items-center gap-4">
          <Text className="font-semibold text-lg">Kolor fiszki: </Text>
          <TouchableOpacity
            onPress={() => setShowColorPicker(true)}
            style={{ backgroundColor: flashcardData.color }}
            className="w-14 h-10 rounded-md border-2 border-gray-200"
            accessibilityLabel="Select flashcard color"
          />
        </View>
      </View>

      <View className="bg-gray-100 p-4 rounded-3xl gap-4 flex-1">
        <FlashcardWords words={selectedWordsArr} />
      </View>

      <AppButton
        label={submitButtonLabel}
        variant="primary"
        className="mx-4"
        disabled={!isFormValid}
        onPress={handleSubmitFlashcard}
      />

      <Modal
        visible={showColorPicker}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowColorPicker(false)}
      >
        <FlashcardColorPicker
          currentColor={flashcardData.color}
          onSelectColor={handleColorSelect}
        />
      </Modal>

      {isPending && (
        <View className="bg-gray-100/50 absolute top-0 bottom-0 left-0 right-0 h-full w-full items-center justify-center gap-4">
          <ActivityIndicator size="small" color="#22c55e" />
        </View>
      )}
    </SafeAreaView>
  );
}
