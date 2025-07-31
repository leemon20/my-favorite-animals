import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            // App can import from anywhere
            {
              sourceTag: 'app:app',
              onlyDependOnLibsWithTags: ['*'],
            },
            // The common ui library cannot depend on any other library
            {
              sourceTag: 'scope:common',
              onlyDependOnLibsWithTags: [],
            },
            // Data libraries cannot depend on any other library
            {
              sourceTag: 'type:data',
              onlyDependOnLibsWithTags: [],
            },
            // Feature-specific libraries can depend on other libraries within the same feature,
            // the common ui library, and any widget library.
            {
              sourceTag: 'scope:animals',
              onlyDependOnLibsWithTags: ['scope:animals', 'scope:common', 'type:widget'],
            },
            {
              sourceTag: 'scope:dashboard',
              onlyDependOnLibsWithTags: ['scope:dashboard', 'scope:common', 'type:widget'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    // Override or add rules here
    rules: {},
  },
];
