module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@auth': './src/modules/auth/index',
          '@stores': './src/modules/stores/index',

          '@api': './src/shared/api/index',
          '@store': './src/shared/store/index',
          '@navigation': './src/shared/navigation/index',
          '@styles': './src/shared/styles/index',
          '@images': './src/shared/images/constants/image',
          '@icons': './src/shared/images/constants/icon',
          '@lottie-animations': './src/shared/animations/constants/lottie',
          '@shared-components': './src/shared/components/index',
          '@feedback': './src/shared/feedback/index',
          '@geolocation': './src/shared/geolocation/index',
        },
      },
    ],
  ],
  // env: {
  //   production: {
  //     plugins: ['react-native-paper/babel'],
  //   },
  // },
}
