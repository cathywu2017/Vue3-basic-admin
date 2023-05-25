/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true, // 當前為根目錄，設定為 true 時停止往父層搜尋 .eslintrc
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parser: 'vue-eslint-parser', // 解析器
  parserOptions: {
    parser: '@typescript-eslint/parser', // 安裝解析器
    ecmaVersion: 'latest', // 指定要使用的 ECMAScript 版本
    ecmaFeatures: {
      jsx: true // 是否啟用JSX
    },
    sourceType: 'module' // 設置為 script (預設) 或 module（使用 ECMAScript)
  },
  rules: {
    'prettier/prettier': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-alert': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
