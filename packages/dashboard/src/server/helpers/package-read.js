const readPackageJSON = require("read-package-json-fast");

const readPackageByPath = async (path) => {
  // readPackageJSON(filename, [logFunction=noop], [strict=false], cb)
  return readPackageJSON(path + "/package.json");
};

module.exports = { readPackageByPath };
