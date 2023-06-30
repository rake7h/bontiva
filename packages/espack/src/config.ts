import { cosmiconfigSync } from "cosmiconfig";
import type { EsPackConfig } from "./types";

const readEspackProjectConfig = (): EsPackConfig | undefined => {
  // default config locations

  const configPaths = [process.cwd()];
  const explorer = cosmiconfigSync("espack", {
    searchPlaces: configPaths,
  });

  try {
    const result = explorer.load(configPaths[0] + "/espack.config.js");
    return result?.config;
  } catch (e) {
    console.log("err", e);
  }
};

export { readEspackProjectConfig };
