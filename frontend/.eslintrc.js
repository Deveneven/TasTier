module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'jest': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'project': './tsconfig.json'
  },
  'plugins': [
    'react',
    '@typescript-eslint',
    'react-hooks',
    'prettier'
  ],
  'rules': {
    "require-jsdoc": 'off',
    'linebreak-style': 'off',
    'max-len': ['error', {
      'code': 90
    }]
  },
};
