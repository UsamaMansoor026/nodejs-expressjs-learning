const express = require("express");
const authController = require("../controllers/authController");
const authRouter = express.Router();

authRouter.get("/login", authController.getLoginForm);
authRouter.post("/login", authController.postLoginForm);
authRouter.post("/logout", authController.getLogout);

module.exports = authRouter;
