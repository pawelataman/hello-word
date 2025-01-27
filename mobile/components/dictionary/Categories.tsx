import React, { useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useClient } from '@/core/hooks/useClient';
import DictionaryItem from '@/components/dictionary/DictionaryItem';
import { useRouter } from 'expo-router';
import AppButton from '@/components/ui/AppButton';
import AddCategory from '@/components/dictionary/AddCategory';

export default function Categories() {
	const router = useRouter();
	const { getDictionaryCategories } = useClient();
	const { data } = useQuery({
		queryKey: ['categories'],
		queryFn: () => getDictionaryCategories(),
	});
	const [modalVisible, setModalVisible] = useState(false);

	const onCategoryPress = (id: number) => {
		router.push(`/(home)/main/dictionary/categories/${id}`);
	};

	return (
		<View className={'px-2 h-full'}>
			<View className={'my-2'}>
				<AppButton onPress={() => setModalVisible(true)} label={'Dodaj kategorię +'} variant={'primary'} />
			</View>
			<FlatList data={data?.categories}
					  renderItem={({ item, index }) =>
						  <TouchableOpacity key={item.id}
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
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}>
				<View className={'flex-1 justify-center items-center bg-black/30'}>
					<AddCategory close={() => setModalVisible(false)} />
				</View>
			</Modal>
		</View>
	);
}