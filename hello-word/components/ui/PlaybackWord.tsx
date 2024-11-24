import { Pressable } from "react-native";
import { Image } from "expo-image";
import * as Speech from "expo-speech";
import { useRef } from "react";

interface PlaybackWordProps {
  word: string;
  lang: string;
}
export default function (props: PlaybackWordProps) {
  const isDone = useRef<boolean>(true);

  const playbackWord = () => {
    if (!isDone.current) return;
    isDone.current = false;
    Speech.speak(props.word, {
      language: props.lang,
      rate: 0.8,
      onDone: () => {
        isDone.current = true;
      },
    });
  };
  return (
    <Pressable
      style={{ width: 48, height: 48 }}
      className="bg-white rounded-[1000px] p-2"
      onPress={() => playbackWord()}
    >
      <Image
        style={{ width: "100%", height: "100%" }}
        source={require("@/assets/images/icons/speaker-one.png")}
      ></Image>
    </Pressable>
  );
}
