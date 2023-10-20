import { OutputOptions, Plugin, RollupOptions } from 'rollup';
import sourcemaps from 'rollup-plugin-sourcemaps';
import ts from 'rollup-plugin-typescript2';
import { externalModules } from './external-modules.js';

export function configureProject(options: RollupOptions): RollupOptions {
  let { external } = options;

  if (!external || (Array.isArray(external) && !external.length)) {
    external = externalModules();
  }

  return {
    ...options,
    plugins: configurePlugins(options.plugins),
    external,
    output: configureOutput(options.output),
  };
}

function configurePlugins(
  plugins: (Plugin | null | false | undefined)[] = [],
): (Plugin | null | false | undefined)[] {
  const pluginNames = new Set(plugins.map((plugin) => (plugin ? plugin.name : '')));

  if (!pluginNames.has('rpt2')) {
    plugins.push(
      ts({
        tsconfig: 'tsconfig.main.json',
        useTsconfigDeclarationDir: true,
        cacheRoot: '.build/.rts2_cache',
      }),
    );
  }
  if (!pluginNames.has('sourcemap')) {
    plugins.push(sourcemaps());
  }

  return plugins;
}

function configureOutput(options: OutputOptions): OutputOptions;

function configureOutput(
  options: OutputOptions | readonly OutputOptions[] | undefined,
): OutputOptions | OutputOptions[];

function configureOutput(
  options: OutputOptions | readonly OutputOptions[] = [],
): OutputOptions | OutputOptions[] {
  if (isOutputOptionsArray(options)) {
    return options.length
      ? options.map((option) => configureOutput(option))
      : configureOutput({ format: 'esm' });
  }

  const {
    format,
    dir = './dist',
    entryFileNames = format === 'cjs' ? '[name].cjs' : '[name].js',
    chunkFileNames = format === 'cjs' ? '_[name].cjs' : '_[name].js',
    sourcemap = true,
  } = options;

  return {
    ...options,
    dir,
    sourcemap,
    entryFileNames,
    chunkFileNames,
  };
}

function isOutputOptionsArray(
  options: OutputOptions | readonly OutputOptions[],
): options is readonly OutputOptions[] {
  return Array.isArray(options);
}
