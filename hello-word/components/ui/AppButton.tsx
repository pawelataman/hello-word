import { GestureResponderEvent, Pressable, Text } from "react-native";

interface AppButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  variant: "primary" | "secondary";
}

export default function (props: AppButtonProps) {
  const getBackgroundColor = () => {
    if (props.variant === "primary") {
      return "bg-green-500";
    } else {
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
      className={`px-10 py-5 rounded-lg ${getBackgroundColor()}`}
      onPress={props.onPress}
    >
      <Text className={`font-medium text-center text-xl ${getTextColor()}`}>
        {props.label}
      </Text>
    </Pressable>
  );
}
