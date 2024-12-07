import { Text, TextInput, TextInputProps, View } from "react-native";
import { Control, Controller } from "react-hook-form";

interface FormInputProps extends TextInputProps {
  control: Control<any>;
  name: string;
  rules?: Record<string, any>;
}
export default function (props: FormInputProps) {
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
          <TextInput
            {...props}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholderTextColor={"rgba(255,255,255,0.5)"}
            className={` text-white bg-transparent border-b-2 text-xl block w-full h-16 p-4 mb-1 ${error && isTouched ? "border-red-500" : "border-white"} ${props.className}`}
          />
          {error && isTouched && (
            <Text className="text-red-500 mb-2">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}
