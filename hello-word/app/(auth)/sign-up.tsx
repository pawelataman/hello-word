import * as React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import FormInput from "@/components/ui/FormInput";
import AppButton from "@/components/ui/AppButton";
import { useForm } from "react-hook-form";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const { control, formState } = useForm();
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({});

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView>
      <View className="justify-start h-full p-4">
        <View>
          <FormInput
            control={control}
            name={"email"}
            placeholder={"Email"}
            className="my-2"
            rules={{
              required: "Adres e-mail jest wymagany",
              pattern: {
                value: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/,
                message: "Nieprawidłowy adres e-mail",
              },
            }}
          ></FormInput>
          <FormInput
            control={control}
            name={"password"}
            placeholder={"Hasło"}
            secureTextEntry={true}
            rules={{
              minLength: 3,
              required: true,
            }}
          ></FormInput>

          <FormInput
            control={control}
            name={"confirmPassword"}
            placeholder={"Potwierdź hasło"}
            secureTextEntry={true}
            rules={{
              minLength: 3,
              required: true,
            }}
          ></FormInput>
        </View>
        <View className="my-8">
          <AppButton
            variant={"primary"}
            label="Zarejestruj się"
            disabled={!formState.isValid}
            onPress={() => {}}
          ></AppButton>
        </View>

        <View className=" w-full justify-center align-center">
          <Text className="my-4 text-center">Masz już konto?</Text>
          <Link href={"./sign-in"} replace={true}>
            <Text className="text-center color-blue-500 text-l font-semibold underline">
              Zaloguj się
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
