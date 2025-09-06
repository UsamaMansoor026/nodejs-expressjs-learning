const path = require("path");
const fs = require("fs");

const getCounter = () => {
  const filePath = path.join(__dirname, "counter.txt");
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "0");
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return parseInt(data, 10);
};

const updateCounter = () => {
  const filePath = path.join(__dirname, "counter.txt");
  let count = getCounter();
  count++;
  fs.writeFileSync(filePath, count.toString());
  return count;
};

const resetCount = () => {
  const filePath = path.join(__dirname, "counter.txt");
  if (!fs.existsSync(filePath)) {
    return 0;
  }
  fs.writeFileSync(filePath, "0");
  const count = getCounter();
  return count;
};

module.exports = { updateCounter, resetCount };
