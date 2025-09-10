const Home = require("../models/homeModel");

exports.getAddHome = (req, res) => {
  res.render("host/edit-home", { currentPage: "addHome", editing: false });
};

exports.addHome = (req, res) => {
  const { housename, price, location, rating, picture } = req.body;
  const home = new Home(housename, price, location, rating, picture);
  home.save();
  res.redirect("/host/host-home-list");
};

exports.getHostHomes = (req, res) => {
  Home.fetchAll((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      currentPage: "host-homes",
    });
  });
};

exports.getEditHome = (req, res) => {
  const { homeId } = req.params;
  const { editing } = req.query;

  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found");
      return res.redirect("/host/host-home-list");
    }
    console.log("Home: ", home);
    res.render("host/edit-home", {
      currentPage: "host-homes",
      editing: editing,
      home: home,
    });
  });
};

exports.editHome = (req, res) => {
  const { id, housename, price, location, rating, picture } = req.body;
  const home = new Home(housename, price, location, rating, picture);
  home.id = id;
  home.save();
  res.redirect("/host/host-home-list");
};

exports.deleteHome = (req, res) => {
  const { homeId } = req.params;
  console.log("HomeId: ", homeId);
  Home.deleteById(homeId, (error) => {
    if (error) {
      console.log("Error deleting home: ", error);
    }
    res.redirect("/host/host-home-list");
  });
};
