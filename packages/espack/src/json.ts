import fs from "fs-extra";
import type { PackagePath, PackageJson } from "./types";

interface WriteJSON {
  location: string;
  objects: Record<any, any>;
}

const writeJSON = ({ location, objects }: WriteJSON): void => {
  try {
    fs.outputJsonSync(location, objects, { spaces: 2 });
  } catch (e) {
    console.error("writeJSON failed", e);
  }
};

const readPackageJSON = ({
  pkgPath,
}: {
  pkgPath: PackagePath;
}): PackageJson | undefined => {
  const packageObj = fs.readJsonSync(`${pkgPath}/package.json`);
  if (Object.keys(packageObj).length > 0) {
    return packageObj;
  }
  throw new Error("package.json not found or could be invalid for " + pkgPath);
};

export { readPackageJSON, writeJSON };
