import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['dist', 'client/vite.config.ts'], // Ignore dist folder and vite.config.ts file
  },
  {
    // Target TypeScript files
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json', // Path to your tsconfig
        tsconfigRootDir: process.cwd(),
      },
      globals: globals.browser, // Defines browser globals for TypeScript
    },
    plugins: {
      '@typescript-eslint': ts,
      'react-hooks': reactHooks,
    },
    rules: {
      // TypeScript-specific rules (making less strict)
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',

      // React-specific rules (React 17+ doesn't require JSX scope import)
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // Disable prop-types checking for TS users
      'react/jsx-no-undef': 'off', // Disable checking for undefined JSX variables

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
