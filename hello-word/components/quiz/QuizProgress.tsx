import { Text, useWindowDimensions, View } from "react-native";
import { useEffect, useMemo } from "react";
import { useQuizStore } from "@/state/quiz.state";

export default function () {
  const { width } = useWindowDimensions();
  const { answeredQuestions, questionsTotal } = useQuizStore();
  const segmentWidth = useMemo(() => {
    if (questionsTotal === 0) return 0;
    return width / questionsTotal - 10;
  }, [width, questionsTotal]);

  const correctPoints = answeredQuestions.filter(Boolean).length;
  const incorrectPoints = answeredQuestions.filter((val) => !val).length;
  useEffect(() => {}, [questionsTotal]);

  const getColor = (index: number): string => {
    switch (answeredQuestions[index]) {
      case true:
        return "bg-green-500";
      case false:
        return "bg-red-500";
      case undefined:
        return "bg-gray-300";
    }
  };

  return (
    <View className="mt-10 mx-5 gap-8">
      <View className="self-end flex-row gap-2">
        <View className="py-2 px-2 bg-gray-100 rounded-md">
          <View className=" flex-row gap-4 justify-between">
            <Text className="text-green-500 font-medium">Dobre</Text>
            <Text className="text-green-500 font-bold">{correctPoints}</Text>
          </View>
        </View>
        <View className="py-2 px-2  bg-gray-100 rounded-md">
          <View className="flex-row  gap-4 justify-between">
            <Text className="text-red-500 font-medium">Złe</Text>
            <Text className="text-red-500 font-bold">{incorrectPoints}</Text>
          </View>
        </View>
      </View>
      <View className="h-2 flex-row justify-between">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => {
          return (
            <View
              key={val}
              style={{ width: segmentWidth }}
              className={`bg-gray-300 h-full rounded-2xl ${getColor(val)}`}
            ></View>
          );
        })}
      </View>
    </View>
  );
}
