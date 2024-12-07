import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FormInput from "@/components/auth/FormInput";
import { Link } from "expo-router";
import * as React from "react";
import { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import { EMAIL_PATTERN } from "@/core/constants/auth";
import { RegisterFields } from "@/core/models/auth";

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
  children?: ReactNode;
}

export default function ({ onSubmit, children }: RegisterProps) {
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
              rules={REGISTER_FIELD_RULES["email"]}
              className={"text-white"}
            />
          </View>
          <View className={"mb-4"}>
            <FormInput
              control={control}
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
              placeholder={"Potwierdź hasło"}
              autoCapitalize={"none"}
              rules={{
                ...REGISTER_FIELD_RULES["confirmPassword"],
                validate: (value: string) =>
                  value === password || "Hasła nie są identyczne",
              }}
            />
          </View>
          {children}
        </View>
        <TouchableOpacity
          className={`px-10 py-5 rounded-lg  bg-white ${!isValid && "opacity-30"}`}
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="font-medium text-center text-xl text-green-600">
            Zarejestruj się
          </Text>
        </TouchableOpacity>

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
