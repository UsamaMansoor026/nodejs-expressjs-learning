const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/path");
const path = require("path");
const errorController = require("./controllers/404Controller");
const storeRouter = require("./routes/storeRouter");
const connectToDB = require("./utils/db");
const authRouter = require("./routes/authRouter");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
const PORT = 3000;

connectToDB();

app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  const isLoggedIn = req.cookies.isLoggedIn;
  console.log("Cookie isLoggedIN: ", isLoggedIn);
  req.isLoggedIn = isLoggedIn === "true" ? true : false;
  next();
});
app.use("/auth", authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/auth/login");
  }
});
app.use("/host", hostRouter);

/* Custom 404 not found page */
app.use(errorController.get404);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
