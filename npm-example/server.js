const http = require("http");
const { updateCounter, resetCount } = require("./getCounter");

const server = http.createServer((req, res) => {
  console.log("Request URL: ", req.url);
  console.log("Request Method: ", req.method);

  if (req.url === "/") {
    const count = updateCounter();
    res.setHeader("Content-Type", "text/html");
    res.write(`<head><title>Counter</title></head>`);
    res.write(
      ` <body
    style="
      background-color: #343434;
      color: #f1f1f1;
      text-align: center;
      margin-top: 60px;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
        sans-serif;
    "
  >
    <h1 style="font-size: 40px; font-weight: 600">
      Welcome to the Counter App
    </h1>
    <p>
      This page has been visited
      <strong style="font-size: 24px">${count}</strong> times.
    </p>
    <a
      href="/reset"
      style="
        text-decoration: none;
        color: inherit;
        border: 1px solid #f1f1f1;
        padding: 10px 30px;
        border-radius: 10px;
        margin-top: 20px;
        display: inline-block;
      "
      >Reset Count</a
    >
  </body>
      `
    );
    return res.end();
  } else if (req.url === "/reset") {
    resetCount();
    res.writeHead(302, { Location: "/" });
    return res.end();
  } else {
    res.statusCode = 404;
    return res.end("Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
