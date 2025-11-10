import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import { parser } from 'typescript-eslint'
import perfectionist from 'eslint-plugin-perfectionist'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      parser: parser,
      globals: globals.browser,
    },
    plugins: {
      perfectionist
    },
    rules: {
      "no-console": [
        "error",
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ],
      // 类型导入一致性
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          "prefer": "type-imports",
          "fixStyle": "inline-type-imports"
        }
      ],
      // 禁止使用 any
      "@typescript-eslint/no-explicit-any": "warn",
      // 命名约定
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          "selector": "interface",
          "format": ["PascalCase"],
          "custom": {
            "regex": "^I[A-Z]",
            "match": false
          }
        },
        {
          "selector": "typeAlias",
          "format": ["PascalCase"]
        }
      ],
      // 优先使用 const
      "prefer-const": "error",
      // 禁止不必要的可选链
      "@typescript-eslint/no-unnecessary-condition": "off",
      // 接口和对象排序
      'perfectionist/sort-interfaces': [
        'error',
      ],
      'perfectionist/sort-objects': [
        'error',
        {
          'type': 'natural',
          'order': 'asc',
        },
      ],
      // Import 排序
      'perfectionist/sort-imports': [
        'error',
        {
          'type': 'natural',
          'order': 'asc',
          'groups': [
            'type',
            ['builtin', 'external'],
            'internal-type',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
        },
      ],
    }
  },
])
