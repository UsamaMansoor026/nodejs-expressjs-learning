const express = require("express");
const hostRouter = express.Router();
const homeController = require("../controllers/homeController");

hostRouter.get("/add-home", homeController.getAddHome);

hostRouter.post("/add-home", homeController.addHome);

exports.hostRouter = hostRouter;
