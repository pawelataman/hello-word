import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FormInput from "@/components/auth/FormInput";
import { Link } from "expo-router";
import { EMAIL_PATTERN } from "@/core/constants/auth";
import { useForm } from "react-hook-form";
import { LoginFields } from "@/core/models/auth";
import React, { ReactNode } from "react";

const LOGIN_FIELDS_RULES = {
  password: {
    minLength: {
      value: 8,
      message: "Hasło zbyt krótke",
    },
    required: "Pole jest wymagane",
  },
  email: {
    required: "Pole jest wymagane",
    pattern: {
      value: EMAIL_PATTERN,
      message: "Nieprawidłowy format e-mail",
    },
  },
};

interface LoginProps {
  onSubmit: (data: LoginFields) => void;
  children?: ReactNode;
}
export default function ({ onSubmit, children }: LoginProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // Important for real-time validation
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="p-4">
        <View className="mb-4">
          <FormInput
            control={control}
            autoComplete={"off"}
            autoCorrect={false}
            name={"email"}
            placeholder={"Email"}
            keyboardType={"email-address"}
            autoCapitalize={"none"}
            rules={{ ...LOGIN_FIELDS_RULES["email"] }}
            className={"bg-red-50"}
          />
        </View>

        <View className="mb-8">
          <FormInput
            control={control}
            name={"password"}
            secureTextEntry
            placeholder={"Hasło"}
            rules={{ ...LOGIN_FIELDS_RULES["password"] }}
          />
        </View>

        {children}

        <View className="mb-8">
          <TouchableOpacity
            className={`px-10 py-5 rounded-lg  bg-white ${!isValid && "opacity-30"}`}
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="font-medium text-center text-xl text-green-600">
              Zaloguj sie
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-full justify-center items-center">
          <Text className="my-4 text-center text-white">Nie masz konta?</Text>
          <Link href="./sign-up" replace={true}>
            <Text className="text-center text-blue-600 text-lg font-semibold underline">
              Zarejestruj się
            </Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
