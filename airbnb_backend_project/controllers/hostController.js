const Home = require("../models/homeModel");

exports.getAddHome = (req, res) => {
  res.render("host/edit-home", {
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.addHome = (req, res) => {
  const { housename, price, location, rating, picture } = req.body;
  const home = new Home({
    houseName: housename,
    price,
    location,
    rating,
    picture,
  });
  home
    .save()
    .then(() => console.log("Home saved successfully"))
    .finally(() => res.redirect("/host/host-home-list"));
};

exports.getHostHomes = (req, res) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getEditHome = (req, res) => {
  const { homeId } = req.params;
  const { editing } = req.query;

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      return res.redirect("/host/host-home-list");
    }
    console.log("Home: ", home);
    res.render("host/edit-home", {
      currentPage: "host-homes",
      editing: editing,
      home: home,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.editHome = (req, res) => {
  const { id, housename, price, location, rating, picture } = req.body;
  Home.findByIdAndUpdate(id, {
    houseName: housename,
    price,
    location,
    rating,
    picture,
  })
    .then(() => console.log("Home updated: "))
    .finally(() => res.redirect("/host/host-home-list"));
};

exports.deleteHome = (req, res) => {
  const { homeId } = req.params;
  console.log("HomeId: ", homeId);
  Home.findByIdAndDelete(homeId)
    .then((res) => {
      console.log("Home Deleted: ", res);
    })
    .catch((err) => console.log("Error deleting home: ", err));
  res.redirect("/host/host-home-list");
};
