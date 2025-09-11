const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;
const MONGO_URI =
  "mongodb+srv://usamadev:6PXWn4dzPtIPhmbK@airbnbbackend.38p3qy9.mongodb.net/?retryWrites=true&w=majority&appName=airbnbbackend";

let _db;

const mongoDBConnect = (callback) => {
  MongoClient.connect(MONGO_URI)
    .then((client) => {
      callback();
      _db = client.db("airbnb"); // name of DB
    })
    .catch((err) => console.log("Error while connecting to DB: ", err));
};

const getDB = () => {
  if (!_db) {
    throw new Error("MongoDB is not connected");
  }
  return _db;
};

exports.mongoDBConnect = mongoDBConnect;
exports.getDB = getDB;
