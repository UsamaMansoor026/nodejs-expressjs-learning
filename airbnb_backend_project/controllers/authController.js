const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.getLoginForm = (req, res) => {
  res.render("auth/login", {
    currentPage: "login",
    isLoggedIn: false,
    errors: [],
    oldInput: { email: "" },
    user: {},
  });
};

exports.getSignupForm = (req, res) => {
  res.render("auth/signup", {
    currentPage: "signup",
    isLoggedIn: false,
    errors: [],
    oldInput: { firstname: "", lastName: "", email: "", usertype: "" },
    user: {},
  });
};

exports.postLoginForm = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).render("auth/login", {
      currentPage: "login",
      isLoggedIn: false,
      errors: ["Invalid email or password"],
      oldInput: { email },
      user: {},
    });
  }

  /* Comparing the passwords */
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render("auth/login", {
      currentPage: "login",
      isLoggedIn: false,
      errors: ["Invalid password"],
      oldInput: { email },
      user: {},
    });
  }

  req.session.isLoggedIn = true;
  req.session.user = user;
  await req.session.save();
  res.redirect("/");
};

exports.postSignupForm = [
  check("firstname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .matches(/^[a-zA-Z]+$/) // + means min 1 character
    .withMessage("First name must contains only letters"),

  check("lastname")
    .trim()
    .matches(/^[a-zA-Z]*$/) // * means 0 or more characters
    .withMessage("Last name must contains only letters"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character")
    .trim(),

  check("confirmpassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("usertype")
    .notEmpty()
    .isIn(["host", "guest"])
    .withMessage("Please select a user type"),

  check("terms")
    .notEmpty()
    .withMessage("Please accept the terms and conditions")
    .custom((value, { req }) => {
      if (value !== "on") {
        throw new Error("Please accept the terms and conditions");
      }
      return true;
    }),

  (req, res) => {
    const { firstname, lastname, email, password, usertype } = req.body;
    console.log("Req Body: ", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        currentPage: "signup",
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: { firstname, lastname, email, usertype },
        user: {},
      });
    }

    /* hashing the password and then Saving user in database */
    bcrypt
      .hash(password, 8)
      .then((hashPassword) => {
        const user = new User({
          firstName: firstname,
          lastName: lastname,
          email,
          password: hashPassword,
          userType: usertype,
        });
        return user.save();
      })
      .then(() => {
        console.log("User registered");
        res.redirect("/auth/login");
      })
      .catch((err) => {
        return res.status(422).render("auth/signup", {
          currentPage: "signup",
          isLoggedIn: false,
          errors: [err.message],
          oldInput: { firstname, lastname, email, usertype },
          user: {},
        });
      });
  },
];

exports.getLogout = (req, res) => {
  console.log("Logged out successfully");
  req.session.destroy(() => {
    res.redirect("/");
  });
};
