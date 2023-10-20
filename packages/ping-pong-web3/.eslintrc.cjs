module.exports = {
  root: true,
  ignorePatterns: ['node_modules/', 'dist/', '*.build/'],
  extends: ['@gear-test'],
  overrides: [
    {
      files: ['*.js', '*.cjs', '*.mjs'],
      env: {
        node: true,
      },
    },
    {
      files: ['*.ts'],
      extends: ['@gear-test/eslint-config/typescript'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      env: {
        node: true,
      },
    },
    {
      files: ['*.spec.ts'],
      extends: ['@gear-test/eslint-config/jest'],
      parserOptions: {
        project: './tsconfig.spec.json',
      },
    },
  ],
};
