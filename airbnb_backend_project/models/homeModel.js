const mongoose = require("mongoose");
const Favourite = require("./favouriteModel");
/* 
this.housename = housename;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.picture = picture;
*/

const homeSchema = mongoose.Schema(
  {
    houseName: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    rating: { type: Number, required: true },
    picture: String,
  },
  { timestamps: true }
);

homeSchema.pre("findOneAndDelete", async function (next) {
  const houseId = this.getQuery()._id;
  await Favourite.deleteMany({ houseId: houseId });
});

const Home = mongoose.models.Home || mongoose.model("Home", homeSchema);

module.exports = Home;
