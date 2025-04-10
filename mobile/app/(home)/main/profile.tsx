import { Image, Text, View } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import AppButton from "@/components/ui/AppButton";
import { extractClerkErrorMessage } from "@/utils/clerk";
import { useToast } from "@/core/hooks/useToast";
import { useAppStore } from "@/core/state/app.state";
import { useRouter } from "expo-router";

export default function () {
  const { user } = useUser();
  const { showToast } = useToast();
  const { setIsLoading } = useAppStore();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut();
      router.replace("/");
    } catch (e) {
      showToast(extractClerkErrorMessage(e), "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className={"flex-1 bg-gray-200 p-4 justify-between"}>
      <View className="w-full gap-4 items-center">
        <Image
          className="w-32 h-32 rounded-full border-2 border-green-100"
          src={user?.imageUrl}
          alt="Bordered avatar"
        />
        <Text className="font-semibold text-xl">
          {user?.emailAddresses[0].emailAddress}
        </Text>
      </View>
      <AppButton
        variant={"tertiary"}
        label={"Wyloguj"}
        onPress={() => handleLogout()}
      ></AppButton>
    </View>
  );
}
