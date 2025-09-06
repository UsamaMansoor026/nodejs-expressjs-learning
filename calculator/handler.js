const calculatorForm = require("./calculatorForm");
const { addition } = require("./addition");

const requestHandler = (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
            <h1>Welcome to the world's best calculator</h1>
            <a href="/calculator">Go to Calculator</a>
            `);
    return res.end();
  } else if (req.url === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(calculatorForm());
    return res.end();
  } else if (req.url === "/calculate-result" && req.method === "POST") {
    addition(req, res);
  } else {
    res.write("404 Not Found");
    return res.end();
  }
};

module.exports = requestHandler;
