const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
const userRouter = require("./router/userRouter");
const { connectDB } = require("./config/db");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));
const PORT = 3000;

const MONGODB_URI = process.env.MONGO_DB_URI;
connectDB();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use("/auth", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the MERN To-Do Web App" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
