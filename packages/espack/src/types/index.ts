import type { PackageJson as PJ } from "type-fest";
export type PackagePath = string;
export type Entrypoints = string[];

export interface PackageJson extends PJ {
  espack: {
    entrypoints: Entrypoints;
  };
  scripts: {
    build?: string;
  };
}

export interface EsPackConfig {
  packages: string[];
}
