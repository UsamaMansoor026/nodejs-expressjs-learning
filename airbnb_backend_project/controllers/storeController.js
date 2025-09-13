const Favourite = require("../models/favouriteModel");
const Home = require("../models/homeModel");

exports.getIndex = (req, res) => {
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getHomes = (req, res) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getHome = (req, res) => {
  const { homeId } = req.params;
  Home.findById(homeId).then((home) => {
    if (!home) {
      return res.redirect("/homes");
    }
    res.render("store/home-detail", {
      home: home,
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getBookings = (req, res) => {
  res.render("store/bookings", {
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getFavList = (req, res) => {
  Favourite.find()
    .populate("houseId")
    .then((favourites) => {
      const favArray = favourites.map((fav) => fav.houseId);

      res.render("store/favourite-list", {
        favourites: favArray,
        currentPage: "fav-list",
        isLoggedIn: req.isLoggedIn,
      });
    });
};

exports.addToFav = (req, res) => {
  const houseId = req.body.id;
  Favourite.findOne({ houseId }).then((fav) => {
    if (fav) {
      return res.redirect("/fav-list");
    } else {
      fav = new Favourite({ houseId });
      fav
        .save()
        .then((result) => console.log("Fav added: "))
        .catch((err) => console.log("Error adding fav: ", err))
        .finally(() => res.redirect("/fav-list"));
    }
  });
};

exports.removeFromFav = (req, res) => {
  const { homeId } = req.params;

  Favourite.findOneAndDelete({ houseId: homeId })
    .then((result) => console.log("Remove from Fav: ", result))
    .catch((err) => console.log("Error while removing from fav: ", err))
    .finally(() => res.redirect("/fav-list"));
};
