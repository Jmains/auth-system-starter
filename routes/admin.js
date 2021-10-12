const { Router } = require("express");
const { isAdmin } = require("../utils/authMiddleware");
const router = Router();

router.get("/admin", isAdmin, (req, res, next) => {
  res.send("admin only");
});

module.exports = router;
