import * as React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import Register from "@/components/auth/Register";
import VerifyEmail from "@/components/auth/VerifyEmail";
import { RegisterFields, VerifyEmailFields } from "@/models/auth";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);

  const onSubmitRegister = async (data: RegisterFields) => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
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
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView>
      {!pendingVerification && <Register onSubmit={onSubmitRegister} />}
      {pendingVerification && <VerifyEmail onSubmit={onSubmitCode} />}
    </SafeAreaView>
  );
}
