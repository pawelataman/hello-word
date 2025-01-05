import Svg, { Path, SvgProps } from 'react-native-svg';

export default function({ width, height, fill }: SvgProps) {
	return (
		<Svg width={width} height={height} viewBox="0 0 18 21" fill="none">
			<Path
				d="M17 19.5C17 16.7386 13.4183 14.5 9 14.5C4.58172 14.5 1 16.7386 1 19.5M9 11.5C6.23858 11.5 4 9.26142 4 6.5C4 3.73858 6.23858 1.5 9 1.5C11.7614 1.5 14 3.73858 14 6.5C14 9.26142 11.7614 11.5 9 11.5Z"
				stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</Svg>

	);
}
