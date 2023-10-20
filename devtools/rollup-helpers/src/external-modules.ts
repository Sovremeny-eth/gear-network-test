import { builtinModules } from 'node:module';
import { loadPackageJson } from './package-json.js';

/**
 * Creates a function that checks whether the package is external.
 *
 * Considers all package dependencies and node built-in modules external.
 *
 * The function returned is suitable to be substituted as [external] option of Rollup config.
 *
 * [external]: https://rollupjs.org/guide/en/#external
 *
 * @param packageJson - Path to `package.json`. Uses the one in the working directory by default.
 *
 * @returns A function that checks whether the module with the given id is external.
 */
export function externalModules({
  packageJson,
}: {
  packageJson?: string;
} = {}): (this: void, id: string) => boolean {
  const {
    dependencies = {},
    devDependencies = {},
    peerDependencies = {},
    optionalDependencies = {},
  } = loadPackageJson(packageJson);

  const externals = new Set([
    ...builtinModules,
    ...Object.keys(dependencies),
    ...Object.keys(devDependencies),
    ...Object.keys(peerDependencies),
    ...Object.keys(optionalDependencies),
  ]);

  return (id) => {
    if (id.startsWith('node:')) {
      // Node.js module.
      return true;
    }

    let slashIdx = id.indexOf('/');

    if (slashIdx > 0) {
      if (id.startsWith('@')) {
        // Scoped package.
        slashIdx = id.indexOf('/', slashIdx + 1);
      }
      if (slashIdx > 0) {
        id = id.substr(0, slashIdx);
      }
    }

    return externals.has(id);
  };
}
