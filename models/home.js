const { getDB } = require("../utils/databaseUtils");
const { ObjectId } = require("mongodb");
// const homeDataPath = path.join(rootDir, "data", "home.json");
module.exports = class Home {
  constructor(
    homeName,
    pricePerNight,
    location,
    rating,
    photoUrl,
    description,
    _id
  ) {
    this.homeName = homeName;
    this.pricePerNight = pricePerNight;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDB();
    if (this._id) {
      // update the home
      const updatedFields = {
        homeName: this.homeName,
        pricePerNight: this.pricePerNight,
        location: this.location,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description,
      };
      return db
        .collection("homes")
        .updateOne(
          { _id: new ObjectId(String(this._id)) },
          { $set: updatedFields }
        );
    } else {
      // insert new
      return db
        .collection("homes")
        .insertOne(this)
        .then((result) => {
          console.log(result);
        });
    }
  }

  static fetchAll() {
    const db = getDB();
    // it returns the promise(and till 'find()' it returns cursor)
    return db.collection("homes").find().toArray();
  }

  static findById(homeId) {
    console.log(homeId);
    const db = getDB();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next();
  }

  static deleteById(homeId) {
    console.log(homeId);
    const db = getDB();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }
};
