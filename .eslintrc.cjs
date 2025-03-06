 /* eslint-env node */
module.exports = {
    root: true,
    extends: [
      'plugin:vue/vue3-recommended',
      'eslint:recommended',
      '@vue/eslint-config-typescript',
    ],
    parserOptions: {
      ecmaVersion: 'latest',
    },
    rules: {
      'vue/multi-word-component-names': 'warn',
      'vue/no-unused-vars': 'error',
      'vue/script-setup-uses-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
    env: {
      'vue/setup-compiler-macros': true,
    },
  }