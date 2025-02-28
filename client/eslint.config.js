import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['dist'], // Ignore dist folder
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
    extends: [
      js.configs.recommended, 
      ts.configs.recommended, // Include recommended rules from TypeScript
    ],
    rules: {
      ...reactHooks.configs.recommended.rules, // React Hook rules
      'react-refresh/only-export-components': [
        'warn', 
        { allowConstantExport: true }, // Customize react-refresh rule
      ],
      'react/react-in-jsx-scope': 'off', // Disable for React 17+ (no need to import React)
    },
  },
];
