export function configureJest({ esm = true, swc, options = {} } = {}) {
  if (swc == null) {
    switch (process.env.gear_test_TEST_MODE) {
      case 'ts-jest':
        swc = false;
        break;
      case 'swc':
      default:
        swc = true;
        break;
    }
  }

  const { moduleNameMapper = {} } = options;

  const config = {
    ...options,
    globals: { ...options.globals },
    moduleNameMapper: {
      '^@gear-test/typeorm-presets$': '@gear-test/typeorm-presets/sqlite',
      '^(\\.{1,2}/.*)\\.js$': '$1',
      ...moduleNameMapper,
    },
    reporters: [
      'default',
      [
        'jest-junit',
        {
          suiteName: 'Tests',
          outputDirectory: './.build/test-results',
          classNameTemplate: '{classname}: {title}',
          titleTemplate: '{classname}: {title}',
          ancestorSeparator: ' › ',
          usePathForSuiteName: 'true',
        },
      ],
    ],
    testEnvironment: 'node',
  };

  if (process.env.CI === 'true' && process.env.GITHUB_ACTION) {
    config.reporters.push('github-actions');
  }

  if (esm) {
    config.extensionsToTreatAsEsm = ['.ts'];
    // TODO: spent an hour, nothing works with it if we connect third-party modules
    // config.moduleNameMapper['^bignumber.js$'] = 'bignumber.js/bignumber.mjs';
  }

  if (swc) {
    config.transform = {
      '^.+\\.(t|j)sx?$': [
        '@swc/jest',
        {
          jsc: {
            target: 'es2022',
          },
        },
      ],
    };
  } else {
    config.globals['ts-jest'] = {
      tsconfig: 'tsconfig.spec.json',
      useESM: esm,
    };

    if (esm) {
      config.preset = 'ts-jest/presets/default-esm';
    } else {
      config.preset = 'ts-jest';
    }
  }

  return config;
}
