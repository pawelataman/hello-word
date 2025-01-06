import * as React from 'react';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

export const bottomSheetBackdrop = (props: any) => {
	return (
		<BottomSheetBackdrop
			{...props}
			appearsOnIndex={0}
			disappearsOnIndex={-1}
			opacity={0.4}
		/>
	);
};
