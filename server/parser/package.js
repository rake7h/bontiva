const parsePackageList = (json) => {
	const parsedData = json.map((item) => {
		console.log('item', item.location)
		console.log('item', item.location.split(global.WS)[1])
		const pr = item.location.split(global.WS)[1].split('/');
		pr[pr.length - 1] = undefined;
		const ws = pr.join('');
		item.workspace = ws;
		return item;
	});

	const groupedByWorkspace = parsedData.reduce((r, a) => {
		r[a.workspace] = r[a.workspace] || [];
		r[a.workspace].push(a);
		return r;
	}, Object.create(null));

	const wskeys = Object.getOwnPropertyNames(groupedByWorkspace);
	const finalList = [];

	wskeys.forEach((item) => {
		finalList.push({
			workspace: item,
			packages: groupedByWorkspace[item],
		});
	});
	return finalList;
};

module.exports = {parsePackageList};
