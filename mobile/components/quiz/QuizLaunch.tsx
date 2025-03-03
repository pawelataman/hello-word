import { Text, TouchableOpacity, View } from "react-native";
import { Language, QuizConfig, QuizMode } from "@/core/models/models";
import { ReactNode, useMemo } from "react";
import { QUIZ_CONFIG } from "@/core/constants/quiz";
import Hear from "@/assets/images/icons/hear.svg";
import ReadBook from "@/assets/images/icons/read-book.svg";
import Pen from "@/assets/images/icons/pen.svg";
import { COLORS } from "@/core/constants/tailwind-colors";

const ICON_FOR_MODE: { [p in QuizMode]: { label: string; icon: ReactNode } } = {
  hearing: {
    icon: <Hear color={COLORS.white} width={48} height={48} />,
    label: "Słuchanie",
  },
  reading: {
    icon: <ReadBook color={COLORS.white} width={48} height={48} />,
    label: "Czytanie",
  },
  writing: {
    icon: <Pen color={COLORS.white} width={48} height={48} />,
    label: "Pisanie",
  },
  none: { label: "Żaden", icon: null },
};

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
