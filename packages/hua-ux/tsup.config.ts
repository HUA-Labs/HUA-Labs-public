import { defineConfig } from 'tsup';

const entry = {
  index: 'src/index.ts',
  'framework/index': 'src/framework/index.ts',
  'framework/server': 'src/framework/server.ts',
  'framework/config': 'src/framework/config.ts',
  'presets/index': 'src/presets/index.ts',
  'framework/seo/geo/index': 'src/framework/seo/geo/index.ts',
  // Subpath exports
  'ui/index': 'src/ui/index.ts',
  'i18n/index': 'src/i18n/index.ts',
  'motion/index': 'src/motion/index.ts',
  'state/index': 'src/state/index.ts',
  'pro/index': 'src/pro/index.ts',
  'formatters/index': 'src/formatters/index.ts',
  'utils/index': 'src/utils/index.ts',
};

const shared = {
  entry,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
  target: 'es2020' as const,
  external: [
    // React ecosystem
    'react',
    'react-dom',
    'next',
    'server-only',
    // HUA Labs packages (published separately)
    '@hua-labs/ui',
    '@hua-labs/motion-core',
    '@hua-labs/motion-advanced',
    '@hua-labs/i18n-core',
    '@hua-labs/i18n-core-zustand',
    '@hua-labs/i18n-formatters',
    '@hua-labs/state',
    '@hua-labs/pro',
    '@hua-labs/utils',
    // Icon libraries
    '@phosphor-icons/react',
  ],
  esbuildOptions(options: { jsx?: string }) {
    options.jsx = 'automatic';
  },
};

export default defineConfig([
  {
    ...shared,
    dts: {
      compilerOptions: {
        incremental: false,
      },
    },
    format: ['esm'],
    splitting: true,
    outDir: 'dist',
    outExtension() {
      return { js: '.js', dts: '.d.ts' };
    },
  },
  {
    ...shared,
    dts: false,
    format: ['cjs'],
    splitting: false,
    outDir: 'dist',
    outExtension() {
      return { js: '.cjs' };
    },
  },
]);
