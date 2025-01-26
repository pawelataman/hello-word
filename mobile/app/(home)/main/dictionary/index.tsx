import Categories from '@/components/dictionary/Categories';
import Dictionary from '@/components/dictionary/Dictionary';
import QuizLoading from '@/components/quiz/QuizLoading';
import { Stack } from 'expo-router';
import { Suspense, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { SceneMap, TabBar, TabBarIndicator, TabView } from 'react-native-tab-view';

const DictionaryRoute = () => <Suspense fallback={<QuizLoading />}>
	<Dictionary />
</Suspense>;

const renderScene = SceneMap({
	dictionary: DictionaryRoute,
	categories: Categories,
});

const routes = [
	{ key: 'dictionary', title: 'Wszystkie słówka' },
	{ key: 'categories', title: 'Kategorie' },
];


export default function() {
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);

	return (
		<View className="flex-1 relative bg-gray-200">
			<Stack.Screen options={{ title: 'Słownik' }} />

			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				renderTabBar={(props) => <TabBar {...props} style={{ backgroundColor: '#f3f4f6' }}
												 activeColor={'#22c55e'}
												 indicatorStyle={{ backgroundColor: '#22c55e' }}
												 inactiveColor={'black'}
												 renderIndicator={(tabBarIndicatorProps) =>
													 <TabBarIndicator {...tabBarIndicatorProps}
																	  style={[tabBarIndicatorProps.style, { height: 3 }]}
													 />}
				/>}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
			/>
		</View>
	);
}

