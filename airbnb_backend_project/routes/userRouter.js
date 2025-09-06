const express = require("express");
const userRouter = express.Router();
const rootDir = require("../utils/path");
const path = require("path");

userRouter.get("/", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "home.html"));
});

module.exports = userRouter;
