import { configureProject } from '@gear-test/rollup-helpers';

export default configureProject({
  input: {
    'gear-test.typeorm-preset.default': './src/index.ts',
    'gear-test.typeorm-preset.sqlite': './src/sqlite/index.ts',
  },
});
