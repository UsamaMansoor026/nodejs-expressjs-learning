const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded());

app.get("/", (req, res, next) => {
  console.log("Handling / for GET", req.url, req.method);
  res.send("<h1>This is the response from the GET /</h1>");
});

app.get("/contact-us", (req, res, next) => {
  console.log("Handling /contact-us for GET", req.url, req.method);
  res.send(`
    <h1>Please enter your details</h1>
    <form action="/contact-us" method="POST">
      <input type="text" name="name" placeholder="Your Name" />
      <input type="email" name="email" placeholder="Your Email" />
        <button type="submit">Submit</button>
    </form>
    `);
});

app.post("/contact-us", (req, res) => {
  console.log("Handling /contact-us for POST", req.url, req.method, req.body);
  res.send("<h1>Thanks for submitting the form</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
