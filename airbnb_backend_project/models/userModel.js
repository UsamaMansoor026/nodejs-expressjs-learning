const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, default: "guest", enum: ["guest", "host"] },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Home" }],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
