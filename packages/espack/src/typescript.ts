import {
  createProgram,
  CompilerOptions,
  Program,
  ScriptTarget,
} from "typescript";

import { PackagePath } from "./types";
import { writefile } from "./fs";

interface GenerateTypeDefination {
  srcFiles: string[];
  outputDir: PackagePath;
}

const tsCompile = (fileNames: string[], options: CompilerOptions): Program => {
  // Prepare and emit the d.ts files

  // memorize the program instance, works if there are multiple files
  if (!globalThis.memorizeProgram)
    globalThis.memorizeProgram = createProgram(fileNames, options);

  const program = globalThis.memorizeProgram;

  return program.emit(
    undefined,
    (file, code) => {
      writefile({ file, code });
    },
    undefined,
    true
  );
};

const generateTypeDefination = ({
  srcFiles,
  outputDir,
}: GenerateTypeDefination): Program => {
  // Run the compiler
  return tsCompile(srcFiles, {
    declaration: true,
    emitDeclarationOnly: true,
    declarationDir: outputDir,
    skipLibCheck: true,
    target: ScriptTarget.ES2016,
  });
};

export { generateTypeDefination };
