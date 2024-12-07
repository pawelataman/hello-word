import { SafeAreaView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/ui/AppButton";
import { ImageBackground } from "expo-image";
import Logo from "@/components/ui/Logo";
import * as React from "react";

export default function () {
  const router = useRouter();
  return (
    <ImageBackground source={require("@/assets/images/plant-bg.jpg")}>
      <SafeAreaView className={"h-full justify-between"}>
        <View className="items-center mt-12">
          <Logo />
          <Text className={"text-white text-xl font-semibold mt-8"}>
            Świat słówek w twojej kieszeni
          </Text>
        </View>
        <View className="px-4 py-4 gap-4  justify-center">
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
