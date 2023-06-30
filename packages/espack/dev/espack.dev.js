"use strict";
const { register } = require("esbuild-register/dist/node");

const { unregister } = register({
  jsx: "automatic",
});

module.exports = require("../src/cli.ts");

unregister();
