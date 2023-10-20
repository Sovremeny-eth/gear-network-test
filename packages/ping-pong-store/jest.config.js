import { configureJest } from '@gear-test/jest-config';

export default configureJest({
  swc: false,
  options: {
    moduleNameMapper: {
      '@gear-test/ping-pong-store/package.json$': '<rootDir>/package.json',
    },
  },
});
