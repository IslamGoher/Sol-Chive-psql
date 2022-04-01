import { Pool } from "pg";

// pool connection string
const connectionString = `${process.env.PG_POOL_URI}`;

export const pool = new Pool({
  connectionString,
});
