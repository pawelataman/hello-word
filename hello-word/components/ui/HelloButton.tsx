import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { SEMIBOLD } from "@/constants/Typography";

interface HelloButtonProps {
  type: "primary" | "secondary";
  color?: string;
  children: any;
}

export default function ({
  type,
  color,
  children,
}: HelloButtonProps): JSX.Element {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        type === "primary" ? styles.primary : styles.secondary,
      ]}
    >
      <Text
        style={{
          ...SEMIBOLD,
          color:
            color ||
            (type === "primary" ? Colors.light.white : Colors.light.green),
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    borderStyle: "solid",
    borderBottomWidth: 3,
  },
  primary: {
    backgroundColor: Colors.light.green,
    borderColor: Colors.light.darkGreen,
  },
  secondary: {
    backgroundColor: Colors.light.white,
    borderColor: Colors.light.grey,
  },
});
