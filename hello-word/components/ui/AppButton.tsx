import { GestureResponderEvent, Pressable, Text } from "react-native";

interface AppButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  variant: "primary" | "secondary";
}

export default function (props: AppButtonProps) {
  return (
    <Pressable
      className={`px-5 py-2.5 bg-green-500 rounded-lg ${props.variant === "secondary" && "bg-gray-300"}`}
      onPress={props.onPress}
    >
      <Text
        className={`text-white font-medium ${props.variant === "secondary" && "color-black"}`}
      >
        {props.label}
      </Text>
    </Pressable>
  );
}
