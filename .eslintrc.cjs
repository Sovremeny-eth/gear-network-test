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
  ],
};
