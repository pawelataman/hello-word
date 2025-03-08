import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useQuizStore } from "@/core/state/quiz.state";
import { SPECIAL_CHARACTERS } from "@/core/constants/quiz";

interface QuizWritableAnswerSegmentProps {
  segment: string;
  index: number;
  onChange: (value: string, index: number) => void;
}

export default function ({
  segment,
  index,
  onChange,
}: QuizWritableAnswerSegmentProps) {
  const segmentLength = segment.length;
  const { quizRunData } = useQuizStore();
  const { control, setValue, watch, reset } = useForm<{ segment: string }>({
    defaultValues: { segment: "" },
  });

  const value = watch("segment");
  const ref = useBlurOnFulfill({ value, cellCount: segmentLength });
  const [{ onPressOut }, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue(text: string) {
      setValue("segment", text.toLowerCase());
    },
  });

  /* store map of indexes and corresponding special character */
  const specialCharacterMap = useMemo(() => {
    const map = new Map<number, string>();

    for (let i = 0; i < segment.length; i++) {
      if (SPECIAL_CHARACTERS.includes(segment.charAt(i))) {
        /* we basically need to subtract the number of already existing special characters
				 so later on we can just display special char after correct index */
        map.set(i - (map.size + 1), segment.charAt(i));
      }
    }

    return map;
  }, [segment]);

  useEffect(() => {
    const withSpecialCharacters = value
      .split("")
      .map((char, index) => {
        const specialChar = specialCharacterMap.get(index);
        if (specialChar) {
          return `${char}${specialChar}`;
        }
        return char;
      })
      .join("");

    onChange(withSpecialCharacters, index);
  }, [value]);

  useEffect(() => {
    reset();
  }, [quizRunData]);

  return (
    <Controller
      name="segment"
      rules={{ required: true }}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <CodeField
          ref={ref}
          onPressOut={onPressOut}
          onBlur={onBlur}
          value={value}
          onChangeText={onChange}
          cellCount={segmentLength - specialCharacterMap.size}
          keyboardType={"ascii-capable"}
          autoCapitalize={"none"}
          autoFocus={index === 0}
          rootStyle={styles.codeFieldRoot}
          inputMode={"text"}
          renderCell={({ index, symbol, isFocused }) => (
            <View
              key={index}
              onLayout={getCellOnLayoutHandler(index)}
              className={"flex-row items-center"}
            >
              <View
                className={`w-8 h-10 flex-row content-center items-center px-1`}
              >
                <View
                  className={`w-full h-full ${isFocused ? "border-b-green-500 border-b-[3px]" : "border-b-gray-400 border-b-2"}`}
                >
                  <View className="relative">
                    <Text className="color-black text-3xl font-bold text-center">
                      {symbol}
                    </Text>
                  </View>
                </View>
              </View>
              {specialCharacterMap.get(index) && (
                <Text className={"font-bold color-black text-center"}>
                  &nbsp;{specialCharacterMap.get(index)}&nbsp;
                </Text>
              )}
            </View>
          )}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    flexWrap: "wrap",
    rowGap: 18,
  },
});
