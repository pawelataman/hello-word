import { LoginFields } from "@/core/models/auth";
import { useSignIn } from "@clerk/clerk-expo";
import { useCallback, useState } from "react";
import { ImageBackground } from "expo-image";
import { SafeAreaView } from "react-native";
import Login from "@/components/auth/Login";
import { Stack } from "expo-router";
import AuthError from "@/components/auth/AuthError";
import { extractClerkErrorMessage } from "@/utils/clerk";

export default function LoginPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        setErrorMessage(extractClerkErrorMessage(error));
      }
    },
    [isLoaded],
  );

  return (
    <ImageBackground source={require("@/assets/images/plant-bg.jpg")}>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView>
        <Login onSubmit={onSubmitLogin}>
          <AuthError message={errorMessage} />
        </Login>
      </SafeAreaView>
    </ImageBackground>
  );
}
