import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config({path: __dirname + "/../.env"});
import morgan from "morgan";
import { createDB } from "./queries/create-db";
import { createTables } from "./queries/create-tables";

const app: Application = express();


const port = process.env.PORT || 3000;

// morgan configuration
if(process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// handling json requests
app.use(express.json());

// handling x-www-form-urlencoded requests
app.use(express.urlencoded({extended: false}));

// create database
createDB();

// create tables
createTables();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running on port ${port} in ${process.env.NODE_ENV} mode`);
});