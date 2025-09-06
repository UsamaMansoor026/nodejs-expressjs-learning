const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html lang="en">
          <head>
            <title>First Web</title>
          </head>
          <body>
            <nav
              style="
                padding: 16px 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
              <h1>NodeJs</h1>

              <ul style="display: flex; align-items: center; gap: 16px; list-style-type:none">
                <li><a href="/">Home</a></li>
                <li><a href="/men">Men</a></li>
                <li><a href="/women">Women</a></li>
                <li><a href="/kids">Kids</a></li>
                <li><a href="/cart">Cart</a></li>
              </ul>
            </nav>
          </body>
      </html>
      `);
    return res.end();
  } else if (req.url === "/men") {
    res.write("This is the Men collection page");
    return res.end();
  } else if (req.url === "/women") {
    res.write("This is the Women collection page");
    return res.end();
  } else if (req.url === "/kids") {
    res.write("This is the Kids collection page");
    return res.end();
  } else if (req.url === "/cart") {
    res.write("This is the Cart page");
    return res.end();
  } else {
    res.write("Something went wrong");
    res.end();
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on  http://localhost:${PORT}`);
});
