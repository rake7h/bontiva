module.exports = {
  plugins: [],
  presets: [
    [
      "@babel/preset-env",
      {
        bugfixes: true,
        loose: true,
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-runtime"],
    },
  },
};
