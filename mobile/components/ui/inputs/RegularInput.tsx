import { TextInput, TextInputProps } from "react-native";
import { useState } from "react";

export default function ({
  placeholder,
  value,
  onChangeText,
  inputMode,
  className,
  ...props
}: TextInputProps) {
  const [internalValue, setInternalValue] = useState(value);
  const [focus, setFocus] = useState(false);

  return (
    <TextInput
      className={`text-lg bg-white rounded-xl h-12 px-4 ${className} ${focus && "border-[1px] border-green-500"}`}
      autoCapitalize={"none"}
      placeholder={placeholder}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      value={internalValue}
      autoFocus={props.autoFocus}
      inputMode={inputMode}
      onChangeText={(val: string) => {
        setInternalValue(val);
        onChangeText && onChangeText(val);
      }}
    />
  );
}
