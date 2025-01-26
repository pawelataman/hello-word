import { View } from 'react-native';
import { ReactNode } from 'react';

interface DictionaryItemProps {
	children: ReactNode;
	icon?: ReactNode;

}

export default function({ children, icon }: DictionaryItemProps) {
	return (
		<View
			className={`w-full mt-2 rounded-lg flex-wrap flex-row justify-between items-center px-4 py-2 bg-white flex-1`}>
			<View className={'flex-row gap-x-2'}>{children}</View>
			{icon && <View>{icon}</View>}
		</View>
	);
}