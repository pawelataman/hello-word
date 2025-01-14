import { StyleSheet, Text, View } from 'react-native';
import { DictionaryWord } from '@/core/api/models/dictionary';

interface DictionaryItemProps {
	word: DictionaryWord;
}

export default function({ word }: DictionaryItemProps) {
	return (
		<View
			className={'my-[2px] rounded-lg flex-wrap flex-row gap-x-2 px-4 py-2 border-2 border-gray-300 bg-white flex-1'}>
			<Text className={'text-lg font-bold'}>{word['pl']}</Text>
			<Text className={'text-lg text-gray-500'}>{word['en']}</Text>
		</View>
	);
}

const styles = StyleSheet.create({});