const express = require("express");
const bodyParser = require("body-parser");
const contactRouter = require("./routes/contactRouter");
const rootDir = require("./utils/path");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded());

app.get("/", (req, res, next) => {
  console.log("Handling / for GET", req.url, req.method);
  res.sendFile(path.join(rootDir, "views", "home.html"));
});

app.use("/contact", contactRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
