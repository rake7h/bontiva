import fs from "fs-extra";
interface Writefile {
  file: string;
  code: string;
}

const cleanDir = (dir: string): void => {
  // clean
  if (!dir) {
    console.log("dir arg is missing for cleanDir() call");
  }

  if (fs.existsSync(dir)) return fs.removeSync(dir);
};

const cleanAndMake = (dir: string): void => {
  // clean and make same dir
  if (!dir) {
    console.log("dir arg is missing for cleanAndMake() call");
  }
  if (fs.existsSync(dir)) fs.removeSync(dir);
  fs.ensureDirSync(dir);
};

const writefile = ({ file, code }: Writefile): void => {
  if (!(file || code)) {
    throw new Error("required arguments missing for writeJsfile call");
  }
  fs.outputFileSync(file, code);
};

export { cleanDir, cleanAndMake, writefile };
