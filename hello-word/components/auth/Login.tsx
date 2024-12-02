import { Text, View } from "react-native";
import FormInput from "@/components/ui/FormInput";
import AppButton from "@/components/ui/AppButton";
import { Link } from "expo-router";
import { EMAIL_PATTERN } from "@/constants/auth";
import { useForm } from "react-hook-form";
import { LoginFields } from "@/models/auth";

const LOGIN_FIELDS_RULES = {
  password: {
    minLength: {
      value: 3,
      message: "Minimalna długość to 3",
    },
    required: {
      value: true,
      message: "Pole jest wymagane",
    },
  },
  email: {
    required: {
      value: true,
      message: "Pole jest wymagane",
    },
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
    formState: { isValid, errors },
  } = useForm<LoginFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // Important for real-time validation
  });

  return (
    <View className="justify-start h-full p-4">
      <View className="mb-4">
        <FormInput
          control={control}
          name={"email"}
          placeholder={"Email"}
          keyboardType={"email-address"}
          autoCapitalize={"none"}
          rules={{ ...LOGIN_FIELDS_RULES["email"] }}
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

      <View className="mb-8">
        <AppButton
          variant="primary"
          label="Zaloguj się"
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
