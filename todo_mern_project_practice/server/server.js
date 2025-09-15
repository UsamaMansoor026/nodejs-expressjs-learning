const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the MERN To-Do Web App" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
