import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useClient } from '@/core/hooks/useClient';
import { useSuspenseQuery } from '@tanstack/react-query';
import DictionaryItem from '@/components/dictionary/DictionaryItem';
import Person from '@/assets/images/icons/person.svg';

interface CategoryDetailsProps {
	id: number;
}

export default function({ id }: CategoryDetailsProps) {

	const { getDictionaryCategoryDetails } = useClient();
	const { data } = useSuspenseQuery({
		queryKey: ['category-details', id],
		queryFn: () => getDictionaryCategoryDetails(id),
	});

	return (
		<View className={'px-2 h-full'}>
			<View className={'my-4 bg-green-500 rounded-md p-4 gap-2'}>
				<Text className={'text-xl font-bold color-white'}>{data.categoryName}</Text>
				<Text className={'text-m text-white'}>Liczba słówek: {data.words.length}</Text>
			</View>
			<View className={'flex-1'}>
				<FlatList data={data.words} keyExtractor={(_, index) => index.toString()}
						  showsVerticalScrollIndicator={false}
						  renderItem={({ item }) => <DictionaryItem key={item.id}
																	icon={<Person width={16} height={16}
																				  color="#22c55e" />}>

							  <Text className={'text-lg font-bold'}>{item['pl']}</Text>
							  <Text className={'text-lg text-gray-500'}>{item['en']}</Text>
						
						  </DictionaryItem>}
						  onEndReachedThreshold={.2}></FlatList>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});