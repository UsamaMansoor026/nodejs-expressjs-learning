const express = require("express");
const userRouter = express.Router();
const rootDir = require("../utils/path");
const path = require("path");
const { registeredHomes } = require("./hostRouter");

userRouter.get("/", (req, res) => {
  console.log(registeredHomes);
  // res.sendFile(path.join(rootDir, "views", "home.html"));
  res.render("home", { registeredHomes: registeredHomes });
});

module.exports = userRouter;
