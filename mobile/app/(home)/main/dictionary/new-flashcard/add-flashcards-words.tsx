import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Dictionary from "@/components/dictionary/Dictionary";
import { DictionaryWord } from "@/core/api/models/dictionary";
import { useRouter } from "expo-router";

export default function () {
  const router = useRouter();
  const [selectedWords, setSelectedWords] = useState<{
    [key: number]: DictionaryWord | null;
  }>({});
  const selectedWordCount = useMemo(() => {
    return Object.values(selectedWords).filter((word) => Boolean(word)).length;
  }, [selectedWords]);
  const onSelectWord = (word: DictionaryWord) => {
    if (selectedWords[word.id]) {
      delete selectedWords[word.id];
      setSelectedWords({ ...selectedWords });
    } else {
      setSelectedWords({ ...selectedWords, [word.id]: word });
    }
  };

  const handleSubmit = () => {
    // Filter out null values and convert to array
    const selectedWordsArray = Object.values(selectedWords).filter(Boolean);

    // Pass the selected words back to the previous screen
    // The previous screen can access this data using useGlobalSearchParams
    router.setParams({
      selectedWords: JSON.stringify(selectedWordsArray),
    });

    // Return to the previous screen with the selected words
    router.back();
  };

  return (
    <>
      <SafeAreaView className={"flex-1"}>
        <Dictionary
          action={{
            label: `Dodaj słówka (${selectedWordCount})`,
            execute: handleSubmit,
          }}
          onSelectWord={onSelectWord}
          selectedWords={selectedWords}
        />
      </SafeAreaView>
    </>
  );
}
