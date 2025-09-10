const Favourite = require("../models/favouriteModel");
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

exports.getHome = (req, res) => {
  const { homeId } = req.params;
  Home.findById(homeId, (home) => {
    if (!home) {
      return res.redirect("/homes");
    }
    res.render("store/home-detail", { home: home, currentPage: "Home" });
  });
  // Home.fetchAll((registeredHomes) => {
  //   const home = registeredHomes.find((home) => home.id === homeId);
  //   res.render("store/home-detail", { home: home, currentPage: "Home" });
  // });
};

exports.getBookings = (req, res) => {
  res.render("store/bookings", { currentPage: "bookings" });
};

exports.getFavList = (req, res) => {
  Favourite.getFavs((favourites) => {
    Home.fetchAll((registeredHomes) => {
      const favArray = registeredHomes.filter((home) =>
        favourites.includes(home.id)
      );

      res.render("store/favourite-list", {
        favourites: favArray,
        currentPage: "fav-list",
      });
    });
  });
};

exports.addToFav = (req, res) => {
  const id = req.body.id;
  console.log("Fav house Id body: ", id);
  Favourite.addToFav(id, (error) => {
    if (error) {
      console.log("Error in fav: ", error);
    }
    res.redirect("/fav-list");
  });
};

exports.removeFromFav = (req, res) => {
  const { homeId } = req.params;

  Favourite.deleteById(homeId, (error) => {
    if (error) {
      console.log("Error while removing from fav: ", error);
    }
    res.redirect("/fav-list");
  });
};
