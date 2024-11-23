import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { BOLD, SEMIBOLD } from "@/constants/Typography";
import { Image } from "expo-image";
import PlaybackWord from "@/components/ui/PlaybackWord";
import * as Speech from "expo-speech";

export default function () {
  const playback = (word: string, lang: string) => {
    return () => {
      Speech.speak(word, { language: lang, rate: 0.8 });
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Słówko na dziś</Text>
      <View style={styles.containerInner}>
        <View style={styles.wotdContainer}>
          <View style={styles.wotdContainerInner}>
            <Image
              style={{ width: 28, height: 20 }}
              source={require("@/assets/images/icons/gb.png")}
            ></Image>
            <Text style={styles.wotd}>Ship</Text>
            <Text style={styles.wotdDesc}>Noun</Text>
          </View>
          <PlaybackWord word={"Ship"} lang={"en"} />
        </View>
        <View style={styles.wotdContainer}>
          <View style={styles.wotdContainerInner}>
            <Image
              style={{ width: 28, height: 20 }}
              source={require("@/assets/images/icons/pl.png")}
            ></Image>
            <Text style={styles.wotd}>Statek</Text>
            <Text style={styles.wotdDesc}>Rzeczownik</Text>
          </View>
          <PlaybackWord word={"Statek"} lang={"pl"} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    borderRadius: 20,
    height: 200,
    backgroundColor: Colors.light.bgLight,
  },
  containerInner: {
    marginTop: 25,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  title: {
    textAlign: "center",
    ...BOLD,
    fontSize: 18,
  },
  wotd: {
    ...SEMIBOLD,
    fontSize: 16,
  },
  wotdDesc: {
    color: Colors.light.textLight,
  },
  wotdContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  wotdContainerInner: {
    gap: 4,
  },
});
