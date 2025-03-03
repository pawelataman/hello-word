import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import Dictionary from "@/components/dictionary/Dictionary";
import { useRouter } from "expo-router";
import { NewFlashcardWordsContext } from "@/core/context/new-flashcard-words-context";

export default function () {
  const router = useRouter();
  const { selectedWords, selectedWordCount, onSelectWord } = useContext(
    NewFlashcardWordsContext,
  )!;
  const handleSubmit = () => {
    router.back();
  };

  return (
    <>
      <SafeAreaView className={"flex-1"}>
        <Dictionary
          action={{
            label: `Zapisz słówka (${selectedWordCount})`,
            execute: handleSubmit,
          }}
          onSelectWord={onSelectWord}
          selectedWords={selectedWords}
        />
      </SafeAreaView>
    </>
  );
}
