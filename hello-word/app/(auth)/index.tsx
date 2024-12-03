import { SafeAreaView, View } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/ui/AppButton";
import { ImageBackground } from "expo-image";

export default function () {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("@/assets/images/plant-bg.jpg")}
      className={"h-full"}
    >
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
    </ImageBackground>
  );
}
