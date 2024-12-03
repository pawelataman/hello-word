import { Text, View } from "react-native";
import FormInput from "@/components/ui/FormInput";
import AppButton from "@/components/ui/AppButton";
import { Link } from "expo-router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { EMAIL_PATTERN } from "@/constants/auth";
import { RegisterFields } from "@/models/auth";

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
      value: 3,
      message: "Minimalna długość to 3 znaki",
    },
    required: "Pole jest wymagane",
  },
  confirmPassword: {
    minLength: {
      value: 3,
      message: "Minimalna długość to 3 znaki",
    },
    required: "Pole jest wymagane",
  },
};

interface RegisterProps {
  onSubmit: (data: RegisterFields) => void;
}

export default function ({ onSubmit }: RegisterProps) {
  const { control, formState, watch, handleSubmit } = useForm<RegisterFields>({
    defaultValues: {
      email: "",
      confirmPassword: "",
      password: "",
    },
    mode: "onChange",
  });

  const password = watch("password");

  return (
    <View className="justify-start h-full p-4">
      <View>
        <View className={"mb-4"}>
          <FormInput
            control={control}
            name={"email"}
            placeholder={"Email"}
            keyboardType={"email-address"}
            autoCapitalize={"none"}
            rules={REGISTER_FIELD_RULES["email"]}
          />
        </View>
        <View className={"mb-4"}>
          <FormInput
            control={control}
            name={"password"}
            placeholder={"Hasło"}
            autoCapitalize={"none"}
            secureTextEntry
            rules={REGISTER_FIELD_RULES["password"]}
          />
        </View>
        <View className={"mb-8"}>
          <FormInput
            control={control}
            name={"confirmPassword"}
            placeholder={"Potwierdź hasło"}
            autoCapitalize={"none"}
            secureTextEntry
            rules={{
              ...REGISTER_FIELD_RULES["confirmPassword"],
              validate: (value: string) =>
                value === password || "Hasła nie są identyczne",
            }}
          />
        </View>
      </View>
      <AppButton
        variant={"primary"}
        label="Zarejestruj się"
        disabled={!formState.isValid}
        onPress={handleSubmit(onSubmit)}
      ></AppButton>

      <View className="w-full mt-8 justify-center align-center">
        <Text className="my-4 text-center">Masz już konto?</Text>
        <Link href={"./sign-in"} replace={true}>
          <Text className="text-center color-blue-500 text-l font-semibold underline">
            Zaloguj się
          </Text>
        </Link>
      </View>
    </View>
  );
}
