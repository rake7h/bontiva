const { doExec } = require("../helpers/exec");

// https://classic.yarnpkg.com/en/docs/cli/version/

const versionCMD = (kind, version) => {
  let c = "yarn version --no-commit-hooks ";
  if (version) {
    return (c += `--new-version ${version}`);
  }
  if (kind === "patch") {
    return (c += "--patch");
  }
  if (kind === "minor") {
    return (c += "--minor");
  }
  if (kind === "major") {
    return (c += "--major");
  }
};

const bumpVersion = async (kind, location) => {
  const cmd = versionCMD(kind, undefined);
  try {
    console.log({ cmd });
    const { error, stdout, stderr } = await doExec(cmd, location);
    console.log("bumpVersion stdout", error);
    const r = {
      data: stdout,
    };
    return r;
  } catch (e) {
    console.log("e", e);
    return { error: e };
  }
};

module.exports = {
  bumpVersion,
};
