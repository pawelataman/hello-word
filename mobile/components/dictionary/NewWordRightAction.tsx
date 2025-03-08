import React, { memo } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ActionProps } from "@/components/dictionary/NewWordLeftAction";

function RightAction({ drag, onAction }: ActionProps) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 56 }],
    };
  }, []);

  return (
    <Animated.View
      style={styleAnimation}
      className={"justify-center items-center bg-transparent flex-row"}
    >
      <TouchableOpacity
        onPress={onAction}
        className={`bg-red-500 p-2 rounded-xl w-[42px] h-[42px] mx-[10px] items-center justify-center`}
      >
        <AntDesign name={"delete"} style={{ fontSize: 24, color: "white" }} />
      </TouchableOpacity>
    </Animated.View>
  );
}

export default memo(RightAction);
