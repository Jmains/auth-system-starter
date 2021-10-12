const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const { getUserById, getUserByEmail } = require("../services/users");

const customPassportFields = {
  usernameField: "email",
  passwordField: "password",
};

const initPassport = (passport) => {
  const verifyCallback = async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);
      if (!user) return done(null, false, { message: "Invalid credentials" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: "Invalid credentials" });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy(customPassportFields, verifyCallback));

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
};

module.exports = initPassport;
