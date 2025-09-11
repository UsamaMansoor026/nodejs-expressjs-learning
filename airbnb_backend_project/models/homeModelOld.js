// This is the old model that uses local file system.

const path = require("path");
const fs = require("fs");
const rootDir = require("../utils/path");
const Favourite = require("./favouriteModel");

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
      if (this.id) {
        registeredHomes = registeredHomes.map((home) =>
          home._id === this.id ? this : home
        );
      } else {
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }
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

  static findById(homeId, callback) {
    Home.fetchAll((homes) => {
      const home = homes.find((home) => home._id === homeId);
      callback(home);
    });
  }

  static deleteById(homeId, callback) {
    Home.fetchAll((homes) => {
      const filteredhomes = homes.filter((home) => home._id !== homeId);
      const filePath = path.join(rootDir, "data", "homes.json");
      fs.writeFile(filePath, JSON.stringify(filteredhomes), (error) => {
        Favourite.deleteById(homeId, callback);
      });
    });
  }
};

/* 
Data modeling and functions using MongoDB
const { ObjectId } = require("mongodb");

module.exports = class Home {
  constructor(housename, price, location, rating, picture, _id) {
    this.housename = housename;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.picture = picture;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDB();
    if (this._id) {
      const updatedFields = {
        housename: this.housename,
        price: this.price,
        location: this.location,
        rating: this.rating,
        picture: this.picture,
      };
      // update
      return db
        .collection("homes")
        .updateOne(
          { _id: new ObjectId(String(this._id)) },
          { $set: updatedFields }
        );
    } else {
      // insert
      return db.collection("homes").insertOne(this);
    }
  }

  // If we want to call the function by class name not by object then we have to use static keyword
  static fetchAll() {
    const db = getDB();
    return db.collection("homes").find().toArray();
  }

  static findById(homeId) {
    const db = getDB();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next();
  }

  static deleteById(homeId) {
    const db = getDB();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }
};

*/
