const Home = require("../models/homeModel");

exports.getIndex = (req, res) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      currentPage: "Home",
    });
  });
};

exports.getBookings = (req, res) => {
  res.render("store/bookings", { currentPage: "bookings" });
};

exports.getFavList = (req, res) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/favourite-list", {
      registeredHomes: registeredHomes,
      currentPage: "fav-list",
    });
  });
};
