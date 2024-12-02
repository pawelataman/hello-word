import { Text, View } from "react-native";
import FormInput from "@/components/ui/FormInput";
import AppButton from "@/components/ui/AppButton";
import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { VerifyEmailFields } from "@/models/auth";

interface VerifyEmailProps {
  onSubmit: (data: VerifyEmailFields) => void;
}
const VERIFY_EMAIL_FIELD_RULES = {
  code: {
    required: "Pole jest wymagane",
  },
};
export default function ({ onSubmit }: VerifyEmailProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<VerifyEmailFields>();
  return (
    <View className="justify-start h-full p-4">
      <View className="mb-4">
        <FormInput
          control={control}
          name={"code"}
          placeholder={"Kod weryfikacyjny"}
          autoCapitalize={"none"}
          rules={VERIFY_EMAIL_FIELD_RULES["code"]}
        />
      </View>

      <View className="mb-8">
        <AppButton
          variant="primary"
          label="Zweryfikuj email"
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <View className="w-full justify-center items-center">
        <Text className="my-4 text-center">Nie masz konta?</Text>
        <Link href="./sign-up" replace={true}>
          <Text className="text-center text-blue-500 text-lg font-semibold underline">
            Zarejestruj się
          </Text>
        </Link>
      </View>
    </View>
  );
}
