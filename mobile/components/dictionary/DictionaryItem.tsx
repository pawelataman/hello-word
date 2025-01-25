import { View } from 'react-native';
import { ReactNode } from 'react';

interface DictionaryItemProps {
	children: ReactNode;
}

export default function({ children }: DictionaryItemProps) {
	return (
		<View
			className={'w-full my-[2px] rounded-lg flex-wrap flex-row gap-x-2 px-4 py-2 border-2 border-gray-300 bg-white flex-1'}>
			{children}
		</View>
	);
}