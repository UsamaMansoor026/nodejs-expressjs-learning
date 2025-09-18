const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.userRegister = [
  check("userName")
    .notEmpty()
    .withMessage("User name is required")
    .isLength({ min: 3 })
    .withMessage("User name must be at least 3 characters long"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  /* Main controller middleware - code */
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { userName, email, password } = req.body;

    const exists = await User.exists({ email });
    if (exists) {
      return res
        .status(422)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new User({
      userName,
      email,
      password: hashedPassword,
    }).save();

    req.session.user = {
      id: user._id,
      email: user.email,
      userName: user.userName,
    };
    res.json({ success: true, message: "User registered successfully", user });
  },
];

exports.userLogin = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

  check("password").notEmpty().withMessage("Password is required"),

  /* Main controller middleware - code */
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(422)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(422)
        .json({ success: false, message: "Invalid password" });
    }

    req.session.user = {
      id: user._id,
      email: user.email,
      userName: user.userName,
    };
    res.json({ success: true, message: "User logged in successfully", user });
  },
];

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Failed to destroy session:", err);
      return res.status(500).json({ success: false, message: "Logout failed" });
    }

    res.clearCookie("connect.sid", { path: "/" });
    res.json({ success: true, message: "Logged out successfully" });
  });
};

exports.fetchCurrentUser = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.json({ success: false });
    }
    res.json({ success: true, user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
