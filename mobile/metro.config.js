const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const {
	wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const config = getDefaultConfig(__dirname);
const { transformer, resolver } = config;

config.transformer = {
	...transformer,
	sourceMap: true,
	babelTransformerPath: require.resolve('react-native-svg-transformer'),
};
config.resolver = {
	...resolver,
	assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
	sourceExts: [...resolver.sourceExts, 'svg'],
};

module.exports = wrapWithReanimatedMetroConfig(
	withNativeWind(config, { input: './global.css' }),
);
