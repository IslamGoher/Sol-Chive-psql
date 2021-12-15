import { Pool } from "pg";

// pool config
const config = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT!)
};

export const pool = new Pool(config);