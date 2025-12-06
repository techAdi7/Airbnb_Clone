const Favourite = require("../models/favourite");
const Home = require("../models/home");
const { ObjectId } = require("mongodb");

// get request handling
exports.getIndex = (req, res, next) => {
  Home.fetchAll().then((data) => {
    res.render("store/index", {
      data: data,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  });
};

exports.getHomesList = (req, res, next) => {
  Home.fetchAll().then((data) => {
    res.render("store/airbnbHome-list", {
      data: data,
      pageTitle: "Home List",
      currentPage: "airbnbHome-list",
    });
  });
};

exports.getBooking = (req, res, next) => {
  res.render("store/booking", {
    pageTitle: "My Bookings",
    currentPage: "booking",
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourite().then(favourite => {
    Home.fetchAll().then(data => {
      // build favourite homes list - compare ObjectIds properly
      const favouriteHomes = favourite.map((fav) => {
        const home = data.find((h) => h._id.toString() === fav.homeId.toString());
        console.log(home);
        
        if (home) {
          return home;
        } else {
          return {
            _id: fav.homeId,
            homeName: "This home was removed",
            pricePerNight: "-",
            location: "-",
            rating: "-",
            photoUrl: "/images/deleted-home.jpg",
          };
        }
      });

      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourite-list",
      });
    });
  });
};

exports.getHomesDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("At home details page", homeId);
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/airbnbHome-list");
    } else {
      console.log(home);
      res.render("store/home-details", {
        homeReg: home,
        pageTitle: "Home Detail",
        currentPage: "airbnbHome-list",
      });
    }
  });
};

// post request handling
exports.postAddToFavourite = async (req, res, next) => {
  try {
    const homeId = req.body.id;
    const fav = new Favourite(homeId);
    await fav.save();
    console.log("Fav added: ", homeId);
    return res.redirect("/favourite-list");
  } catch (err) {
    console.log("Error while marking favourite.", err);
    return res.redirect("/favourite-list");
  }
};

exports.postDeleteFromFavourite = async (req, res, next) => {
  try {
    const homeId = req.params.homeId;
    await Favourite.postDeleteFavourite(homeId);
    console.log("Fav Removed: ", homeId);
    return res.redirect("/favourite-list");
  } catch (err) {
    console.log("Error while deleting favourite.", err);
    return res.redirect("/favourite-list");
  }
};