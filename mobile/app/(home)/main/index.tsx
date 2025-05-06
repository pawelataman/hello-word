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
    icon: <PL width={250} height={200} />,
  },
  {
    lang: LANG_EN,
    icon: <EN width={250} height={200} />,
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
    <View>
      <Tabs.Screen options={{ title: "Rozpocznij Quiz!" }}></Tabs.Screen>
      <SafeAreaView>
        <View className="p-5 bg-gray-100 h-full">
          <View className="gap-8 h-full items-center justify-center">
            {LANG_OPTIONS.map((opt) => (
              <TouchableOpacity
                onPress={() => onPickQuizLaguage({ language: opt.lang })}
              >
                {opt.icon}
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
