const { Pool } = require("pg"); //       postgres://angel:gelo96@localhost:5432/angel

exports.runQuery = async (text, params) => {
  let pool;
  if (process.env.DATABASE_URL) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  } else {
    pool = new Pool({
      connectionString: "postgres://angel:gelo96@localhost:5432/agenda",
    });
  }

  try {
    const client = await pool.connect();
    if (params == null) {
      params = [];
    }
    let result = await client.query(text, params);
    const results = result.rows;
    client.end();
    return results;
  } catch (err) {
    console.error(err);
    const error = {
      message: "Erro",
      error: err
    }
    return error;
  }
};
