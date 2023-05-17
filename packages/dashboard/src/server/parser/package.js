const { readPackageByPath } = require("../helpers/package-read");
const { getSizeOfPackageFile } = require("../helpers/folder-size");

const parsePackageList = async (json) => {
  // add workspace name in package data
  const parsedData = json.map(async (p) => {
    const pr = p.location.split(global.WS)[1].split("/");
    pr[pr.length - 1] = undefined;
    const ws = pr.join("");
    p.workspace = ws;

    const { files } = await readPackageByPath(p.location);
    const s = getSizeOfPackageFile(p.location, files);
    p.size = s;
    return p;
  });

  const d = await Promise.all(parsedData);

  /**
   ws1:[
		 {pkg1},
		 {pkg2}
	 ],
	 ws2:[
		 {pkg3},
		 {pkg4}
	 ]
	*/
  const groupedByWorkspace = d.reduce((r, a) => {
    r[a.workspace] = r[a.workspace] || [];
    r[a.workspace].push(a);
    return r;
  }, Object.create(null));

  const wskeys = Object.getOwnPropertyNames(groupedByWorkspace);
  const finalList = [];

  /**
   {
		 	workspace:'ws1',
			packages: []
	 },
	 {
		 	workspace:'ws2',
			packages: []
	 }
	*/
  wskeys.forEach((item) => {
    finalList.push({
      workspace: item,
      packages: groupedByWorkspace[item],
    });
  });
  return finalList;
};

module.exports = { parsePackageList };
