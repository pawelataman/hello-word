import { FlatList, Text, View } from 'react-native';
import { useCallback, useContext, useMemo, useState } from 'react';
import { HttpClientContext } from '@/core/context/client-context';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { GetDictionaryWordsParams, GetDictionaryWordsResponse } from '@/core/api/models/dictionary';
import { LANG_CODE } from '@/core/constants/common';
import DictionaryItem from '@/components/dictionary/DictionaryItem';

const PAGE_SIZE = 100;
export default function() {

	const [ascending, setAscending] = useState(true);
	const [language, setLanguage] = useState(LANG_CODE.EN);

	const { getDictionaryWords } = useContext(HttpClientContext)!;
	const {
		data,
		fetchNextPage,
		isLoading,
		hasNextPage,
	} = useSuspenseInfiniteQuery<GetDictionaryWordsResponse>({
		queryKey: ['get-dictionary-words', language, ascending],
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
				language: queryKey[1] as LANG_CODE,
				ascending: queryKey[2] as boolean,
			};
			return getDictionaryWords(params);
		},
	});

	const dataFlattened = useMemo(() => {
		return data.pages.flatMap(page => page.records);
	}, [data]);


	const onReachEnd = useCallback(() => {
		console.log('reached end');
		if (!isLoading && hasNextPage) {
			return fetchNextPage();
		}
	}, [isLoading, hasNextPage, fetchNextPage]);


	return (
		<View className={'px-2'}>
			<FlatList data={dataFlattened}
					  renderItem={({ item }) => <DictionaryItem key={item.id}>
						  <Text className={'text-lg font-bold'}>{item['pl']}</Text>
						  <Text className={'text-lg text-gray-500'}>{item['en']}</Text>
					  </DictionaryItem>}
					  keyExtractor={(_, index) => index.toString()}
					  showsVerticalScrollIndicator={false}
					  onEndReached={onReachEnd}
					  onEndReachedThreshold={.2}
			/>


		</View>
	);
}

