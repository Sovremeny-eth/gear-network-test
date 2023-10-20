# Gear test Application 

Special for [test-app]

[test-app]: https://github.com/osipov-mit/test.git

## Prerequisites

- Node.js 16
- [pnpm] package manager

[pnpm]: https://pnpm.io/

## Build

1. Install pnpm. Choose one of:
- Utilize [corepack]. Run `corepack enable` within directory.
- [install pnpm] globally. E.g. run command `npm -g install pnpm`.
2. Install dependencies: `pnpm install`.
3. Build the project: `pnpm -r all` (to build, lint, and test), or just `pnpm -r build` (to just build)

Each subproject within `apps/`, `devtools/` or `packages/` directory can be built individually once its dependencies
built already. Otherwise, the command like `pnpm deps` would build the project along with its dependencies.

Read more about [package filtering].

More commands:

- `pnpm all` - performs the full build, including tests and linting.
- `pnpm all:clean` - cleans before the full build.
  This may be necessary in order to clean up e.g. TypeScript compiler cache.
- `pnpm build` - transpiles and bundles TypeScript files.
- `pnpm build:clean` cleans before transpiling TypeScript files.
  This may be necessary in order to clean up e.g. TypeScript compiler cache.
- `pnpm lint` - performs linting
- `pnpm test` - executes tests using [SWC]. Fast and dirty.
- `gear_test_TEST_MODE=ts-jest pnpm test` - executes tests using [ts-jest]/ Correct and slow. Suitable for CI.

[corepack]: https://nodejs.org/dist/latest-v16.x/docs/api/corepack.html
[install pnpm]: https://pnpm.io/installation
[package filtering]: https://pnpm.io/filtering
[SWC]: https://swc.rs/

## Packages

All functionality implemented as set of module packages within `packages/` directory.

Each module dedicated to particular functionality and tries to make as less friction with other parts as possible. One
or more such module packages can be reused within application builds.

## Application Builds

The `apps/` directory contains various application builds:

- `backend` - main application instance.
- `ping-pong-store` - database application instance.