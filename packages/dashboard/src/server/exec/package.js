const { doExec } = require("../helpers/exec");
const { parsePackageList } = require("../parser/package");

const createPackageCMD = ({ name, location }) =>
  `lerna create ${name} ${location} --yes --es-module -y`;
const listPackagesCMD = () => "lerna ls --json";

const createPackage = async (obj = {}) => {
  const cmd = createPackageCMD({ name: obj.name, location: obj.workspace });
  return doExec(cmd);
};

const listPackages = async () => {
  const cmd = listPackagesCMD();
  try {
    const { error, stdout, stderr } = await doExec(cmd);
    const packData = await parsePackageList(JSON.parse(stdout));
    const r = {
      data: packData,
    };
    return r;
  } catch (e) {
    console.log("e", e);
    return { error: e };
  }
};

module.exports = {
  createPackage,
  listPackages,
};
