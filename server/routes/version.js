const express = require('express');
const {bumpVersion} = require('../exec/version');

const router = express.Router();

router.post('/version', async function(req, res) {
	const {body} = req;

	const {
		kind,
    location
	} = body

	console.log('kind', kind);
	console.log('location', location);

	const out  = await bumpVersion(kind, location);
	res.send(out);
});

module.exports = router;
