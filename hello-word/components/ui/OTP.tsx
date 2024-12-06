import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

interface OTPInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  length: number;
}

export default function (props: OTPInputProps) {
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();
  const [value, setValue] = useState<string>(props.value);
  const ref = useBlurOnFulfill({ value, cellCount: props.length });

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleChangeText = useCallback(
    (value: string) => {
      setValue(value);
      props.onChangeText(value);
    },
    [setValue, props.onChangeText],
  );

  const [clearByFocusProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: handleChangeText,
  });

  const handleOnFocus = useCallback(
    () => (shouldHandleKeyboardEvents.value = true),

    [shouldHandleKeyboardEvents],
  );

  const handleOnBlur = useCallback(() => {
    shouldHandleKeyboardEvents.value = false;
    if (props.onBlur) {
      props.onBlur();
    }
  }, [shouldHandleKeyboardEvents]);

  useEffect(() => {
    return () => {
      shouldHandleKeyboardEvents.value = false;
    };
  }, [shouldHandleKeyboardEvents]);

  return (
    <CodeField
      ref={ref}
      {...clearByFocusProps}
      value={value}
      cellCount={props.length}
      onChangeText={handleChangeText}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <View
          onLayout={getCellOnLayoutHandler(index)}
          key={index}
          className={`w-14 h-12 content-center items-center px-2`}
        >
          <View
            className={`w-full h-full ${isFocused ? "border-b-green-500 border-b-[3px]" : "border-b-gray-400 border-b-2"}`}
          >
            <Text className="color-black text-5xl font-bold text-center">
              {symbol}
            </Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },

  cellText: {
    color: "black",
    fontSize: 36,
    fontWeight: "semibold",
    textAlign: "center",
  },
});
