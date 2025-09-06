const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded());

app.use(userRouter);
app.use("/host", hostRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
