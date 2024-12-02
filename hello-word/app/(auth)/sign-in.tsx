import { SafeAreaView } from "react-native";
import { LoginFields } from "@/models/auth";
import Login from "@/components/auth/Login";
import { useSignIn } from "@clerk/clerk-expo";

export default function LoginPage() {
  const { isLoaded, signIn, setActive } = useSignIn();

  const onSubmitLogin = async (data: LoginFields) => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <Login onSubmit={onSubmitLogin} />
    </SafeAreaView>
  );
}
