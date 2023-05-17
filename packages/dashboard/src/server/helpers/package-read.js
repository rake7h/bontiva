const readJson = require("read-package-json-fast");

const readPackageByPath = async (path) => {
  // readJson(filename, [logFunction=noop], [strict=false], cb)
  return readJson(path + "/package.json");
};

module.exports = { readPackageByPath };
