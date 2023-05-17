const fastFolderSizeSync = require("fast-folder-size/sync");

const getDirSize = (dir) => {
  console.log(
    dir,
    "getDirSize",
    "did you fotgot to build packages? dist file does not exist"
  );
  // sync
  const bytes = fastFolderSizeSync(dir);
  return bytes;
};

const getSizeOfPackageFile = (path, files) => {
  let s = 0;
  files.forEach((f) => {
    const fpath = path + "/" + f + "/";
    s += getDirSize(fpath);
  });
  return s;
};

module.exports = { getSizeOfPackageFile };
