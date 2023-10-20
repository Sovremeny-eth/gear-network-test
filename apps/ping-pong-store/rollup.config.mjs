import { configureProject } from '@gear-test/rollup-helpers';

export default configureProject({
  input: {
    'gear-test.ping-pong-store.app': './src/main.ts',
  },
});
