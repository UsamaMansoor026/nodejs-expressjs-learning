const express = require("express");
const userRouter = express.Router();
const homeController = require("../controllers/homeController");

userRouter.get("/", homeController.getHomes);

module.exports = userRouter;
