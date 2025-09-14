const MONGO_URI =
  "mongodb+srv://usamadev:6PXWn4dzPtIPhmbK@airbnbbackend.38p3qy9.mongodb.net/airbnb?retryWrites=true&w=majority&appName=airbnbbackend";

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
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

const store = MongoDBStore({
  uri: MONGO_URI,
  collection: "sessions",
});

app.use(bodyParser.urlencoded());
app.use(
  session({
    secret: "Usama Web Developer",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);
app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
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
