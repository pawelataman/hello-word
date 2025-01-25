import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useClient } from '@/core/hooks/useClient';
import DictionaryItem from '@/components/dictionary/DictionaryItem';
import { Link } from 'expo-router';

export default function Categories() {
	const { getDictionaryCategories } = useClient();
	const { data } = useQuery({
		queryKey: ['categories'],
		queryFn: () => getDictionaryCategories(),
	});

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<View className={'px-2'}>
			<FlatList data={data?.categories}
					  renderItem={({ item }) =>
						  <Link key={item.id}
								href={`/(home)/main/dictionary/categories/${item.id}`}>
							  <DictionaryItem>
								  <Text className={'text-lg font-bold'}>{item.categoryName}</Text>
							  </DictionaryItem>
						  </Link>}
					  keyExtractor={(_, index) => index.toString()}
					  showsVerticalScrollIndicator={false}
					  onEndReachedThreshold={.2}
			/>
		</View>
	);
}

