const express = require("express");
const bodyParser = require("body-parser");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/path");
const path = require("path");
const errorController = require("./controllers/404Controller");
const storeRouter = require("./routes/storeRouter");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
const PORT = 3000;

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(rootDir, "public")));

app.use(storeRouter);
app.use("/host", hostRouter);

/* Custom 404 not found page */
app.use(errorController.get404);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
