const passport = require("passport");

exports.facebookLogin = passport.authenticate("facebook", { scope: ["email"] });

exports.facebookCallback = passport.authenticate("facebook", {
  failureRedirect: "/",
  successRedirect: "/profile",
});

exports.getProfile = (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
};
