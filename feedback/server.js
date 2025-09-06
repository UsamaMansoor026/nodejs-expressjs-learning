const http = require("http");
const { feedbackForm } = require("./feedbackForm");
const { extractFeedback } = require("./extractFeedback");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    feedbackForm(req, res);
  } else if (req.url === "/feedback" && req.method === "POST") {
    extractFeedback(req, res);
  } else {
    res.write("404 Not Found");
    return res.end();
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on  http://localhost:${PORT}`);
});
