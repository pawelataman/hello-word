import React from "react";
import { Stack } from "expo-router";
import { NewFlashcardWordsContext } from "@/core/context/new-flashcard-words-context";
import { useNewFlashcardWords } from "@/core/hooks/useNewFlashcardWords";

export default function () {
  const newFlashcardWords = useNewFlashcardWords();
  return (
    <NewFlashcardWordsContext.Provider value={newFlashcardWords}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Fiszki" }} />
        <Stack.Screen
          name="add-flashcards-words"
          options={{ presentation: "modal", headerTitle: "Dodaj słówka" }}
        />
      </Stack>
    </NewFlashcardWordsContext.Provider>
  );
}
