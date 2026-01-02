// @ts-check

import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  [
    globalIgnores([
      "dist/**",
      "temp/**"
    ])
  ],
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
);
