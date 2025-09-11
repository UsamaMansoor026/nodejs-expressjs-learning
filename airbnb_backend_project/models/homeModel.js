const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/db");

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
