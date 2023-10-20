import { configureJest } from '@gear-test/jest-config';

export default configureJest({
  options: {
    moduleNameMapper: {
      '@gear-test/backend/package.json$': '<rootDir>/package.json',
    },
  },
});
