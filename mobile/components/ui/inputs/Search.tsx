import { TextInput, TextInputProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Tw from 'twrnc';
import { useState } from 'react';

export default function({ placeholder, value, onChangeText }: TextInputProps) {
	const [internalValue, setInternalValue] = useState(value);

	return (
		<View className={'flex-1 bg-white p-2 rounded-xl flex-row gap-2'}>
			<Ionicons name={'search'} color="green" size={20}
					  style={Tw`text-gray-400`} />
			<TextInput className={'flex-1'} autoCapitalize={'none'} placeholder={placeholder}
					   value={internalValue}
					   autoFocus={true}
					   onChangeText={(val: string) => {
						   setInternalValue(val);
						   onChangeText && onChangeText(val);
					   }}></TextInput>
		</View>
	);
}