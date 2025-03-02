import { useMemo, useState } from "react";
import { DictionaryWord } from "@/core/api/models/dictionary";

export const useNewFlashcardWords = (): NewFlashcardWords => {
  const [selectedWords, setSelectedWords] = useState<{
    [key: number]: DictionaryWord;
  }>({});
  const selectedWordCount = useMemo(() => {
    return Object.values(selectedWords).filter((word) => Boolean(word)).length;
  }, [selectedWords]);

  const selectedWordsArr = useMemo(() => {
    return Object.values(selectedWords).filter(Boolean);
  }, [selectedWords]);

  const onSelectWord = (word: DictionaryWord) => {
    if (selectedWords[word.id]) {
      delete selectedWords[word.id];
      setSelectedWords({ ...selectedWords });
    } else {
      setSelectedWords({ ...selectedWords, [word.id]: word });
    }
  };
  return {
    selectedWords,
    selectedWordCount,
    onSelectWord,
    selectedWordsArr,
  };
};

export interface NewFlashcardWords {
  selectedWords: {
    [key: number]: DictionaryWord;
  };
  selectedWordCount: number;
  onSelectWord: (word: DictionaryWord) => void;
  selectedWordsArr: DictionaryWord[];
}
