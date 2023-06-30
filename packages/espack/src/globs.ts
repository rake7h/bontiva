import fastGlob from "fast-glob";
import type { PackagePath } from "./types";

interface GetPackageDirGlob {
  projectRoot: string;
  packagesGlob: string[];
}

// find all pacakges directories by glob
const getPackageDirGlob = ({
  projectRoot,
  packagesGlob,
}: GetPackageDirGlob): string[] => {
  const packages = fastGlob.sync(packagesGlob, {
    cwd: projectRoot,
    onlyDirectories: true,
    absolute: true,
  });
  return packages;
};

const getIndexSrcInPackageGlob = ({
  pkgPath,
}: {
  pkgPath: PackagePath;
}): string[] => {
  // find the default source file (index.{ts, tsx, js, jsx})
  const indexEntry = fastGlob.sync("index.{js,jsx,ts,tsx}", {
    cwd: pkgPath + "/src",
    onlyFiles: true,
    caseSensitiveMatch: false,
  });
  return indexEntry;
};

const getFileInDirGlob = ({
  dirPath,
  filePath,
}: {
  dirPath: PackagePath;
  filePath: string;
}): string[] => {
  // If it's not a dynamic entrypoints return filePath
  const isDynamic = fastGlob.isDynamicPattern(filePath);
  if (!isDynamic) return [filePath];

  // find the default source file (index.{ts, tsx, js, jsx})
  const indexEntry = fastGlob.sync(filePath + ".{js,jsx,ts,tsx}", {
    cwd: dirPath,
    onlyFiles: true,
    caseSensitiveMatch: false,
  });
  return indexEntry;
};
export { getIndexSrcInPackageGlob, getPackageDirGlob, getFileInDirGlob };
