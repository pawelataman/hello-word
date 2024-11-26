import { useWindowDimensions, View } from "react-native";
import { useEffect, useMemo } from "react";
import { useQuizStore } from "@/state/quiz.state";

export default function () {
  const { width } = useWindowDimensions();
  const { answeredQuestions, questionsTotal } = useQuizStore();
  const segmentWidth = useMemo(() => {
    if (questionsTotal === 0) return 0;
    return width / questionsTotal - 10;
  }, [width, questionsTotal]);

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
    <View className="h-2 mt-10 mx-5 flex-row justify-between">
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
  );
}
