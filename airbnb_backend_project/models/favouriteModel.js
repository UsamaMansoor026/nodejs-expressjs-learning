const { getDB } = require("../utils/db");

module.exports = class Favourite {
  constructor(houseId) {
    this.houseId = houseId;
  }

  save() {
    const db = getDB();
    return db
      .collection("favourites")
      .findOne({ houseId: this.houseId })
      .then((exist) => {
        if (!exist) {
          return db.collection("favourites").insertOne(this);
        }
        return Promise.resolve();
      });
  }

  static getFavs() {
    const db = getDB();
    return db.collection("favourites").find().toArray();
  }

  static deleteById(delHomeId) {
    const db = getDB();
    return db.collection("favourites").deleteOne({ houseId: delHomeId });
  }
};
