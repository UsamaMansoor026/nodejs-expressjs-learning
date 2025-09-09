const express = require("express");
const hostRouter = express.Router();
const hostController = require("../controllers/hostController");

hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.get("/host-home-list", hostController.getHostHomes);
hostRouter.post("/add-home", hostController.addHome);

exports.hostRouter = hostRouter;
