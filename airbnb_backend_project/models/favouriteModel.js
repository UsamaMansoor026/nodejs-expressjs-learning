const mongoose = require("mongoose");

const favouriteSchema = mongoose.Schema(
  {
    houseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Home",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Favourite =
  mongoose.models.Favourite || mongoose.model("Favourite", favouriteSchema);

module.exports = Favourite;
