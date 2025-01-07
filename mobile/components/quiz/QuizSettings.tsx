import { Switch, Text, View } from 'react-native';
import React from 'react';
import { useMMKVBoolean } from 'react-native-mmkv';
import { CONFIG_AUTO_NEXT_QUESTION, CONFIG_VOICEOVER, storage } from '@/core/constants/storage';

export default function() {
	const [voiceover, setVoiceover] = useMMKVBoolean(CONFIG_VOICEOVER, storage);
	const [autoNextQuestion, setAutoNextQuestion] = useMMKVBoolean(CONFIG_AUTO_NEXT_QUESTION, storage);

	return (
		<View className={'h-64 p-4 gap-4'}>
			<View className={'flex-row items-center justify-between'}>
				<Text className={'color-gray-500 text-lg'}>Odtwórz odpowiedź</Text>
				<Switch
					trackColor={{ false: '#767577', true: '#22c55e' }}
					thumbColor={voiceover ? '#f4f3f4' : '#f4f3f4'}
					onValueChange={setVoiceover}
					value={voiceover}
				/>
			</View>

			<View className={'flex-row items-center justify-between'}>
				<Text className={'color-gray-500 text-lg'}>Autoprzełączanie</Text>
				<Switch
					trackColor={{ false: '#767577', true: '#22c55e' }}
					thumbColor={autoNextQuestion ? '#f4f3f4' : '#f4f3f4'}
					onValueChange={setAutoNextQuestion}
					value={autoNextQuestion}
				/>
			</View>
		</View>
	);
}
