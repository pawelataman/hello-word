import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Language } from "@/models/models";
import { LANG_EN, LANG_PL } from "@/constants/common";
import WordOfTheDay from "@/components/home/WordOfTheDay";

interface OptionPayload {
  from: Language;
  to: Language;
}

const options = [
  {
    description: `${LANG_PL.label} - ${LANG_EN.label}`,
    payload: {
      from: LANG_PL,
      to: LANG_EN,
    } as OptionPayload,
  },
  {
    description: `${LANG_EN.label} - ${LANG_PL.label}`,
    payload: {
      from: LANG_EN,
      to: LANG_PL,
    } as OptionPayload,
  },
];

export default function () {
  const router = useRouter();

  const navigateToQuiz = (params: OptionPayload): void => {
    router.push({
      pathname: "/quiz",
      params: {
        sourceLangCode: params.from.code,
        targetLangCode: params.to.code,
      },
    });
  };

  return (
    <SafeAreaView>
      <View className="p-5 bg-white h-full">
        <Stack.Screen
          options={{ headerShown: false, title: "Start" }}
        ></Stack.Screen>
        <Text className="font-bold text-2xl text-center mb-2 text-black">
          {"Rozpocznij quiz"}
        </Text>
        <View className="flex-row gap-2.5">
          {options.map((opt) => (
            <TouchableOpacity
              className="flex-1 h-24 bg-gray-50 rounded-lg border-b-4 border-b-green-500 justify-center items-center"
              key={opt.description}
              onPress={() => navigateToQuiz(opt.payload)}
            >
              <View>
                <Text>{opt.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View className="mt-5">
          <WordOfTheDay />
        </View>
      </View>
    </SafeAreaView>
  );
}
