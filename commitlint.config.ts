export default {
  extends: ['@commitlint/config-conventional'],
  rule: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'chore',
        'perf',
        'ci',
        'ops',
        'build',
        'docs',
        'style',
        'revert',
        'test'
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'header-pattern': [2, 'always', /^[a-z]+(\([\w-]+\))?: .+$/],
    'scope-empty': [0]
  }
};
