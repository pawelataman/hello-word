import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

interface QuizWritableAnswerSegmentProps {
	segment: string;
	index: number;
	onChange: (value: string, index: number) => void;
}

export default function({ segment, index, onChange }: QuizWritableAnswerSegmentProps) {

	const segmentLength = segment.length;
	const {
		control,
		setValue,
		watch,
	} = useForm<{ segment: string }>({ defaultValues: { segment: '' } });

	const value = watch('segment');
	const ref = useBlurOnFulfill({ value, cellCount: segmentLength });
	const [{ onPressOut }, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue(text: string) {
			setValue('segment', text.toLowerCase());
		},
	});

	useEffect(() => {
		onChange(value, index);
	}, [value]);

	return <Controller
		name="segment"
		rules={{ required: true }}
		control={control}
		render={({ field: { onChange, onBlur, value } }) => (
			<CodeField
				ref={ref}
				onPressOut={onPressOut}
				onBlur={onBlur}
				value={value}
				onChangeText={onChange}
				cellCount={segmentLength}
				keyboardType={'ascii-capable'}
				autoCapitalize={'none'}
				autoFocus={index === 0}
				rootStyle={styles.codeFieldRoot}
				inputMode={'text'}
				renderCell={({ index, symbol, isFocused }) =>
					<View
						key={index}
						onLayout={getCellOnLayoutHandler(index)}
						className={`w-8 h-10 flex-row content-center items-center px-1`}
					>
						<View
							className={`w-full h-full ${isFocused ? 'border-b-green-500 border-b-[3px]' : 'border-b-gray-400 border-b-2'}`}
						>
							<View className="relative">
								<Text className="color-black text-3xl font-bold text-center">
									{symbol}
								</Text>
							</View>
						</View>
					</View>
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
		//flexWrap: 'wrap',
		justifyContent: 'center',
		rowGap: 18,
	},
});
