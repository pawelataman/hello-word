import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { router, Tabs } from "expo-router";
import { Language, QuizMode } from "@/core/models/models";
import { LANG_EN, LANG_PL } from "@/core/constants/common";
import PL from "@/assets/images/icons/PL.svg";
import EN from "@/assets/images/icons/GB.svg";
import { useQueryClient } from "@tanstack/react-query";
import { useQuizStore } from "@/core/state/quiz.state";
import { bottomSheetBackdrop } from "@/components/ui/BottomSheetBackDrop";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import * as React from "react";
import { useRef, useState } from "react";
import QuizLaunch from "@/components/quiz/QuizLaunch";
import { Portal } from "@gorhom/portal";

interface QuizOptions {
  language: Language;
}

const LANG_OPTIONS = [
  {
    lang: LANG_PL,
    icon: <PL width={64} height={48} />,
  },
  {
    lang: LANG_EN,
    icon: <EN width={64} height={48} />,
  },
];

export default function () {
  const queryClient = useQueryClient();
  const { setQuizMetadata } = useQuizStore();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [quizLanguage, setQuizLanguage] = useState<Language>(LANG_EN);

  const onPickQuizLaguage = (quizOptions: QuizOptions): void => {
    setQuizLanguage(quizOptions.language);
    bottomSheetRef.current?.expand();
  };

  const modeChanged = (opt: { language: Language; mode: QuizMode }) => {
    bottomSheetRef.current?.close();
    queryClient.clear(); // clear queryClient cache

    setQuizMetadata({
      mode: opt.mode,
      language: opt.language.code,
    });
    router.push({
      pathname: "/quiz",
    });
  };

  return (
    <View className="bg-gray-200">
      <Tabs.Screen options={{ title: "Rozpocznij Quiz!" }}></Tabs.Screen>
      <SafeAreaView>
        <View className="p-5 bg-white h-full">
          <View className="gap-6">
            {LANG_OPTIONS.map((opt) => (
              <TouchableOpacity
                className=" gap-2 p-4 flex-row items-center justify-between bg-gray-100  rounded-2xl relative"
                key={opt.lang.code}
                onPress={() => onPickQuizLaguage({ language: opt.lang })}
              >
                <View>
                  <Text
                    className={"text-black font-semibold text-lg text-center"}
                  >
                    Przetłumacz na {opt.lang.label}
                  </Text>
                </View>
                <View>{opt.icon}</View>
              </TouchableOpacity>
            ))}
          </View>

          <Portal>
            <BottomSheet
              ref={bottomSheetRef}
              index={-1}
              backdropComponent={bottomSheetBackdrop}
              handleComponent={null}
            >
              <BottomSheetView>
                <QuizLaunch language={quizLanguage} onChange={modeChanged} />
              </BottomSheetView>
            </BottomSheet>
          </Portal>
        </View>
      </SafeAreaView>
    </View>
  );
}
