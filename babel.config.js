module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.png',
          '.jpg',
          '.jpeg'
        ],
        alias: {
          '@screens': './src/screens',
          '@components': './src/components',
          '@config': './src/config',
          '@libraries': './src/libraries',
          '@redux': './src/redux',
          '@services': './src/services',
          '@theme': './src/theme',
          '@assets': './src/assets',
          '@helpers': './src/helpers'
        }
      },
    ],
  ],
};
