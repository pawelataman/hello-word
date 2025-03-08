import { Stack, useRouter } from "expo-router";
import { Text, View } from "react-native";
import AppButton from "@/components/ui/AppButton";
import { extractApiErrorMessage } from "@/core/constants/api-errors";
import { ApiError, ApiErrorCodes } from "@/core/models/error";
import { useMemo } from "react";

interface QuizErrorFallbackProps {
  resetErrorBoundary: () => void;
  error: ApiError;
}

export default function ({
  error,
  resetErrorBoundary,
}: QuizErrorFallbackProps) {
  const router = useRouter();

  const errorMessages = useMemo(() => {
    if (typeof error.message === "string") {
      return [extractApiErrorMessage(error.message as ApiErrorCodes)];
    } else {
      return Object.values(error.message).map((val) =>
        extractApiErrorMessage(val as ApiErrorCodes),
      );
    }
  }, [error]);

  return (
    <View className="h-full w-full  bg-white items-center justify-around">
      <Stack.Screen options={{ headerShown: false }} />
      <View className={"items-center"}>
        <Text className={"mb-4 font-bold text-xl"}>No i mamy problem :(</Text>

        {errorMessages.map((errorMsg) => (
          <Text className={"font-medium"}>{errorMsg}</Text>
        ))}
      </View>
      <View className={"gap-4"}>
        ę
        <AppButton
          onPress={resetErrorBoundary} // Call the reset provided by ErrorBoundary
          variant={"primary"}
          label={"Spróbuj ponownie"}
        />
        <AppButton
          onPress={() => {
            router.navigate("/(home)/main");
          }}
          variant={"tertiary"}
          label={"Wyjdz do menu"}
        />
      </View>
    </View>
  );
}
