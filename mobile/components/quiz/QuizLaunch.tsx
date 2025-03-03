import { Text, TouchableOpacity, View } from "react-native";
import { Language, QuizConfig, QuizMode } from "@/core/models/models";
import { useMemo } from "react";
import { ICON_FOR_MODE, QUIZ_CONFIG } from "@/core/constants/quiz";

interface QuizLaunchProps {
  language: Language;
  onChange: (opt: { language: Language; mode: QuizMode }) => void;
}
export default function ({ language, onChange }: QuizLaunchProps) {
  const config: QuizConfig = useMemo(() => {
    return QUIZ_CONFIG[language.code];
  }, [language]);

  const selectMode = (mode: QuizMode) => {
    onChange({ mode, language });
  };

  return (
    <View className={`w-full h-auto pb-12 pt-4 px-4 gap-8`}>
      <Text className={"text-center font-semibold text-xl "}>Wybierz tryb</Text>
      <View className={"flex-row justify-around items-center"}>
        {config.availableModes.map((mode, index) => (
          <View key={index}>
            <TouchableOpacity
              className={"w-32 h-32"}
              onPress={() => selectMode(mode)}
            >
              <View
                className={
                  "bg-green-500 items-center justify-center rounded-2xl w-full h-full"
                }
              >
                {ICON_FOR_MODE[mode].icon}
              </View>
            </TouchableOpacity>
            <Text className={"mt-2 font-semibold text-lg text-center"}>
              {ICON_FOR_MODE[mode].label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
