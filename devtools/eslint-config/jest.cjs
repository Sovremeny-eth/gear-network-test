module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:jest/recommended', 'plugin:jest/style', '@gear-test/eslint-config/typescript'],
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
};
