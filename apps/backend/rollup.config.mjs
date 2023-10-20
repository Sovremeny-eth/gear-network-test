import { configureProject } from '@gear-test/rollup-helpers';

export default configureProject({
  input: {
    'gear-test.main.app': './src/main.ts',
  },
});
