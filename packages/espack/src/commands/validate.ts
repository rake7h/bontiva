/**
 * validate the package for right espack config and its respective outputs
 */

import { readEspackProjectConfig } from "../config";

const validate = () => {
  const REPO_ROOT = process.cwd();
  const config = readEspackProjectConfig();

  /**
   * espack config should be present with entrypoints
   */

  // espack config should be present with entrypoints
  // for each entrypoints there should be exports and typesVersions
  // dist folder should be present in files fields
  //
};

export { validate };
