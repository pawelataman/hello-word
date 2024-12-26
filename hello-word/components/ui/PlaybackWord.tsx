import { Pressable } from 'react-native';
import { Image } from 'expo-image';
import * as Speech from 'expo-speech';
import { useCallback, useState } from 'react';

interface PlaybackWordProps {
	word: string;
	lang: string;
}

export default function PlaybackWord({ word, lang }: PlaybackWordProps) {
	const [isDone, setIsDone] = useState<boolean>(true);

	const playbackWord = useCallback(async () => {
		if (!isDone || await Speech.isSpeakingAsync()) return;

		setIsDone(false);
		Speech.speak(word, {
			language: lang,
			rate: 0.8,
			onDone: () => setIsDone(true),
		});
	}, [isDone, word, lang]);

	return (
		<Pressable
			style={{ width: 48, height: 48 }}
			className={`${isDone ? 'bg-white' : 'bg-gray-300'} rounded-full p-2`}
			onPress={playbackWord}
		>
			<Image
				style={{ width: '100%', height: '100%' }}
				source={require('@/assets/images/icons/speaker-one.png')}
			/>
		</Pressable>
	);
}
