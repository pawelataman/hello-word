import { Text, View } from "react-native";
import { Image } from "expo-image";
import PlaybackWord from "@/components/ui/PlaybackWord";

export default function () {
  return (
    <View className="pt-5 rounded-3xl h-48 bg-gray-50">
      <Text className="text-center font-bold text-lg">Słówko na dziś</Text>

      <View className="mt-6 px-5 flex-row justify-around">
        <View className="flex-row items-center gap-2.5">
          <View className="gap-1">
            <Image
              style={{ width: 28, height: 20 }}
              source={require("@/assets/images/icons/gb.png")}
            />
            <Text className="font-semibold text-base">Ship</Text>
            <Text className="text-gray-500">Noun</Text>
          </View>
          <PlaybackWord word="Ship" lang="en" />
        </View>

        <View className="flex-row items-center gap-2.5">
          <View className="gap-1">
            <Image
              style={{ width: 28, height: 20 }}
              source={require("@/assets/images/icons/pl.png")}
            />
            <Text className="font-semibold text-base">Statek</Text>
            <Text className="text-gray-500">Rzeczownik</Text>
          </View>
          <PlaybackWord word="Statek" lang="pl" />
        </View>
      </View>
    </View>
  );
}
