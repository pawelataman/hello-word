import { useWindowDimensions, View } from "react-native";
import { useMemo } from "react";

export default function () {
  const { width } = useWindowDimensions();
  const segmentWidth = useMemo(() => {
    return width / 10 - 10;
  }, [width]);

  const correct = [2, 4, 5, 7, 8];
  const incorrect = [1, 3, 6];

  const getColor = (val: number): string => {
    if (correct.includes(val)) {
      return "bg-green-500";
    } else if (incorrect.includes(val)) {
      return "bg-red-500";
    } else {
      return "bg-gray-300";
    }
  };
  return (
    <View className="h-2 mt-10 mx-5 flex-row justify-between">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => {
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
