module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:jsdoc/recommended-typescript'],
  plugins: ['jsdoc'],
  rules: {'prettier/prettier': ['error', {endOfLine: 'auto'}]},
};
