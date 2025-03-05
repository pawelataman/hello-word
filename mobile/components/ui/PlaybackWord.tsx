import { Pressable } from "react-native";
import { Image } from "expo-image";
import * as Speech from "expo-speech";
import { useCallback, useState } from "react";
import { useQuizStore } from "@/core/state/quiz.state";

interface PlaybackWordProps {
  word: string;
  lang: string;
  onDone?: () => void;
}

export default function PlaybackWord({
  word,
  lang,
  onDone,
}: PlaybackWordProps) {
  const [isDone, setIsDone] = useState<boolean>(true);
  const { quizRunData } = useQuizStore();

  const playbackWord = useCallback(async () => {
    if (
      !isDone ||
      (await Speech.isSpeakingAsync()) ||
      quizRunData.currentQuestionStatus === "answered"
    )
      return;

    setIsDone(false);
    Speech.speak(word, {
      language: lang,
      rate: 0.5,
      onDone: () => {
        setIsDone(true);
        if (onDone) {
          onDone();
        }
      },
    });
  }, [isDone, word, lang, quizRunData]);

  return (
    <Pressable
      style={{ width: 48, height: 48 }}
      className={`${isDone ? "bg-white" : "bg-gray-300"} rounded-full p-2`}
      onPress={playbackWord}
    >
      <Image
        style={{ width: "100%", height: "100%" }}
        source={require("@/assets/images/icons/speaker-one.png")}
      />
    </Pressable>
  );
}
