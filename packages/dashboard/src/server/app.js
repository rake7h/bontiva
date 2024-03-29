const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(morgan("combined"));

const packages = require("./routes/package");
const workspaces = require("./routes/workspace");
const version = require("./routes/version");

const WS = process.env.REPO_PATH;
// eslint-disable-next-line import/no-dynamic-require
const WSPackage = require(`${WS}/package.json`);
global.WS = WS;
global.WSPKG = WSPackage;

app.use(
  cors({
    origin: "*",
    preflightContinue: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(packages);
app.use(workspaces);
app.use(version);

module.exports = app;
