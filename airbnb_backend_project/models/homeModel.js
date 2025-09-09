const path = require("path");
const fs = require("fs");
const rootDir = require("../utils/path");

module.exports = class Home {
  constructor(housename, price, location, rating, picture) {
    this.housename = housename;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.picture = picture;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      const filePath = path.join(rootDir, "data", "homes.json");
      fs.writeFile(filePath, JSON.stringify(registeredHomes), (err) => {
        console.log("Error Occured: ", err);
      });
    });
  }

  // If we want to call the function by class name not by object then we have to use static keyword
  static fetchAll(callback) {
    const filePath = path.join(rootDir, "data", "homes.json");

    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        return callback([]);
      }

      try {
        const homes = data.trim() ? JSON.parse(data) : [];
        callback(homes);
      } catch (err) {
        console.error("Error parsing JSON:", err);
        callback([]);
      }
    });
  }
};
