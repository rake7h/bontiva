import fs from "fs-extra";
import { writefile, cleanAndMake } from "../fs";
import { templateDevCJS, templateDevTsDefination } from "../templates";
import path from "path";
import { getPackageDirGlob } from "../globs";
import { readPackageJSON } from "../json";
import { getEntryPointsForBuild } from "../entrypoints";
import { readEspackProjectConfig } from "../config";
import { info, error } from "../logger";

const REPO_ROOT = process.cwd();

interface DevBuild {
  inFile: string;
  outFile: string;
  outTsFile: string;
}

const devGenerateTSD = ({ outTsFile, inFile }): void => {
  // create d.ts for source
  const srcFilePath = path.relative(
    path.dirname(outTsFile),
    inFile.replace(/\.tsx?$/, "")
  );
  const outSourceTS = templateDevTsDefination({ path: srcFilePath });
  writefile({ file: outTsFile, code: outSourceTS });
};

const devBuildESM = ({ inFile, outFile }: DevBuild): void => {
  // create symlink file source
  fs.createSymlinkSync(inFile, `${outFile}.js`);
};

const devBuildCJS = ({ inFile, outFile }: DevBuild): void => {
  // transform the code to csj on demand with esbuild-register
  const outSourceJS = templateDevCJS({ path: inFile });
  writefile({ file: `${outFile}.js`, code: outSourceJS });
};

const devBuild = (): void => {
  /* 1 generate production dist file for packages path */

  const config = readEspackProjectConfig();

  if (config?.packages === undefined) {
    error("NO packages found in espack config file for build");
    return;
  }

  const packages = getPackageDirGlob({
    projectRoot: REPO_ROOT,
    packagesGlob: config.packages,
  });

  /** Read all packages config and produce the dev build dist files */
  try {
    for (const p of packages) {
      const outputDir = p + "/dist/";
      const packageJsonInfo = readPackageJSON({ pkgPath: p });

      if (!config?.packages) {
        error("NO packages found in espack config file for build");
        return;
      }

      const entryPoints = getEntryPointsForBuild({
        pkgPath: p,
        packageJsonInfo,
      });

      // clear the existing build dir and generate fresh dist
      cleanAndMake(outputDir);

      entryPoints.forEach((e) => {
        if (e.cjs) devBuildCJS(e.cjs);
        if (e.esm) devBuildESM(e.esm);
        if (e.tsd) devGenerateTSD(e.tsd);
      });
    }
    info("dev linking done!");
  } catch (e) {
    error("dev linking failed", e);
  }
};

export { devBuildESM, devBuildCJS, devBuild };
