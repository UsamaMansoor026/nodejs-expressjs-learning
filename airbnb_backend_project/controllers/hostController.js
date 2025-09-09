const Home = require("../models/homeModel");

exports.getAddHome = (req, res) => {
  res.render("host/addHome", { currentPage: "addHome" });
};

exports.addHome = (req, res) => {
  const { housename, price, location, rating, picture } = req.body;
  const home = new Home(housename, price, location, rating, picture);
  home.save();
  res.render("host/homeAdded", { currentPage: "homeAdded" });
};

exports.getHostHomes = (req, res) => {
  Home.fetchAll((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      currentPage: "host-homes",
    });
  });
};
