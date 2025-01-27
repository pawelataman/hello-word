import { TextInput, TextInputProps } from 'react-native';
import { useState } from 'react';

export default function({ placeholder, value, onChangeText, inputMode }: TextInputProps) {
	const [internalValue, setInternalValue] = useState(value);

	return (
		<TextInput className={'text-lg bg-white rounded-xl h-12 px-4'} autoCapitalize={'none'}
				   placeholder={placeholder}
				   value={internalValue}
				   autoFocus={true}
				   inputMode={inputMode}
				   onChangeText={(val: string) => {
					   setInternalValue(val);
					   onChangeText && onChangeText(val);
				   }}></TextInput>
	);
}