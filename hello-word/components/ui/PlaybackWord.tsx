import { Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";
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
    <Pressable style={styles.playback} onPress={() => playbackWord()}>
      <Image
        style={{ width: "100%", height: "100%" }}
        source={require("@/assets/images/icons/speaker-one.png")}
      ></Image>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  playback: {
    backgroundColor: Colors.light.white,
    borderRadius: 1000,
    padding: 5,
    width: 45,
    height: 45,
  },
});
