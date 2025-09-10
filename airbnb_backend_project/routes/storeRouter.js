const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/fav-list", storeController.getFavList);
storeRouter.get("/homes/:homeId", storeController.getHome);

module.exports = storeRouter;
