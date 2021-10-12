const { Pool } = require("pg");
const dbConfig = require("../config/db");

// If self-signed SSL cert
// const pool = new Pool(dbConnectionString, {
//   ssl: {
//     rejectUnauthorized: false,
//     ca: fs.readFileSync("/path/to/server-certificates/root.crt").toString(),
//     key: fs.readFileSync("/path/to/client-key/postgresql.key").toString(),
//     cert: fs.readFileSync("/path/to/client-certificates/postgresql.crt").toString(),
//   },
// });

const pool = new Pool(dbConfig.credentials);

/**
 * Query the database using the pool
 * @param {*} query
 * @param {*} params
 *
 * @see https://node-postgres.com/features/pooling#single-query
 */
const query = async (text, params, cb) => {
  const start = Date.now();
  const { rows, fields } = await pool.query(text, params);
  // Log every query and how long it took
  // disable in prod
  const duration = Date.now() - start;
  console.log("executed query", { text, duration, rows: rows.length });
  return rows;
};

const getClient = async () => {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;
  // set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    console.error("A client has been checked out for more than 5 seconds!");
    console.error(`The last executed query on this client was: ${client.lastQuery}`);
  }, 5000);
  // monkey patch the query method to keep track of the last query executed
  client.query = (...args) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };
  client.release = () => {
    // clear our timeout
    clearTimeout(timeout);
    // set the methods back to their old un-monkey-patched version
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  return client;
};

module.exports = {
  query,
  getClient,
};
