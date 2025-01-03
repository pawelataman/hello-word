import { useMemo } from 'react';
import { LANG_EN } from '@/core/constants/common';
import { Word } from '@/core/api/models/quiz';

export const useSegmentAnswer = (answer: Word) => {
	const answerText = useMemo(() => answer[LANG_EN.code], [answer]);
	const segments = useMemo(() => answerText.split(' '), [answerText]);

	return {
		segments,
	};
};