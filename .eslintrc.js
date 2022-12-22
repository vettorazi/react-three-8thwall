module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'eol-last': ['error', 'always'],
    'no-debugger': 'error',
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'react/no-children-prop': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    semi: ['error', 'never'],
  },
}
