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

  const setSelectedWordsArr = (words: DictionaryWord[]) => {
    const wordsDict = words.reduce(
      (acc, curr) => ({ ...acc, [curr.id]: curr }),
      {},
    );
    setSelectedWords(wordsDict);
  };
  return {
    selectedWords,
    selectedWordCount,
    onSelectWord,
    selectedWordsArr,
    setSelectedWordsArr,
  };
};

export interface NewFlashcardWords {
  selectedWords: {
    [key: number]: DictionaryWord;
  };
  selectedWordCount: number;
  onSelectWord: (word: DictionaryWord) => void;
  selectedWordsArr: DictionaryWord[];
  setSelectedWordsArr: (words: DictionaryWord[]) => void;
}
