import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import Register from "@/components/auth/Register";
import { RegisterFields, VerifyEmailFields } from "@/core/models/auth";
import { ImageBackground } from "expo-image";
import { useSignUp } from "@clerk/clerk-expo";
import { extractClerkErrorMessage } from "@/utils/clerk";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import VerifyEmail from "@/components/auth/VerifyEmail";
import Logo from "@/components/ui/svg/Logo";
import { useToast } from "@/core/hooks/useToast";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const { showToast } = useToast();
  const bottomSheetRef = useRef<BottomSheet>(null);
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
      showToast(extractClerkErrorMessage(error));
    }
  };

  const onSubmitCode = async (data: VerifyEmailFields) => {
    if (!isLoaded) {
      return;
    }
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
        showToast(extractClerkErrorMessage());
      }
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));
      showToast(extractClerkErrorMessage(error));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      bottomSheetRef.current?.expand();
    }, 100);
  }, []);

  const backDropComponent = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.4}
      />
    ),
    [],
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
      <SafeAreaView>
        <View className={"h-full justify-between"}>
          <View className="items-center mt-12">
            <Logo />
          </View>

          <Register onSubmit={onSubmitRegister}></Register>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          backdropComponent={backDropComponent}
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
            ></VerifyEmail>
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </ImageBackground>
  );
}
