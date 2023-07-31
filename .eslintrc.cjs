require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    // 'linebreak-style': ['error', 'unix'],
    curly: ['error', 'multi-line', 'consistent'],
    'vue/no-multiple-template-root': 'off',
    radix: ['error', 'as-needed'],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ], // ['always', 'always-multiline', 'never']
    'keyword-spacing': [
      'error',
      {
        overrides: {
          if: { after: true },
          for: { after: true },
          while: { after: true },
        },
      },
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: false,
      },
    ], // https://eslint.org/docs/latest/rules/prefer-const
    'valid-typeof': ['error', { requireStringLiterals: false }],
    'arrow-body-style': ['error', 'as-needed'],

    'no-console':
      process.env.NODE_ENV === 'production' ? ['warn', { allow: ['error', 'info'] }] : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-param-reassign': ['error', { props: true }],
    'no-shadow': 'off', // https://eslint.org/docs/rules/no-shadow
    'no-empty': ['error', { allowEmptyCatch: false }], // https://eslint.org/docs/latest/rules/no-empty
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

    'no-mixed-operators': 'off',
    'no-bitwise': ['error', { allow: ['~'], int32Hint: true }], // https://eslint.org/docs/latest/rules/no-bitwise
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }], // https://eslint.org/docs/latest/rules/no-unused-vars
    'no-constant-condition': ['error', { checkLoops: true }], // https://eslint.org/docs/latest/rules/no-constant-condition
    'no-multiple-empty-lines': ['error', { max: 2 }], // https://eslint.org/docs/latest/rules/no-multiple-empty-lines

    'no-underscore-dangle': 'off', // https://eslint.org/docs/latest/rules/no-underscore-dangle
    'no-return-assign': ['error', 'except-parens'], // https://eslint.org/docs/latest/rules/no-return-assign
    'promise/param-names': 'off', // https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/param-names.md
    'global-require': 'off', // https://eslint.org/docs/latest/rules/global-require
    'vue/no-v-html': 'off',
  },
};
