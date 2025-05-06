import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppButton from "@/components/ui/AppButton";
import { useRouter } from "expo-router";
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { uuid } from "expo-modules-core";
import { HttpClientContext } from "@/core/context/client-context";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/core/hooks/useToast";
import { CreateWord } from "@/core/models/models";
import NewWordForm from "@/components/dictionary/NewWordForm";
import NewWord from "@/components/dictionary/NewWord";

const defaultNewWord = { en: "", pl: "", id: uuid.v4() };

export default function () {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [wordPairs, setWordPairs] = useState<CreateWord[]>([defaultNewWord]);

  const { showToast } = useToast();
  const { postCreateWord } = useContext(HttpClientContext)!;
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postCreateWord,
    onSuccess: () => {
      showToast("Pomślnie dodano słówka do słownika", "success");
      router.back();
    },
    onError: () => {
      showToast("Nie udało się dodać słówek do słownika", "error");
    },
  });

  const [currEditId, setCurrEditId] = useState<string | null>(
    defaultNewWord.id
  );

  const handleAdd = useCallback(() => {
    const words = wordPairs.filter((wp) => wp.en.length && wp.pl.length);
    if (words.length) {
      mutateAsync({ words });
    }
  }, [wordPairs]);

  const onAddNewWord = useCallback(() => {
    const newWord = { en: "", pl: "", id: uuid.v4() };
    setWordPairs([...wordPairs, newWord]);

    flatListRef.current?.scrollToItem({ item: newWord });

    setCurrEditId(newWord.id);
  }, [wordPairs]);

  const deleteWord = useCallback(
    (word: CreateWord) => {
      setWordPairs(wordPairs.filter((w) => w.id != word.id));
    },
    [wordPairs]
  );

  const onSubmitWord = useCallback(
    (word: CreateWord) => {
      const index = wordPairs.findIndex((w) => w.id === word.id);
      setWordPairs(wordPairs.toSpliced(index, 1, word));
      setCurrEditId(null);
    },
    [wordPairs]
  );

  const onEdit = useCallback((word: CreateWord) => {
    setCurrEditId(word.id);
  }, []);

  const canSave = useMemo(() => {
    return wordPairs.length && wordPairs.some((word) => word.en && word.pl);
  }, [wordPairs]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        className={"h-full gap-4"}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={150}
      >
        <FlatList
          keyboardShouldPersistTaps={"handled"}
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          data={wordPairs}
          className={"py-2"}
          renderItem={({ item }) => (
            <View className={"mb-2"}>
              <WordPairRow
                onDelete={deleteWord}
                onSubmit={onSubmitWord}
                onEdit={onEdit}
                isEditing={currEditId === item.id}
                word={item}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />

        {!currEditId && (
          <TouchableOpacity
            onPress={onAddNewWord}
            className=" mx-4 justify-center items-center py-2 border-2 border-dashed border-green-300 bg-green-100 rounded-lg"
          >
            <Text className={"text-green-400 font-semibold"}>
              Dodaj nowe słowo
            </Text>
          </TouchableOpacity>
        )}

        <AppButton
          className={"mx-4"}
          disabled={!canSave}
          variant={"primary"}
          label={"Zapisz"}
          onPress={handleAdd}
        />
      </KeyboardAvoidingView>

      {isPending && (
        <View className=" bg-gray-100/50 absolute top-0 bottom-0 left-0 right-0  h-full w-full items-center justify-center gap-4">
          <ActivityIndicator size="small" color={"#22c55e"} />
        </View>
      )}
    </SafeAreaView>
  );
}

interface WordPairRowProps {
  onDelete: (word: CreateWord) => void;
  onSubmit: (word: CreateWord) => void;
  onEdit: (word: CreateWord) => void;
  word: CreateWord;
  isEditing: boolean;
}

const WordPairRow = ({
  onDelete,
  word,
  onSubmit,
  onEdit,
  isEditing,
}: WordPairRowProps) => {
  return isEditing ? (
    <NewWordForm word={word} onSubmit={onSubmit} onDelete={onDelete} />
  ) : (
    <NewWord word={word} onDelete={onDelete} onEdit={onEdit} />
  );
};
