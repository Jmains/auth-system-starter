const { Router } = require("express");
const router = Router();

const homeRoute = require("./home");
const loginRoute = require("./login");
const registerRoute = require("./register");
const restrictedRoute = require("./restricted");
const adminRoute = require("./admin");
const logoutRoute = require("./logout");

router.use(homeRoute);
router.use(loginRoute);
router.use(registerRoute);
router.use(restrictedRoute);
router.use(adminRoute);
router.use(logoutRoute);

module.exports = router;
