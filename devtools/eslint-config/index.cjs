module.exports = {
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'prettier'],
  overrides: [
    {
      files: ['*.js', '*.cjs', '*.mjs'],
      env: {
        node: true,
      },
    },
  ],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@gear-test/**/src', '@gear-test/**/src/**'],
            message: 'Please import module rather source file',
          },
          {
            group: ['@gear-test/**/dist', '@gear-test/**/dist/**', '../**/dist', '../**/dist/**'],
            message: 'Please import module rather distribution bundle',
          },
        ],
      },
    ],
  },
  env: {
    es2017: true,
  },
};
