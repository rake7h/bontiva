const express = require("express");

const router = express.Router();

const wsNormalize = (w) => w.map((i) => i.split("/*")[0]);

router.get("/workspaces", function (req, res) {
  const { workspaces } = global.WSPKG;
  res.send(wsNormalize(workspaces));
});

module.exports = router;
