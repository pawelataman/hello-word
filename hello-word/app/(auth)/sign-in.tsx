import { Link } from "expo-router";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import AppButton from "@/components/ui/AppButton";

type LoginFields = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit", // Important for real-time validation
  });

  const onSubmit = (data: LoginFields) => {
    console.log(data);
    // Add your login logic here
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="justify-start h-full p-4">
        <View className="mb-4">
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email jest wymagany",
              minLength: {
                value: 3,
                message: "Minimalna długość to 3 znaki",
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Nieprawidłowy format emaila",
              },
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
              formState: { isSubmitted },
            }) => (
              <View>
                <TextInput
                  placeholder="Email"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  autoCapitalize={"none"}
                  autoFocus={true}
                  keyboardType={"email-address"}
                  className={`bg-gray-50 border text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-16 p-4 ${error && isSubmitted ? "border-red-500" : "border-gray-300"}`}
                />
                {isSubmitted && error && (
                  <Text className="text-red-500 mb-2">{error.message}</Text>
                )}
              </View>
            )}
          />
        </View>

        <View className="mb-8">
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Hasło jest wymagane",
              minLength: {
                value: 3,
                message: "Minimalna długość hasła to 3 znaki",
              },
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
              formState: { isSubmitted },
            }) => (
              <View>
                <TextInput
                  placeholder="Hasło"
                  secureTextEntry
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  className={`bg-gray-50 border text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-16 p-4 ${error && isSubmitted ? "border-red-500" : "border-gray-300"}`}
                />
                {isSubmitted && error && (
                  <Text className="text-red-500 mb-2">{error.message}</Text>
                )}
              </View>
            )}
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
          <Link href="./sign-up">
            <Text className="text-center text-blue-500 text-lg font-semibold underline">
              Zarejestruj się
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
