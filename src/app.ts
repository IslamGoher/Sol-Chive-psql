import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config({path: __dirname + "/../.env"});
import morgan from "morgan";
import { createDB } from "./queries/create-db";
import { createTables } from "./queries/create-tables";
import { errorHandler } from "./middlewares/error-handler";
import { notFound } from "./controllers/not-found";

const app: Application = express();

const port = process.env.PORT || 3000;

(
  async function() {
    // create database
    await createDB();
    
    // create tables
    await createTables();
  }
)();

// morgan configuration
if(process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// handling json requests
app.use(express.json());

// handling x-www-form-urlencoded requests
app.use(express.urlencoded({extended: false}));

// using routers
app.use(notFound);

// using error handler
app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running on port ${port} in ${process.env.NODE_ENV} mode`);
});