import { StyleSheet } from 'react-native';
import Svg, { ClipPath, Defs, G, Mask, Path, Rect, SvgProps } from 'react-native-svg';

export default function({ width = 21, height = 15 }: SvgProps) {
	return (
		<Svg width={width} height={height} viewBox="0 0 21 15" fill="none">
			<G clipPath="url(#clip0_4051_94)">
				<Mask id="mask0_4051_94" maskUnits="userSpaceOnUse" x="0" y="0" width="21"
					  height="15">
					<Path
						d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z"
						fill="white" />
				</Mask>
				<G mask="url(#mask0_4051_94)">
					<Path
						d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z"
						fill="#DF0A37" />
					<Path fillRule="evenodd" clip-rule="evenodd" d="M0 0H21V8H0V0Z" fill="white" />
					<Path
						d="M19 0.5H2C1.17157 0.5 0.5 1.17157 0.5 2V13C0.5 13.8284 1.17157 14.5 2 14.5H19C19.8284 14.5 20.5 13.8284 20.5 13V2C20.5 1.17157 19.8284 0.5 19 0.5Z"
						stroke="black" strokeOpacity="0.1" />
				</G>
			</G>
			<Defs>
				<ClipPath id="clip0_4051_94">
					<Rect width="21" height="15" fill="white" />
				</ClipPath>
			</Defs>
		</Svg>

	);
}

const styles = StyleSheet.create({});