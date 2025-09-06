const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/path");
const path = require("path");

// __dirname is the constant which represent the current directory in this case it is routes folder so we have to move one folder up so we use ../ and then the name of folder where html files are present that is views

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded());

app.use(userRouter);
app.use("/host", hostRouter);

/* Custom 404 not found page */
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
