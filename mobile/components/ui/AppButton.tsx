import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AppButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  variant: "primary" | "secondary" | "tertiary";
  className?: string;
  disabled?: boolean;
}

export default function (props: AppButtonProps) {
  const getBackgroundColor = () => {
    switch (props.variant) {
      case "primary":
        return "bg-green-500";
      case "secondary":
        return "bg-white";
      case "tertiary":
        return "bg-gray-300";
    }
  };

  const getTextColor = () => {
    switch (props.variant) {
      case "primary":
        return "text-white";
      case "secondary":
        return "text-green-500";
      case "tertiary":
        return "text-black";
    }
  };

  return (
    <TouchableOpacity
      className={props.className}
      disabled={props.disabled}
      onPress={props.onPress}
    >
      <View
        className={`px-10 py-2 rounded-lg ${getBackgroundColor()} ${props.disabled && "opacity-30"}`}
      >
        <Text className={`font-semibold text-center text-l ${getTextColor()}`}>
          {props.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
