const express = require("express");
const hostRouter = express.Router();
const rootDir = require("../utils/path");
const path = require("path");

hostRouter.get("/add-home", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "addHome.html"));
});

hostRouter.post("/add-home", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "homeAdded.html"));
});

module.exports = hostRouter;
