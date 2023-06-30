import { getEntryPointsInPackage } from "../entrypoints";
import { addInitConfigsInPackage } from "../exports";
import { readPackageJSON, writeJSON } from "../json";
import { readEspackProjectConfig } from "../config";
import { getPackageDirGlob } from "../globs";
import type { PackageJson } from "../types";
import { info, error } from "../logger";

interface InitPackageConfigs {
  pkgPath: string;
  pkgJSON: PackageJson;
}

const initPackageConfigs = ({ pkgPath, pkgJSON }: InitPackageConfigs): void => {
  // read package.json entrypoints
  const entryPoints = getEntryPointsInPackage({
    pkgPath,
    packageJsonInfo: pkgJSON,
  });

  // write exports for each entry in package.json
  const exports = addInitConfigsInPackage({
    entryPoints,
    pkgJSON,
    distDir: "dist",
  });

  writeJSON({
    location: pkgPath + "/package.json",
    objects: exports,
  });
};

const init = (): void => {
  const REPO_ROOT = process.cwd();
  const config = readEspackProjectConfig();

  if (!config?.packages) {
    error("NO packages found in espack config file for build");
    return;
  }

  const packages = getPackageDirGlob({
    projectRoot: REPO_ROOT,
    packagesGlob: config.packages,
  });

  /* read each pacakges and init the configuration in package.json */
  for (const p of packages) {
    try {
      const packageJsonInfo = readPackageJSON({ pkgPath: p });
      initPackageConfigs({ pkgPath: p, pkgJSON: packageJsonInfo });
    } catch (e) {
      error("Init package failed:", e);
      process.exit(0);
    }
  }
  info("init completed!");
};

export { init };
