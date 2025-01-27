import { StyleSheet, View } from 'react-native';
import RegularInput from '@/components/ui/inputs/RegularInput';
import AppButton from '@/components/ui/AppButton';
import { useMemo, useState } from 'react';

interface AddCategoryProps {
	close: () => void;
}

export default function({ close }: AddCategoryProps) {
	const [categoryName, setCategoryName] = useState<string>('');

	const isValid = useMemo(() => {
		return categoryName.length > 0;
	}, [categoryName]);

	return (
		<View className={'w-[95%] rounded-xl p-6  gap-8 bg-gray-100'}>
			<RegularInput value={categoryName} onChangeText={(name) => setCategoryName(name.trim())}
						  placeholder={'Nazwa kategori'} />
			<View className={'flex-row gap-4 justify-end'}>
				<AppButton onPress={close} label={'Anuluj'} variant={'tertiary'} />

				<AppButton onPress={() => {
				}} label={'Dodaj'} variant={'primary'} disabled={!isValid} />

			</View>

		</View>
	);
}

const styles = StyleSheet.create({});