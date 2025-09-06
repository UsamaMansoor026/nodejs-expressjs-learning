const fs = require("fs");
const userForm = require("./userForm");

const userRequestHandler = (req, res) => {
  // console.log("Request is: ", req);
  // console.log("Requested URL: ", req.url);
  // console.log("Requested Method: ", req.method);
  // console.log("Requested Headers: ", req.headers);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html lang="en">
          <head>
            <title>First Web</title>
          </head>
          <body>
            <h1>Home Page</h1>
          </body>
      </html>
      `);
    return res.end();
  } else if (req.url === "/about") {
    res.setHeader("Content-Type", "json");
    res.write(
      '{name: "This is about page, desc: "Desccription of about page"}'
    );
    return res.end();
  } else if (req.url === "/user") {
    res.setHeader("Content-Type", "text/html");
    res.write(userForm());
    return res.end();
  } else if (req.url === "/user-detail" && req.method === "POST") {
    res.write("Form Submitted");
    const body = [];
    /* req.on means we are adding listner to the request. data means the listner is active when we got the data and in data we got the chunks. */
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    // Here we are adding another listner end which will be active when we got all the data. means when the chunks are completed.
    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);

      // Now we are parsing the fullBody to get the data in json format.
      const params = new URLSearchParams(fullBody);
      // const jsonBody = {};
      // for (const [key, val] of params.entries()) {
      //   jsonBody[key] = val;
      // }

      // easy way
      const jsonBody = Object.fromEntries(params);
      fs.writeFileSync("userData.txt", JSON.stringify(jsonBody), (err) => {
        err ? console.log(err) : console.log("Data saved to file");
      });
      console.log(jsonBody);
    });

    return res.end();
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>404 Not Found</title></head>");
    res.write("<body><h1>404 Page Not Found!</h1></body>");
    res.write("</html>");
    return res.end();
  }
};

module.exports = userRequestHandler;
