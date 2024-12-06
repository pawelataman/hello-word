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
            placeholderTextColor={"rgba(255,255,255,0.64)"}
            className={` text-white bg-transparent border-b text-xl block w-full h-16 p-4 mb-1 border-white ${props.className}`}
          />
          {error && isTouched && (
            <Text className="text-white mb-2">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}
