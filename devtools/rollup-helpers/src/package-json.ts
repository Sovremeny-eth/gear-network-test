import { createRequire } from 'node:module';
import { join } from 'node:path';
import * as process from 'node:process';

export interface PackageJson {
  readonly dependencies?: Readonly<Record<string, string>> | undefined;
  readonly devDependencies?: Readonly<Record<string, string>> | undefined;
  readonly peerDependencies?: Readonly<Record<string, string>> | undefined;
  readonly optionalDependencies?: Readonly<Record<string, string>> | undefined;
}

export function loadPackageJson(packageJson = join(process.cwd(), 'package.json')): PackageJson {
  const require = createRequire(process.cwd());

  return require(packageJson) as PackageJson;
}
