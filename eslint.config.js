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
      // Relax TypeScript rules
      '@typescript-eslint/no-unused-vars': 'off', // Disable unused variable warnings
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit return types enforcement
      '@typescript-eslint/no-explicit-any': 'off', // Allow 'any' type
      '@typescript-eslint/explicit-function-return-type': 'off', // Allow implicit return types
      '@typescript-eslint/strict-boolean-expressions': 'off', // Disable strict boolean check
      '@typescript-eslint/no-floating-promises': 'off', // Allow floating promises
      '@typescript-eslint/no-unsafe-assignment': 'off', // Allow unsafe assignments
      '@typescript-eslint/no-unsafe-call': 'off', // Allow unsafe calls
      '@typescript-eslint/no-unsafe-member-access': 'off', // Allow unsafe member access
      '@typescript-eslint/no-throw-literal': 'off', // Allow throwing literals
      '@typescript-eslint/no-empty-function': 'off', // Allow empty functions
      '@typescript-eslint/no-magic-numbers': 'off', // Allow magic numbers
      '@typescript-eslint/naming-convention': 'off', // Allow naming conventions to be less strict
      'react/prop-types': 'off', // Disable prop-types enforcement
      'react/jsx-no-undef': 'off', // Allow undefined JSX elements
      'react/react-in-jsx-scope': 'off', // Disable for React 17+ (no need to import React)
    },
  },
];
