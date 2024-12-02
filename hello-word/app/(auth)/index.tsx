import { SafeAreaView, View } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/ui/AppButton";

export default function () {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View className="px-4 py-4 gap-4 h-full justify-end">
        <AppButton
          onPress={() => {
            router.push("/sign-in");
          }}
          label={"Zaloguj się"}
          variant={"primary"}
        />

        <AppButton
          onPress={() => {
            router.push("/sign-up");
          }}
          label={"Zarejestruj się"}
          variant={"secondary"}
        />
      </View>
    </SafeAreaView>
  );
}
