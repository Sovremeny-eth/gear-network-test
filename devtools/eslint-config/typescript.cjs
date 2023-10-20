module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  rules: {
    // TypeScript with `strict` mode enabled checks this on its own
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

    // Allow namespaces.
    // However, it is preferred to use them for types and interfaces only.
    '@typescript-eslint/no-namespace': 'off',

    // It is annoying, especially in tests.
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
