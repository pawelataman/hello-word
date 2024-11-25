import { Text, View } from "react-native";
import Animated, {
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";

export default function () {
  const size = useSharedValue(48);

  useEffect(() => {
    size.value = withRepeat(withSpring(size.value + 22), 100, true);
  }, []);
  return (
    <View className="h-full items-center justify-center gap-4">
      <Animated.Image
        style={{ width: size, height: size }}
        source={require("@/assets/images/icons/brain.png")}
      />
      <Text className="font-bold text-2xl">Trwa ładowanie słówek</Text>
    </View>
  );
}
