import { build } from "esbuild";
import type { BuildOptions } from "esbuild";

interface Build {
  wrDir?: string;
  entryPoints: BuildOptions["entryPoints"];
  outputDir: BuildOptions["outdir"];
  externals?: BuildOptions["external"];
  platform: BuildOptions["platform"];
}

const esBuild = ({
  wrDir,
  entryPoints,
  outputDir,
  externals,
  platform,
}: Build): any => {
  // console.log("entryPoints", entryPoints);
  return build({
    entryPoints, // we could pass multiple files from bootconfig
    bundle: true,
    outdir: outputDir,
    outbase: "src",
    packages: "external",
    treeShaking: true,
    minify: true,
    splitting: platform === "neutral", // outdir is must
    platform, // neutral
    target: ["es6"],
    // keepNames: true,
    // tsconfig: "tsconfig.json",
    // preserveSymlinks: true,
    // metafile: true,
    // logLevel: "info",
  });
};

export { esBuild };
