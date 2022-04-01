import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

// pool connection string
const connectionString = `${process.env.PG_CLIENT_URI}`;

export const client = new Client({
  connectionString,
});
