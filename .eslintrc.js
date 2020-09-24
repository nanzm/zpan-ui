module.exports = {
  extends: ["react-app", "plugin:prettier/recommended"],
  rules: {
    "react-hooks/exhaustive-deps": "off", // 檢查 effect 的相依性
    "@typescript-eslint/no-unused-vars": "off",
    "jsx-a11y/anchor-is-valid": "off",
  },
};
