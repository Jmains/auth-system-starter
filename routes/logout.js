const { Router } = require("express");
const router = Router();

// /logout
router.get("/logout", (req, res) => {
  req.logOut();
  return res.redirect("/login");
});

module.exports = router;
