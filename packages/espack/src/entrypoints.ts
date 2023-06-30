import path from "path";
import type { PackagePath, Entrypoints, PackageJson } from "./types";
import { getIndexSrcInPackageGlob, getFileInDirGlob } from "./globs";

interface GetEntryPointsInPackages {
  ({
    pkgPath,
    packageJsonInfo,
  }: {
    pkgPath: PackagePath;
    packageJsonInfo: PackageJson;
  });
}

interface EntrypointNameOutputFormat {
  ({ entrypointName, nameOnly }: { entrypointName: string; nameOnly: boolean });
}

interface GetEntryPointsForBuild {
  ({
    packageJsonInfo,
    pkgPath,
  }: {
    packageJsonInfo: PackageJson;
    pkgPath: PackagePath;
  });
}

export type BuildEntries = Array<{
  esm: {
    inFile: string;
    outFile: string;
  };
  cjs: {
    inFile: string;
    outFile: string;
  };
  tsd: {
    outTsFile: string;
    inFile: string;
    outTsDir: string;
  };
}>;

const packageSrcPathNormalize = ({ pkgPath }: { pkgPath: string }): string => {
  return `${pkgPath}/src/`;
};

const getEspackConfigEntrypoints = ({
  packageJsonInfo,
}: {
  packageJsonInfo: PackageJson;
}): Entrypoints => {
  const entries = packageJsonInfo?.preconstruct?.entrypoints || [];
  return entries;
};

/** Read all the entrypoints(espack.entrypoints) including index  */
const getEntryPointsInPackage: GetEntryPointsInPackages = ({
  pkgPath,
  packageJsonInfo,
}) => {
  // find the default source file (index.{ts, tsx, js, jsx})
  const indexEntry = getIndexSrcInPackageGlob({ pkgPath });

  // get all the entrypoints files from package.json
  const pkgJsonEntries: string[] = [];

  const esPackEntrypoints = getEspackConfigEntrypoints({ packageJsonInfo });

  esPackEntrypoints.forEach((element) => {
    pkgJsonEntries.push(
      ...getFileInDirGlob({
        dirPath: packageSrcPathNormalize({ pkgPath }),
        filePath: element,
      })
    );
  });
  return [...indexEntry, ...pkgJsonEntries];
};

/***
 * we use this entrypoints name on exports fields of pacakge.json
 * and same gets use as build output file name fot a entrypoint
 */
const entrypointNameOutputFormat: EntrypointNameOutputFormat = ({
  entrypointName,
  nameOnly,
}): string => {
  // utils/fetch.ts -> utils-fetch.ts
  let s = entrypointName.split("@").join("").split("/").join("-");

  if (nameOnly) {
    s = path.parse(s).name;
  }

  return s;
};

/** Build entrypoints and its corresponding output files */
const getEntryPointsForBuild: GetEntryPointsForBuild = ({
  pkgPath,
  packageJsonInfo,
}): BuildEntries => {
  const buildEntries: BuildEntries = [];
  const entryPoints = getEntryPointsInPackage({ pkgPath, packageJsonInfo });

  entryPoints.forEach((ep) => {
    const entryPointsName: string = entrypointNameOutputFormat({
      entrypointName: ep,
      nameOnly: true,
    });

    const b = {
      esm: {
        inFile: `${pkgPath}/src/${ep}`,
        outFile: `${pkgPath}/dist/esm/${entryPointsName}`,
      },
      cjs: {
        inFile: `${pkgPath}/src/${ep}`,
        outFile: `${pkgPath}/dist/cjs/${entryPointsName}`,
      },
      tsd: {
        // for prod build
        outTsDir: `${pkgPath}/dist/declarations/`,

        // for local build
        inFile: `${pkgPath}/src/${ep}`,
        outTsFile: `${pkgPath}/dist/declarations/${entryPointsName}.d.ts`,
      },
    };
    buildEntries.push(b);
  });

  return buildEntries;
};

export {
  getEntryPointsInPackage,
  entrypointNameOutputFormat,
  getEntryPointsForBuild,
};
