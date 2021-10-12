const { Router } = require("express");
const router = Router();

const bcrypt = require("bcrypt");
const { addUser, getUserByEmail } = require("../services/users");

router.get("/register", (req, res) => {
  res.render("register.ejs", { text: req.flash("text") });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const lowercaseEmail = email.toLowerCase().trim();

  try {
    const user = await getUserByEmail(lowercaseEmail);
    console.log(user);
    if (user) {
      req.flash("text", "Email is already taken.");
      return res.redirect("/register");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await addUser(lowercaseEmail, hashedPassword);
    return res.redirect("/login");
  } catch (err) {
    console.log("Something went wrong: ", err.message);
    return res.render("/register");
  }
});

module.exports = router;
