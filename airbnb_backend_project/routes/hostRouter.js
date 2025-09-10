const express = require("express");
const hostRouter = express.Router();
const hostController = require("../controllers/hostController");

hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.get("/edit-home/:homeId", hostController.getEditHome);
hostRouter.get("/host-home-list", hostController.getHostHomes);
hostRouter.post("/add-home", hostController.addHome);
hostRouter.post("/edit-home", hostController.editHome);
hostRouter.post("/delete-home/:homeId", hostController.deleteHome);

exports.hostRouter = hostRouter;
