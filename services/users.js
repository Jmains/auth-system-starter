const dbUtils = require("../utils/db");
const db = require("../db");

module.exports.addUser = async (email, password) => {
  const query = {
    text: "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
    values: [email, password],
  };

  const rows = await db.query(query);
  const data = dbUtils.emptyOrRows(rows);

  return data[0];
};

module.exports.getUserById = async (id) => {
  const queryString = {
    text: "SELECT id, email, is_admin FROM users WHERE id = $1",
    values: [id],
  };

  const rows = await db.query(queryString);
  const data = dbUtils.emptyOrRows(rows);

  return data[0];
};

module.exports.getUserByEmail = async (email) => {
  const queryString = {
    text: "SELECT id, email, password FROM users WHERE email = $1",
    values: [email],
  };

  const rows = await db.query(queryString);
  const data = dbUtils.emptyOrRows(rows);

  return data[0];
};
