module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  // in antd-design-pro
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
  // your rules
  rules: {
    'prefer-const': 0,
    '@typescript-eslint/no-unused-vars': 0,
  },
}
