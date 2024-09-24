module.exports = {
  extends: [
    "plugin:@docusaurus/recommended",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
    project: ["./tsconfig.json"]
  },
  rules: {
    '@docusaurus/no-untranslated-text': 0
  },
};