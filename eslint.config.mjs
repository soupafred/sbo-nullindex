// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

export default withNuxt({
  plugins: {
    prettier,
    import: importPlugin,
  },
  rules: {
    // Prettier integration
    'prettier/prettier': ['error'],

    // Import order for cleaner structure
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],

    // General
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],

    // Vue-specific tweaks
    'vue/multi-word-component-names': 'off', // allow single-word component names
  },
});
