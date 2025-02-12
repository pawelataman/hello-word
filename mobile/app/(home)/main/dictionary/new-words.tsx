import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
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
import { AntDesign } from "@expo/vector-icons";
import ReanimatedSwipeable from "react-native-gesture-handler/src/components/ReanimatedSwipeable";
import { SharedValue } from "react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import RegularInput from "@/components/ui/inputs/RegularInput";
import PL from "@/assets/images/icons/PL.svg";
import EN from "@/assets/images/icons/GB.svg";
import { LANG_CODE } from "@/core/constants/common";
import { uuid } from "expo-modules-core";
import { HttpClientContext } from "@/core/context/client-context";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/core/hooks/useToast";

interface CreateWord {
  en: string;
  pl: string;
  id: string;
}

export default function () {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [wordPairs, setWordPairs] = useState<CreateWord[]>([
    { en: "", pl: "", id: uuid.v4() },
  ]);

  const { showToast } = useToast();

  const { postCreateWord } = useContext(HttpClientContext)!;
  const { mutateAsync } = useMutation({
    mutationFn: postCreateWord,
    onSuccess: () => {
      showToast("Pomślnie dodano słówka do słownika", "success");
      router.back();
    },
    onError: () => {
      showToast("Nie udało się dodać słówek do słownika", "error");
    },
  });

  const handleAdd = () => {
    const words = wordPairs.filter((wp) => wp.en.length && wp.pl.length);
    if (words.length) {
      mutateAsync({ words });
    }
  };

  const onAddNewWord = useCallback(() => {
    setWordPairs([...wordPairs, { en: "", pl: "", id: uuid.v4() }]);
    scrollRef.current?.scrollToEnd();
  }, [wordPairs]);

  const deleteWord = useCallback(
    (word: CreateWord) => {
      setWordPairs(wordPairs.filter((w) => w.id != word.id));
    },
    [wordPairs],
  );

  const onSubmitWord = (word: CreateWord) => {
    const index = wordPairs.findIndex((w) => w.id === word.id);
    setWordPairs(wordPairs.toSpliced(index, 1, word));
  };

  const canSave = useMemo(() => {
    return wordPairs.length && wordPairs.some((word) => word.en && word.pl);
  }, [wordPairs]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={"padding"} className={"h-full"}>
        <ScrollView
          ref={scrollRef}
          className={"h-full"}
          keyboardShouldPersistTaps="handled"
        >
          <View className="py-4 gap-4 justify-between ">
            <View className={"gap-4"}>
              {wordPairs.map((word) => (
                <WordPairRow
                  key={word.id}
                  onDelete={deleteWord}
                  onSubmit={onSubmitWord}
                  word={word}
                />
              ))}
              <View>
                {
                  <TouchableOpacity
                    onPress={onAddNewWord}
                    className=" mx-4 justify-center items-center py-2 border-2 border-dashed border-green-300 bg-green-100 rounded-lg"
                  >
                    <Text className={"text-green-400 font-semibold"}>
                      Dodaj nowe słowo
                    </Text>
                  </TouchableOpacity>
                }
              </View>
            </View>

            <AppButton
              className={"mx-4"}
              disabled={!canSave}
              variant={"primary"}
              label={"Zapisz"}
              onPress={handleAdd}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

interface WordPairRowProps {
  onDelete: (word: CreateWord) => void;
  onSubmit: (word: CreateWord) => void;
  word: CreateWord;
}

const WordPairRow = ({ onDelete, word, onSubmit }: WordPairRowProps) => {
  const [en, setEn] = useState<string>(word[LANG_CODE.EN]);
  const [pl, setPl] = useState<string>(word[LANG_CODE.PL]);
  const [mode, setMode] = useState<"input" | "display">("input");

  const isValid = useMemo(() => {
    return en.trim().length > 0 && pl.trim().length > 0;
  }, [en, pl]);

  const submitWord = () => {
    if (isValid) {
      Keyboard.dismiss();
      setMode("display");
      onSubmit({
        ...word,
        [LANG_CODE.EN]: en.trim(),
        [LANG_CODE.PL]: pl.trim(),
      });
    }
  };

  const onEdit = () => {
    setMode("input");
  };

  return mode === "input" ? (
    <ReanimatedSwipeable
      containerStyle={styles.swipeable}
      friction={2}
      renderRightActions={(prog, drag, swipeable) => (
        <RightAction drag={drag} onAction={() => onDelete(word)} />
      )}
    >
      <View className={"flex-row gap-4 mx-4 items-center"}>
        <RegularInput
          value={en}
          onChangeText={(text) => setEn(text.trim())}
          autoFocus={true}
          className={"flex-1 font-normal text-xl placeholder:text-gray-300"}
          placeholder={"Angielski"}
        />
        <RegularInput
          value={pl}
          onChangeText={(text) => setPl(text.trim())}
          className={"flex-1 font-normal text-xl placeholder:text-gray-300"}
          placeholder={"Polski"}
        />
        <TouchableOpacity
          onPress={() => submitWord()}
          className={`bg-green-500 p-2 rounded-xl ${!isValid && "opacity-20"}`}
          disabled={!isValid}
        >
          <AntDesign
            name={"check"}
            style={{ fontSize: 24, color: "#ffffff" }}
          />
        </TouchableOpacity>
      </View>
    </ReanimatedSwipeable>
  ) : (
    <ReanimatedSwipeable
      containerStyle={styles.swipeable}
      friction={2}
      shouldCancelWhenOutside={true}
      renderRightActions={(prog, drag, swipeable) => (
        <RightAction drag={drag} onAction={() => onDelete(word)} />
      )}
      renderLeftActions={(prog, drag, swipeable) => (
        <LeftAction drag={drag} onAction={onEdit} />
      )}
    >
      <View
        className={
          "flex-row flex-wrap gap-4 p-4 mx-4  items-center rounded-xl justify-between bg-white "
        }
      >
        <View className={"flex-row gap-4 items-center"}>
          <EN width={24} height={16} />
          <Text className={"text-lg font-bold"}>{en}</Text>
        </View>

        <View className={"flex-row gap-4 items-center"}>
          <PL width={24} height={16} />
          <Text className={"text-xl font-bold"}>{pl}</Text>
        </View>
      </View>
    </ReanimatedSwipeable>
  );
};

const styles = StyleSheet.create({
  swipeable: {
    width: "100%",
  },
});

interface ActionProps {
  drag: SharedValue<number>;
  onAction: () => void;
}

function RightAction({ drag, onAction }: ActionProps) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 56 }],
    };
  }, []);

  return (
    <Animated.View
      style={styleAnimation}
      className={"justify-center items-center bg-transparent flex-row"}
    >
      <TouchableOpacity
        onPress={onAction}
        className={`bg-red-500 p-2 rounded-xl w-[42px] h-[42px] mx-[10px] items-center justify-center`}
      >
        <AntDesign name={"delete"} style={{ fontSize: 24, color: "white" }} />
      </TouchableOpacity>
    </Animated.View>
  );
}

function LeftAction({ drag, onAction }: ActionProps) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value - 56 }],
    };
  }, []);

  return (
    <Animated.View
      style={styleAnimation}
      className={"justify-center items-center bg-transparent flex-row"}
    >
      <TouchableOpacity
        onPress={onAction}
        className={`bg-gray-300 p-2 rounded-xl w-[42px] h-[42px] mx-[10px] items-center justify-center`}
      >
        <AntDesign name={"edit"} style={{ fontSize: 24, color: "#ffffff" }} />
      </TouchableOpacity>
    </Animated.View>
  );
}
