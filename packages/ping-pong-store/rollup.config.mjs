import { configureProject } from '@gear-test/rollup-helpers';

export default configureProject({
  input: {
    'gear-test.ping-pong-store': './src/index.ts',
  },
});
