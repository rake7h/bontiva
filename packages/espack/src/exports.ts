/**
 * ENTRY
 * [
 * index.ts,
 * helper.ts,
 * utils/fetch.ts'
 * ]
 *
 * EXPORTS
 * "./utils-fetch": {
    "import": {
    "types": "./dist/utils-fetch.esm.d.ts",
    "default": "./dist/utils-fetch.esm.js"
  },
    "require": {
    "types": "./dist/utils-fetch.cjs.d.ts",
    "default": "./dist/utils-fetch.cjs.js"
 }
 */

import type { Entrypoints, PackageJson } from "./types";
import { entrypointNameOutputFormat } from "./entrypoints";
import { isEmptyObject } from "./utils";

interface AddInitConfigsInPackage {
  entryPoints: Entrypoints;
  distDir: string;
  pkgJSON: PackageJson;
}

const addInitConfigsInPackage = ({
  entryPoints,
  distDir,
  pkgJSON,
}: AddInitConfigsInPackage): PackageJson => {
  // write exports for each entries
  const fileds = pkgJSON;

  const exportsEntry = {};
  let typesVersions = {};

  entryPoints.forEach((entry) => {
    // eg entryName: utils-fetch
    const entryName: string = entrypointNameOutputFormat({
      entrypointName: entry,
      nameOnly: true,
    });

    const exportPath = entryName === "index" ? "." : `./${entryName}`;

    exportsEntry[exportPath] = {
      import: `./${distDir}/esm/${entryName}.js`,
      require: `./${distDir}/cjs/${entryName}.js`,
    };

    // https://www.typescriptlang.org/docs/handbook/esm-node.html
    typesVersions = Object.assign(typesVersions, {
      "*": [`./${distDir}/declarations/*`],
    });
  });

  // Add build script
  /**
   * TODO: warn overwrite, if build script is already exist
   */
  if (isEmptyObject(fileds.scripts)) fileds.scripts = {};
  fileds.scripts.build_ = "espack build";

  /**
   * Not supporting old main, module,  and types fields,
   * all the modern build tools and
   * Nodejs supports the exports fields enties
   */

  delete fileds?.main;
  delete fileds?.module;
  delete fileds?.types;
  delete fileds?.browser;

  fileds.exports = exportsEntry;
  fileds.typesVersions = { "*": typesVersions };

  Object.freeze(fileds);
  return Object.freeze(fileds);
};

export { addInitConfigsInPackage };
