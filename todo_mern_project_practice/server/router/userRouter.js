const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/register", userController.userRegister);
userRouter.post("/login", userController.userLogin);
userRouter.post("/logout", userController.logout);
userRouter.get("/user", userController.fetchCurrentUser);

module.exports = userRouter;
