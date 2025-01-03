import { useMemo } from 'react';
import { LANG_EN } from '@/core/constants/common';
import { Word } from '@/core/api/models/quiz';

export const useSegmentAnswer = (answer: Word) => {
	const answerText = useMemo(() => answer[LANG_EN.code], [answer]);
	const segments = useMemo(() => answerText.split(' '), [answerText]);

	function checkIsFilled(answerSegments: string[]): boolean {
		return answerSegments.every((seg: string, index: number) => seg.length === segments[index].length);
	}

	return {
		segments,
		checkIsFilled,
	};
};