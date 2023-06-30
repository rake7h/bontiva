import { cleanAndMake } from "../fs";
import { readPackageJSON } from "../json";
import { getEntryPointsForBuild, BuildEntries } from "../entrypoints";
import { esBuild } from "../esbuild";
import { generateTypeDefination } from "../typescript";
import { info } from "../logger";

interface ProdBuild {
  inFile: string;
  outFile: string;
  outputDir: string;
}

interface BuildTSD {
  inFile: string;
  outputDir: string;
}

const generateTSD = async (opts: BuildTSD): Promise<any> => {
  const { inFile, outputDir } = opts;
  // produce d.ts files for all source
  const a = await new Promise((resolve, reject) => {
    resolve(
      generateTypeDefination({
        srcFiles: [inFile],
        outputDir,
      })
    );
  });
  return a;
};

const prodBuildESM = async (opts: ProdBuild): Promise<any> => {
  const { inFile, outFile, outputDir } = opts;

  // esbuild esm
  return esBuild({
    entryPoints: [{ in: inFile, out: outFile }],
    platform: "neutral",
    outputDir,
  });
};

const prodBuildCJS = async (opts: ProdBuild): Promise<any> => {
  const { inFile, outFile, outputDir } = opts;

  // esbuild cjs
  return esBuild({
    entryPoints: [{ in: inFile, out: outFile }],
    platform: "node",
    outputDir,
  });
};

const prodBuild = async (): Promise<void> => {
  /* 1 generate production dist file for packages path */

  const packageDir = process.cwd();

  /** Read package config and produce the production dist files */
  try {
    const outputDir = packageDir + "/dist/";
    const declarationOutputDir = outputDir + "declarations";

    const packageJsonInfo = readPackageJSON({ pkgPath: packageDir });

    // package can have espack object for configs
    // TODO: replace this with validate()
    if (!packageJsonInfo) {
      console.log("No package.json found at" + " " + packageDir);
      return;
    }

    const entryPoints: BuildEntries = getEntryPointsForBuild({
      pkgPath: packageDir,
      packageJsonInfo,
    });
    // clear the existing build dir and generate fresh dist
    cleanAndMake(outputDir);

    info(`building ${entryPoints.length} entrypoints`);

    for (const e of entryPoints) {
      if (e.esm) {
        info(`ESM build started --> ${packageDir}`);
        prodBuildESM({ ...e.esm, outputDir })
          .then((result) => {
            info(`ESM build done ---> ${packageDir}`);
          })
          .catch((e) => {
            throw e;
          });
      }
      if (e.cjs) {
        info(`ESM build started ---> ${packageDir}`);
        prodBuildCJS({ ...e.cjs, outputDir })
          .then((result) => {
            info(`CJS build done ---> ${packageDir}`);
          })
          .catch((e) => {
            throw e;
          });
      }

      if (e.tsd) {
        info(`TSD build started --->${packageDir}`);
        generateTSD({
          inFile: e.tsd.inFile,
          outputDir: declarationOutputDir,
        })
          .then((r) => {
            info(`TDS build done ---> ${packageDir}`);
          })
          .catch((e) => {
            throw e;
          });
      }
    }
  } catch (e) {
    console.log("Build failed :( \n", e);
  }
};

export { prodBuildESM, prodBuildCJS, prodBuild };
