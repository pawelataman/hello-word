import { StyleSheet, Text, View } from "react-native";
import { QuizContext } from "@/context/quiz-context";
import React, { useContext } from "react";
import { BOLD } from "@/constants/Typography";
import AppButton from "@/components/ui/AppButton";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function () {
  const quiz = useContext(QuizContext);
  const router = useRouter();
  const handleExit = () => {
    router.replace({ pathname: "/" });
  };

  const getPointsColorStyles = (points: { current: number; total: number }) => {
    if (points.total > 0) {
      return {
        color:
          points.current / points.total > 0.5
            ? Colors.light.green
            : Colors.light.textLight,
      };
    }
    return {};
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ukończyłaś(eś) quiz!</Text>
      <Text style={styles.result}>Twój wynik to</Text>
      <Text style={styles.points}>
        <Text style={[getPointsColorStyles(quiz.points)]}>
          {quiz.points.current}
        </Text>{" "}
        / {quiz.points.total}
      </Text>
      <View style={styles.actions}>
        <AppButton
          onPress={quiz.handleRestart}
          label={"Spróbuj ponownie"}
        ></AppButton>
        <AppButton
          bgColor={Colors.light.grey}
          onPress={handleExit}
          label={"Zakończ"}
        ></AppButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    ...BOLD,
  },
  result: {
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  points: {
    fontSize: 36,
    color: Colors.light.textLight,
  },
});
