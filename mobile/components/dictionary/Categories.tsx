import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useClient } from '@/core/hooks/useClient';
import DictionaryItem from '@/components/dictionary/DictionaryItem';
import { useRouter } from 'expo-router';

export default function Categories() {
	const router = useRouter();
	const { getDictionaryCategories } = useClient();
	const { data } = useQuery({
		queryKey: ['categories'],
		queryFn: () => getDictionaryCategories(),
	});

	const onCategoryPress = (id: number) => {
		router.push(`/(home)/main/dictionary/categories/${id}`);
	};

	return (
		<View className={'px-2 h-full'}>
			<FlatList data={data?.categories}
					  renderItem={({ item, index }) =>
						  <TouchableOpacity key={item.id} className={`${index === 0 && 'mt-4'}`}
											onPress={() => onCategoryPress(item.id)}>
							  <DictionaryItem>
								  <Text className={'text-lg font-bold'}>{item.categoryName}</Text>
							  </DictionaryItem>

						  </TouchableOpacity>
					  }
					  keyExtractor={(_, index) => index.toString()}
					  showsVerticalScrollIndicator={false}
					  onEndReachedThreshold={.2}
			/>
		</View>
	);
}

