import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { BOLD } from "@/constants/Typography";
import { Language } from "@/models/models";
import { LANG_EN, LANG_PL } from "@/constants/common";

interface OptionPayload {
  from: Language;
  to: Language;
}

const options = [
  {
    description: `${LANG_PL.label} - ${LANG_EN.label}`,
    payload: {
      from: LANG_PL,
      to: LANG_EN,
    } as OptionPayload,
  },
  {
    description: `${LANG_EN.label} - ${LANG_PL.label}`,
    payload: {
      from: LANG_EN,
      to: LANG_PL,
    } as OptionPayload,
  },
];

export default function () {
  const router = useRouter();

  const navigateToQuiz = (params: OptionPayload): void => {
    router.push({
      pathname: "/quiz",
      params: {
        sourceLangCode: params.from.code,
        targetLangCode: params.to.code,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>
      <Text style={styles.title}>{"Rozpocznij quiz"}</Text>
      <View style={styles.innerContainer}>
        {options.map((opt) => (
          <TouchableOpacity
            style={styles.squareButton}
            key={opt.description}
            onPress={() => navigateToQuiz(opt.payload)}
          >
            <View>
              <Text>{opt.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    ...BOLD,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  innerContainer: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  squareButton: {
    borderRadius: 8,
    flex: 1,
    height: 100,
    backgroundColor: Colors.light.white,
    borderBottomWidth: 4,
    borderBottomColor: Colors.light.green,

    justifyContent: "center",
    alignItems: "center",
  },
});
