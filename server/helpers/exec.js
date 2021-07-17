// https://stackabuse.com/executing-shell-commands-with-node-js

const {exec} = require('child_process');
const util = require('util');

const doExec = async (cmdString) => {
	const execSync = util.promisify(exec);

	try {
		const { error, stdout, stderr } = await execSync(cmdString, {cwd: global.WS});

		const result = {
			error,
			stdout,
			stderr
		}

		if (error) {
			console.log(`error: ${error.message}`);
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
		}
		if (stdout) {
			console.log(`stdout: ${stdout}`);
		}
		return result
	}
	catch(e) {
		return {
			error: e
		}
	}
};

module.exports = { doExec };
