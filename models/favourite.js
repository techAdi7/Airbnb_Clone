const { getDB } = require("../utils/databaseUtils");
const { ObjectId } = require("mongodb");

module.exports = class Favourite {
  constructor(homeId) {
    this.homeId = homeId;
  }

  save() {
    const db = getDB();
    return db
      .collection("favourites")
      .findOne({ homeId: this.homeId })
      .then((existingFav) => {
        if (!existingFav) {
          return db.collection("favourites").insertOne(this);
        }
        return Promise.resolve();
      });
  }

  static getFavourite() {
    const db = getDB();
    return db.collection("favourites").find().toArray();
  }

  static postDeleteFavourite(homeId) {
    const db = getDB();
    return db.collection("favourites").deleteOne({ homeId: homeId });
  }
};
