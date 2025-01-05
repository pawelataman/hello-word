import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import { Control, Controller } from "react-hook-form";
import Envelope from "@/components/ui/svg/Envelope";
import { useRef, useState } from "react";
import EyeOn from "@/components/ui/svg/EyeOn";
import EyeOff from "@/components/ui/svg/EyeOff";

interface FormInputProps extends TextInputProps {
  control: Control<any>;
  name: string;
  rules?: Record<string, any>;
  type?: "email" | "secured";
}
export default function (props: FormInputProps) {
  const inputRef = useRef<TextInput | null>(null);
  const [isSecured, setIsSecured] = useState<boolean>(
    props?.type === "secured",
  );

  const handleSecureText = () => {
    setIsSecured(!isSecured);
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error, isTouched },
      }) => (
        <View>
          <Pressable
            onPress={() => {
              inputRef?.current?.focus();
            }}
            className={`px-4 gap-2 flex-row items-center h-16 w-auto rounded-[1000px] border ${error && isTouched ? "border-red-500 bg-red-100" : "border-white bg-white"}`}
          >
            {props?.type === "email" && <Envelope />}

            <TextInput
              {...props}
              ref={inputRef}
              textContentType="none"
              secureTextEntry={isSecured}
              multiline={false}
              numberOfLines={1}
              scrollEnabled={false}
              onChangeText={onChange}
              onBlur={onBlur}
              selectTextOnFocus={false}
              autoCapitalize={"none"}
              autoCorrect={false}
              value={value}
              className={`placeholder:text-gray-300 color-black text-xl max-h-16 flex-1`}
            />
            {props?.type === "secured" && (
              <Pressable onPress={handleSecureText}>
                {!isSecured && <EyeOn />}
                {isSecured && <EyeOff />}
              </Pressable>
            )}
          </Pressable>
          {error && isTouched && (
            <Text className="text-red-500">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}
