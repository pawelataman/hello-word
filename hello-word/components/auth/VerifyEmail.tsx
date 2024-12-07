import { Text, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { VerifyEmailFields } from "@/core/models/auth";
import React from "react";
import OTP from "@/components/ui/OTP";
import AppButton from "@/components/ui/AppButton";
import Envelope from "@/components/ui/svg/Envelope";

interface VerifyEmailProps {
  onSubmit: (data: VerifyEmailFields) => void;
  onResend: () => void;
  data: {
    email: string;
  };
  onBack: () => void;
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
        <View className={"items-center"}>
          <Envelope width={48} height={48} />

          <Text className={"text-center text-m font-semibold"}>
            Kod wysłany do:&nbsp;
            <Text className={"text-center text-lg font-bold"}>
              {data.email}
            </Text>
          </Text>
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
      </View>
      <View>
        <View className="flex-row gap-2">
          <View className={"flex-1"}>
            <AppButton variant={"tertiary"} onPress={handleBack} label="Wróć" />
          </View>
          <View className={"flex-1"}>
            <AppButton
              variant={"primary"}
              onPress={handleSubmit(onSubmit)}
              label="Zweryfikuj"
              disabled={!isValid}
            />
          </View>
        </View>
      </View>
      <View className={"my-8"}>
        <Text className={"text-center"}>
          Kod nie dotarł? &nbsp;
          <Text
            onPress={onResend}
            className={"font-bold underline text-green-600"}
          >
            Wyślij ponownie
          </Text>
        </Text>
      </View>
    </View>
  );
}
