import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import Register from "@/components/auth/Register";
import { RegisterFields, VerifyEmailFields } from "@/core/models/auth";
import { ImageBackground } from "expo-image";
import AuthError from "@/components/auth/AuthError";
import { useSignUp } from "@clerk/clerk-expo";
import { extractClerkErrorMessage } from "@/utils/clerk";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import VerifyEmail from "@/components/auth/VerifyEmail";
import Logo from "@/components/ui/Logo";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<{
    type: "register" | "verify";
    message: string;
  } | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%"], []);
  const [emailVerificationData, setEmailVerificationData] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
  }>({ email: "", password: "", confirmPassword: "" });

  const handleResend = useCallback(async () => {}, [emailVerificationData]);

  const onSubmitRegister = async (data: RegisterFields) => {
    if (!isLoaded) {
      return;
    }
    setErrorMessage(null);
    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      bottomSheetRef.current?.expand();
      setEmailVerificationData({ ...data });
    } catch (error: any) {
      setErrorMessage({
        type: "register",
        message: extractClerkErrorMessage(error),
      });
    }
  };

  const onSubmitCode = async (data: VerifyEmailFields) => {
    if (!isLoaded) {
      return;
    }
    setErrorMessage(null);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
        bottomSheetRef.current?.close();
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
        setErrorMessage({
          type: "verify",
          message: extractClerkErrorMessage(),
        });
      }
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));
      setErrorMessage({
        type: "verify",
        message: extractClerkErrorMessage(error),
      });
    }
  };

  return (
    <ImageBackground source={require("@/assets/images/plant-bg.jpg")}>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView>
        <View className={"h-full justify-between"}>
          <View className="items-center mt-12">
            <Logo />
          </View>

          <Register onSubmit={onSubmitRegister}>
            {errorMessage && errorMessage.type === "register" && (
              <AuthError message={errorMessage.message} />
            )}
          </Register>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={-1}
          enablePanDownToClose={false}
          handleComponent={null}
          keyboardBlurBehavior={"restore"}
          enableContentPanningGesture={false}
        >
          <BottomSheetView>
            <VerifyEmail
              onBack={() => bottomSheetRef.current?.close()}
              onResend={handleResend}
              data={emailVerificationData}
              onSubmit={onSubmitCode}
            >
              {errorMessage && errorMessage.type === "verify" && (
                <AuthError message={errorMessage.message} />
              )}
            </VerifyEmail>
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </ImageBackground>
  );
}
