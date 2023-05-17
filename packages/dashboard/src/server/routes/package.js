const express = require("express");
const { createPackage, listPackages } = require("../exec/package");

const router = express.Router();

router.post("/package/new", async function (req, res) {
  const { body } = req;

  const { name, workspace } = body;

  // console.log('package', name);
  // console.log('workspace', workspace);

  const out = await createPackage({ name, workspace });
  res.send(out);
});

router.get("/packages", async function (req, res) {
  const r = await listPackages();
  res.send(r);
});
module.exports = router;
