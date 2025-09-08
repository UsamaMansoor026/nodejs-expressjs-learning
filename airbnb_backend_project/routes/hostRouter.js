const express = require("express");
const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res) => {
  res.render("addHome", { currentPage: "addHome" });
});

const registeredHomes = [];

hostRouter.post("/add-home", (req, res) => {
  console.log(req.body);
  registeredHomes.push(req.body);
  console.log("Registered homes: ", registeredHomes);
  res.render("homeAdded", { currentPage: "homeAdded" });
});

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;
