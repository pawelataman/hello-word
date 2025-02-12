import { Alert, View } from 'react-native';
import RegularInput from '@/components/ui/inputs/RegularInput';
import AppButton from '@/components/ui/AppButton';
import { useContext, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/core/hooks/useToast';
import { HttpClientContext } from '@/core/context/client-context';
import { HttpError } from '@/core/api/http-client';
import { API_ERROR_MESSAGES } from '@/core/constants/api-errors';

interface AddCategoryProps {
	close: () => void;
}

export default function({ close }: AddCategoryProps) {
	const [categoryName, setCategoryName] = useState<string>('');
	const { showToast } = useToast();
	const { postCreateCategory } = useContext(HttpClientContext)!;
	const { mutateAsync, isPending } = useMutation({
		mutationFn: postCreateCategory,
	});
	const isValid = useMemo(() => {
		return categoryName.length > 0;
	}, [categoryName]);

	const onAddCategory = async () => {
		if (isValid) {
			try {
				await mutateAsync({ categoryName });
				showToast('Kategoria została dodana');
				close();
			} catch (e: HttpError | any) {
				if ('message' in e) {
					if (Array.isArray(e.message)) {
						Alert.alert(API_ERROR_MESSAGES[e.message[0]]);
					}
					Alert.alert(API_ERROR_MESSAGES[e.message]);
				}
			}
		}
	};

	return (
		<View className={'w-[95%] rounded-xl p-6  gap-8 bg-gray-100'}>
			<RegularInput value={categoryName} onChangeText={(name) => setCategoryName(name.trim())}
						  placeholder={'Nazwa kategori'} />
			<View className={'flex-row gap-4 justify-end'}>
				<AppButton onPress={close} label={'Anuluj'} variant={'tertiary'} disabled={isPending} />

				<AppButton onPress={onAddCategory} label={'Dodaj'} variant={'primary'}
						   disabled={!isValid || isPending} />
			</View>

		</View>
	);
}

