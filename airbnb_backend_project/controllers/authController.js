exports.getLoginForm = (req, res) => {
  res.render("auth/login", { currentPage: "login", isLoggedIn: false });
};

exports.postLoginForm = (req, res) => {
  const { email, password } = req.body;
  console.log("Email: ", email);
  console.log("Password: ", password);
  res.cookie("isLoggedIn", true);
  res.redirect("/");
};

exports.getLogout = (req, res) => {
  console.log("Logged out successfully");
  res.clearCookie("isLoggedIn");
  res.redirect("/");
};
