import { configureProject } from '@gear-test/rollup-helpers';

export default configureProject({
  input: {
    'gear-test.ping-pong-web3': './src/index.ts',
  },
});
