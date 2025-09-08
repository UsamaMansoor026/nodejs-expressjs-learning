const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/path");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
const PORT = 3000;

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(rootDir, "public")));

app.use(userRouter);
app.use("/host", hostRouter);

/* Custom 404 not found page */
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
