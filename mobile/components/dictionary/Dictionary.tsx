import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { HttpClientContext } from '@/core/context/client-context';
import { useInfiniteQuery } from '@tanstack/react-query';
import { GetDictionaryWordsParams, GetDictionaryWordsResponse } from '@/core/api/models/dictionary';
import { LANG_CODE } from '@/core/constants/common';
import DictionaryItem from '@/components/dictionary/DictionaryItem';
import Search from '@/components/ui/inputs/Search';
import { debounce } from '@/utils/timing';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppButton from '@/components/ui/AppButton';

const PAGE_SIZE = 20;
export default function() {

	const [ascending, setAscending] = useState(true);
	const [search, setSearch] = useState<string>('');

	const { getDictionaryWords } = useContext(HttpClientContext)!;
	const {
		data,
		fetchNextPage,
		isLoading,
		hasNextPage,
	} = useInfiniteQuery<GetDictionaryWordsResponse>({
		queryKey: ['get-dictionary-words', ascending, search],
		getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
			if (allPages.length < (lastPage as GetDictionaryWordsResponse).totalPages) {
				return allPages.length + 1;
			}
			return null;
		},
		initialPageParam: 1,
		queryFn: ({
					  pageParam,
					  queryKey,
				  }): Promise<GetDictionaryWordsResponse> => {
			const params: GetDictionaryWordsParams = {
				pageSize: PAGE_SIZE,
				page: pageParam as number,
				language: LANG_CODE.PL,
				ascending: queryKey[1] as boolean,
				search: queryKey[2] as string,
			};
			return getDictionaryWords(params);
		},
	});

	const dataFlattened = useMemo(() => {
		return data?.pages.flatMap(page => page.records);
	}, [data]);


	const onReachEnd = useCallback(() => {
		if (!isLoading && hasNextPage) {
			return fetchNextPage();
		}
	}, [isLoading, hasNextPage, fetchNextPage]);


	return (
		<View className={'p-2 gap-y-4'}>
			<View className={'flex-row gap-2'}>
				<Search onChangeText={debounce(setSearch, 500)}
						placeholder={'Wyszukaj'}></Search>
				<TouchableOpacity onPress={() => setAscending(!ascending)}>
					<MaterialCommunityIcons
						name={ascending ? 'sort-alphabetical-ascending' : 'sort-alphabetical-descending'}
						size={20}
						color="#6b7280" className={'self-start bg-white rounded-xl p-2'} />
				</TouchableOpacity>
			</View>
			<View>
				<AppButton onPress={() => {
				}} label={'Dodaj słówko +'} variant={'primary'} />
			</View>
			{isLoading && <ActivityIndicator size="small" color={'#22c55e'} />}
			<FlatList data={dataFlattened}
					  renderItem={({ item, index }) => <View key={item.id}>
						  <DictionaryItem>
							  <Text className={'text-xl font-bold'}>{item['pl']}</Text>
							  <Text className={'text-lg text-gray-500'}>{item['en']}</Text>
						  </DictionaryItem>
					  </View>
					  }
					  keyExtractor={(_, index) => index.toString()}
					  showsVerticalScrollIndicator={false}
					  onEndReached={onReachEnd}
					  onEndReachedThreshold={.2}
			/>


		</View>
	);
}

