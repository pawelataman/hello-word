import { useAuth } from '@clerk/clerk-expo';
import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

export default function useAuthZoneGuard() {
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		if (!isLoaded) return;

		const isInAuthZone = segments[0] === '(home)';

		if (isSignedIn && !isInAuthZone) {
			router.replace('/(home)/main');
		} else if (!isSignedIn) {
			router.replace('/(auth)');
		}
	}, [isSignedIn]);
}
