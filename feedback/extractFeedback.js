const extractFeedback = (req, res) => {
  let body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const fullBody = Buffer.concat(body).toString();
    const params = new URLSearchParams(fullBody);

    const jsonData = Object.fromEntries(params.entries());
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <body
    style="
      background-color: #343434;
      color: #f1f1f1;
      text-align: center;
      margin-top: 60px;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
        sans-serif;
    "
  >
    <h1>Your Feedback has been submitted</h1>
    <p>Email: <strong>${jsonData.email}</strong></p>
    <p>Feedback: <strong>${jsonData.feedback}</strong></p>
  </body>`);
    res.end();
  });
};

exports.extractFeedback = extractFeedback;
