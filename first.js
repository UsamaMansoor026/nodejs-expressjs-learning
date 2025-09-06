// Writing to a local file
const fs = require("fs");
fs.writeFile("output.txt", "Writing to a file first time", (err) => {
  if (err) console.log("Error: ", err);
  else console.log("File written successfully");
});

// How to read from a local file
// const fs = require("fs");
// fs.readFile("output.txt", "utf-8", (err, data) => {
//   if (err) console.log("Error: ", err);
//   else console.log("File content: ", data);
// });
