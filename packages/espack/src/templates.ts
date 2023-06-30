const templateDevCJS = ({ path }: { path: string }): string => {
  return `"use strict";
const { register } = require("esbuild-register/dist/node");

const { unregister } = register({
  jsx: 'automatic',
  loader: { '.js': 'jsx' },
});

module.exports = require("${path}");

// Unregister the require hook if you don't need it anymore
unregister();
  `;
};

const templateDevTsDefination = ({ path }: { path: string }): string => {
  return `export * from "${path}";`;
};

export { templateDevCJS, templateDevTsDefination };
