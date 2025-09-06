const express = require("express");
const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res) => {
  res.send(`
        <a href="/">Back to home</a>
        <h1>Register your home here...</h1>
        <form action="/host/add-home" method="POST">
            <input type="text" name="housename" placeholder="Home Name" required/><br/>
            <input type="submit" value="Add Home"/>
        </form>
    `);
});

hostRouter.post("/add-home", (req, res) => {
  res.send(`
        <a href="/">Back to home</a>
        <h1>Your home ${req.body.housename} is now registered...</h1>
        
    `);
});

module.exports = hostRouter;
