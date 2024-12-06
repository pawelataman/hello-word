import { Text, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { VerifyEmailFields } from "@/core/models/auth";
import React, { ReactNode } from "react";
import OTP from "@/components/ui/OTP";
import AppButton from "@/components/ui/AppButton";

interface VerifyEmailProps {
  onSubmit: (data: VerifyEmailFields) => void;
  onResend: () => void;
  data: {
    email: string;
  };
  onBack: () => void;
  children?: ReactNode;
}

const OTPRule = {
  required: true,
  minLength: {
    value: 6,
    message: "Kod musi mieć 6 znaków",
  },
  maxLength: {
    value: 6,
    message: "Kod musi mieć 6 znaków",
  },
};

export default function ({
  onSubmit,
  data,
  onResend,
  onBack,
  children,
}: VerifyEmailProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<VerifyEmailFields>();

  const handleBack = () => {
    reset({ code: "" });
    onBack();
  };

  return (
    <View className="h-full justify-between p-4">
      <View>
        <Text className={"text-center font-semibold text-xl"}>
          Sprawdź email
        </Text>
        <Text className={"text-center text-m"}>Wysłaliśmy kod na adres:</Text>
        <Text className={"text-center text-m"}>{data.email}</Text>
      </View>
      <View className="mb-8">
        <Controller
          name="code"
          rules={OTPRule}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <OTP
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              length={OTPRule.maxLength.value}
            />
          )}
        ></Controller>
      </View>
      <View>
        <Text className={"text-center"}>
          Kod nie dotarł? &nbsp;
          <Text
            onPress={onResend}
            className={"font-bold underline text-green-600"}
          >
            Wyślij ponownie kod
          </Text>
        </Text>
      </View>
      <View>
        {children}
        <View className="mb-8 flex-row gap-2">
          <View className={"flex-1"}>
            <AppButton
              variant={"secondary"}
              onPress={handleBack}
              label="Wróć"
            />
          </View>
          <AppButton
            variant={"primary"}
            onPress={handleSubmit(onSubmit)}
            label="Zweryfikuj e-mail"
            disabled={!isValid}
          />
        </View>
      </View>
    </View>
  );
}
