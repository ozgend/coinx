module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'eqeqeq': ['error', 'always'],
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'comma-dangle': [2, 'never']
  }
}
