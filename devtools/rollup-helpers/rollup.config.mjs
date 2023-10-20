import { defineConfig } from 'rollup';
import sourcemaps from 'rollup-plugin-sourcemaps';
import ts from 'rollup-plugin-typescript2';
import typescript from 'typescript';

export default defineConfig({
  input: {
    'gear-test.rollup-helpers': './src/index.ts',
  },
  plugins: [
    ts({
      typescript,
      tsconfig: 'tsconfig.main.json',
      useTsconfigDeclarationDir: true,
      cacheRoot: '.build/.rts2_cache',
    }),
    sourcemaps(),
  ],
  external(id) {
    return (
      id.startsWith('node:') ||
      id === 'rollup' ||
      id === 'typescript' ||
      id.startsWith('rollup-plugin-') ||
      id.startsWith('@rollup/')
    );
  },
  output: {
    format: 'esm',
    sourcemap: true,
    dir: './dist',
  },
});
