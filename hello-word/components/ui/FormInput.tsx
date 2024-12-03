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
            className={`bg-gray-50 border text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-16 p-4 ${error && isTouched ? "border-red-500" : "border-gray-300"}`}
          />
          {error && isTouched && (
            <Text className="text-red-500 mb-2">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}
