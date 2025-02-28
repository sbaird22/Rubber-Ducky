import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    ignores: ["node_modules", "dist"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json", // Ensure this points to your tsconfig.json
        tsconfigRootDir: process.cwd(),
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      react,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: "detect", // Automatically detects React version
      },
    },
    rules: {
      ...ts.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-uses-react": "error", // Ensures React is used correctly in JSX
      "react/jsx-uses-vars": "error", // Ensures JSX elements are not ignored in the variable scope
      "react-hooks/rules-of-hooks": "error", // Enforces hooks rules
      "react-hooks/exhaustive-deps": "warn", // Warns about missing hook dependencies
      "react/react-in-jsx-scope": "off", // Disable this rule for React 17+
    },
  },
];
