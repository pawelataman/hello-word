import React, { memo } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SharedValue } from "react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper";

export interface ActionProps {
  drag: SharedValue<number>;
  onAction: () => void;
}

function LeftAction({ drag, onAction }: ActionProps) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value - 56 }],
    };
  }, []);

  return (
    <Animated.View
      style={styleAnimation}
      className={"justify-center items-center bg-transparent flex-row"}
    >
      <TouchableOpacity
        onPress={onAction}
        className={`bg-gray-300 p-2 rounded-xl w-[42px] h-[42px] mx-[10px] items-center justify-center`}
      >
        <AntDesign name={"edit"} style={{ fontSize: 24, color: "#ffffff" }} />
      </TouchableOpacity>
    </Animated.View>
  );
}

export default memo(LeftAction);
