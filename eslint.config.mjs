import config from "@kami-ui/eslint-config/next";

export default [
  ...config,
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "/^_[A-Za-z0-9]+$/" },
      ],
    },
  },
];
