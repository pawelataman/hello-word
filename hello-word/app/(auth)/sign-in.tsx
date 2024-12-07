import { LoginFields } from "@/core/models/auth";
import { useSignIn } from "@clerk/clerk-expo";
import * as React from "react";
import { useCallback } from "react";
import { ImageBackground } from "expo-image";
import { SafeAreaView, View } from "react-native";
import Login from "@/components/auth/Login";
import { extractClerkErrorMessage } from "@/utils/clerk";
import Logo from "@/components/ui/svg/Logo";
import { useToast } from "@/core/hooks/useToast";
import { Stack } from "expo-router";

export default function LoginPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { showToast } = useToast();
  const onSubmitLogin = useCallback(
    async (data: LoginFields) => {
      if (!isLoaded) return;

      try {
        const signInAttempt = await signIn.create({
          identifier: data.email,
          password: data.password,
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
        } else {
          console.error(JSON.stringify(signInAttempt, null, 2));
        }
      } catch (error: any) {
        showToast(extractClerkErrorMessage(error));
      }
    },
    [isLoaded],
  );

  return (
    <ImageBackground source={require("@/assets/images/plant-bg.jpg")}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerBackTitle: "Wstecz",
          headerTintColor: "white",
          headerTitle: "",
        }}
      />
      <SafeAreaView className={"h-full justify-between"}>
        <View className="items-center mt-12">
          <Logo />
        </View>
        <Login onSubmit={onSubmitLogin} />
      </SafeAreaView>
    </ImageBackground>
  );
}
