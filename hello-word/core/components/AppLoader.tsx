import React, { ReactNode, useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import { useAppStore } from "@/core/state/app.state";

interface AppLoaderProps {
  children?: ReactNode;
}

export default function ({ children }: AppLoaderProps) {
  const size = useSharedValue(48);
  const { isLoading } = useAppStore();

  useEffect(() => {
    size.value = withRepeat(withSpring(size.value + 22), 100, true);
  }, []);

  return (
    <View className={"w-full h-full relative"}>
      {children}
      {isLoading && (
        <View className="h-full w-full items-center justify-center gap-4 absolute bg-white/50">
          <Animated.Image
            style={{ width: size, height: size }}
            source={require("@/assets/images/icons/brain.png")}
          />
        </View>
      )}
    </View>
  );
}
