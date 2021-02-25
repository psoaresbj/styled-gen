module.exports = {
  env: {
    amd: true,
    browser: true,
    es6: true,
    node: true
  },
  extends: ['standard', 'standard-jsx', 'standard-react', 'eslint:recommended', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  plugins: ['react', 'sort-imports-es6'],
  rules: {
    'no-duplicate-imports': 'error',
    'no-eval': 'error',
    'no-inline-comments': 'error',
    'no-iterator': 'error',
    'no-loop-func': 'error',
    'no-mixed-requires': 'error',
    'no-multi-str': 'error',
    'no-nested-ternary': 'error',
    'no-process-env': 'error',
    'no-throw-literal': 'error',
    'no-underscore-dangle': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 'error',
    'no-use-before-define': 'error',
    'object-shorthand': 'error',
    'operator-assignment': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', next: 'return', prev: '*' },
      { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
      { blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] }
    ],
    'prefer-const': 'error',
    'prefer-destructuring': [
      'error',
      {
        AssignmentExpression: { array: false, object: false },
        VariableDeclarator: { array: true, object: true }
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'prettier/prettier': ['error', { arrowParens: 'avoid', printWidth: 120, singleQuote: true, trailingComma: 'none' }],
    radix: 'error',
    'require-atomic-updates': 'off',
    'require-await': 'error',
    'sort-imports-es6/sort-imports-es6': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],
    'sort-keys': ['error', 'asc', { natural: true }],
    'spaced-comment': 'error'
  }
};
