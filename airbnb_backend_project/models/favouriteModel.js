const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");

const favDataPath = path.join(rootDir, "data", "favourites.json");

module.exports = class Favourite {
  static addToFav(id, callback) {
    Favourite.getFavs((favourites) => {
      if (favourites.includes(id)) {
        callback("Home already in favourites");
      } else {
        favourites.push(id);
        fs.writeFile(favDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavs(callback) {
    fs.readFile(favDataPath, "utf-8", (err, data) => {
      if (err) {
        return callback([]);
      }

      try {
        const favs = data.trim() ? JSON.parse(data) : [];
        callback(favs);
      } catch (err) {
        console.error("Error parsing JSON:", err);
        callback([]);
      }
    });
  }

  static deleteById(delHomeId, callback) {
    Favourite.getFavs((homeIds) => {
      homeIds = homeIds.filter((homeId) => delHomeId !== homeId);
      fs.writeFile(favDataPath, JSON.stringify(homeIds), callback);
    });
  }
};
