import { Image, Text, View } from "react-native";
import { useUser } from "@clerk/clerk-expo";

export default function () {
  const { user } = useUser();
  return (
    <View className={"flex-1 bg-gray-200 p-4"}>
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
    </View>
  );
}
