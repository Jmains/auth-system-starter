require("dotenv").config();

// Using connectionString
const connectionString = process.env.DB_CONN_STRING;
// OR credentials
const credentials = {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
};

module.exports = { credentials };
