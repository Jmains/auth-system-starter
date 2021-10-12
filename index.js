const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./routes/index");
const passport = require("passport");
const initPassport = require("./config/passport.js");
const flash = require("express-flash");
const session = require("express-session");
const helmet = require("helmet");
// const csrf = require('csurf');

// Load environment variables in development mode
require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";

// HOW TO SECURE EXPRESS SERVER
// https://nodesource.com/blog/nine-security-tips-to-keep-express-from-getting-pwned/

//  every time the user makes a request a new CSRF token
//  is generated and added to the user’s cookie. To effectively
//  prevent against CSRF attacks, that token should be
//  added as a value to inputs in an application’s templates
//  and will be checked against the token that the CSRF
//  library, such as csurf generated when the user sends information.

// app.use(csrf());

// app.use(function(req, res, next){
//  // Expose variable to templates via locals
//  res.locals.csrftoken = req.csrfToken();
//  next();
// });
// example ... note: {{csrftoken}} is handlebars syntax
/* <input type="hidden" name="<i>csrf" value={{csrftoken}} /> */

// Initialize express app
const app = express();
const port = process.env.PORT || 8000;

// Config
app.disable("x-powered-by");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
app.use(express.json()); // for parsing JSON in req.body
app.use(express.urlencoded({ extended: true })); // for parsing x-www-form-urlencoded in req.body
app.use(helmet()); // It includes a whopping 11 packages that all work to block malicious parties from breaking or using an application to hurt its users.
app.use(flash()); // For showing messages to client
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    key: "session_id",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      maxAge: "1000 * 60 * 60 * 24", // 1 day
    },
  })
);
app.use(
  cors({
    credentials: true, // For cookies
    // origin: "http://localhost:3000", // put frontend origin here if exists
  })
);

// Initialize passportjs
initPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", routes);

// Start server
app.listen(port, () => {
  console.log(`listening...server running on port ${port}`);
});
