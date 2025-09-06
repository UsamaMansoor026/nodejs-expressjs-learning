const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send(`<h1>Welcome to the Airbnb Backend!</h1>
    <a href="/host/add-home">Add Home</a>
    `);
});

module.exports = userRouter;
