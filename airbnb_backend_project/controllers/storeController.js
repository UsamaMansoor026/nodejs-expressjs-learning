const Favourite = require("../models/favouriteModel");
const Home = require("../models/homeModel");

exports.getIndex = (req, res) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      currentPage: "Home",
    });
  });
};

exports.getHome = (req, res) => {
  const { homeId } = req.params;
  Home.findById(homeId).then((home) => {
    if (!home) {
      return res.redirect("/homes");
    }
    res.render("store/home-detail", { home: home, currentPage: "Home" });
  });
  // Home.fetchAll((registeredHomes) => {
  //   const home = registeredHomes.find((home) => home._id === homeId);
  //   res.render("store/home-detail", { home: home, currentPage: "Home" });
  // });
};

exports.getBookings = (req, res) => {
  res.render("store/bookings", { currentPage: "bookings" });
};

exports.getFavList = (req, res) => {
  Favourite.getFavs().then((favourites) => {
    favourites = favourites.map((fav) => fav.houseId);
    Home.fetchAll().then((registeredHomes) => {
      const favArray = registeredHomes.filter((home) =>
        favourites.includes(home._id.toString())
      );

      res.render("store/favourite-list", {
        favourites: favArray,
        currentPage: "fav-list",
      });
    });
  });
};

exports.addToFav = (req, res) => {
  const houseId = req.body.id;
  console.log("Fav house Id body: ", houseId);
  const fav = new Favourite(houseId);
  fav
    .save()
    .then((result) => console.log("Fav added: ", result))
    .catch((err) => console.log("Error adding fav: ", err))
    .finally(() => res.redirect("/fav-list"));
};

exports.removeFromFav = (req, res) => {
  const { homeId } = req.params;

  Favourite.deleteById(homeId)
    .then((result) => console.log("Remove from Fav: ", result))
    .catch((err) => console.log("Error while removing from fav: ", err))
    .finally(() => res.redirect("/fav-list"));
};
