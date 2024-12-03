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
            className={`bg-transparent border-b placeholder:text-white text-white text-xl    block w-full h-16 p-4 mb-1  border-white`}
          />
          {error && isTouched && (
            <Text className="text-white mb-2">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}
