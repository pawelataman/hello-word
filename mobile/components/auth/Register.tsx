import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import FormInput from "@/components/auth/FormInput";
import { Link } from "expo-router";
import * as React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { EMAIL_PATTERN } from "@/core/constants/auth";
import { RegisterFields } from "@/core/models/auth";
import AppButton from "@/components/ui/AppButton";

const REGISTER_FIELD_RULES = {
  email: {
    required: "Pole jest wymagane",
    pattern: {
      value: EMAIL_PATTERN,
      message: "Nieprawidłowy format e-mail",
    },
  },
  password: {
    minLength: {
      value: 8,
      message: "Hasło zbyt krótkie",
    },
    required: "Pole jest wymagane",
  },
  confirmPassword: {
    minLength: {
      value: 8,
      message: "Hasło zbyt krótkie",
    },
    required: "Pole jest wymagane",
  },
};

interface RegisterProps {
  onSubmit: (data: RegisterFields) => void;
}

export default function ({ onSubmit }: RegisterProps) {
  const {
    control,
    formState: { isValid },
    watch,
    handleSubmit,
    trigger,
  } = useForm<RegisterFields>({
    defaultValues: {
      email: "",
      confirmPassword: "",
      password: "",
    },
    mode: "onChange",
  });

  const password = watch("password");

  useEffect(() => {
    trigger(["confirmPassword"]);
  }, [password]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="p-4">
        <View>
          <View className={"mb-4"}>
            <FormInput
              control={control}
              name={"email"}
              placeholder={"Email"}
              keyboardType={"email-address"}
              autoCapitalize={"none"}
              type={"email"}
              rules={REGISTER_FIELD_RULES["email"]}
            />
          </View>
          <View className={"mb-4"}>
            <FormInput
              control={control}
              type={"secured"}
              name={"password"}
              placeholder={"Hasło"}
              autoCapitalize={"none"}
              rules={REGISTER_FIELD_RULES["password"]}
            />
          </View>
          <View className={"mb-8"}>
            <FormInput
              control={control}
              name={"confirmPassword"}
              type={"secured"}
              placeholder={"Potwierdź hasło"}
              autoCapitalize={"none"}
              rules={{
                ...REGISTER_FIELD_RULES["confirmPassword"],
                validate: (value: string) =>
                  value === password || "Hasła nie są identyczne",
              }}
            />
          </View>
        </View>
        <AppButton
          variant={"secondary"}
          label={"Zarejestruj się"}
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        />
        <View className="w-full mt-4 justify-center align-center">
          <Text className="my-4 text-center text-white">Masz już konto?</Text>
          <Link href={"./sign-in"} replace={true}>
            <Text className="text-center color-blue-600 text-lg font-semibold underline">
              Zaloguj się
            </Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
