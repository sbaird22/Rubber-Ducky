import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['dist', 'client/vite.config.ts'], // Ignore dist folder
  },
  {
    // Target TypeScript files
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json', // Path to your tsconfig.json
        tsconfigRootDir: process.cwd(),
      },
      globals: globals.browser, // Defines browser globals for TypeScript
    },
    plugins: {
      '@typescript-eslint': ts,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Relax TypeScript rules
      '@typescript-eslint/no-unused-vars': 'off', // Disable unused variable check
      '@typescript-eslint/no-explicit-any': 'off', // Allow 'any' type
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Don't require explicit return types
      '@typescript-eslint/explicit-function-return-type': 'off', // Allow implicit return types
      '@typescript-eslint/strict-boolean-expressions': 'off', // Relax boolean expression checks
      '@typescript-eslint/no-unsafe-assignment': 'off', // Allow unsafe assignments
      '@typescript-eslint/no-unsafe-member-access': 'off', // Allow unsafe member access
      '@typescript-eslint/no-unsafe-call': 'off', // Allow unsafe calls

      // React-specific rules
      'react/react-in-jsx-scope': 'off', // Disable for React 17+
      'react/prop-types': 'off',  // Disable prop-types check if using TypeScript for typing
      'react/jsx-no-undef': 'off',  // Disable JSX undefined elements check

      // React Hooks rules
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // Customize react-refresh rule

      // Optional relaxing of some React rules
      'react/jsx-uses-react': 'off', // Disable the need to import React
      'react/jsx-uses-vars': 'off', // Relax the check for unused variables in JSX

      // Add additional relaxations if necessary
    },
  },
  {
    // Including recommended TypeScript rules manually
    plugin: ts.configs.recommended,
  },
  {
    // Including recommended JavaScript rules manually
    plugin: js.configs.recommended,
  },
];
