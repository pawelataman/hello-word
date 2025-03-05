import React, { useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LANG_DATA, LanguageCode } from "@/core/constants/common";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { QuizConfig, QuizMode } from "@/core/models/models";
import AppButton from "@/components/ui/AppButton";
import GB from "@/assets/images/icons/GB.svg";
import PL from "@/assets/images/icons/PL.svg";
import { ICON_FOR_MODE, QUIZ_CONFIG } from "@/core/constants/quiz";

interface QuizStarterForm {
  language: LanguageCode;
  mode: QuizMode;
}

interface QuizStarterProps {
  onStartQuiz: (mode: QuizMode, language: LanguageCode) => void;
}

const width = Dimensions.get("window").width;

export default function ({ onStartQuiz }: QuizStarterProps) {
  const ref = React.useRef<ICarouselInstance>(null);
  const [starterData, setStarterData] = useState<QuizStarterForm>({
    language: LanguageCode.PL,
    mode: "reading",
  });

  const onLanguageSelected = (form: QuizStarterForm) => {
    setStarterData({ ...starterData, language: form.language });
    ref.current?.next();
  };

  const onModeSelected = (form: QuizStarterForm) => {
    onStartQuiz(form.mode, form.language);
  };

  const steps = useMemo(() => {
    return [
      {
        View: QuizStarterLanguagePicker,
        next: onLanguageSelected,
        prev: () => {},
      },
      {
        View: QuizStarterModePicker,
        next: onModeSelected,
        prev: () => {
          ref.current?.prev();
        },
      },
    ];
  }, []);

  return (
    <SafeAreaView className={"bg-gray-100 rounded-t-xl"}>
      <Carousel
        ref={ref}
        width={width}
        height={width / 2}
        enabled={false}
        data={steps}
        loop={false}
        renderItem={({ index, item: Step }) => (
          <View className={"p-4"}>
            <Step.View
              form={starterData}
              prev={Step.prev}
              next={Step.next}
              key={index}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

interface StarterStepProps {
  form: QuizStarterForm;
  next: (form: QuizStarterForm) => void;
  prev: () => void;
}

const QuizStarterLanguagePicker = function ({
  form,
  next,
  prev,
}: StarterStepProps) {
  const [lang, setLang] = useState<LanguageCode>(form.language);
  const selectedClass = "border-green-500";

  const onNext = useCallback(() => {
    next({ ...form, language: lang });
  }, [lang]);

  return (
    <View className={"gap-8 bg-gray-100 rounded-t-xl justify-evenly"}>
      <View className={"justify-evenly items-center flex-row"}>
        <Pressable
          onPress={() => setLang(LanguageCode.PL)}
          className={`border-4 overflow-hidden w-16 h-16 justify-center items-center rounded-full relative ${lang === LanguageCode.PL ? selectedClass : "border-gray-100"}`}
        >
          <PL height={60} width={84} />
        </Pressable>
        <Pressable
          onPress={() => setLang(LanguageCode.EN)}
          className={`border-4 overflow-hidden w-16 h-16 justify-center items-center rounded-full relative ${lang === LanguageCode.EN ? selectedClass : "border-gray-100"}`}
        >
          <GB height={60} width={84}></GB>
        </Pressable>
      </View>
      <Text className={"text-center font-semibold text-lg"}>
        Przetłumacz na {LANG_DATA[lang].label}
      </Text>
      <View className={"flex-row justify-center"}>
        <AppButton
          variant={"primary"}
          onPress={onNext}
          label={"Dalej"}
        ></AppButton>
      </View>
    </View>
  );
};

const QuizStarterModePicker = function ({
  form,
  next,
  prev,
}: StarterStepProps) {
  const [mode, setMode] = useState<QuizMode>(form.mode);
  const onNext = useCallback(() => {
    next({ ...form, mode: mode });
  }, [mode, form]);

  const config: QuizConfig = useMemo(() => {
    return QUIZ_CONFIG[form.language];
  }, [form]);

  const onSelectMode = (mode: QuizMode) => {
    setMode(mode);
  };

  const selectedClass = useCallback(
    (itemMode: QuizMode) => {
      return mode === itemMode ? "border-green-500" : "border-transparent";
    },
    [mode],
  );

  return (
    <View className={"gap-10"}>
      <View className={"flex-row justify-around items-center"}>
        {config.availableModes.map((mode, index) => (
          <View key={index}>
            <TouchableOpacity
              className={"w-20 h-20"}
              onPress={() => onSelectMode(mode)}
            >
              <View
                className={`bg-white items-center justify-center rounded-2xl w-full h-full border-4 ${selectedClass(mode)}`}
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
      <View className={"flex-row justify-center gap-2"}>
        <AppButton
          variant={"tertiary"}
          onPress={prev}
          label={"Cofnij"}
        ></AppButton>
        <AppButton
          variant={"primary"}
          onPress={onNext}
          label={"Rozpocznij"}
        ></AppButton>
      </View>
    </View>
  );
};
