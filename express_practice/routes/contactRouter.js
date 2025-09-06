const express = require("express");
const contactRouter = express.Router();
const rootDir = require("../utils/path");
const path = require("path");

contactRouter.get("/", (req, res, next) => {
  console.log("Handling /contact-us for GET", req.url, req.method);
  res.sendFile(path.join(rootDir, "views", "contactForm.html"));
});

contactRouter.post("/", (req, res) => {
  console.log("Handling /contact-us for POST", req.url, req.method, req.body);
  res.sendFile(path.join(rootDir, "views", "formSubmitted.html"));
});

module.exports = contactRouter;
