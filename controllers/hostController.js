const Home = require("../models/home");

// get handlers
exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home",
    currentPage: "add-home",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  // by default both stores as string
  const homeId = req.params.homeId;
  // now gets converted to string
  const editing = req.query.editing === "true";
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("home not found");
      return res.redirect("/host/host-airbnbHome-list");
    }
    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your home",
      currentPage: "host-airbnbHome-list",
      editing: editing,
    });
  });
};
exports.getHostHomesList = (req, res, next) => {
  Home.fetchAll().then((data) => {
    res.render("host/host-airbnbHome-list", {
      data: data,
      pageTitle: "Host Home List",
      currentPage: "host-airbnbHome-list",
    });
  });
};

// post handlers

// ...existing code...
exports.postAddHome = async (req, res, next) => {
  try {
    const { homeName, pricePerNight, location, rating, photoUrl, description } = req.body;
    const home = new Home(homeName, pricePerNight, location, rating, photoUrl, description);
    await home.save();
    console.log("Home saved successfully");
    return res.redirect("/host/host-airbnbHome-list");
  } catch (err) {
    console.error("Error saving home:", err);
    return res.redirect("/host/host-airbnbHome-list");
  }
};

exports.postEditHome = async (req, res, next) => {
  try {
    const { id, homeName, pricePerNight, location, rating, photoUrl, description } = req.body;
    const home = new Home(homeName, pricePerNight, location, rating, photoUrl, description);
    home._id = id;
    await home.save();
    console.log("Home updated");
    return res.redirect("/host/host-airbnbHome-list");
  } catch (err) {
    console.error("Error updating home:", err);
    return res.redirect("/host/host-airbnbHome-list");
  }
};

exports.postDeleteHome = async (req, res, next) => {
  try {
    const homeId = req.params.homeId;
    console.log("Id of home to be deleted : ", homeId);
    // Ensure your Home.deleteById returns a Promise
    await Home.deleteById(homeId);
    return res.redirect("/host/host-airbnbHome-list");
  } catch (err) {
    console.error("Error while deleting home", err);
    return res.redirect("/host/host-airbnbHome-list");
  }
};
// ...existing code...
