import { client } from "../database/client";

// check if database exists, if not then create it
export async function createDB() {
  await client.connect();

  const response = await client.query(
    "SELECT 1 FROM pg_database WHERE datname=$1;",
    [process.env.PG_DB]
  );

  if (response.rowCount !== 1) {
    // create database
    await client.query(`CREATE DATABASE ${process.env.PG_DB};`);
  }

  await client.end();
}
