module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // General

    "@typescript-eslint/no-unused-vars": "warn",

    // React
    "react/jsx-boolean-value": "warn",
    "react/jsx-curly-brace-presence": "warn",
    "react/jsx-fragments": "warn",
    "react/jsx-no-useless-fragment": "warn",
    "react/jsx-uses-react": "off",
    "react/prefer-stateless-function": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-var-requires": "off",
    "no-undef": ["error", { typeof: true, module: true }],
    // Functional

    "react/react-in-jsx-scope": "off",

    eqeqeq: ["error", "always", { null: "ignore" }],
    camelcase: ["error", { properties: "never" }],
    //quotes: ["error", "single", { avoidEscape: true }],
  },
};
