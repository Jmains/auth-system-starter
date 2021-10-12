const { Router } = require("express");
const { isAuth } = require("../utils/authMiddleware");
const router = Router();

router.get("/restricted", isAuth, (req, res) => {
  res.send(`Restricted page... welcome: ${req.user.email}`);
});

module.exports = router;
