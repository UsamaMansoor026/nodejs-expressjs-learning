const registeredHomes = [];

exports.getAddHome = (req, res) => {
  res.render("addHome", { currentPage: "addHome" });
};

exports.addHome = (req, res) => {
  console.log(req.body);
  registeredHomes.push(req.body);
  console.log("Registered homes: ", registeredHomes);
  res.render("homeAdded", { currentPage: "homeAdded" });
};

exports.getHomes = (req, res) => {
  console.log(registeredHomes);
  // res.sendFile(path.join(rootDir, "views", "home.html"));
  res.render("home", { registeredHomes: registeredHomes, currentPage: "Home" });
};
