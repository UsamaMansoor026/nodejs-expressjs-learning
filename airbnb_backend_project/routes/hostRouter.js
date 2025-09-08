const express = require("express");
const hostRouter = express.Router();
const rootDir = require("../utils/path");
const path = require("path");

hostRouter.get("/add-home", (req, res) => {
  res.render("addHome");
});

const registeredHomes = [];

hostRouter.post("/add-home", (req, res) => {
  registeredHomes.push({ homeName: req.body.housename });
  res.render("homeAdded");
});

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;
