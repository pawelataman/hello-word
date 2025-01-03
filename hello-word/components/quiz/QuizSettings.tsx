import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MenuComponentRef, MenuView } from '@react-native-menu/menu';
import SettingsIcon from '@/components/ui/svg/SettingsIcon';
import React, { useRef } from 'react';
import { useMMKVBoolean } from 'react-native-mmkv';
import { CONFIG_VOICEOVER, storage } from '@/core/constants/storage';

export default function({ tintColor }: { tintColor: string | undefined }) {
	const menuRef = useRef<MenuComponentRef>(null);
	const [voiceover, setVoiceover] = useMMKVBoolean(CONFIG_VOICEOVER, storage);

	return (

		<MenuView
			ref={menuRef}
			onPressAction={() => {
				setVoiceover(!voiceover);
			}}
			actions={[
				{
					id: 'toggle_voiceover',
					title: voiceover ? 'Wycisz' : 'Odcisz',
					titleColor: 'black',
					image: Platform.select({
						ios: voiceover ? 'speaker.slash' : 'speaker.wave.3',
						android: voiceover ? 'ic_lock_silent_mode' : 'ic_lock_silent_mode_off',
					}),
					imageColor: tintColor,

				},
			]}
			shouldOpenOnLongPress={false}
		>
			<View>
				<TouchableOpacity>
					<SettingsIcon width={28} height={28}
								  fill={tintColor} />
				</TouchableOpacity>
			</View>
		</MenuView>
	);
}

const styles = StyleSheet.create({});