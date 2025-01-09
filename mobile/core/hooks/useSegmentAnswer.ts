import { useMemo } from 'react';
import { LANG_EN } from '@/core/constants/common';
import { Word } from '@/core/api/models/quiz';
import { SPECIAL_CHARACTERS } from '@/core/constants/quiz';

export const useSegmentAnswer = (answer: Word) => {
	const answerText = useMemo(() => answer[LANG_EN.code], [answer]);
	const segments = useMemo(() => answerText.split(' '), [answerText]);

	function checkIsFilled(answerSegments: string[]): boolean {
		return answerSegments.every((seg: string, index: number) => {

			let numOfSpecialCharacters = 0;
			for (let i = 0; i < segments[index].length; i++) {
				if (SPECIAL_CHARACTERS.includes(segments[index].charAt(i))) {
					numOfSpecialCharacters++;
				}
			}
			return seg.length + numOfSpecialCharacters === segments[index].length;
		});
	}

	return {
		segments,
		checkIsFilled,
	};
};