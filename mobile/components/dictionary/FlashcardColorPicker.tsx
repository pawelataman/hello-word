import { SafeAreaView, View } from "react-native";
import ColorPicker, {
  ColorPickerRef,
  Panel5,
  Swatches,
} from "reanimated-color-picker";
import AppButton from "@/components/ui/AppButton";
import React, { useEffect, useRef, useState } from "react";

interface FlashcardColorPickerProps {
  currentColor: string;
  onSelectColor: (color?: string) => void;
}
// do i even need this component ? maybe inline hue select would be sufficient
export default function ({
  currentColor,
  onSelectColor,
}: FlashcardColorPickerProps) {
  const [color, setColor] = useState<string>(currentColor);
  const colorPickerRef = useRef<ColorPickerRef>(null);

  useEffect(() => {
    colorPickerRef.current?.setColor(currentColor);
  }, []);

  return (
    <SafeAreaView>
      <View className={"p-8"}>
        <ColorPicker
          ref={colorPickerRef}
          value="red"
          onComplete={({ hex }) => {
            setColor(hex);
          }}
        >
          <View className={"gap-4"}>
            <Panel5 />
            <Swatches />
            <View className={"flex-row gap-2"}>
              <AppButton
                className={"flex-1"}
                variant={"tertiary"}
                onPress={() => onSelectColor()}
                label={"Anuluj"}
              />
              <AppButton
                variant={"primary"}
                label={"Wybierz kolor"}
                onPress={() => onSelectColor(color)}
              />
            </View>
          </View>
        </ColorPicker>
      </View>
    </SafeAreaView>
  );
}
