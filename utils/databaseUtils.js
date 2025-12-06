const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const MONGO_URL =
  "mongodb+srv://Eatzo:Eatzo2952@clusterone.lvvroop.mongodb.net/";

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      callback();
      _db = client.db("airbnb");
    })
    .catch((err) => {
      console.log("Error while connecting to mongo: ", err);
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error("Mongo not connected");
  }
  return _db;
};
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
