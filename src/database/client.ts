import { Client } from "pg";

// client config
const config = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: "postgres",
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT!)
};

export const client = new Client(config);