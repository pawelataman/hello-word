import { StyleSheet, Text, View } from 'react-native';
import { Word } from '@/core/api/models/quiz';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LANG_EN } from '@/core/constants/common';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

interface AnswerInputProps {
	answer: Word,
	onSubmit: (ans: Word) => void
}

export default function({ answer, onSubmit }: AnswerInputProps) {
	const length = answer[LANG_EN.code].length;
	const {
		control,
		handleSubmit,
		formState: { isValid },
		reset,
		setValue,
		watch,
	} = useForm<{ answer: string }>();

	const value = watch('answer');
	const ref = useBlurOnFulfill({ value, cellCount: length });

	const [clearByFocusProps, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue(text: string) {
			setValue('answer', text.toLowerCase());
		},
	});

	return <Controller
		name="answer"
		rules={{ required: true }}
		control={control}
		render={({ field: { onChange, onBlur, value } }) => (
			<CodeField
				ref={ref}
				{...clearByFocusProps}
				onBlur={onBlur}
				value={value}
				onChangeText={onChange}
				cellCount={length}
				keyboardType={'ascii-capable'}
				autoCapitalize={'none'}
				autoFocus={true}
				rootStyle={styles.codeFieldRoot}
				textContentType={'none'}
				renderCell={({ index, symbol, isFocused }) => {

					return symbol !== ' ' ? <View
						onLayout={getCellOnLayoutHandler(index)}
						key={index}
						className={`w-14 h-12 content-center items-center px-2`}
					>
						<View
							className={`w-full h-full ${isFocused ? 'border-b-green-500 border-b-[3px]' : 'border-b-gray-400 border-b-2'}`}
						>
							<Text className="color-black text-5xl font-bold text-center">
								{symbol}
							</Text>
						</View>
					</View> : <View className="w-8 h-1"><Text>A</Text></View>;
				}
				}
			/>
		)}
	/>;
}

const styles = StyleSheet.create({
	codeFieldRoot: {
		marginTop: 20,
		marginLeft: 'auto',
		marginRight: 'auto',
	},

	cellText: {
		color: 'black',
		fontSize: 36,
		fontWeight: 'semibold',
		textAlign: 'center',
	},
});
