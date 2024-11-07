/* eslint-disable @typescript-eslint/ban-ts-comment */
import pluginJs from '@eslint/js';
// @ts-ignore
import next from '@next/eslint-plugin-next';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
// @ts-ignore
import pluginReactHooks from 'eslint-plugin-react-hooks';
// @ts-ignore
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      prettier,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
      '@next/next': next,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tsPlugin.configs['recommended-type-checked']?.rules,
      ...tsPlugin.configs['stylistic-type-checked']?.rules,
      ...pluginReact.configs.flat?.recommended?.rules,
      ...next.configs.recommended.rules,
      'max-len': ['error', 120],
      camelcase: 'error',
      'react/jsx-indent-props': ['warn', 2],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'consistent-return': 'off',
      'object-shorthand': 'off',
      'no-process-exit': 'off',
      'no-underscore-dangle': 'off',
      'class-methods-use-this': 'off',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next|val' }],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      'react/require-default-props': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'func-style': ['error', 'expression'],
      'prefer-arrow-callback': 'error',
    },
    settings: {
      react: { version: 'detect' },
      next: {
        rootDir: '.',
      },
    },
  },
];
