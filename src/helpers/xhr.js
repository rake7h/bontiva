const apiHost =  'http://localhost:4000';

async function doFetch(url = '', data = {}, opts= {}) {
	const payload = {
		method: opts.method || "GET",
		headers: {
			'Content-Type': 'application/json'
		},
	}

	if(opts.method  === 'POST') {
	 	payload.body = JSON.stringify(data)
	}

	const response = await fetch(url, payload);
	return response.json();
}

const createPackage = (data) => doFetch(`${apiHost}/package/new`, data, {method: 'POST'})
const versionBumpXHR = (data) => doFetch(`${apiHost}/version`, data, {method: 'POST'})
const getAllWorkspaces = () =>  doFetch(`${apiHost}/workspaces`);
const getAllPackages = () =>  doFetch(`${apiHost}/packages`);

export {
	createPackage,
	getAllWorkspaces,
	getAllPackages,
	versionBumpXHR,
}
