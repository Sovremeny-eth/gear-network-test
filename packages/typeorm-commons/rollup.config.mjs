import { configureProject } from '@gear-test/rollup-helpers';

export default configureProject({
  input: {
    'gear-test.typeorm-commons': './src/index.ts',
  },
});
