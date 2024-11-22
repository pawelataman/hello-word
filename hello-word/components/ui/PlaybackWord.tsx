import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";

interface PlaybackWordProps {
  onPress?: (event: GestureResponderEvent) => void;
}
export default function (props: PlaybackWordProps) {
  return (
    <Pressable style={styles.playback} onPress={props.onPress}>
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
    width: 40,
    height: 40,
  },
});
