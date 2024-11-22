import {
  DimensionValue,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { Colors } from "@/constants/Colors";

interface AppButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  textColor?: string;
  bgColor?: string;
  width?: DimensionValue;
}
export default function (props: AppButtonProps) {
  const getButtonStyles = () => {
    return {
      ...styles.btnStyle,
      width: props.width,
      backgroundColor: props.bgColor || styles.btnStyle.backgroundColor,
    };
  };

  const getTextStyles = () => {
    return {
      ...styles.labelStyle,
      color: props.textColor || styles.labelStyle.color,
    };
  };
  return (
    <Pressable style={getButtonStyles()} onPress={props.onPress}>
      <Text style={getTextStyles()}>{props.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.light.green,
    borderRadius: 8,
  },
  labelStyle: {
    fontSize: 16,
    color: Colors.light.white,
  },
});
