module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', 'prettier', 'unused-imports'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // 'prettier/prettier': 'warn',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
