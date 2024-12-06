import { GestureResponderEvent, Pressable, Text } from "react-native";

interface AppButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  variant: "primary" | "secondary";
  disabled?: boolean;
}

export default function (props: AppButtonProps) {
  const getBackgroundColor = () => {
    switch (props.variant) {
      case "primary":
        return "bg-green-500";
      case "secondary":
        return "bg-gray-300";
    }
  };

  const getTextColor = () => {
    if (props.variant === "primary") {
      return "text-white";
    } else {
      return "text-black";
    }
  };

  return (
    <Pressable
      disabled={props.disabled}
      className={`px-10 py-5 rounded-lg ${getBackgroundColor()} ${props.disabled && "opacity-30"}`}
      onPress={props.onPress}
    >
      <Text className={`font-medium text-center text-xl ${getTextColor()}`}>
        {props.label}
      </Text>
    </Pressable>
  );
}
