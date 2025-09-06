const express = require("express");

const app = express();
const PORT = 3000;

const somemiddleware = (req, res, next) => {
  console.log("This middleware is a function syntax");
  console.log(req.method);
  next();
};

// Adding middleware
app.use((req, res, next) => {
  console.log("I am first middleware");
  next();
});

app.use("/about", (req, res, next) => {
  console.log(
    "I am second middleware and run only when user visit about route"
  );
  next();
});

app.get("/", (req, res) => {
  console.log("From Express.js");
  res.send("<h1>Hello, World! from Express.js</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
