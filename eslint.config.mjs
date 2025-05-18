// @ts-check

import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default tseslint.config(
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { ignores: ["dist/"] },
  { languageOptions: { globals: globals.node } },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
);
