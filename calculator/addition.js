const addition = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const fullBody = Buffer.concat(body).toString();
    console.log(fullBody);

    const jsonBody = Object.fromEntries(new URLSearchParams(fullBody));
    console.log(jsonBody);

    const sum = Number(jsonBody.num1) + Number(jsonBody.num2);
    res.write(
      `<h1>Sum of number: ${Number(jsonBody.num1)} and number: ${Number(
        jsonBody.num2
      )} is ${sum}</h1>`
    );
    return res.end();
  });
};

exports.addition = addition;
