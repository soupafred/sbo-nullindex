// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([
  {
    ignores: [
      'app/components/ColorBends.vue',
      'app/components/RotatingText.vue',
    ],
  },
    {
      rules: {
        // Import order for cleaner structure
        'import/order': [
          'warn',
          {
            groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true }
          }
        ],

        // General
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'no-console': ['warn', { allow: ['warn', 'error'] }],

        // Vue-specific tweaks
        'vue/multi-word-component-names': 'off',
        'vue/no-multiple-template-root': 'off',
        'vue/max-attributes-per-line': ['error', { singleline: 3 }],
        'vue/html-self-closing': [
          'error',
          {
            html: {
              void: 'always', // ✅ allow <img /> etc.
              normal: 'always',
              component: 'always'
            },
            svg: 'always',
            math: 'always'
          }
        ],
      }
    }
]
  );
