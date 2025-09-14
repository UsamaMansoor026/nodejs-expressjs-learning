const mongoose = require("mongoose");

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

const Home = mongoose.models.Home || mongoose.model("Home", homeSchema);

module.exports = Home;
