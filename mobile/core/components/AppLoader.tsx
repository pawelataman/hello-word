import React, { ReactNode, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import { useAppStore } from "@/core/state/app.state";

interface AppLoaderProps {
  children?: ReactNode;
}

export default function AppLoader({ children }: AppLoaderProps) {
  const size = useSharedValue(48);
  const { isLoading } = useAppStore();

  useEffect(() => {
    if (isLoading) {
      size.value = withRepeat(withSpring(48 + 22), 100, true);
    } else {
      size.value = withSpring(48);
    }
  }, [isLoading]);

  return (
    <>
      {children}
      {isLoading && (
        <View style={styles.loaderOverlay}>
          <View style={styles.loaderContainer}>
            <Animated.Image
              style={{ width: size, height: size }}
              source={require("@/assets/images/icons/brain.png")}
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, // Highest possible z-index
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
