import { Text, View } from "react-native";
import { QuizContext } from "@/core/context/quiz-context";
import React, { useContext } from "react";
import AppButton from "@/components/ui/AppButton";
import { useRouter } from "expo-router";

export default function () {
  const quiz = useContext(QuizContext);
  const router = useRouter();

  const handleExit = () => {
    router.replace({ pathname: "/" });
  };

  const getPointsColorClass = (points: { current: number; total: number }) => {
    if (points.total > 0) {
      return points.current / points.total > 0.5
        ? "text-green-500"
        : "text-gray-500";
    }
    return "";
  };

  return (
    <View className="w-full py-5 px-5 flex-1 items-center justify-between">
      <View className="items-center justify-center w-full flex-1 margin ">
        <Text className="text-3xl font-bold">Ukończyłaś(eś) quiz!</Text>
        <Text className="text-xl my-4">Twój wynik to</Text>
        <Text className="text-7xl text-gray-500 mb-6">
          <Text className={getPointsColorClass(quiz.points)}>
            {quiz.points.current}
          </Text>{" "}
          / {quiz.points.total}
        </Text>
      </View>
      <View className="flex-row flex-0 items-center gap-2.5 mt-5">
        <AppButton
          variant={"primary"}
          onPress={quiz.handleRestart}
          label="Spróbuj ponownie"
        />
        <AppButton onPress={handleExit} label="Zakończ" variant={"secondary"} />
      </View>
    </View>
  );
}
