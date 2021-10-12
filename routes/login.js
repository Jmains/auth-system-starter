const { Router } = require("express");
const router = Router();

const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login.ejs", {
    text: req.flash("error"),
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/restricted",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
