import { KeyboardAvoidingView, Platform, View } from "react-native";
import FormInput from "@/components/auth/FormInput";
import { EMAIL_PATTERN } from "@/core/constants/auth";
import { useForm } from "react-hook-form";
import { LoginFields } from "@/core/models/auth";
import React from "react";
import AppButton from "@/components/ui/AppButton";

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
}
export default function ({ onSubmit }: LoginProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-100}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="p-4">
        <View className="mb-4">
          <FormInput
            control={control}
            name={"email"}
            type={"email"}
            placeholder={"Email"}
            keyboardType={"email-address"}
            rules={{ ...LOGIN_FIELDS_RULES["email"] }}
          />
        </View>

        <View className="mb-8">
          <FormInput
            control={control}
            name={"password"}
            type={"secured"}
            placeholder={"Hasło"}
            rules={{ ...LOGIN_FIELDS_RULES["password"] }}
          />
        </View>

        <View className="mb-8">
          <AppButton
            variant={"secondary"}
            label={"Zaloguj się"}
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
