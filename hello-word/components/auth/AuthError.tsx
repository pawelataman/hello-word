import { Text, View } from "react-native";

interface AuthErrorProps {
  message: string | null;
}
export default function ({ message }: AuthErrorProps) {
  if (message) {
    return (
      <View className="mb-4 items-center text-sm p-2 bg-red-100 rounded-sm">
        <Text className="color-red-500">{message}</Text>
      </View>
    );
  }
}
